//
//  NativeNavigationModule.swift
//  TestWalletProject
//
//  Created by Champollion on 2025/3/19.
//
import Foundation
import React

@objc(NativeNavigationManager)
class NativeNavigationManager: NSObject {

  @objc
  func navigateToNative(_ name: NSString) {
    DispatchQueue.main.async {
      if let rootViewController = UIApplication.shared.keyWindow?.rootViewController {
        let nativeViewController = SettingViewController()
        rootViewController.present(nativeViewController, animated: true, completion: nil)
      }
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

