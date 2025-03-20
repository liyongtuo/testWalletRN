package com.testwalletproject

import android.content.Intent
import android.os.Bundle
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class NativeNavigationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "NativeNavigationModule"
    }

    fun sendEvent(eventName: String, params: String?) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    @ReactMethod
    fun navigateToNativePage() {
        val currentActivity = currentActivity
        if (currentActivity != null) {
            val intent = Intent(currentActivity, NativeActivity::class.java)
            currentActivity.startActivity(intent)
            val application = reactApplicationContext.applicationContext as MainApplication
            application.module = this
        }
    }
}