package com.smartoverlay.controller

import android.content.Context
import android.net.Uri
import android.util.Log
import android.webkit.ConsoleMessage
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.webkit.WebViewAssetLoader

class ControllerWebView(
    context: Context
) : WebView(context) {

    private val assetLoader = WebViewAssetLoader.Builder()
        .addPathHandler(
            "/assets/",
            WebViewAssetLoader.AssetsPathHandler(context)
        )
        .build()

    init {
        WebView.setWebContentsDebuggingEnabled(true)

        settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = false
            allowContentAccess = false
            cacheMode = WebSettings.LOAD_DEFAULT
            mediaPlaybackRequiresUserGesture = false
            setSupportZoom(false)
            builtInZoomControls = false
            displayZoomControls = false
        }

        webViewClient = object : WebViewClient() {

            override fun onPageFinished(
                view: WebView,
                url: String
            ) {
                super.onPageFinished(view, url)
                Log.d("SmartOverlayWebView", "PAGE FINISHED: $url")
            }

            override fun onReceivedError(
                view: WebView,
                request: WebResourceRequest,
                error: android.webkit.WebResourceError
            ) {
                super.onReceivedError(view, request, error)

                Log.e(
                    "SmartOverlayWebView",
                    "LOAD ERROR: ${request.url} | ${error.errorCode} | ${error.description}"
                )
            }

            override fun shouldInterceptRequest(
                view: WebView,
                request: WebResourceRequest
            ): WebResourceResponse? {
                return assetLoader.shouldInterceptRequest(request.url)
            }

            @Suppress("DEPRECATION")
            override fun shouldInterceptRequest(
                view: WebView,
                url: String
            ): WebResourceResponse? {
                return assetLoader.shouldInterceptRequest(Uri.parse(url))
            }
        }

        webChromeClient = object : android.webkit.WebChromeClient() {

            override fun onConsoleMessage(
                consoleMessage: ConsoleMessage
            ): Boolean {

                Log.e(
                    "SmartOverlayWebView",
                    "JS: ${consoleMessage.message()} " +
                        "[${consoleMessage.sourceId()}:${consoleMessage.lineNumber()}]"
                )

                return true
            }
        }

        addJavascriptInterface(
            WebAppBridge(context),
            "SmartOverlayAndroid"
        )
    }

    fun loadController() {
        Log.d(
            "SmartOverlayWebView",
            "Loading SmartOverlay controller..."
        )

        loadUrl(
            "https://appassets.androidplatform.net/assets/smartoverlay/controller.html"
        )
    }
}
