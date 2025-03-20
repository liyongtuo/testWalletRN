//
//  NativeNavigationModule.h
//  TestWalletProject
//
//  Created by Champollion on 2025/3/19.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface NativeNavigationModule : RCTEventEmitter <RCTBridgeModule>
@property (nonatomic, strong)UIViewController *vc;
@property (nonatomic, assign)BOOL isUSD;
@end

NS_ASSUME_NONNULL_END
