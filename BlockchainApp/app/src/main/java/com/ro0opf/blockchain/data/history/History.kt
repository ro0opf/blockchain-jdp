package com.ro0opf.blockchain.data.history

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class History(
    val isIncome: Boolean,
    val date: String,
    val content: String
) : Parcelable {

}

