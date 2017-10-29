package com.rn_memory_usage_test_high_usage;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.idehub.Billing.InAppBillingBridgePackage;
import com.doochik.RNAppMetrica.AppMetricaPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.evollu.react.fa.FIRAnalyticsPackage;
import com.cmcewen.blurview.BlurViewPackage;
import io.sentry.RNSentryPackage;
import com.projectseptember.RNGL.RNGLPackage;
import com.devialab.exif.RCTExifPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.rnfs.RNFSPackage;
import net.zubricky.AndroidKeyboardAdjust.AndroidKeyboardAdjustPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.brentvatne.react.ReactVideoPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.marcshilling.idletimer.IdleTimerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.shahenlibrary.RNVideoProcessingPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.opensettings.OpenSettingsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import android.support.multidex.MultiDexApplication;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import com.yandex.metrica.YandexMetrica;

import com.google.firebase.analytics.FirebaseAnalytics;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new InAppBillingBridgePackage(),
            new AppMetricaPackage(),
            new SplashScreenReactPackage(),
            new FBSDKPackage(mCallbackManager),
            new FIRAnalyticsPackage(),
            new BlurViewPackage(),
            new RNSentryPackage(MainApplication.this),
            new RNGLPackage(),
            new AndroidKeyboardAdjustPackage(),
            new RCTExifPackage(),
            new MapsPackage(),
            new RNFSPackage(),
            new VectorIconsPackage(),
            new ReactNativePushNotificationPackage(),
            new ReactVideoPackage(),
            new ImageResizerPackage(),
            new IdleTimerPackage(),
            new RNDeviceInfo(),
            new RCTCameraPackage(),
            new RNI18nPackage(),
            new RNVideoProcessingPackage(),
            new OrientationPackage(),
            new OpenSettingsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index.android";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  private void initYandexMetrica() {
    // NOTE: INITIALIZING THE APPMETRICA SDK
    YandexMetrica.activate(getApplicationContext(), "myid");
    // NOTE: DO NOT USE "enableActivityAutoTracking". IT WILL SLOW DOWN THE APP
  }

  private void initFbSDK() {
    FacebookSdk.sdkInitialize(getApplicationContext());
  }

  private void disableFirebaseAnalytics() {
    FirebaseAnalytics.getInstance(this).setAnalyticsCollectionEnabled(false);
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    if ( BuildConfig.DEBUG ) {
      this.disableFirebaseAnalytics();
    } else {
      this.initFbSDK();
      this.initYandexMetrica();
    }
  }
}
