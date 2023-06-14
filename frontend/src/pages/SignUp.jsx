import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native';
import tw from 'twrnc';
import SelectDropdown from 'react-native-select-dropdown';
import {
  faChevronDown,
  faChevronUp,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Paragraph} from 'react-native-paper';
import {WebView} from 'react-native-webview';

import Spinner from 'react-native-loading-spinner-overlay/lib';
import {setItem} from '../config/DATA/storageHelper';
import {BASE_URL} from '../config';
import axios from 'axios';

export default function SignUp({navigation}) {
  const roles = ['Siswa', 'Pembimbing', 'Humas'];
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

  const signUp = () => {
    setLoading(true);
    setError({});
    axios
      .post(BASE_URL + '/auth/signup', {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,
      })
      .then(async res => {
        let data = res.data.data;
        data['token'] = res.data.token;
        ToastAndroid.show('Berhasil mendaftar', ToastAndroid.SHORT);

        await setItem('user', JSON.stringify(res.data));
        navigation.replace('Bottom');
        setLoading(false);
      })
      .catch(error => {
        if (error.response.data) {
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

        ToastAndroid.show('Gagal mendaftar', ToastAndroid.SHORT);
      });
    // end
  };
  return (
    <>
      {/* loader spinner */}
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={tw`text-white`}
      />
      {/* end */}
      {/* background gradient */}
      <LinearGradient
        colors={['#6170FF', '#AEDDFF']}
        className="h-full w-full"
        useAngle={true}
        angle={190}>
        {/* container web view */}
        <View
          style={{
            width: win.width,
            height: win.height + StatusBar.currentHeight,
          }}
          className=" absolute">
          {/* webview menampilkan animasi lottie atau html lainya */}
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
              Daftar
            </Text>
            {/* container inputan nama */}
            <View className="mb-2">
              {/* inputan nama */}
              <TextInput
                className="bg-white/50 border border-slate-400  rounded-xl px-3 py-2 text-slate-800"
                placeholder="Nama Lengkap"
                placeholderTextColor={'#64748B'}
                name="fullName"
                value={data?.fullName ?? ''}
                onChangeText={value => changeData('fullName', value)}
              />
              {/* end */}
              {/* menampilkan error jika ada */}
              {error && error.fullName && (
                <Text className="text-red-400">{error.fullName.error}</Text>
              )}
              {/* end */}
            </View>
            {/* end */}
            {/* container inputan email */}
            <View className="mb-2">
              {/* inputan email */}
              <TextInput
                className="bg-white/50 border border-slate-400  rounded-xl px-3 py-2 text-slate-800"
                placeholder="Email"
                placeholderTextColor={'#64748B'}
                value={data?.email ?? ''}
                onChangeText={value => changeData('email', value)}
              />
              {/* end */}
              {/* menampilkan error jika ada */}
              {error && error.email && (
                <Text className="text-red-400">{error.email.error}</Text>
              )}
              {/* end */}
            </View>
            {/* end */}
            {/* container inputan password */}
            <View className="mb-2">
              {/* inputan password */}
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
              {/* end */}
              {/* menampilkan error jika ada */}
              {error && error.password && (
                <Text className="text-red-400">{error.password.error}</Text>
              )}
              {/* end */}
            </View>
            {/* end */}
            {/* container dropdown */}
            <View>
              {/* menampilkan dropdown pilihan role */}
              <SelectDropdown
                data={roles}
                onSelect={(selectedItem, index) => {
                  changeData('role', selectedItem.toLowerCase());
                }}
                buttonStyle={tw`bg-white/50 w-full rounded-xl border border-slate-400 shadow-none py-2 px-3 h-10`}
                buttonTextStyle={tw`text-sm text-slate-800`}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                defaultButtonText={'Daftar Sebagai'}
                dropdownStyle={tw`rounded-xl`}
                renderDropdownIcon={isOpened => {
                  return (
                    <FontAwesomeIcon
                      icon={isOpened ? faChevronUp : faChevronDown}
                      style={tw`text-slate-800`}
                      size={15}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
              />
              {/* end */}
              {/* menampilkan error jika ada */}
              {error && error.role && (
                <Text className="text-red-400">{error.role.error}</Text>
              )}
              {/* end */}
            </View>
            {/* end */}
            {/* button daftar */}
            <TouchableOpacity
              onPress={signUp}
              className="w-full h-10 rounded-xl bg-blue-500 mt-5 overflow-hidden">
              <LinearGradient
                colors={['#60A5FA', '#0EA5E9']}
                useAngle={true}
                angle={80}
                className="h-full w-full flex justify-center items-center">
                <Text className="text-lg text-white ">Daftar</Text>
              </LinearGradient>
            </TouchableOpacity>
            {/* end */}
            {/* container text */}
            <View className="w-full text-center justify-center items-center mt-2 flex-row ">
              <Paragraph className="text-slate-600 mr-1">
                Sudah punya akun
              </Paragraph>
              {/* button text ke login */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LogIn');
                }}>
                <Text className="text-blue-600">login</Text>
              </TouchableOpacity>
              {/* end */}
            </View>
            {/* end */}
          </View>
        </SafeAreaView>
      </LinearGradient>
      {/* end */}
    </>
  );
}
