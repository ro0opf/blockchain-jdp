package com.ro0opf.blockchain.ui

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.ro0opf.blockchain.R
import com.ro0opf.blockchain.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private lateinit var loginViewModel: LoginViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_login)
        loginViewModel = ViewModelProvider(this).get(LoginViewModel::class.java)

        setOnClickListener()
        setObserve()
    }

    private fun setObserve() {
        loginViewModel.isValidLogin.observe(this, {
            if (it) {
                startActivity(Intent(this, MainActivity::class.java))
                finish()
            }
        })
    }

    private fun setOnClickListener() {
        binding.btnLogin.setOnClickListener {
            val userId = binding.edtEmail.text.toString()
            val userPwd = binding.edtPassword.text.toString()
            loginViewModel.checkValidLogin(userId, userPwd)
        }
    }
}