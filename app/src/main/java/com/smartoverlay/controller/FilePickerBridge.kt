package com.smartoverlay.controller

import android.app.Activity
import android.content.Intent
import android.webkit.ValueCallback
import android.net.Uri

class FilePickerBridge(
    private val activity: Activity
) {

    private var callback: ValueCallback<Array<Uri>>? = null

    companion object {
        const val FILE_PICKER_REQUEST = 1201
    }

    fun openFilePicker(
        fileCallback: ValueCallback<Array<Uri>>?
    ) {
        callback = fileCallback

        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "*/*"
            putExtra(
                Intent.EXTRA_ALLOW_MULTIPLE,
                true
            )
        }

        activity.startActivityForResult(
            intent,
            FILE_PICKER_REQUEST
        )
    }

    fun handleResult(
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {

        if (requestCode != FILE_PICKER_REQUEST) {
            return
        }

        val uris = mutableListOf<Uri>()

        if (resultCode == Activity.RESULT_OK && data != null) {

            data.clipData?.let { clipData ->

                for (index in 0 until clipData.itemCount) {
                    uris.add(
                        clipData.getItemAt(index).uri
                    )
                }
            }

            data.data?.let { uri ->
                if (uris.isEmpty()) {
                    uris.add(uri)
                }
            }
        }

        callback?.onReceiveValue(
            if (uris.isEmpty()) null
            else uris.toTypedArray()
        )

        callback = null
    }
}
