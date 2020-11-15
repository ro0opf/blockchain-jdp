package com.ro0opf.blockchain.ui.home

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.ro0opf.blockchain.data.company.Company
import com.ro0opf.blockchain.databinding.ItemCompanyBinding

class CompanyListAdapter : ListAdapter<Company, CompanyListAdapter.ViewHolder>(object :
    DiffUtil.ItemCallback<Company>() {
    override fun areItemsTheSame(oldItem: Company, newItem: Company):
            Boolean = oldItem == newItem

    override fun areContentsTheSame(oldItem: Company, newItem: Company):
            Boolean = oldItem == newItem
}) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding: ItemCompanyBinding =
            ItemCompanyBinding.inflate(LayoutInflater.from(parent.context), parent, false)

        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bindTo(getItem(position))
    }

    inner class ViewHolder(val binding: ItemCompanyBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bindTo(company: Company) {
            binding.company = company
        }
    }
}