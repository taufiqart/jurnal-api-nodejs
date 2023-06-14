import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import tw from 'twrnc';
import WebView from 'react-native-webview';
import {Paragraph} from 'react-native-paper';

export default function DetailJurnal({route, navigation}) {
  // mendapatkan data yang dikirim melalui route
  let data = route.params.data;
  let user = route.params.user;
  // end
  // mendapatkan lebar dan tinggi layar
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  // end
  let [viewLayout, setViewLayout] = useState(windowHeight);
  console.log(data);

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
            <View
              style={{width: windowWidth}}
              className="absolute flex justify-center items-center">
              <View className="px-7 rounded-full bg-slate-100 py-1">
                <Text className="text-slate-700 text-lg ">Detail Jurnal</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
        {/* container webview */}
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
                Detail Jurnal
              </Text>
              {/* menampilkan nama jika tidak sebagai siswa */}
              {user.data && user?.data?.role != 'siswa' && (
                <View>
                  <Text className="text-slate-600">Nama</Text>
                  <Paragraph className="bg-slate-100 w-full  rounded-lg px-3 py-2">
                    {data.userId?.fullName}
                  </Paragraph>
                </View>
              )}
              {/* end */}
              {/* menampilkan judul jurnal */}
              <View>
                <Text className="text-slate-600">Judul</Text>
                <Paragraph className="bg-slate-100 w-full  rounded-lg px-3 py-2">
                  {data.judul}
                </Paragraph>
              </View>
              {/* end */}
              {/* menampilkan deskripsi jurnal */}
              <View>
                <Text className="text-slate-600">Deskripsi</Text>
                <Paragraph className="bg-slate-100 w-full rounded-lg px-3 py-2">
                  {data.deskripsi}
                </Paragraph>
              </View>
              {/* end */}
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
