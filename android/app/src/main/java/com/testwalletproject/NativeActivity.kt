package com.testwalletproject
import android.app.Activity
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.view.Gravity
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.constraintlayout.widget.ConstraintSet
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import androidx.constraintlayout.widget.ConstraintLayout.LayoutParams

class NativeActivity : AppCompatActivity() {
    private lateinit var eventEmitterModule: NativeNavigationModule
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val layout = ConstraintLayout(this)
        layout.id = ConstraintLayout.generateViewId()
        layout.setBackgroundColor(Color.WHITE)

        val titleTextView = TextView(this).apply {
            id = ConstraintLayout.generateViewId()
            text = "USD or HKD"
            textSize = 16f
//            gravity = Gravity.CENTER
        }

        val closeButton = Button(this).apply {
            id = ConstraintLayout.generateViewId()
            text = "Close"
            textSize = 16f
            setTextColor(Color.BLUE)
            setBackgroundColor(Color.TRANSPARENT)
            setOnClickListener {
                finish()
            }
        }

        val centerButton = Button(this).apply {
            id = ConstraintLayout.generateViewId()
            text = "Switch"
            setTextColor(Color.BLUE)
            setBackgroundColor(Color.TRANSPARENT)
            setOnClickListener {
                sendEventToReactNative("EventReminder", "")
            }
            layoutParams = LayoutParams(
                LayoutParams.WRAP_CONTENT,
                LayoutParams.WRAP_CONTENT
            )
        }

        layout.addView(titleTextView)
        layout.addView(closeButton)
        layout.addView(centerButton)

        setContentView(layout)

        val constraintSet = ConstraintSet()
        constraintSet.clone(layout)

        constraintSet.connect(titleTextView.id, ConstraintSet.TOP, layout.id, ConstraintSet.TOP, 20)
        constraintSet.connect(titleTextView.id, ConstraintSet.START, ConstraintSet.PARENT_ID, ConstraintSet.START)
        constraintSet.connect(titleTextView.id, ConstraintSet.END, ConstraintSet.PARENT_ID, ConstraintSet.END)
//        constraintSet.setHorizontalBias(titleTextView.id, 0.5f)

        constraintSet.connect(closeButton.id, ConstraintSet.TOP, layout.id, ConstraintSet.TOP, 20)
        constraintSet.connect(closeButton.id, ConstraintSet.END, layout.id, ConstraintSet.END, 20)

        constraintSet.connect(centerButton.id, ConstraintSet.TOP, ConstraintSet.PARENT_ID, ConstraintSet.TOP)
        constraintSet.connect(centerButton.id, ConstraintSet.BOTTOM, ConstraintSet.PARENT_ID, ConstraintSet.BOTTOM)
        constraintSet.connect(centerButton.id, ConstraintSet.START, ConstraintSet.PARENT_ID, ConstraintSet.START)
        constraintSet.connect(centerButton.id, ConstraintSet.END, ConstraintSet.PARENT_ID, ConstraintSet.END)
//        constraintSet.setHorizontalBias(centerButton.id, 0.5f)
//        constraintSet.setVerticalBias(centerButton.id, 0.5f)

        constraintSet.applyTo(layout)
    }

    // 获取 ReactContext
    private fun getReactContext(): ReactContext? {
        val application = application as ReactApplication
        return application.reactNativeHost.reactInstanceManager.currentReactContext
    }

    private fun sendEventReactNative(reactContext: ReactContext, message: String) {
        val params = Bundle().apply {
            putString("message", message)
        }
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("EventReminder", params)
    }

    private fun sendEventToReactNative(eventName: String, message: String) {
        var context = getReactContext()
        if (context != null) {
            sendEventReactNative(context, message)
        }

        val application = application as MainApplication
        val module = application.module

        if (module != null) {
            module.sendEvent("EventReminder", "1")
        } else {
            println("ReactContext is null or not initialized yet.")
        }
    }
}