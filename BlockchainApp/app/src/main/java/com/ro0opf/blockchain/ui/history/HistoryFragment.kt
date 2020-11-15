package com.ro0opf.blockchain.ui.dashboard

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.ro0opf.blockchain.R
import com.ro0opf.blockchain.data.history.History
import com.ro0opf.blockchain.databinding.FragmentHistoryBinding
import com.ro0opf.blockchain.ui.history.HistoryListAdapter

class HistoryFragment : Fragment() {

    private lateinit var historyViewModel: HistoryViewModel
    private lateinit var binding: FragmentHistoryBinding
    private val historyListAdapter = HistoryListAdapter()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        historyViewModel =
            ViewModelProvider(this).get(HistoryViewModel::class.java)
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_history, container, false)

        setHistoryRcv(binding.rcvHistory)
        addDummy()

        return binding.root
    }

    private fun addDummy() {
        val historyList = arrayListOf<History>()
        historyList.add(History(false, "2019-02-16", "awdawdawdawd"))
        historyList.add(History(false, "2019-02-16", "awdawdawdawd"))
        historyList.add(History(true, "2019-02-16", "awdawdawdawd"))
        historyList.add(History(true, "2019-02-16", "awdawdawdawd"))
        historyList.add(History(true, "2019-02-16", "awdawdawdawd"))
        historyList.add(History(false, "2019-02-16", "awdawdawdawd"))

        historyListAdapter.submitList(historyList)
    }


    private fun setHistoryRcv(rcv: RecyclerView) {
        rcv.adapter = historyListAdapter
        rcv.layoutManager =
            LinearLayoutManager(requireContext(), LinearLayoutManager.VERTICAL, false)
    }
}