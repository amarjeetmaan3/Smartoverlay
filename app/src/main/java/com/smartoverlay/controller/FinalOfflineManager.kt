package com.smartoverlay.controller

class FinalOfflineManager {
    @Volatile private var offline = false
    fun setOffline(value: Boolean) { offline = value }
    fun isOffline(): Boolean = offline
    fun status(): String = if (offline) "offline" else "online"
}
