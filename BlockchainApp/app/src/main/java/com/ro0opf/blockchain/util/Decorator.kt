package com.ro0opf.blockchain.util

import com.prolificinteractive.materialcalendarview.CalendarDay
import com.prolificinteractive.materialcalendarview.DayViewDecorator
import com.prolificinteractive.materialcalendarview.DayViewFacade

class Decorator : DayViewDecorator {
    private val calendarDay: CalendarDay
    private val colors: List<Int>

    constructor(year: Int, month: Int, day: Int, colors: List<Int>) {
        calendarDay = CalendarDay.from(year, month, day)
        this.colors = colors
    }

    constructor(calendarDay: CalendarDay, colors: List<Int>) {
        this.calendarDay = calendarDay
        this.colors = colors
    }

    override fun shouldDecorate(day: CalendarDay): Boolean {
        return calendarDay == day
    }

    override fun decorate(view: DayViewFacade) {
        view.addSpan(CustomDotSpan(7F, colors))
    }
}