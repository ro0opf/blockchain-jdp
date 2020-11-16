package com.ro0opf.blockchain.ui.notifications

import android.graphics.Color
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.prolificinteractive.materialcalendarview.CalendarDay
import com.prolificinteractive.materialcalendarview.MaterialCalendarView
import com.prolificinteractive.materialcalendarview.OnDateSelectedListener
import com.prolificinteractive.materialcalendarview.OnMonthChangedListener
import com.ro0opf.blockchain.R
import com.ro0opf.blockchain.common.Loog
import com.ro0opf.blockchain.data.schedule.Schedule
import com.ro0opf.blockchain.databinding.FragmentCalendarBinding
import com.ro0opf.blockchain.ui.calendar.ScheduleListAdapter
import com.ro0opf.blockchain.util.Decorator
import java.util.*

class CalendarFragment : Fragment(), OnDateSelectedListener, OnMonthChangedListener {

    private lateinit var calendarViewModel: CalendarViewModel
    private lateinit var binding: FragmentCalendarBinding
    private val monthlySchedules: ArrayList<Schedule> = ArrayList<Schedule>()
    private val scheduleAdapter: ScheduleListAdapter = ScheduleListAdapter()
    private val calendarDayArrayListHashMap: HashMap<CalendarDay, ArrayList<Schedule>> =
        HashMap<CalendarDay, ArrayList<Schedule>>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        calendarViewModel =
            ViewModelProvider(this).get(CalendarViewModel::class.java)
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_calendar, container, false)

        setCalendarView(binding.calendarView)
        setRecyclerView(binding.rcvSchedule)
        setObserve()
        addDummy()

        return binding.root
    }

    private fun setObserve() {
        binding.lifecycleOwner = this

        calendarViewModel.scheduleList.observe(viewLifecycleOwner, {
            setCalendarDayArrayListHashMap(it)
        })
    }

    private fun setCalendarView(calendarView: MaterialCalendarView) {
        calendarView.setOnDateChangedListener(this)
        calendarView.setOnMonthChangedListener(this)
    }

    private fun setRecyclerView(rcv: RecyclerView) {
        rcv.adapter = scheduleAdapter
        rcv.layoutManager = LinearLayoutManager(requireContext())
    }

    private fun addDummy(){
        val schedules = ArrayList<Schedule>()
        val decorators: ArrayList<Decorator> = ArrayList<Decorator>()

        schedules.add(Schedule(2020, 11, 1, "$$$$", false, Color.BLUE))
        schedules.add(Schedule(2020, 11, 12, "$$$$", false, Color.BLUE))
        schedules.add(Schedule(2020, 11, 14, "$$$$", false, Color.BLACK))
        schedules.add(Schedule(2020, 11, 5, "$$$$", false, Color.BLACK))
        schedules.add(Schedule(2020, 11, 5, "$$$$", false, Color.GREEN))
        schedules.add(Schedule(2020, 11, 5, "$$$$", false, Color.BLUE))
        schedules.add(Schedule(2020, 11, 3, "$$$$", false, Color.BLACK))
        schedules.add(Schedule(2020, 11, 2, "$$$$", false, Color.GREEN))
        schedules.add(Schedule(2020, 11, 2, "$$$$", false, Color.BLACK))

        for (schedule in schedules) {
            val calendarDay =
                CalendarDay.from(schedule.year, schedule.month, schedule.day)
            if (calendarDayArrayListHashMap.containsKey(calendarDay)) {
                calendarDayArrayListHashMap[calendarDay]!!.add(schedule)
            } else {
                calendarDayArrayListHashMap[calendarDay] = arrayListOf(schedule)
            }
        }
        for ((key, value) in calendarDayArrayListHashMap.entries) {
            val integerArrayList = ArrayList<Int>()
            for (schedule in value) {
                integerArrayList.add(schedule.color)
            }
            decorators.add(Decorator(key, integerArrayList))
        }

        binding.calendarView.addDecorators(decorators)
    }

    private fun setCalendarDayArrayListHashMap(scheduleList : List<Schedule>) {
        val decorators: ArrayList<Decorator> = ArrayList<Decorator>()

        for (schedule in scheduleList) {
            val calendarDay =
                CalendarDay.from(schedule.year, schedule.month, schedule.day)
            if (calendarDayArrayListHashMap.containsKey(calendarDay)) {
                calendarDayArrayListHashMap[calendarDay]!!.add(schedule)
            } else {
                calendarDayArrayListHashMap[calendarDay] = arrayListOf(schedule)
            }
        }
        for ((key, value) in calendarDayArrayListHashMap.entries) {
            val integerArrayList = ArrayList<Int>()
            for (schedule in value) {
                integerArrayList.add(schedule.color)
            }
            decorators.add(Decorator(key, integerArrayList))
        }

        binding.calendarView.addDecorators(decorators)
    }

    override fun onDateSelected(
        widget: MaterialCalendarView,
        date: CalendarDay,
        selected: Boolean
    ) {
        binding.tvSelectedDate.text =
            if (selected) String.format("%d월 %d일", date.month, date.day) else ""
        monthlySchedules.clear()
        if (calendarDayArrayListHashMap.containsKey(date)) {
            calendarDayArrayListHashMap[date]?.let { monthlySchedules.addAll(it) }
        }
        Loog.e("CalendarFragment.onDateSelected << $monthlySchedules.toString()")
        scheduleAdapter.submitList(monthlySchedules)
        scheduleAdapter.notifyDataSetChanged()
    }

    override fun onMonthChanged(widget: MaterialCalendarView?, date: CalendarDay?) {
        Loog.e("CalendarFragment.onMonthChanged << ${date.toString()}")
        calendarViewModel.fetchScheduleList(date!!)
    }
}