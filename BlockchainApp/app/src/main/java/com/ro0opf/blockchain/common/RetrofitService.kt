package com.ro0opf.blockchain.common

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


object RetrofitService {
    fun <T> createService(serviceClass: Class<T>): T {
        return retrofit.create(serviceClass)
    }

    private val retrofit =
        Retrofit.Builder()
            .baseUrl("http://ec2-3-34-159-82.ap-northeast-2.compute.amazonaws.com:9999/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
}