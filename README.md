# CameraDemo
Create your simple camera for taking photos and recording videos :D

Youtube links:
- Part 1:
- Part 2:

------------------CAMERA DEMO IN REACT NATIVE------------------
- STEP 1: Install necessary modules 'react-native-camera', 'react-native-permissions', 'react-native-vector-icons'
	npm i --save react-native-camera react-native-permissions react-native-vector-icons
	react-native link react-native-camera react-native-permissions react-native-vector-icons
*** Fix error: Cannot choose between the following variants of project :react-native-camera:
- generalDebugRuntimeElements
- mlkitDebugRuntimeElements


android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'general' <-- insert this line
  }
}
- STEP 2: Grant permissions 'record_audio', 'camera', 'storage'. Go to file '/app/src/main/AndroidManifest.xml'
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-feature android:name="android.hardware.camera" />
    <uses-feature android:name="android.hardware.camera.autofocus" />
- STEP 3: Configure general camera:
+ flashMode: on, off (used for take picture)
+ captureAudio: true, false (mute or unmute used for recording video)
+ front/back camera
+ maxDuration (for recording video)
+ seconds (recording time)
- STEP 4: Add icons for these purposes:
+ 'flash mode' (size 50, IoniconsIcon: 'ios-flash', 'ios-flash-off')
+ 'reverse camera' (size 60, IoniconsIcon: 'ios-reverse-camera')
+ 'capture' (size 40, Entypo: 'camera')
+ 'record video' (size 40, Entypo: 'video-camera')
- STEP 5: Turn on/of flash
- STEP 6: Capture
- STEP 7: Reverse camera
- STEP 8: Record video
+ Start recording video: count time

-------------Convert seconds to format 'mm:ss'
secondsToMMSS = (seconds: number) => {
        let m = Math.floor(seconds / 60);
        let s = Math.floor(seconds % 60);
    
        let mDisplay = m < 10 ? `0${m}` : `${m}`;
        let sDisplay = s < 10 ? `0${s}` : `${s}`;
        return `${mDisplay}:${sDisplay}`; 
    }

+ Stop recording video: reset time
