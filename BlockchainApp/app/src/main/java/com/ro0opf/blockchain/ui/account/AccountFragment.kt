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
import com.ro0opf.blockchain.databinding.FragmentAccountBinding
import com.ro0opf.blockchain.ui.LoginActivity

class AccountFragment : Fragment() {

    private lateinit var accountViewModel: AccountViewModel
    private lateinit var binding : FragmentAccountBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        accountViewModel =
            ViewModelProvider(this).get(AccountViewModel::class.java)
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_account, container, false)
//        val textView: TextView = root.findViewById(R.id.text_notifications)
//        accountViewModel.text.observe(viewLifecycleOwner, Observer {
//            textView.text = it
//        })

        setOnClickListener()
        return binding.root
    }

    private fun setOnClickListener() {
        binding.btnLogout.setOnClickListener {
            startActivity(Intent(requireContext(), LoginActivity::class.java))
            c
        }
    }
}