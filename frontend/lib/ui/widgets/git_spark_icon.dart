import 'dart:math' as math;
import 'package:flutter/material.dart';

/// A custom-painted icon representing "The Git Spark" theme for Gitilizer.
/// Displays a stylized Git branch fork terminating in a glowing Gemini AI sparkle star.
class GitSparkIcon extends StatelessWidget {
  final double size;
  final bool rounded;
  final double? borderRadius;

  const GitSparkIcon({
    super.key,
    this.size = 28.0,
    this.rounded = true,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    final double radius = borderRadius ?? (size * 0.22);

    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: const Color(0xFF0D1117), // GitHub Dark
        borderRadius: rounded ? BorderRadius.circular(radius) : null,
        border: rounded
            ? Border.all(
                color: const Color(0xFF30363D),
                width: math.max(0.5, size * 0.02),
              )
            : null,
      ),
      child: ClipRRect(
        borderRadius: rounded ? BorderRadius.circular(radius) : BorderRadius.zero,
        child: CustomPaint(
          size: Size(size, size),
          painter: const _GitSparkPainter(),
        ),
      ),
    );
  }
}

class _GitSparkPainter extends CustomPainter {
  const _GitSparkPainter();

  @override
  void paint(Canvas canvas, Size size) {
    final double w = size.width;
    final double h = size.height;

    // Brand Colors
    const Color cyan = Color(0xFF38BDF8);       // #38BDF8
    const Color cyanLight = Color(0xFFE0F2FE);  // #E0F2FE
    const Color gold = Color(0xFFFBBF24);       // #FBBF24
    const Color goldDark = Color(0xFFF59E0B);   // #F59E0B
    const Color goldLight = Color(0xFFFEF08A);  // #FEF08A
    const Color white = Colors.white;

    final double trunkX = w * 0.35;
    final double bottomY = h * 0.76;
    final double topY = h * 0.24;
    final double branchStartY = h * 0.58;
    final double sparkCx = w * 0.68;
    final double sparkCy = h * 0.32;
    final double trunkWidth = w * 0.082;

    // 1. Branch Bezier Curve
    final Path branchPath = Path()
      ..moveTo(trunkX, branchStartY)
      ..cubicTo(
        trunkX,
        h * 0.44,
        w * 0.52,
        h * 0.40,
        sparkCx,
        sparkCy,
      );

    final Paint branchPaint = Paint()
      ..shader = const LinearGradient(
        begin: Alignment.bottomLeft,
        end: Alignment.topRight,
        colors: [cyan, goldDark],
      ).createShader(Rect.fromPoints(
        Offset(trunkX, branchStartY),
        Offset(sparkCx, sparkCy),
      ))
      ..strokeWidth = trunkWidth
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    canvas.drawPath(branchPath, branchPaint);

    // 2. Main Vertical Trunk
    final Paint trunkPaint = Paint()
      ..color = cyan
      ..strokeWidth = trunkWidth
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    canvas.drawLine(Offset(trunkX, topY), Offset(trunkX, bottomY), trunkPaint);

    // 3. Commit Nodes
    // Bottom Node
    final double rNodeBottom = w * 0.09;
    final Paint nodePaint = Paint()
      ..color = cyan
      ..style = PaintingStyle.fill;
    canvas.drawCircle(Offset(trunkX, bottomY), rNodeBottom, nodePaint);

    final Paint nodeInnerPaint = Paint()
      ..color = cyanLight
      ..style = PaintingStyle.fill;
    canvas.drawCircle(Offset(trunkX, bottomY), rNodeBottom * 0.48, nodeInnerPaint);

    // Top Node
    final double rNodeTop = w * 0.08;
    canvas.drawCircle(Offset(trunkX, topY), rNodeTop, nodePaint);
    canvas.drawCircle(Offset(trunkX, topY), rNodeTop * 0.46, nodeInnerPaint);

    // Helper to draw a 4-point curved sparkle star (Gemini AI symbol)
    void drawSparkle(Offset center, double rOuter, double rPinch, Color fillColor) {
      final Path starPath = Path()
        ..moveTo(center.dx, center.dy - rOuter)
        ..quadraticBezierTo(
          center.dx + rPinch,
          center.dy - rPinch,
          center.dx + rOuter,
          center.dy,
        )
        ..quadraticBezierTo(
          center.dx + rPinch,
          center.dy + rPinch,
          center.dx,
          center.dy + rOuter,
        )
        ..quadraticBezierTo(
          center.dx - rPinch,
          center.dy + rPinch,
          center.dx - rOuter,
          center.dy,
        )
        ..quadraticBezierTo(
          center.dx - rPinch,
          center.dy - rPinch,
          center.dx,
          center.dy - rOuter,
        )
        ..close();

      final Paint starPaint = Paint()
        ..color = fillColor
        ..style = PaintingStyle.fill;
      canvas.drawPath(starPath, starPaint);
    }

    // 4. Primary Gemini Sparkle Star
    final double rSparkOuter = w * 0.20;
    final double rSparkPinch = rSparkOuter * 0.18;
    drawSparkle(Offset(sparkCx, sparkCy), rSparkOuter, rSparkPinch, gold);

    // Inner bright core
    final double rSparkCore = rSparkOuter * 0.52;
    final double rSparkCorePinch = rSparkCore * 0.16;
    drawSparkle(Offset(sparkCx, sparkCy), rSparkCore, rSparkCorePinch, goldLight);

    // Center white dot
    final Paint whitePaint = Paint()
      ..color = white
      ..style = PaintingStyle.fill;
    canvas.drawCircle(Offset(sparkCx, sparkCy), w * 0.025, whitePaint);

    // 5. Secondary Accent Sparkle
    final double smallSparkCx = w * 0.48;
    final double smallSparkCy = h * 0.18;
    final double rSmallOuter = w * 0.065;
    final double rSmallPinch = rSmallOuter * 0.18;
    drawSparkle(Offset(smallSparkCx, smallSparkCy), rSmallOuter, rSmallPinch, goldDark);
    canvas.drawCircle(Offset(smallSparkCx, smallSparkCy), w * 0.012, whitePaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
