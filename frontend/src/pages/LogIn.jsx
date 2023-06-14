import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Paragraph} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import WebView from 'react-native-webview';
import tw from 'twrnc';
import {setItem} from '../config/DATA/storageHelper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {BASE_URL} from '../config';
import axios from 'axios';

export default function LogIn({navigation}) {
  const win = Dimensions.get('window');
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  // menyimpan inputan text ke variable data
  const changeData = (name, value) => {
    setData({...data, [name]: value});
  };
  // end

  // function login
  const logIn = () => {
    // mengaktifkan loader spinner
    setLoading(true);
    // end
    // menset variable error menjadi null object
    setError({});
    // end
    axios
      .post(BASE_URL + '/auth/login', {
        email: data.email,
        password: data.password,
      })
      .then(async ({data}) => {
        ToastAndroid.show('Berhasil masuk', ToastAndroid.SHORT);

        await setItem('user', JSON.stringify(data)).catch(error =>
          console.log(error),
        );
        navigation.replace('Bottom');
        setLoading(false);
      })
      .catch(error => {
        if (error.response?.data) {
          let errorResponse = error.response.data;
          errorResponse && setError(errorResponse);
          console.log(errorResponse);
        }
        if (error.request.headers) {
          console.log(error.request.headers);
        }
        if (error.request.status) {
          console.log(error.request.status);
        }
        setLoading(false);

        ToastAndroid.show('Gagal masuk', ToastAndroid.SHORT);
      });
  };
  // end
  return (
    <LinearGradient
      colors={['#6170FF', '#AEDDFF']}
      className="h-full w-full"
      useAngle={true}
      angle={190}>
      {/* container webview animasi */}
      <View
        style={{width: win.width, height: win.height + StatusBar.currentHeight}}
        className=" absolute">
        {/* menampilkan animasi lottie dengan WebView */}
        <WebView
          className="bg-transparent"
          source={{
            html: `<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
              <div style="height:60vh; display:flex; justify-content:center; align-items:center;flex-direction:column;">
              <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_zw0djhar.json"  background="transparent"  speed="1"  style="width: 100%; height: 900px;"  loop  autoplay></lottie-player>
              <lottie-player src="https://assets7.lottiefiles.com/datafiles/N8DaINa2dmLOJja/data.json"  background="transparent"  speed="1"  style="width: 100%; height: 900px;position:absolute; bottom:-100px;"  loop  autoplay></lottie-player>
              </div>`,
          }}
          style={{height: 10}}
        />
        {/* end */}
      </View>
      {/* end */}
      <SafeAreaView className="h-full w-full px-6 justify-center">
        <View className="bg-white/70 w-full   rounded-xl p-5 ">
          <Text className="text-slate-800 font-semibold text-xl text-center mb-3">
            Masuk
          </Text>
          {/* container inputan email */}
          <View className="mb-2">
            {/* inputan text */}
            <TextInput
              className="bg-white/50 border border-slate-400  rounded-xl px-3 py-1 text-slate-800"
              placeholder="Email"
              placeholderTextColor={'#64748B'}
              value={data?.email ?? ''}
              // mentriger input keyboard
              onChangeText={value => changeData('email', value)}
              // end
            />
            {/* end */}
            {/* menampilkan error jika ada */}
            {error && error.email && (
              <Text className="text-red-400">{error.email.error}</Text>
            )}
            {/* end */}
          </View>
          {/* end */}
          <View className="mb-2">
            <View className="bg-white/50 border border-slate-400 rounded-xl text-slate-800 flex-row items-center justify-between">
              <TextInput
                className="px-3 py-1 text-slate-800 bg-transparent flex-1"
                placeholder="Password"
                secureTextEntry={showPassword}
                placeholderTextColor={'#64748B'}
                value={data?.password ?? ''}
                // mentriger input keyboard
                onChangeText={value => changeData('password', value)}
                // end
              />
              <TouchableOpacity
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
                className="mr-4 ml-1">
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            {/* menampilkan pesan error jika ada */}
            {error && error.password && (
              <Text className="text-red-400">{error.password.error}</Text>
            )}
            {/* end */}
          </View>
          {/* button login */}
          <TouchableOpacity
            onPress={logIn}
            className="w-full h-10 rounded-xl bg-blue-500 mt-5 overflow-hidden">
            {/* background gradient */}
            <LinearGradient
              colors={['#60A5FA', '#0EA5E9']}
              useAngle={true}
              angle={80}
              className="h-full w-full flex justify-center items-center">
              <Text className="text-lg text-white ">Masuk</Text>
            </LinearGradient>
            {/* end */}
          </TouchableOpacity>
          {/* end */}
          {/* container text */}
          <View className="w-full text-center justify-center items-center mt-2 flex-row ">
            <Paragraph className="text-slate-600 mr-1">
              Belum punya akun
            </Paragraph>
            <TouchableOpacity
              onPress={() => {
                // redirect ke halaman daftar
                navigation.navigate('SignUp');
                // end
              }}>
              <Text className="text-blue-600">daftar</Text>
            </TouchableOpacity>
          </View>
          {/* end */}
        </View>
      </SafeAreaView>

      {/* untuk loading spinner */}
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={tw`text-white`}
      />
      {/* end */}
    </LinearGradient>
  );
}
