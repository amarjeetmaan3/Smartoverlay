package com.smartoverlay.controller

import android.app.Activity
import android.content.pm.ActivityInfo

class FinalOrientationManager(private val activity: Activity) {
    fun portrait() { activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT }
    fun landscape() { activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE }
    fun sensor() { activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_FULL_SENSOR }
    fun unspecified() { activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED }
}
