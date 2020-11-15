package com.ro0opf.blockchain.ui.home

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.ro0opf.blockchain.data.voteinfo.VoteInfo
import com.ro0opf.blockchain.databinding.ItemVoteinfoBinding

class VoteInfoListAdapter : ListAdapter<VoteInfo, VoteInfoListAdapter.ViewHolder>(object :
    DiffUtil.ItemCallback<VoteInfo>() {
    override fun areItemsTheSame(oldItem: VoteInfo, newItem: VoteInfo):
            Boolean = oldItem == newItem

    override fun areContentsTheSame(oldItem: VoteInfo, newItem: VoteInfo):
            Boolean = oldItem == newItem
}) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding: ItemVoteinfoBinding =
            ItemVoteinfoBinding.inflate(LayoutInflater.from(parent.context), parent, false)

        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bindTo(getItem(position))
    }

    inner class ViewHolder(binding: ItemVoteinfoBinding) :
        RecyclerView.ViewHolder(binding.getRoot()) {
        val binding: ItemVoteinfoBinding = binding

        fun bindTo(memo: VoteInfo) {
            // TODO :: BIND MEMO
//            binding.tvContent.text = memo.content
        }
    }
}