import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {signOut} from 'firebase/auth';
import {authentication} from '../config/FIREBASE';
import {removeItem} from '../config/DATA/storageHelper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {checkUser} from '../config/helper';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export default function Profile({navigation}) {
  const win = Dimensions.get('window');
  const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const logOut = () => {
    signOut(authentication)
      .then(async () => {
        await removeItem('user');
        navigation.navigate('Onboarding');
      })
      .catch(error => {
        console.log(error);
        console.log('logout failed');
      });
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [isFocused]);

  useEffect(() => {
    checkUser({setUser, navigation}).catch(error => {
      console.log(error);
    });
  }, [isFocused, loading]);

  return (
    <>
      <StatusBar barStyle={'dark-content'}></StatusBar>
      <View className="bg-white">
        <LinearGradient colors={['white', '#F1F5F9']} className="h-full w-full">
          {!loading ? (
            <>
              <SafeAreaView
                style={{height: win.height * 0.7}}
                className=" w-full items-center relative z-10">
                <View
                  style={{width: 450}}
                  className="h-80 rounded-b-full bg-white items-center pb-10">
                  <View
                    style={{width: win.width}}
                    className="mt-auto items-center">
                    <View className="h-36 w-36 bg-slate-200 rounded-full mb-2 justify-center items-center">
                      <FontAwesomeIcon icon={faUser} size={60} color="white" />
                    </View>
                    <Text className="text-slate-900 font-semibold text-xl">
                      {user?.data?.fullName}
                    </Text>
                    <Text className="text-slate-600">{user?.data?.email}</Text>
                    <Text className="text-slate-600 capitalize font-semibold">
                      {user?.data?.role}
                    </Text>
                  </View>
                </View>
                <View
                  style={{marginTop: StatusBar.currentHeight}}
                  className="w-full absolute items-center  z-[-1] bg-transparent h-full overflow-hidden">
                  <View
                    style={{width: 500, shadowOpacity: 1}}
                    className="h-80  rotate-[45deg] overflow-hidden elevation-[30] shadow-violet-500 absolute z-[-1] rounded-b-full -left-8  bg-white items-center ">
                    <LinearGradient
                      useAngle={true}
                      angle={30}
                      colors={['white', 'blue']}
                      className="w-full h-full"></LinearGradient>
                  </View>
                  <View
                    style={{width: 650, shadowOpacity: 1}}
                    className="h-80 top-5 rotate-[-24deg] elevation-[40]  shadow-cyan-600 left-5 overflow-hidden rounded-b-full  bg-white items-center ">
                    <LinearGradient
                      useAngle={true}
                      angle={90}
                      colors={['#22D3EE', '#3B82F6', '#3B82F6']}
                      className="w-full h-full"></LinearGradient>
                  </View>
                </View>
              </SafeAreaView>
              <View
                style={{height: win.height * 0.3}}
                className="bg-transparent -top-20 relative z-[100] px-7 justify-end">
                <TouchableOpacity
                  onPress={logOut}
                  className="w-full h-11 bg-white rounded-xl flex-row  shadow-lg shadow-slate-500 items-center px-5">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  <Text className="ml-5 text-slate-700 ">Logout</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Spinner visible={loading}></Spinner>
          )}
        </LinearGradient>
      </View>
    </>
  );
}
