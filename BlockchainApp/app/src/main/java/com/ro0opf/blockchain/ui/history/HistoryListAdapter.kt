package com.ro0opf.blockchain.ui.history

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.ro0opf.blockchain.data.history.History
import com.ro0opf.blockchain.databinding.ItemHistoryBinding

class HistoryListAdapter : ListAdapter<History, HistoryListAdapter.ViewHolder>(object :
    DiffUtil.ItemCallback<History>() {
    override fun areItemsTheSame(oldItem: History, newItem: History):
            Boolean = oldItem == newItem

    override fun areContentsTheSame(oldItem: History, newItem: History):
            Boolean = oldItem == newItem
}) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding: ItemHistoryBinding =
            ItemHistoryBinding.inflate(LayoutInflater.from(parent.context), parent, false)

        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bindTo(getItem(position))
    }

    inner class ViewHolder(val binding: ItemHistoryBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bindTo(history: History) {
            binding.history = history
        }
    }
}