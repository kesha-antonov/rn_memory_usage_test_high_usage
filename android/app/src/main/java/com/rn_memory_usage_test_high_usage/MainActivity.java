package com.rn_memory_usage_test_high_usage;

import com.facebook.react.ReactActivity;

import com.facebook.react.ReactActivityDelegate;
import android.os.Bundle;
import org.json.JSONObject;
import android.content.Intent;
import android.content.res.Configuration;
import android.support.annotation.Nullable;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "rn_memory_usage_test_high_usage";
    }

    private JSONObject getPushData(String dataString) {
        try {
            return new JSONObject(dataString);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Nullable
            @Override
            protected Bundle getLaunchOptions() {
                Intent mainIntent = getIntent();
                String dataValue = null;
                Bundle initialProps = new Bundle();
                if (mainIntent != null) {
                    Bundle extras = mainIntent.getExtras();

                    if (extras != null) {

                        JSONObject data = getPushData(extras.getString("custom_data"));
                        if (data != null) {
                            try {
                                dataValue = data.toString();
                            } catch (Exception e) {
                              // e.printStackTrace();
                            }
                        }
                    }
                }
                initialProps.putString("initialPushData", dataValue); // Read this inside your Root component in React native
                return initialProps;
            }
        };
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
