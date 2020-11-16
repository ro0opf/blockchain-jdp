package com.ro0opf.blockchain.data.company

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class Company(
    val company: String,
    val user_img : String,
    val voted_amt: Double,
    val subject: String,
) : Parcelable {

}

