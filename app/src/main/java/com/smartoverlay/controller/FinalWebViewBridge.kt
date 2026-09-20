package com.smartoverlay.controller

import android.content.Context
import android.webkit.JavascriptInterface

class FinalWebViewBridge(private val context: Context) {
    @JavascriptInterface
    fun getPlatform(): String = "android"

    @JavascriptInterface
    fun getAppName(): String = "SmartOverlay"

    @JavascriptInterface
    fun isReady(): Boolean = true
}
