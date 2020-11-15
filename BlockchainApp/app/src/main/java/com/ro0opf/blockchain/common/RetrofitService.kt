package com.ro0opf.blockchain.common

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


object RetrofitService {
    fun <T> createService(serviceClass: Class<T>): T {
        return retrofit.create(serviceClass)
    }

    private val retrofit =
        Retrofit.Builder()
            .baseUrl("http://116.123.86.186:9999/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
}