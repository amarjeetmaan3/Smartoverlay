package com.smartoverlay.controller

class FinalUpdateManager {
    fun isUpgrade(newVersionCode: Int, installedVersionCode: Int): Boolean = newVersionCode > installedVersionCode
    fun isSameVersion(newVersionCode: Int, installedVersionCode: Int): Boolean = newVersionCode == installedVersionCode
    fun isOlderVersion(newVersionCode: Int, installedVersionCode: Int): Boolean = newVersionCode < installedVersionCode
    fun canInstallUpdate(newVersionCode: Int, installedVersionCode: Int): Boolean = isUpgrade(newVersionCode, installedVersionCode)
}
