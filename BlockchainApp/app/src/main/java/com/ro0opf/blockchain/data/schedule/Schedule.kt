package com.ro0opf.blockchain.data.schedule

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class Schedule(
    var year: Int,
    var month: Int,
    var day: Int,
    var memo: String,
    var isAlarm: Boolean,
    var color: Int
) : Parcelable{

}