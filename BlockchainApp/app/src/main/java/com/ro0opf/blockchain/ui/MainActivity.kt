package com.ro0opf.blockchain.ui

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.ro0opf.blockchain.R
import com.ro0opf.blockchain.databinding.ActivityMainBinding
import com.ro0opf.blockchain.ui.account.AccountFragment
import com.ro0opf.blockchain.ui.dashboard.HistoryFragment
import com.ro0opf.blockchain.ui.home.HomeFragment
import com.ro0opf.blockchain.ui.notifications.CalendarFragment

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private val historyFragment = HistoryFragment()
    private val homeFragment = HomeFragment()
    private val calendarFragment = CalendarFragment()
    private val accountFragment = AccountFragment()
    private val fragmentManager = supportFragmentManager
    private var activeFragment: Fragment = homeFragment

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)

        setBnvFragment()
    }

    private fun setBnvFragment() {
        fragmentManager.beginTransaction().apply {
            add(R.id.container, historyFragment, getString(R.string.title_history)).hide(
                historyFragment
            )
            add(R.id.container, calendarFragment, getString(R.string.title_calendar)).hide(
                calendarFragment
            )
            add(R.id.container, accountFragment, getString(R.string.title_account)).hide(
                accountFragment
            )
            add(R.id.container, homeFragment, getString(R.string.title_home))
        }.commit()

        binding.bottomNavigationView.setOnNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.navigation_home -> {
                    commitFragment(homeFragment)
                    true
                }
                R.id.navigation_history -> {
                    commitFragment(historyFragment)
                    true
                }
                R.id.navigation_calendar -> {
                    commitFragment(calendarFragment)
                    true
                }
                R.id.navigation_account -> {
                    commitFragment(accountFragment)
                    true
                }
                else -> false
            }
        }
    }

    private fun commitFragment(fragment: Fragment) {
        fragmentManager.beginTransaction().hide(activeFragment).show(fragment).commit()
        activeFragment = fragment
        fragment.onResume()
    }
}