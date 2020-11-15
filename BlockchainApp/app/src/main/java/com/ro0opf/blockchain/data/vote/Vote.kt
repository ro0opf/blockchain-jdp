package com.ro0opf.blockchain.data.vote

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class Vote(
    val event_id: String,
    val event_nm: String,
    val st_dt: String,
    val end_dt: String,
    val vote_status : String
) : Parcelable {

}

