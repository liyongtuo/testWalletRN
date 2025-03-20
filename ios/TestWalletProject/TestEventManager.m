//
//  TestEventManager.m
//  TestWalletProject
//
//  Created by Champollion on 2025/3/19.
//

#import "TestEventManager.h"

@implementation TestEventManager

RCT_EXPORT_MODULE();

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

@end
