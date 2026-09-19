package com.smartoverlay.controller

import android.app.Application

class SmartOverlayApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        instance = this
    }

    companion object {
        lateinit var instance: SmartOverlayApplication
            private set
    }
}
