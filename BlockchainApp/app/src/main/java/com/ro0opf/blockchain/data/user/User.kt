package com.ro0opf.blockchain.data.test

import android.os.Parcelable
import com.ro0opf.blockchain.data.voteinfo.VoteInfo
import kotlinx.android.parcel.Parcelize

@Parcelize
data class User(
    var user_Id: String,
    var user_pwd: String,
    val eth_id: String,
    val voted_list: List<VoteInfo>
) : Parcelable {
}

