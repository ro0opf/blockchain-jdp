package com.ro0opf.blockchain.screen.ui.home

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ro0opf.blockchain.data.Repository
import com.ro0opf.blockchain.data.voteinfo.VoteInfo
import kotlinx.coroutines.launch

class HomeViewModel : ViewModel() {
    private val repository = Repository()

    fun test() {
        viewModelScope.launch {
            val response = repository.getTest(42)

            if (response.isSuccessful) {
                Log.e("123123", response.toString())
            }
        }
    }

    private val _voteInfos = MutableLiveData<List<VoteInfo>>().apply {
        val dummy = ArrayList<VoteInfo>()
        dummy.add(VoteInfo(1,2,"awd","321312"))
        dummy.add(VoteInfo(1,2,"awd","321312"))
        dummy.add(VoteInfo(1,2,"awd","321312"))
        dummy.add(VoteInfo(1,2,"awd","321312"))
        value = dummy
    }
    val voteInfos: LiveData<List<VoteInfo>> = _voteInfos
}