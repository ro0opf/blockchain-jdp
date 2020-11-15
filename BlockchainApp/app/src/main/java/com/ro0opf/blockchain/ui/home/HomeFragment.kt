package com.ro0opf.blockchain.screen.ui.home

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
import com.ro0opf.blockchain.R
import com.ro0opf.blockchain.databinding.FragmentHomeBinding
import com.ro0opf.blockchain.ui.home.VoteDialogFragment
import com.ro0opf.blockchain.ui.home.VoteInfoListAdapter

class HomeFragment : Fragment() {
    private lateinit var homeViewModel: HomeViewModel
    private lateinit var binding: FragmentHomeBinding
    private val voteInfoListAdapter = VoteInfoListAdapter()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        homeViewModel = ViewModelProvider(this).get(HomeViewModel::class.java)
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_home, container, false)

        setOnClickListner()
        setVoteInfoRcv(binding.rcvVoteinfo)
        setObserve()
        return binding.root
    }

    private fun setObserve() {
        homeViewModel.voteInfos.observe(viewLifecycleOwner, {
            Log.e("123123","ttttt")
            voteInfoListAdapter.submitList(it)
        })
    }

    private fun setVoteInfoRcv(rcv: RecyclerView) {
        rcv.adapter = voteInfoListAdapter
        rcv.layoutManager =
            LinearLayoutManager(requireContext(), LinearLayoutManager.HORIZONTAL, false)
    }

    private fun setOnClickListner() {
        binding.btnLogin.setOnClickListener {
            val dialog = VoteDialogFragment(homeViewModel)
            dialog.show(requireActivity().supportFragmentManager, "awdawd")
        }
    }
}