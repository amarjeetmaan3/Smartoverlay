package com.smartoverlay.controller

import android.net.Uri
import android.os.Bundle
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var controllerWebView: ControllerWebView
    private var pendingPicker: ValueCallback<Array<Uri>>? = null

    private val picker = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        pendingPicker?.onReceiveValue(
            WebChromeClient.FileChooserParams.parseResult(result.resultCode, result.data)
        )
        pendingPicker = null
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        controllerWebView = ControllerWebView(this)

        controllerWebView.onFileChooser = { callback, intent ->
            pendingPicker?.onReceiveValue(null)
            pendingPicker = callback
            try {
                picker.launch(intent)
            } catch (e: Exception) {
                pendingPicker = null
                callback.onReceiveValue(null)
            }
        }

        setContentView(controllerWebView)

        controllerWebView.loadController()
    }

    override fun onBackPressed() {

        if (controllerWebView.canGoBack()) {

            controllerWebView.goBack()

        } else {

            super.onBackPressed()
        }
    }
}
