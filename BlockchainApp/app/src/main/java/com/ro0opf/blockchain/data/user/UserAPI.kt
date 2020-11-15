package com.ro0opf.blockchain.data.user

import com.google.gson.JsonObject
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface UserAPI {
    @POST("/login")
    suspend fun getUser(@Body body : JsonObject) : Response<User>
    @GET("/balance")
    suspend fun getBalance(@Query("id") userId : String) : Response<JsonObject>
}