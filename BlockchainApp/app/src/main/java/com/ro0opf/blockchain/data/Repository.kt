package com.ro0opf.blockchain.data

import com.ro0opf.blockchain.common.RetrofitService
import com.ro0opf.blockchain.data.test.TestAPI

class Repository{
    private val client = RetrofitService.createService(TestAPI::class.java)

    suspend fun getTest(userId : Int) = client.getTest(userId)
}