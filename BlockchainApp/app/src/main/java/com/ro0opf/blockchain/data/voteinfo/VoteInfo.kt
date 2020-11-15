package com.ro0opf.blockchain.data.voteinfo

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class VoteInfo(
    var userId: Int,
    var id: Int,
    val title: String,
    val body: String
) : Parcelable {

}

