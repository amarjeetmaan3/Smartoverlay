package com.smartoverlay.controller

import android.app.Activity

class AppExitManager(
    private val activity: Activity
) {

    fun exit() {
        activity.finishAffinity()
    }

    fun closeActivity() {
        activity.finish()
    }
}
