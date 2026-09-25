package com.smartoverlay.controller

import android.content.Context
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient

class ControllerWebView(
    context: Context
) : WebView(context) {

    init {

        settings.apply {

            javaScriptEnabled = true

            domStorageEnabled = true

            databaseEnabled = true

            allowFileAccess = true

            allowContentAccess = true

            cacheMode = WebSettings.LOAD_DEFAULT

            mediaPlaybackRequiresUserGesture = false

            setSupportZoom(false)

            builtInZoomControls = false

            displayZoomControls = false
        }

        webViewClient = WebViewClient()

        addJavascriptInterface(
            WebAppBridge(context),
            "SmartOverlayAndroid"
        )
    }

    fun loadController() {

        /*
         * Phase 12C APK will package the final
         * SmartOverlay controller web files here.
         *
         * Expected asset:
         * app/src/main/assets/controller.html
         */

        loadUrl(
            "file:///android_asset/smartoverlay/controller.html"
        )
    }
}
