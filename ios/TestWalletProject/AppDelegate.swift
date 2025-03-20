import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
@objc(AppDelegate)
class AppDelegate: RCTAppDelegate {
  @objc var rootView: RCTRootView?
  
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    
    self.moduleName = "TestWalletProject"
    self.dependencyProvider = RCTAppDependencyProvider()

    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]
    
    let bridge = RCTBridge(delegate: self, launchOptions: launchOptions)!
    self.bridge = bridge
    let rootView = RCTRootView(bridge: bridge, moduleName: "TestWalletProject", initialProperties: nil)
    self.rootView = rootView

    window = UIWindow(frame: UIScreen.main.bounds)
    let rootViewController = UIViewController()
    rootViewController.view = rootView
    window.rootViewController = rootViewController
    window.makeKeyAndVisible()

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
  
  override func extraModules(for bridge: RCTBridge) -> [RCTBridgeModule] {
    return [NativeNavigationModule(), TestEventManager()]
  }
}
