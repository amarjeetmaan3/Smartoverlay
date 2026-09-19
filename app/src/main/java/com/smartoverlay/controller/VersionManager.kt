package com.smartoverlay.controller

object VersionManager {

    const val VERSION_CODE = 1

    const val VERSION_NAME = "1.0.0"

    fun versionString(): String {
        return "$VERSION_NAME ($VERSION_CODE)"
    }
}
