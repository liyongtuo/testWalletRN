//
//  SettingViewController.swift
//  TestWalletProject
//
//  Created by Champollion on 2025/3/19.
//
import Foundation
import UIKit

class SettingViewController: UIViewController {
  override func viewDidLoad() {
      super.viewDidLoad()
      view.backgroundColor = .white

      let label = UILabel()
      label.text = "这是原生页面"
      label.textColor = .black
      label.translatesAutoresizingMaskIntoConstraints = false
      view.addSubview(label)

      NSLayoutConstraint.activate([
        label.centerXAnchor.constraint(equalTo: view.centerXAnchor),
        label.centerYAnchor.constraint(equalTo: view.centerYAnchor),
      ])
    }
}
