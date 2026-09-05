#!/usr/bin/env python3
"""
Single root-level verification runner for Gitilizer.
Runs all backend (Python) and frontend (Flutter) checks in sequence with clear reporting.

Usage:
    python check.py             # Run all backend & frontend tests, linters, and type checks
    python check.py --backend   # Run Python backend checks only
    python check.py --frontend  # Run Flutter frontend checks only
    python check.py --build     # Also run 'flutter build web --release'
    python check.py --fix       # Automatically fix lint issues with Ruff
"""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
import time
from pathlib import Path

# ANSI color codes
GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
CYAN = "\033[96m"
BOLD = "\033[1m"
RESET = "\033[0m"


def supports_color() -> bool:
    """Detects whether stdout supports ANSI color escape codes."""
    if os.environ.get("NO_COLOR"):
        return False
    return hasattr(sys.stdout, "isatty") and sys.stdout.isatty()


USE_COLOR = supports_color()


def color(text: str, code: str) -> str:
    return f"{code}{text}{RESET}" if USE_COLOR else text


ROOT_DIR = Path(__file__).resolve().parent
BACKEND_DIR = ROOT_DIR / "github-task-updater"
FRONTEND_DIR = ROOT_DIR / "frontend"


def find_venv_bin(name: str) -> str:
    """Finds a tool in functions/venv or falls back to system PATH."""
    venv_dir = BACKEND_DIR / "functions" / "venv"
    # Windows
    win_path = venv_dir / "Scripts" / f"{name}.exe"
    if win_path.is_file():
        return str(win_path)
    # Unix
    unix_path = venv_dir / "bin" / name
    if unix_path.is_file():
        return str(unix_path)
    # PATH lookup fallback
    which = shutil.which(name)
    if which:
        return which
    return name


def find_venv_python() -> str:
    """Finds the python executable in functions/venv or falls back to sys.executable."""
    venv_dir = BACKEND_DIR / "functions" / "venv"
    win_path = venv_dir / "Scripts" / "python.exe"
    if win_path.is_file():
        return str(win_path)
    unix_path = venv_dir / "bin" / "python"
    if unix_path.is_file():
        return str(unix_path)
    return sys.executable


def run_step(name: str, cmd: list[str], cwd: Path, verbose: bool = False) -> bool:
    """Runs a single verification step, printing status and capturing output."""
    display_cmd = " ".join(cmd)
    print(f"  {color('•', CYAN)} {BOLD}{name}{RESET} ... ", end="", flush=True)
    start_time = time.perf_counter()

    try:
        proc = subprocess.run(
            cmd,
            cwd=str(cwd),
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            check=False,
        )
        duration = time.perf_counter() - start_time
        if proc.returncode == 0:
            print(f"{color('PASSED', GREEN)} ({duration:.2f}s)")
            if verbose and proc.stdout.strip():
                for line in proc.stdout.strip().splitlines():
                    print(f"      {line}")
            return True
        else:
            print(f"{color('FAILED', RED)} ({duration:.2f}s)")
            print(f"\n{color('Command:', YELLOW)} {display_cmd} (in {cwd.name}/)")
            print(color("Output:", YELLOW))
            for line in proc.stdout.strip().splitlines():
                print(f"    {line}")
            print()
            return False
    except Exception as exc:
        duration = time.perf_counter() - start_time
        print(f"{color('ERROR', RED)} ({duration:.2f}s)")
        print(f"    {color('Exception:', RED)} {exc}\n")
        return False


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Run all verification, lint, type check, and test suites for GitVassal."
    )
    parser.add_argument("--backend", "-b", action="store_true", help="Run backend checks only")
    parser.add_argument("--frontend", "-f", action="store_true", help="Run frontend checks only")
    parser.add_argument(
        "--build", action="store_true", help="Include Flutter release web build (flutter build web --release)"
    )
    parser.add_argument("--fix", action="store_true", help="Run ruff with --fix to automatically resolve lint errors")
    parser.add_argument("--verbose", "-v", action="store_true", help="Print detailed command output on success")
    args = parser.parse_args()

    run_backend = not args.frontend
    run_frontend = not args.backend

    python_bin = find_venv_python()
    ruff_bin = find_venv_bin("ruff")
    pyright_bin = find_venv_bin("pyright")
    flutter_bin = shutil.which("flutter") or "flutter"

    steps: list[tuple[str, list[str], Path]] = []

    if run_backend:
        ruff_cmd = [ruff_bin, "check"]
        if args.fix:
            ruff_cmd.append("--fix")
        ruff_cmd.append(".")

        steps.extend(
            [
                ("Backend: Ruff Linter", ruff_cmd, BACKEND_DIR),
                ("Backend: Pyright Type Checker", [pyright_bin], BACKEND_DIR),
                (
                    "Backend: Unit Tests",
                    [python_bin, "-m", "unittest", "discover", "-s", ".", "-p", "test_*.py"],
                    BACKEND_DIR,
                ),
            ]
        )

    if run_frontend:
        steps.extend(
            [
                ("Frontend: Flutter Analyze", [flutter_bin, "analyze"], FRONTEND_DIR),
                ("Frontend: Flutter Tests", [flutter_bin, "test"], FRONTEND_DIR),
            ]
        )
        if args.build:
            steps.append(
                (
                    "Frontend: Flutter Web Build",
                    [flutter_bin, "build", "web", "--release"],
                    FRONTEND_DIR,
                )
            )

    print(f"\n{BOLD}{color('Gitilizer Verification Suite', CYAN)}{RESET}")
    print(f"{color('=' * 40, CYAN)}")

    total_start = time.perf_counter()
    all_passed = True

    for name, cmd, cwd in steps:
        if not run_step(name, cmd, cwd, verbose=args.verbose):
            all_passed = False
            break

    total_duration = time.perf_counter() - total_start
    print(f"{color('=' * 40, CYAN)}")

    if all_passed:
        print(f"{color('All checks passed successfully!', GREEN)} {BOLD}({total_duration:.2f}s){RESET}\n")
        return 0
    else:
        print(f"{color('Verification failed.', RED)} {BOLD}({total_duration:.2f}s){RESET}\n")
        return 1


if __name__ == "__main__":
    sys.exit(main())
