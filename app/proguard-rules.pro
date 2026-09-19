# SmartOverlay release rules

# Keep WebView JavaScript bridge methods.
-keepclassmembers class com.smartoverlay.controller.WebAppBridge {
    public *;
}

# Keep application and activities.
-keep class com.smartoverlay.controller.** { *; }
