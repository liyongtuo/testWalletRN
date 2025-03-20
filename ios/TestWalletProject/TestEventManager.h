//
//  TestEventManager.h
//  TestWalletProject
//
//  Created by Champollion on 2025/3/19.
//

#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface TestEventManager : RCTEventEmitter <RCTBridgeModule>
- (void)sendCustomEventToJS:(BOOL)isUSD;
@end

NS_ASSUME_NONNULL_END
