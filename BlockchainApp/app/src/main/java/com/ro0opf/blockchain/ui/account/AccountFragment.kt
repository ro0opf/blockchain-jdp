package com.ro0opf.blockchain.ui.account

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.ro0opf.blockchain.R
import com.ro0opf.blockchain.common.Current
import com.ro0opf.blockchain.databinding.FragmentAccountBinding
import com.ro0opf.blockchain.ui.LoginActivity
import com.ro0opf.blockchain.ui.home.HomeViewModel

class AccountFragment : Fragment() {

    private lateinit var homeViewModel: HomeViewModel
    private lateinit var binding : FragmentAccountBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        homeViewModel =
            ViewModelProvider(this).get(HomeViewModel::class.java)
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_account, container, false)

        setObserve()
        setOnClickListener()

        homeViewModel.getBalance()

        return binding.root
    }

    private fun setObserve() {
        binding.lifecycleOwner = this
        binding.homeViewModel = homeViewModel
        binding.user = Current.user
    }

    private fun setOnClickListener() {
        binding.btnLogout.setOnClickListener {
            startActivity(Intent(requireContext(), LoginActivity::class.java))
            activity?.finish()
        }
    }
}