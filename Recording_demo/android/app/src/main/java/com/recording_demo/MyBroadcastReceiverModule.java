package com.recording_demo;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MyBroadcastReceiverModule extends ReactContextBaseJavaModule {

    private Context context;
    private BroadcastReceiver receiver;



    public MyBroadcastReceiverModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
        registerBroadcastReceiver();
    }
    @NonNull
    @Override
    public String getName() {
        return "MyBroadcastReceiver";
    }

    private void registerBroadcastReceiver() {
        IntentFilter filter = new IntentFilter(Intent.ACTION_BOOT_COMPLETED);
        receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                getReactApplicationContext()
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("onBootCompleted", null);
                Log.d("", "onReceive: msg received ");
            }
        };
        context.registerReceiver(receiver, filter);
    }
}




