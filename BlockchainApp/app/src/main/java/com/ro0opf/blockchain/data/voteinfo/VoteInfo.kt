package com.ro0opf.blockchain.data.voteinfo

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class VoteInfo(
    val voted_company: String,
    val voted_amt: Int,
    val voted_dtm: String,
    val event_id: String
) : Parcelable {

}

