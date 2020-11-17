package com.ro0opf.blockchain.util

import android.graphics.Canvas
import android.graphics.Paint
import android.text.style.LineBackgroundSpan

class CustomDotSpan(private val radius: Float, private val colors: List<Int>) : LineBackgroundSpan {
    override fun drawBackground(
        canvas: Canvas,
        paint: Paint,
        left: Int,
        right: Int,
        top: Int,
        baseline: Int,
        bottom: Int,
        charSequence: CharSequence,
        start: Int,
        end: Int,
        lineNum: Int
    ) {
        val total = Math.min(colors.size, 5)
        var leftMost = (total - 1) * -10
        for (i in 0 until total) {
            val oldColor = paint.color
            if (colors[i] != 0) {
                paint.color = colors[i]
            }
            canvas.drawCircle(
                (left + right) / 2 - leftMost.toFloat(),
                bottom + radius,
                radius,
                paint
            )
            paint.color = oldColor
            leftMost += 20
        }
    }
}