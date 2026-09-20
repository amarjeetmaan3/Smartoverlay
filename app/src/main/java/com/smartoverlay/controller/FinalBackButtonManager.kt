package com.smartoverlay.controller

import android.app.Activity

class FinalBackButtonManager(private val activity: Activity) {
    fun close() = activity.finish()
    fun closeAll() = activity.finishAffinity()
}
