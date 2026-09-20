package com.smartoverlay.controller

class FinalAuthSession {
    var userId: String? = null
    var isSignedIn: Boolean = false

    fun signIn(id: String) { userId = id; isSignedIn = true }
    fun signOut() { userId = null; isSignedIn = false }
}
