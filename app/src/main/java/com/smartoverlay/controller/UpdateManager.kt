package com.smartoverlay.controller

class UpdateManager {

    fun isUpgrade(
        newVersionCode: Int,
        installedVersionCode: Int
    ): Boolean {
        return newVersionCode > installedVersionCode
    }

    fun isSameVersion(
        newVersionCode: Int,
        installedVersionCode: Int
    ): Boolean {
        return newVersionCode == installedVersionCode
    }

    fun isOlderVersion(
        newVersionCode: Int,
        installedVersionCode: Int
    ): Boolean {
        return newVersionCode < installedVersionCode
    }

    fun canInstallUpdate(
        newVersionCode: Int,
        installedVersionCode: Int
    ): Boolean {
        return newVersionCode > installedVersionCode
    }
}
