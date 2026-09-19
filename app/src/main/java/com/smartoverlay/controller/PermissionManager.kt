package com.smartoverlay.controller

import android.Manifest
import android.app.Activity
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

class PermissionManager(
    private val activity: Activity
) {

    companion object {
        const val STORAGE_REQUEST = 2101
    }

    fun hasNotificationPermission(): Boolean {

        if (android.os.Build.VERSION.SDK_INT < 33) {
            return true
        }

        return ContextCompat.checkSelfPermission(
            activity,
            Manifest.permission.POST_NOTIFICATIONS
        ) == PackageManager.PERMISSION_GRANTED
    }

    fun requestNotificationPermission() {

        if (android.os.Build.VERSION.SDK_INT >= 33) {

            ActivityCompat.requestPermissions(
                activity,
                arrayOf(
                    Manifest.permission.POST_NOTIFICATIONS
                ),
                STORAGE_REQUEST
            )
        }
    }
}
