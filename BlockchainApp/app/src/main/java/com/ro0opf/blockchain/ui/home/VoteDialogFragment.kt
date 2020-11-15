package com.ro0opf.blockchain.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.DialogFragment
import com.ro0opf.blockchain.R
import com.ro0opf.blockchain.databinding.DialogVoteBinding

class VoteDialogFragment(homeViewModel: HomeViewModel) : DialogFragment(),
    AdapterView.OnItemSelectedListener {
    private lateinit var binding: DialogVoteBinding
    private val homeViewModel = homeViewModel
    private val companyNameList = homeViewModel.companyList.value!!.map { company -> company.company }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        getDialog()!!.getWindow()?.setBackgroundDrawableResource(R.drawable.round_corner)
        binding = DataBindingUtil.inflate(inflater, R.layout.dialog_vote, container, false)

        setOnClickListener()
        setSpinner()

        return binding.root
    }

    private fun setSpinner() {
        val ad = ArrayAdapter(requireContext(), android.R.layout.simple_spinner_item, companyNameList)

        ad.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        binding.spnVote.onItemSelectedListener = this
        binding.spnVote.adapter = ad
    }

    private fun setOnClickListener() {
        binding.btnVote.setOnClickListener {
            homeViewModel.test()
        }
    }

    override fun onStart() {
        super.onStart()
        val width = (resources.displayMetrics.widthPixels * 0.85).toInt()
        val height = (resources.displayMetrics.heightPixels * 0.40).toInt()
        dialog!!.window?.setLayout(width, ViewGroup.LayoutParams.WRAP_CONTENT)
    }

    override fun onItemSelected(parent: AdapterView<*>?, view: View, position: Int, id: Long) {
        Toast.makeText(requireContext(), companyNameList[position], Toast.LENGTH_LONG).show()
    }

    override fun onNothingSelected(parent: AdapterView<*>?) {}
}
