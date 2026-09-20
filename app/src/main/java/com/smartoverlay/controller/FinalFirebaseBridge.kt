package com.smartoverlay.controller

class FinalFirebaseBridge {
    @Volatile private var connected = false

    fun setConnected(value: Boolean) { connected = value }
    fun isConnected(): Boolean = connected
    fun status(): String = if (connected) "connected" else "disconnected"
}
