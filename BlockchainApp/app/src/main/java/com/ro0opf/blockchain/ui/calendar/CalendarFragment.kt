package com.ro0opf.blockchain.ui.notifications

import android.graphics.Color
import android.os.Bundle
import android.util.Log
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
import com.ro0opf.blockchain.data.schedule.Schedule
import com.ro0opf.blockchain.databinding.FragmentCalendarBinding
import com.ro0opf.blockchain.ui.calendar.ScheduleListAdapter
import com.ro0opf.blockchain.util.Decorator
import java.util.*

class CalendarFragment : Fragment(), OnDateSelectedListener, OnMonthChangedListener {

    private lateinit var calendarViewModel: CalendarViewModel
    private lateinit var binding: FragmentCalendarBinding
    private val decorators: ArrayList<Decorator> = ArrayList<Decorator>()
    private val schedules: ArrayList<Schedule> = ArrayList<Schedule>()
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

        return binding.root
    }

    private fun setCalendarView(calendarView: MaterialCalendarView) {
        addDummyData()
        calendarView.addDecorators(decorators)
        calendarView.setOnDateChangedListener(this)
        calendarView.setOnMonthChangedListener(this)
    }

    private fun setRecyclerView(rcv: RecyclerView) {
        rcv.adapter = scheduleAdapter
        rcv.layoutManager = LinearLayoutManager(requireContext())
    }

    private fun addDummyData() {
        schedules.add(Schedule(2020, 11, 1, "혁진아", false, Color.RED))
        schedules.add(Schedule(2020, 11, 5, "힘내라", false, Color.RED))
        schedules.add(Schedule(2020, 11, 5, "@@@@@@@", false, Color.BLUE))
        schedules.add(Schedule(2020, 11, 5, "!!!!!!!!", false, Color.BLACK))
        schedules.add(Schedule(2020, 11, 12, "#########", false, Color.RED))
        schedules.add(Schedule(2020, 11, 12, "$$$$$$$$", false, Color.BLACK))
        schedules.add(Schedule(2020, 11, 13, "%%%%%%%%%%%%%", false, Color.GREEN))
        schedules.add(Schedule(2020, 11, 15, "&&&&&&&&&&&&&", false, Color.BLUE))
        schedules.add(Schedule(2020, 11, 15, "(((((((((((testset)))))))))))", false, Color.RED))
        for (schedule in schedules) {
            val calendarDay =
                CalendarDay.from(schedule.year, schedule.month, schedule.day)
            if (calendarDayArrayListHashMap.containsKey(calendarDay)) {
                calendarDayArrayListHashMap.get(calendarDay)!!.add(schedule)
            } else {
                calendarDayArrayListHashMap.put(calendarDay, arrayListOf(schedule))
            }
        }
        for ((key, value) in calendarDayArrayListHashMap.entries) {
            val integerArrayList = ArrayList<Int>()
            for (schedule in value) {
                integerArrayList.add(schedule.color)
            }
            decorators.add(Decorator(key, integerArrayList))
        }
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
            calendarDayArrayListHashMap.get(date)?.let { monthlySchedules.addAll(it) }
        }
        Log.e("123123", monthlySchedules.toString())
        scheduleAdapter.submitList(monthlySchedules)
        scheduleAdapter.notifyDataSetChanged()
    }

    override fun onMonthChanged(widget: MaterialCalendarView?, date: CalendarDay?) {
        // TODO :: fetch Month Data 현재 달 -1, +1 schedule data를 db에서 가져와야함
    }
}