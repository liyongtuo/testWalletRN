//
//  NativeNavigationModule.m
//  TestWalletProject
//
//  Created by Champollion on 2025/3/19.
//

#import <UIKit/UIKit.h>
#import "NativeNavigationModule.h"
#import "TestEventManager.h"
#import "TestWalletProject-Swift.h"

@implementation NativeNavigationModule

// 导出模块
RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(navigateToNativePage: (BOOL) isUSD)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *rootViewController = [UIApplication sharedApplication].keyWindow.rootViewController;
    UIViewController *nativeViewController = [[UIViewController alloc] init];
    nativeViewController.view.backgroundColor = [UIColor whiteColor];
    self.vc = nativeViewController;
    self.isUSD = isUSD;

    UILabel *label = [[UILabel alloc] init];
    label.text = @"USD or HKD";
    label.textColor = [UIColor blackColor];
    label.translatesAutoresizingMaskIntoConstraints = NO;
    [nativeViewController.view addSubview:label];
    
    UIButton *closeButton = [UIButton buttonWithType:UIButtonTypeSystem];
    [closeButton setTitle:@"Close" forState:UIControlStateNormal];
    [closeButton setTitleColor:[UIColor systemBlueColor] forState:UIControlStateNormal];

    [nativeViewController.view addSubview:closeButton];

    closeButton.translatesAutoresizingMaskIntoConstraints = NO;
    [closeButton addTarget:self action:@selector(closeButtonTapped) forControlEvents:UIControlEventTouchUpInside];
    
    UIButton *switchButton = [UIButton buttonWithType:UIButtonTypeSystem];
    [switchButton setTitle:@"Switch" forState:UIControlStateNormal];
    [switchButton setTitleColor:[UIColor systemBlueColor] forState:UIControlStateNormal];

    [nativeViewController.view addSubview:switchButton];

    switchButton.translatesAutoresizingMaskIntoConstraints = NO;
    [switchButton addTarget:self action:@selector(switchButtonTapped) forControlEvents:UIControlEventTouchUpInside];

    [NSLayoutConstraint activateConstraints:@[
        [closeButton.trailingAnchor constraintEqualToAnchor:nativeViewController.view.trailingAnchor constant:-20],
        [closeButton.topAnchor constraintEqualToAnchor:nativeViewController.view.topAnchor constant:20]
    ]];

    [NSLayoutConstraint activateConstraints:@[
      [label.centerXAnchor constraintEqualToAnchor:nativeViewController.view.centerXAnchor],
      [label.topAnchor constraintEqualToAnchor:nativeViewController.view.topAnchor constant:20],
    ]];
    
    [NSLayoutConstraint activateConstraints:@[
      [switchButton.centerXAnchor constraintEqualToAnchor:nativeViewController.view.centerXAnchor],
      [switchButton.centerYAnchor constraintEqualToAnchor:nativeViewController.view.centerYAnchor],
    ]];

    [rootViewController presentViewController:nativeViewController animated:YES completion:nil];
  });
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"EventReminder"];
}

- (void)sendCustomEventToJS:(BOOL)isUSD
{
  dispatch_async(dispatch_get_main_queue(), ^{
    NSString *usd = isUSD ? @"1":@"0";
    [self sendEventWithName:@"EventReminder" body:@{@"isUSD": usd}];
  });
}

- (void)closeButtonTapped {
  [self.vc dismissViewControllerAnimated:YES completion:nil];
}

- (void)switchButtonTapped {
  self.isUSD = !self.isUSD;
  [self sendCustomEventToJS:self.isUSD];
}

@end
