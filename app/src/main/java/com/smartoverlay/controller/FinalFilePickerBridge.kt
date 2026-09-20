package com.smartoverlay.controller

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.webkit.ValueCallback

class FinalFilePickerBridge(private val activity: Activity) {
    companion object { const val REQUEST_CODE = 1301 }
    private var callback: ValueCallback<Array<Uri>>? = null

    fun open(callback: ValueCallback<Array<Uri>>?) {
        this.callback = callback
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "*/*"
            putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
        }
        activity.startActivityForResult(intent, REQUEST_CODE)
    }

    fun handleResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode != REQUEST_CODE) return
        val uris = mutableListOf<Uri>()
        if (resultCode == Activity.RESULT_OK && data != null) {
            data.clipData?.let { clips ->
                for (i in 0 until clips.itemCount) uris.add(clips.getItemAt(i).uri)
            }
            if (uris.isEmpty()) data.data?.let { uris.add(it) }
        }
        callback?.onReceiveValue(if (uris.isEmpty()) null else uris.toTypedArray())
        callback = null
    }
}
