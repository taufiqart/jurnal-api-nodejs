/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Router from './router';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  return (
    <>
      <SafeAreaProvider>
        {/* menghilangkan statusbar */}
        <StatusBar translucent backgroundColor="transparent" barStyle="black" />
        {/* end */}
        {/* setiap routeName halamn harus dibungkus denga NavigationContainer */}
        <NavigationContainer className="pt-3">
          {/* memanggil router component */}
          <Router />
          {/* end */}
        </NavigationContainer>
        {/* end */}
      </SafeAreaProvider>
    </>
  );
}

export default App;
