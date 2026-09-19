package com.smartoverlay.controller

import android.content.Context
import android.webkit.JavascriptInterface

class WebAppBridge(
    private val context: Context
) {

    @JavascriptInterface
    fun getPlatform(): String {
        return "android"
    }

    @JavascriptInterface
    fun getAppName(): String {
        return "SmartOverlay Controller"
    }

    @JavascriptInterface
    fun getAppVersion(): String {
        return VersionManager.VERSION_NAME
    }

    @JavascriptInterface
    fun getVersionCode(): Int {
        return VersionManager.VERSION_CODE
    }
}
