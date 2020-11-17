package com.ro0opf.blockchain.data.vote

import com.google.gson.JsonObject
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface VoteAPI {
    @GET("/voting")
    suspend fun getVoting(
        @Query("st_dt") stDt: String,
        @Query("end_dt") endDt: String
    ): Response<JsonObject>

    @GET("/voting/detail")
    suspend fun getCompanyList(@Query("event_id") eventId: String): Response<JsonObject>

    @GET("/vote")
    suspend fun vote(
        @Query("company") company: String,
        @Query("id") id: String,
        @Query("event_id") event_id: String,
        @Query("vote_amt") voteAmt: Double
    ): Response<JsonObject>
}