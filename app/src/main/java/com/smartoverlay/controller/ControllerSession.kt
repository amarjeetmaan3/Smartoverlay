package com.smartoverlay.controller

class ControllerSession {

    var sessionId: String? = null

    var controllerId: String? = null

    var overlayId: String? = null

    var userId: String? = null

    var isActive: Boolean = false

    fun start(
        session: String,
        controller: String
    ) {
        sessionId = session
        controllerId = controller
        isActive = true
    }

    fun stop() {
        isActive = false
    }

    fun clear() {
        sessionId = null
        controllerId = null
        overlayId = null
        userId = null
        isActive = false
    }
}
