import {View} from 'react-native';
import React from 'react';
import Home from '../pages/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {faHouse, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import tw from 'twrnc';
import Profile from '../pages/Profile';

// membuat tab navigator
const Tab = createBottomTabNavigator();
// end

export default function BottomBar() {
  return (
    <>
      <Tab.Navigator
        // mendefinisikan halaman pertama yang di tampilkan
        initialRouteName="Home"
        // end

        screenOptions={({route}) => ({
          // generate tabBar icon
          tabBarIcon: ({focused, color, size}) => {
            let icon;
            // set icon setiap halaman
            let rn = route.name;
            if (rn == 'Home') {
              icon = faHouse;
            }
            if (rn == 'Profile') {
              icon = faUser;
            }
            // end
            // set warna icon
            color = focused ? '#22D3EE' : '#67E8F9';
            // end
            return (
              <View
                className={`w-12 flex items-center justify-center h-12 rounded-full relative ${
                  focused
                    ? 'bg-white shadow-lg shadow-slate-500  -top-3'
                    : 'bg-transparent'
                }`}>
                <FontAwesomeIcon icon={icon} size={size} color={color} />
              </View>
            );
          },
          // end

          // set tabBar style
          tabBarStyle: [
            tw`bg-white/90 border border-white/70 shadow-slate-300 rounded-full absolute shadow mb-5 mx-4 h-14 shadow-black elevation-0`,
            {elevation: 10, shadowColor: '#94A3B8'},
          ],
          // end
          // tabBarLabel style
          tabBarLabelStyle: {display: 'none'},
          // end
        })}>
        {/* mendefinisikan routeName halaman home */}
        <Tab.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        {/* end */}

        {/* mendefinisikan routeName halaman home */}
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        {/* end */}
      </Tab.Navigator>
    </>
  );
}
