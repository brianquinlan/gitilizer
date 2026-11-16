// The Preferences block in the Settings left column (PRD SET-50).

/**
 * The Preferences block (SET-50, Figma "Settings / Preferences"). Its switch applies as soon as it changes and isn't
 * part of the page's unsaved changes (SET-14, SET-26). The hint under it stays when shortcuts are off (KEY-3).
 */
export function Preferences({ shortcuts, onShortcuts }: { shortcuts: boolean; onShortcuts: (on: boolean) => void }) {
  return (
    <div className="preferences" id="preferences">
      <div className="label">PREFERENCES</div>
      <div className="switch-row">
        <span id="keyboard-shortcuts-label">Keyboard shortcuts</span>
        <button type="button" role="switch" className="switch" id="keyboard-shortcuts" aria-checked={shortcuts}
                aria-labelledby="keyboard-shortcuts-label" aria-describedby="keyboard-shortcuts-hint" onClick={() => onShortcuts(!shortcuts)} />
      </div>
      <span className="small" id="keyboard-shortcuts-hint">Such as <kbd className="keycap">/</kbd> to search.</span>
    </div>
  );
}
