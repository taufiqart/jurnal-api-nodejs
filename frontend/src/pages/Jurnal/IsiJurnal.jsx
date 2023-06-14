import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import tw from 'twrnc';
import {FIREBASE} from '../../config/FIREBASE/index';
import {child, push, ref, set} from 'firebase/database';
import {checkUser} from '../../config/helper';
import WebView from 'react-native-webview';
import {BASE_URL} from '../../config';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

export default function IsiJurnal({route, navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  let [viewLayout, setViewLayout] = useState(windowHeight);
  const [user, setUser] = useState(true);
  const [data, setData] = useState({});
  const [frKey, setFrKey] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const isFocused = useIsFocused()
  // menyimpan inputan ke dalam variable data
  const onChange = (key, value) => {
    setData({...data, [key]: value});
  };
  // end
  // menyimpan jurnal ke firebase
  const storeJurnal = (data, key) => {
    // tampilkan loading
    setLoading(true);
    // end
    // set error menjadi null object
    setError({});
    // end

    if (user) {
      console.log();
      axios
        .post(
          `${BASE_URL}/jurnal`,
          {
            judul: data.judul,
            deskripsi: data.deskripsi,
            userId: user?.data?._id,
          },
          {
            headers: {
              Authorization: 'Bearer ' + user.token,
            },
          },
        )
        .then(() => {
          setLoading(false);
          // tampilkan notifikasi toast jika berhasil
          ToastAndroid.showWithGravity(
            'Berhasil mengisi jurnal',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          // end
          // redirect ke halaman sebelumnya
          navigation.goBack();
          // end
        })
        .catch(error => {
          setLoading(false);
          // tampilkan notifikasi toast jika gagal
          ToastAndroid.showWithGravity(
            'Gagal mengisi jurnal',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          // end
          console.log(error);
        });
    } else {
      setLoading(false);
    }
    // end
  };
  // end

  useEffect(() => {
    if (route.params?.user) {
      setUser(route.params?.user);
    }
  }, [loading,isFocused]);

  return (
    <LinearGradient
      colors={['#6170FF', '#AEDDFF']}
      className="h-full w-[600px]"
      useAngle={true}
      angle={90}>
      <StatusBar barStyle="dark-content" />
      <View style={{width: windowWidth}}>
        <SafeAreaView className="bg-white h-24 w-full rounded-b-3xl overflow-hidden">
          <View className="flex px-5 h-full  flex-row items-center">
            {/* button kembali ke halaman sebelumnya */}
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              className="p-2 rounded-full absolute mx-5 z-20 bg-slate-100">
              <FontAwesomeIcon
                icon={faArrowLeft}
                size={20}
                style={tw`text-slate-700`}
              />
            </TouchableOpacity>
            {/* end */}
            <View
              style={{width: windowWidth}}
              className="absolute flex justify-center items-center">
              <View className="px-7 rounded-full bg-slate-100 py-1">
                <Text className="text-slate-700 text-lg ">Isi Jurnal</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
        {/* container animasi */}
        <View
          style={{top: StatusBar.currentHeight + 80}}
          className="w-full h-full absolute z-[-1]">
          {/* menampilkan animasi lottie dengan webview */}
          <WebView
            className=" h-full w-full bg-transparent"
            source={{
              html: `<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
            <div style="height:100vh;position:absolute; display:flex; justify-content:space-between; align-items:center;flex-direction:column;">
            <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_3adn32pc.json"  background="transparent"  speed="1"  style="width: 100%; height: 700px;"  loop  autoplay></lottie-player>
            <lottie-player src="https://assets7.lottiefiles.com/datafiles/N8DaINa2dmLOJja/data.json"  background="transparent"  speed="1"  style="width: 100%; height: 900px;"  loop  autoplay></lottie-player>
            </div>`,
            }}></WebView>
          {/* end */}
        </View>
        {/* end */}
        <View
          onLayout={event => {
            const {x, y, width, height} = event.nativeEvent.layout;
            setViewLayout(windowHeight - y - StatusBar.currentHeight);
          }}
          style={{
            height: viewLayout,
          }}
          className="mt-8 mx-4 flex justify-center">
          <View className=" py-5 px-6 bg-white/60 border border-white rounded-xl">
            <View className="gap-y-6">
              <Text className="text-slate-500 text-xl font-semibold text-center">
                Isi Jurnal
              </Text>
              {/* container inputan judul */}
              <View>
                {/* inputan judul jurnal */}
                <TextInput
                  className=" bg-white text-black rounded-lg border-none px-3  shadow-md shadow-slate-500"
                  placeholder="Judul"
                  placeholderTextColor={'#A3A3A3'}
                  onChangeText={value => {
                    onChange('judul', value);
                  }}
                  value={data.judul}
                />
                {/* end */}
                {/* menampilkan error jika ada */}
                {error && error.judul && (
                  <Text className="text-red-400">{error.judul}</Text>
                )}
                {/* end */}
              </View>
              {/* end */}
              {/* container inputan deskripsi */}
              <View>
                {/* inputan deskripsi */}
                <TextInput
                  onChangeText={value => {
                    onChange('deskripsi', value);
                  }}
                  value={data.deskripsi}
                  className=" bg-white text-black content-start rounded-lg border-none px-3 shadow-md shadow-slate-500"
                  placeholder="Deskripsi"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  textAlignVertical="top"
                  editable
                  multiline
                  numberOfLines={6}
                  placeholderTextColor={'#A3A3A3'}
                />
                {/* end */}
                {/* menampilkan error jika ada */}
                {error && error.deskripsi && (
                  <Text className="text-red-400">{error.deskripsi}</Text>
                )}
                {/* end */}
              </View>
              {/* end */}
              {/* buttom simpan jurnal */}
              <TouchableOpacity
                onPress={() => {
                  storeJurnal(data, frKey);
                }}
                className="h-10 bg-white rounded-lg overflow-hidden elevation-[5] shadow-slate-500 w-full">
                <LinearGradient
                  colors={['#7DD3FC', '#2563EB']}
                  useAngle={true}
                  angle={45}
                  className="justify-center items-center w-full h-full ">
                  <Text className="text-white text-center text-lg font-semibold">
                    Kirim
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              {/* end */}
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
