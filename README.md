QR Scanner
Improve this doc

A fast, energy efficient, highly-configurable QR code scanner for Cordova apps.

Requires Cordova plugin: cordova-plugin-qrscanner. For more info, please see the QR Scanner plugin docs.

Repo: https://github.com/bitpay/cordova-plugin-qrscanner

Installation
Install the Cordova and Ionic Native plugins:
$ ionic cordova plugin add cordova-plugin-qrscanner
$ npm install --save @ionic-native/qr-scanner
Add this plugin to your app's module
Supported platforms
Android
Browser
iOS
Windows
Usage
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';


constructor(private qrScanner: QRScanner) { }

...

// Optionally request the permission early
this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted


       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);

         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
Instance Members
prepare()
Request permission to use QR scanner.

Returns: Promise<QRScannerStatus>

scan()
Call this method to enable scanning. You must then call the show method to make the camera preview visible.

Returns: Observable<string> returns an Observable that emits the scanned text. Unsubscribe from the observable to stop scanning.

show()
Configures the native webview to have a transparent background, then sets the background of the <body> and <html> DOM elements to transparent, allowing the webview to re-render with the transparent background.

Returns: Promise<QRScannerStatus>

hide()
Configures the native webview to be opaque with a white background, covering the video preview.

Returns: Promise<QRScannerStatus>

enableLight()
Enable the device’s light (for scanning in low-light environments).

Returns: Promise<QRScannerStatus>

destroy()
Destroy the scanner instance.

Returns: Promise<QRScannerStatus>

disableLight()
Disable the device’s light.

Returns: Promise<QRScannerStatus>

useFrontCamera()
Use front camera

Returns: Promise<QRScannerStatus>

useBackCamera()
Use back camera

Returns: Promise<QRScannerStatus>

useCamera(camera)
Set camera to be used.

Param	Type	Details
camera	number	
Provide 0 for back camera, and 1 for front camera.

Returns: Promise<QRScannerStatus>

pausePreview()
Pauses the video preview on the current frame and pauses scanning.

Returns: Promise<QRScannerStatus>

resumePreview()
Resumse the video preview and resumes scanning.

Returns: Promise<QRScannerStatus>

getStatus()
Returns permission status

Returns: Promise<QRScannerStatus>

openSettings()
Opens settings to edit app permissions.

QRScannerStatus
Param	Type	Details
authorized	boolean	
On iOS and Android 6.0+, camera access is granted at runtime by the user (by clicking "Allow" at the dialog). The authorized property is a boolean value which is true only when the user has allowed camera access to your app (AVAuthorizationStatus.Authorized). On platforms with permissions granted at install (Android pre-6.0, Windows Phone) this property is always true.

denied	boolean	
A boolean value which is true if the user permanently denied camera access to the app (AVAuthorizationStatus.Denied). Once denied, camera access can only be gained by requesting the user change their decision (consider offering a link to the setting via openSettings()).

restricted	boolean	
A boolean value which is true if the user is unable to grant permissions due to parental controls, organization security configuration profiles, or similar reasons.

prepared	boolean	
A boolean value which is true if QRScanner is prepared to capture video and render it to the view.

showing	boolean	
A boolean value which is true when the preview layer is visible (and on all platforms but browser, the native webview background is transparent).

scanning	boolean	
A boolean value which is true if QRScanner is actively scanning for a QR code.

previewing	boolean	
A boolean value which is true if QRScanner is displaying a live preview from the device's camera. Set to false when the preview is paused.

lightEnabled	boolean	
A boolean value which is true if the light is enabled.

canOpenSettings	boolean	
A boolean value which is true only if the users' operating system is able to QRScanner.openSettings().

canEnableLight	boolean	
A boolean value which is true only if the users' device can enable a light in the direction of the currentCamera.

canChangeCamera	boolean	
A boolean value which is true only if the current device "should" have a front camera. The camera may still not be capturable, which would emit error code 3, 4, or 5 when the switch is attempted. (On the browser platform, this value is false until the prepare method is called.)

currentCamera	number	
A number representing the index of the currentCamera. 0 is the back camera, 1 is the front.
