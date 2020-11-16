package com.ro0opf.blockchain.ui.notifications

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.prolificinteractive.materialcalendarview.CalendarDay
import com.ro0opf.blockchain.common.Loog
import com.ro0opf.blockchain.data.Repository
import com.ro0opf.blockchain.data.schedule.Schedule
import kotlinx.coroutines.launch

class CalendarViewModel : ViewModel() {
    private val repository = Repository()

    private val _scheduleList = MutableLiveData<List<Schedule>>()
    val scheduleList: LiveData<List<Schedule>> = _scheduleList

    fun fetchScheduleList(date : CalendarDay){
        viewModelScope.launch {
            try{

            } catch (e : Exception){
                Loog.e("CalendarViewModel.fetchScheduleList << ${e.stackTraceToString()}")
            }
        }
    }
}