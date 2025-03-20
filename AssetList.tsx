import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, NativeEventEmitter, NativeModules, DeviceEventEmitter} from 'react-native';
import BigNumber from 'bignumber.js';

const data = require('./json/Currency.json');
const fiat_rate_hkd_data = require('./json/Fiat_rate_hkd.json');
const fiat_rate_usd_data = require('./json/Fiat_rate_usd.json');


const AssetList = () => {
    const [isUSD, setIsUSD] = useState(false);

    useEffect(() => {
        const managerEmitter = new NativeEventEmitter(NativeModules.NativeNavigationModule);
        console.log("managerEmitter", managerEmitter)

        const subscription = managerEmitter.addListener(
            'EventReminder',
            (event) => {
                setIsUSD((prev) => !prev);
            }
        );

        return () => {
            subscription.remove();
        };
    }, []);
    const renderItem = ({ item, index }) => {
        const fiatData = (isUSD ? fiat_rate_usd_data[index] : fiat_rate_hkd_data[index]);
        console.log(fiatData.fiat_symbol);
        const balance = formatNumber(new BigNumber(item.amount));
        const amount = convertToAmount(new BigNumber(item.amount), new BigNumber(fiatData.fiat_rate));
        console.log(fiatData.fiat_symbol, amount);
        const unit = fiatData.fiat_symbol

        return (<View style={styles.cell}>
            <View style={styles.row}>
                <Image
                    source={{uri: item.image}}
                    style={styles.image}
                />
                <View style={[styles.col, {marginLeft: 8}]}>
                    <Text style={[styles.nameText, {marginBottom: 6}]}>{capitalizeFirstLetter(item.name)}</Text>
                    <Text style={styles.percentageText}>{item.percentage}</Text>
                </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
                <Text numberOfLines={1} ellipsizeMode="middle" style={[styles.nameText, {marginBottom: 6}]}>{formatNumber(amount) + " " + unit}</Text>
                <Text numberOfLines={1} ellipsizeMode="middle" style={styles.amountText}>{balance + " " + item.symbol}</Text>
            </View>
        </View>);
    }

    const capitalizeFirstLetter = (str) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const formatNumber = (num) => {
        let formatted = num.toFixed(6);
        formatted = formatted.replace(/\.?0+$/, '');

        return formatted;
    };

    const convertToAmount = (amount, rate) => {
        return amount.multipliedBy(rate);
    };

    const navigateToNativePage = () => {
        // setIsUSD((prev) => !prev);
        NativeModules.NativeNavigationModule.navigateToNativePage();
    };

    const renderHeader = () => (
        <View>
            <View style={[styles.row, {flex: 1, paddingBottom: 200}]}>
                <View style={styles.wallet}>
                    <Text style={{fontSize: 14,
                        color: 'black',
                        fontWeight: "500",}}>Wallet 1</Text>
                </View>
                <TouchableOpacity onPress={() => {navigateToNativePage()}}>
                    <Image source={require('./asset/setting.png')} style={styles.setting} />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', flex: 1, paddingBottom: 20}}>
                <View style={styles.headerTopCell}>
                    <View style={styles.headerTopCellImageBg}>
                        <Image style={styles.headerTopCellImage}
                               source={require('./asset/buy.png')}
                        />
                    </View>
                    <Text style={styles.headerTopCellText}>Buy</Text>
                </View>
                <View style={styles.headerTopCell}>
                    <View style={styles.headerTopCellImageBg}>
                        <Image style={styles.headerTopCellImage}
                               source={require('./asset/send.png')}
                        />
                    </View>
                    <Text style={styles.headerTopCellText}>Send</Text>
                </View>
                <View style={styles.headerTopCell}>
                    <View style={styles.headerTopCellImageBg}>
                        <Image style={styles.headerTopCellImage}
                               source={require('./asset/receive.png')}
                        />
                    </View>
                    <Text style={styles.headerTopCellText}>Receive</Text>
                </View>
                <View style={styles.headerTopCell}>
                    <View style={styles.headerTopCellImageBg}>
                        <Image style={styles.headerTopCellImage}
                               source={require('./asset/earn.png')}
                        />
                    </View>
                    <Text style={styles.headerTopCellText}>Earn</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
                <View style={styles.headerBottomCell}>
                    <Text style={styles.headerBottomCellTextOn}>Crypto</Text>
                </View>
                <View style={styles.headerBottomCell}>
                    <Text style={styles.headerBottomCellTextOff}>Earn</Text>
                </View>
                <View style={styles.headerBottomCell}>
                    <Text style={styles.headerBottomCellTextOff}>NFTs</Text>
                </View>
            </View>
            <Text style={styles.headerSectionTitle}>Your Assets</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={renderHeader}
                showsVerticalScrollIndicator={false}
                extraData={isUSD}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 60,
                }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    headerTopCell: {
        flex: 1, // 均分宽度
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
    headerTopCellImage: {
        width: 25,
        height: 25,
    },
    headerTopCellImageBg: {
        backgroundColor: '#d2e9fc',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    headerTopCellText: {
        fontSize: 12,
        color: '#479af3',
        fontWeight: "bold",
    },
    headerBottomCell: {
        flex: 1, // 均分宽度
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
    },
    headerBottomCellTextOn: {
        fontSize: 18,
        color: 'black',
        fontWeight: "bold",
    },
    headerBottomCellTextOff: {
        fontSize: 18,
        color: 'gray',
    },
    headerSectionTitle: {
        fontSize: 14,
        color: 'black',
        marginBottom: 12,
        marginTop: 8,
        fontWeight: "500",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    col: {
        alignItems: 'flex-start',
    },
    cell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#ebeff3",
        opacity: 0.7,
        padding: 12,
        borderRadius: 12,
    },
    header: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    separator: {
        height: 12,
    },
    nameText: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        maxWidth: 180,
    },
    percentageText: {
        fontSize: 12,
        color: 'red',
    },
    amountText: {
        fontSize: 12,
        color: 'gray',
        maxWidth: 180,
    },
    wallet: {
        paddingVertical:8,
        paddingHorizontal: 15,
        backgroundColor: "#ebeff3",
        borderRadius: 18,
    },
    setting: {
        width: 30,
        height: 30,
    },
});

export default AssetList;
