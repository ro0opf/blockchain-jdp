package com.ro0opf.blockchain.data

import com.google.gson.JsonObject
import com.ro0opf.blockchain.common.RetrofitService
import com.ro0opf.blockchain.data.test.TestAPI
import com.ro0opf.blockchain.data.test.UserAPI

class Repository{
    private val testClient = RetrofitService.createService(TestAPI::class.java)
    private val userClient = RetrofitService.createService(UserAPI::class.java)

    suspend fun getTest(userId : Int) = testClient.getTest(userId)

    suspend fun getUser(body : JsonObject) = userClient.getUser(body)
    suspend fun getBalance(userId : String) = userClient.getBalance(userId)
}