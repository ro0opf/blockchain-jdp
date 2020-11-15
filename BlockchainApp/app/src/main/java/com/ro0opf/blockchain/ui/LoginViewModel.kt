package com.ro0opf.blockchain.ui

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.gson.JsonObject
import com.ro0opf.blockchain.common.Current
import com.ro0opf.blockchain.data.Repository
import kotlinx.coroutines.launch

class LoginViewModel : ViewModel() {
    private val repository = Repository()
    private val _isValidLogin = MutableLiveData<Boolean>()
    val isValidLogin: LiveData<Boolean> = _isValidLogin

    fun checkValidLogin(userId: String, userPwd: String) {
        viewModelScope.launch {
            try {
                val rootObject = JsonObject()
                rootObject.addProperty("user_id", userId)
                rootObject.addProperty("user_pwd", userPwd)

                val response = repository.getUser(rootObject)

                if (response.isSuccessful && response.body()?.eth_id != null) {
                    _isValidLogin.value = response.isSuccessful
                    Current.user = response.body()!!
                    Current.user.user_Id = userId
                    Current.user.user_pwd = userPwd
                } else{
                    _isValidLogin.value = false
                }
            } catch (e : Exception){
                Log.e("123123", e.stackTraceToString())
            }
        }
    }
}