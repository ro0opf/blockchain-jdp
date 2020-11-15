package com.ro0opf.blockchain.ui.home

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
import com.ro0opf.blockchain.databinding.FragmentHomeBinding

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

        setVariable()
        setOnClickListner()
        setVoteInfoRcv(binding.rcvVoteinfo)
        setObserve()

        homeViewModel.getBalance()

        return binding.root
    }

    private fun setVariable() {
        binding.lifecycleOwner = this
        binding.homeViewModel = homeViewModel
    }

    private fun setObserve() {
        homeViewModel.voteInfos.observe(viewLifecycleOwner, {
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