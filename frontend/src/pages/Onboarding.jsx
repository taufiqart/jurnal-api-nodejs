import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import calendar from '../assets/calendar.png';
import tw from 'twrnc';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Paragraph} from 'react-native-paper';
import {getItemFor} from '../config/DATA/storageHelper';
import {useIsFocused} from '@react-navigation/native';
import {faPiedPiper} from '@fortawesome/free-brands-svg-icons';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

export default function Onboarding({navigation}) {
  // mendapatkan size screen
  const win = Dimensions.get('window');

  const [user, setUser] = useState();

  // untuk mengecek apakah halaman/screen ini di tampilkan
  const isFocused = useIsFocused();

  // function redirect ke halaman login
  const logIn = () => {
    navigation.navigate('LogIn');
  };

  // function redirect ke halaman daftar
  const signUp = () => {
    navigation.navigate('SignUp');
  };

  useEffect(() => {
    /* 
    function mengecek apakah data user sudah ada di local AsyncStorage
    jika ada maka akan di arahkan ke halaman home
    */
    const checkUser = async () => {
      const userTmp = await getItemFor('user');
      setUser(userTmp);
      if (userTmp) {
        navigation.replace('Bottom', {screen: 'Home'});
      }
    };

    // memanggil function cekuser
    checkUser().catch(error => {
      console.log(error);
    });

    /* 
    [user, ifFocused] digunakan untuk mentriger atau mendeteksi 
    jika ada perubahan data pada salah satu array maka useEffect akan di jalankan ulang
    */
  }, [user, isFocused]);

  return (
    <LinearGradient
      colors={['#6170FF', '#AEDDFF']}
      className="h-full w-full"
      useAngle={true}
      angle={190}>
      {/* safe area view digunakan untuk membuat tampilan di bawah status bar */}
      <SafeAreaView className=" h-full w-full">
        <View className="top-9">
          <View className="flex-row gap-4 w-full flex justify-center">
            <FontAwesomeIcon
              icon={faPiedPiper}
              size={30}
              style={tw`text-white`}
            />
            <Text className="font-semibold text-xl text-white flex justify-center items-center">
              E-JURNAL
            </Text>
          </View>
          <View className="mx-6 mt-9 w-60">
            <Paragraph className="text-white text-2xl font-semibold">
              Aplikasi Absensi dan Jurnal Online
            </Paragraph>
            <Paragraph className="text-white text-lg leading-5 mt-3">
              Pantau siswa pkl dengan aplikasi e-jurnal
            </Paragraph>
          </View>
        </View>
        <View
          style={{top: Math.floor(StatusBar.currentHeight)}}
          className="absolute flex justify-center z-[1] h-full w-full">
          {/* menmpilkan gambar */}
          <Image
            source={calendar}
            style={{width: null, height: 200, resizeMode: 'contain'}}
          />
          {/* akhir menampilkan gambar */}
        </View>
        <View
          style={{
            height: win.height * 0.5,
            width: win.width,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
          className=" mt-auto bg-white bottom-0 "></View>
        <View style={{width: win.width}} className="absolute bottom-0 z-[999]">
          <View className="mt-auto mb-9 mx-8 items-center ">
            {/* button daftar */}
            <TouchableOpacity
              onPress={signUp}
              className="w-full rounded-xl bg-blue-500 h-12 mb-3 justify-center items-center">
              <Text className="text-lg font-semibold text-white">Daftar</Text>
            </TouchableOpacity>
            {/* akhir button daftar */}
            {/* button login */}
            <TouchableOpacity
              onPress={logIn}
              className="w-full rounded-xl border border-blue-500 h-12 mb-3 items-center justify-center">
              <Text className="text-blue-500 text-lg font-semibold">Masuk</Text>
            </TouchableOpacity>
            {/* akhir button login */}
            <Paragraph className="w-60 text-center  text-slate-600 mt-4">
              Masuk atau Daftar untuk mengakses aplikasi
            </Paragraph>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
