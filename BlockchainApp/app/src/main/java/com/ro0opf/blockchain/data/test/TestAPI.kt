package com.ro0opf.blockchain.data.test

import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path

interface TestAPI {
    @GET("/posts/{userId}")
    suspend fun getTest(@Path("userId") userId : Int) : Response<User>
}