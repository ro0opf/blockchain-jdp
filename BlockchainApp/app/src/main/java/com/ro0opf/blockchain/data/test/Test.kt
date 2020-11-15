package com.ro0opf.blockchain.data.test

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class Test(
    var userId: Int,
    var id: Int,
    val title: String,
    val body: String
) : Parcelable {

}

