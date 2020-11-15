package com.ro0opf.blockchain.ui.calendar

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.ro0opf.blockchain.data.schedule.Schedule
import com.ro0opf.blockchain.databinding.ItemScheduleBinding

class ScheduleListAdapter : ListAdapter<Schedule, ScheduleListAdapter.ViewHolder>(object : DiffUtil.ItemCallback<Schedule>() {
    override fun areItemsTheSame(oldItem: Schedule, newItem: Schedule):
            Boolean = oldItem == newItem

    override fun areContentsTheSame(oldItem: Schedule, newItem: Schedule):
            Boolean = oldItem == newItem
}) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding: ItemScheduleBinding =
            ItemScheduleBinding.inflate(LayoutInflater.from(parent.context), parent, false)

        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bindTo(getItem(position))
    }

    inner class ViewHolder(val binding: ItemScheduleBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bindTo(schedule: Schedule) {
            binding.schedule = schedule
        }
    }
}