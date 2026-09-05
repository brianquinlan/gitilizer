// File generated for project gitilizer.
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
/// Configured for GCP project: gitilizer
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        return windows;
      case TargetPlatform.linux:
        return linux;
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyDD0W-GLH2PXRaxOro3rt6-YKbF4oZqA3A',
    appId: '1:414241858841:web:54768fe6b70dd827459188',
    messagingSenderId: '414241858841',
    projectId: 'gitilizer',
    authDomain: 'gitilizer.firebaseapp.com',
    storageBucket: 'gitilizer.firebasestorage.app',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyDemoKeyForGitilizerAndroid00000000',
    appId: '1:100000000000:android:abcdef1234567890abcdef',
    messagingSenderId: '100000000000',
    projectId: 'gitilizer',
    storageBucket: 'gitilizer.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyDemoKeyForGitilizerIos00000000000',
    appId: '1:100000000000:ios:abcdef1234567890abcdef',
    messagingSenderId: '100000000000',
    projectId: 'gitilizer',
    storageBucket: 'gitilizer.appspot.com',
    iosBundleId: 'com.gitilizer.app',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyDemoKeyForGitilizerIos00000000000',
    appId: '1:100000000000:ios:abcdef1234567890abcdef',
    messagingSenderId: '100000000000',
    projectId: 'gitilizer',
    storageBucket: 'gitilizer.appspot.com',
    iosBundleId: 'com.gitilizer.app',
  );

  static const FirebaseOptions windows = FirebaseOptions(
    apiKey: 'AIzaSyDD0W-GLH2PXRaxOro3rt6-YKbF4oZqA3A',
    appId: '1:414241858841:web:54768fe6b70dd827459188',
    messagingSenderId: '414241858841',
    projectId: 'gitilizer',
    authDomain: 'gitilizer.firebaseapp.com',
    storageBucket: 'gitilizer.firebasestorage.app',
  );

  static const FirebaseOptions linux = FirebaseOptions(
    apiKey: 'AIzaSyDD0W-GLH2PXRaxOro3rt6-YKbF4oZqA3A',
    appId: '1:414241858841:web:54768fe6b70dd827459188',
    messagingSenderId: '414241858841',
    projectId: 'gitilizer',
    authDomain: 'gitilizer.firebaseapp.com',
    storageBucket: 'gitilizer.firebasestorage.app',
  );
}
