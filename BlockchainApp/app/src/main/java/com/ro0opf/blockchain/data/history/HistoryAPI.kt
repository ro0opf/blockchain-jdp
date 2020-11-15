package com.ro0opf.blockchain.data.history

import com.google.gson.JsonObject
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface HistoryAPI {
    @GET("/voting")
    suspend fun getVoting(@Query("st_dt") stDt : String, @Query("end_dt") endDt : String) : Response<JsonObject>

    @GET("/voting/detail")
    suspend fun getCompanyList(@Query("event_id") eventId : String) : Response<JsonObject>
}