package com.ro0opf.blockchain.ui.home

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.gson.Gson
import com.ro0opf.blockchain.common.Current
import com.ro0opf.blockchain.data.Repository
import com.ro0opf.blockchain.data.company.Company
import com.ro0opf.blockchain.data.vote.Vote
import kotlinx.coroutines.launch

class HomeViewModel : ViewModel() {
    private val repository = Repository()

    private val _balance = MutableLiveData(0.0)
    val balance: LiveData<Double> = _balance

    private val _voteName = MutableLiveData<String>()
    val voteName: LiveData<String> = _voteName

    private val _companyList = MutableLiveData<List<Company>>()
    val companyList: LiveData<List<Company>> = _companyList

    fun test() {
        viewModelScope.launch {
            val response = repository.getTest(42)

            if (response.isSuccessful) {
                Log.e("123123", response.toString())
            }
        }
    }

    fun getVoting() {
        viewModelScope.launch {
            try {
                val response = repository.getVoting("20201114", "20201115")

                if (response.isSuccessful) {
                    val responseBody = response.body()!!

                    val vote = Gson().fromJson(responseBody["voting_detail"], Array<Vote>::class.java)[0]
                    _voteName.value = vote.event_nm
                    getCompanyList(vote.event_id)
                }
            } catch (e: Exception) {
                Log.e("123123", e.stackTraceToString())
            }
        }
    }

    fun getCompanyList(eventId: String) {
        viewModelScope.launch {
            try {
                val response = repository.getCompanyList(eventId)

                if (response.isSuccessful) {
                    val responseBody = response.body()!!

                    val companyList = Gson().fromJson(responseBody["voting_detail"], Array<Company>::class.java).toList()
                    _companyList.value = companyList
                    Log.e("123123", companyList.toString())
                }

            } catch (e: Exception) {
                Log.e("123123", e.stackTraceToString())
            }
        }
    }

    fun getBalance() {
        viewModelScope.launch {
            try {
                val response = repository.getBalance(Current.user.user_Id)

                Log.e("123123", response.toString())
                if (response.isSuccessful) {
                    _balance.value = response.body()!!["balance"].asDouble
                    Current.user.balance = response.body()!!["balance"].asDouble
                }
            } catch (e: Exception) {
                Log.e("123123", e.stackTraceToString())
            }
        }
    }

}