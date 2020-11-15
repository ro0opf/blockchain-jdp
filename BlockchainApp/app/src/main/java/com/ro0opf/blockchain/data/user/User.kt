package com.ro0opf.blockchain.data.user

import android.os.Parcelable
import com.ro0opf.blockchain.data.company.Company
import kotlinx.android.parcel.Parcelize

@Parcelize
data class User(
    var user_Id: String,
    var user_pwd: String,
    var user_name: String,
    var user_img: String,
    var balance: Double,
    val eth_id: String,
    val voted_list: List<Company>
) : Parcelable {
}

