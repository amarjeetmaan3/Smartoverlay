package com.smartoverlay.controller

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var controllerWebView: ControllerWebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        controllerWebView = ControllerWebView(this)

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
