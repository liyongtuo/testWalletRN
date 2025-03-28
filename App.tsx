/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
    SafeAreaView,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import AssetList from './AssetList.tsx';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <View style={styles.container}>
          <StatusBar
              barStyle={'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
          <AssetList />
      </View>
    // <View style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    //     <View style={{paddingRight: safePadding}}>
    //         <Header/>
    //     </View>
    //     <AssetList />
    // </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 40,
    },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
