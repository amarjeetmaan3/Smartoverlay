package com.smartoverlay.controller

class FirebaseBridge {

    private var connected = false

    fun setConnected(value: Boolean) {
        connected = value
    }

    fun isConnected(): Boolean {
        return connected
    }

    fun getStatus(): String {
        return if (connected) {
            "connected"
        } else {
            "disconnected"
        }
    }
}
