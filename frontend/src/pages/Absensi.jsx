import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import tw from 'twrnc';
import SmallCard from '../components/SmallCard';
import {FIREBASE} from '../config/FIREBASE/index';
import {child, onValue, push, ref, set, update} from 'firebase/database';
import {checkUser} from '../config/helper';
import {Paragraph} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import axios from 'axios';
import {BASE_URL} from '../config';

export default function Absensi({route, navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  let [scrollViewHeight, setScrollViewHeight] = useState(windowHeight);
  const [absensi, setAbsensi] = useState('masuk');
  const [absen, setAbsen] = useState(true);
  const [hariIni, setHariIni] = useState(true);
  const [user, setUser] = useState(true);
  const [historyAbsensi, setHistoryAbsensi] = useState({});
  const [lastInput, setLastInput] = useState();
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeout = 15;

  const [frKey, setFrKey] = useState();

  const isFocused = useIsFocused();

  // menyimpan absensi ke firebase
  const absensiStore = absensi => {
    axios
      .post(
        `${BASE_URL}/absensi`,
        {
          absensi: absensi,
          userId: user?.data?._id,
          status: 'pending',
        },
        {
          headers: {Authorization: 'Bearer ' + user?.token},
        },
      )
      .then(() => {
        getAbsensi();
      })
      .catch(error => console.log(error));
  };
  // end

  // mendapatkan semua data absensi
  const getAbsensi = () => {
    if (user) {
      axios
        .get(`${BASE_URL}/absensi`, {
          headers: {Authorization: 'Bearer ' + user?.token},
        })
        .then(({data}) => {
          setHistoryAbsensi(data);
        })
        .catch(error => {
          console.log({error});
        });
    }
  };
  // end
  // menampilkan loader spinner
  useEffect(() => {
    setLoading(true);
    // menghilangkan loader spinner setelah 1000 milidetik
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // end
  }, []);
  // end

  // check data user dan user?.data
  useEffect(() => {
    if (route.params?.user) {
      setUser(route.params.user);
    }
  }, [isFocused, loading]);
  // end

  useEffect(() => {
    // memanggil function getabsensi
    getAbsensi();
    // end
  }, [loading, user, isFocused]);

  useEffect(() => {
    // jika ada data history absensi maka ambil data absensi terbaru
    if (historyAbsensi) {
      setLastInput(historyAbsensi[0]);
    }
    // end
    /*
    jka ada data absensi terbaru 
    check apakah absen pulang atau masuk
    jika absen masuk dan tanggal merupakan hari ini maka tampilkan button absen pulang 
    setelah 15 menit atau waktu yang ditentukan
      jika tidak hari ini maka tampilkan button absen masuk
    jika absen pulang maka cek apakah tanggal merupakan hari ini 
      jika hari ini maka tampilkan pesan anda sudah absen
    */
    if (lastInput) {
      let tanggal = Date.now();

      setHariIni(
        new Date(lastInput.tanggal).getDay() == new Date(tanggal).getDay(),
      );

      setHide(
        lastInput.tanggal + 60 * 600 * timeout >= tanggal &&
          lastInput.absensi == 'masuk',
      );
      if (lastInput.absensi == 'pulang' && hariIni) {
        setAbsen(false);
      } else if (lastInput.absensi == 'masuk' && hariIni) {
        setAbsen(true);
        setAbsensi('pulang');
      } else {
        setAbsen(true);
        setAbsensi('masuk');
      }
    } else {
      setAbsen(true);
      setAbsensi('masuk');
    }
  });
  // end

  // button comfirmasi absensi jika role pembimbing
  const confirmAbsensi = (status, id) => {
    if (user) {
      axios
        .post(
          `${BASE_URL}/absensi/${id}/status`,
          {
            status,
          },
          {headers: {Authorization: 'Bearer ' + user?.token}},
        )
        .then(data => {
          console.log(data);
          getAbsensi();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  // end

  return (
    <LinearGradient
      colors={['#6170FF', '#AEDDFF']}
      className="h-full w-[600px]"
      useAngle={true}
      angle={90}>
      {/* merubah style satatus bar menjadi warna hitam */}
      <StatusBar barStyle="dark-content" />
      {/* end */}
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
                <Text className="text-slate-700 text-lg ">Absensi</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
        {/* jika tidak loading maka tampilkan absensi */}
        {!loading ? (
          <>
            {/* jika role siswa dan jika tidak di hide dan jika absen maka tampilkan button absen   */}
            {user?.data?.role == 'siswa' &&
              (!hide ? (
                absen ? (
                  <View className="px-5  w-full my-12">
                    {/* button absensi */}
                    <TouchableOpacity
                      accessible={false}
                      onPress={() => {
                        if (absensi == 'masuk') {
                          absensiStore('masuk');
                        } else if (absensi != 'masuk') {
                          absensiStore('pulang');
                        }
                      }}
                      className={`w-full ${
                        absensi == 'masuk' ? 'bg-blue-300' : 'bg-red-300'
                      } px-5 h-28 rounded-2xl flex justify-center items-center shadow-xl shadow-black`}>
                      <Text
                        className={`${
                          absensi == 'masuk' ? 'text-blue-900' : 'text-red-900'
                        } text-2xl font-semibold capitalize`}>
                        Absen {absensi}
                      </Text>
                    </TouchableOpacity>
                    {/* end */}
                  </View>
                ) : (
                  <View className="px-5  w-full my-10">
                    <View
                      className={`w-full bg-gray-300 px-5 h-28 rounded-2xl flex justify-center items-center shadow-xl shadow-black`}>
                      <Text className={`text-slate-600 text-2xl font-semibold`}>
                        Anda sudah absen
                      </Text>
                      <Paragraph className="text-lg text-slate-500 leading-5">
                        Sampai jumpa besok
                      </Paragraph>
                    </View>
                  </View>
                )
              ) : (
                <View className="px-5  w-full my-10">
                  <View
                    className={`w-full bg-gray-300 px-5 h-28 rounded-2xl flex justify-center items-center shadow-xl shadow-black`}>
                    <Paragraph
                      className={`text-slate-600 text-lg text-center mx-5 font-semibold`}>
                      Absen pulang aktif setelah {timeout} menit absen masuk
                    </Paragraph>
                  </View>
                </View>
              ))}
            {/* end */}
            {/* jika ada data history maka tampilkan list history */}
            {historyAbsensi && (
              <View
                className={`w-full h-full overflow-hidden rounded-t-3xl ${
                  user?.data?.role != 'siswa' && 'mt-10'
                } bg-red-400 `}
                onLayout={event => {
                  // mendapatkan posisi y dari view
                  const {x, y, width, height} = event.nativeEvent.layout;
                  setScrollViewHeight(
                    windowHeight - y + StatusBar.currentHeight,
                  );
                  // end
                }}
                style={{height: scrollViewHeight}}>
                <LinearGradient
                  colors={['white', '#F2F3F7']}
                  style={{height: scrollViewHeight}}
                  className="w-full">
                  <ScrollView
                    style={{height: scrollViewHeight}}
                    className="w-full p-5">
                    {
                      historyAbsensi &&
                        historyAbsensi.length > 0 &&
                        // looping dan reverse urutan data absensi
                        Object.keys(historyAbsensi).map(key => {
                          return (
                            // memanggil SmallCard dari component
                            <SmallCard
                              status={historyAbsensi[key].status}
                              key={key}>
                              {/* menampilkan data tanggal */}
                              <Text className="text-slate-600">
                                {new Date(
                                  historyAbsensi[key].tanggal,
                                ).toLocaleString()}
                              </Text>
                              {/* end */}
                              {/* menampilkan nama jika tidak sebagai siswa */}
                              {user?.data?.role != 'siswa' && (
                                <Text className="text-slate-600">
                                  {historyAbsensi[key]?.userId?.fullName}
                                </Text>
                              )}
                              {/* end */}
                              {/* menampilkan data status absensi */}
                              <Text className="text-slate-600">
                                {historyAbsensi[key].absensi}
                              </Text>
                              {/* end */}
                              {/* jika sebagai pembimbing maka tampilkan button konfirmasi */}
                              {user?.data?.role == 'pembimbing' && (
                                <View className="flex-row mx-6 mt-2 ml-8 flex  ">
                                  {/* button setuju */}
                                  <TouchableOpacity
                                    disabled={
                                      historyAbsensi[key].status == 'disetujui'
                                    }
                                    onPress={() => {
                                      confirmAbsensi(
                                        'disetujui',
                                        historyAbsensi[key]._id,
                                      );
                                    }}
                                    className={`${
                                      historyAbsensi[key].status != 'disetujui'
                                        ? 'bg-green-300'
                                        : 'bg-slate-100'
                                    } py-1 px-5 mr-5  rounded-lg text-center justify-center items-center `}>
                                    <Text className="text-slate-500">
                                      Setujui
                                    </Text>
                                  </TouchableOpacity>
                                  {/* end */}
                                  {/* button tolak */}
                                  <TouchableOpacity
                                    disabled={
                                      historyAbsensi[key].status == 'ditolak'
                                    }
                                    onPress={() => {
                                      confirmAbsensi(
                                        'ditolak',
                                        historyAbsensi[key]._id,
                                      );
                                    }}
                                    className={`${
                                      historyAbsensi[key].status != 'ditolak'
                                        ? 'bg-red-200'
                                        : 'bg-slate-100'
                                    } py-1 px-5 rounded-lg text-center justify-center items-center `}>
                                    <Text className="text-slate-500">
                                      Tolak
                                    </Text>
                                  </TouchableOpacity>
                                  {/* end */}
                                </View>
                              )}
                              {/* end */}
                            </SmallCard>
                            // end
                          );
                        })
                      // end
                    }
                    <View className="h-10"></View>
                  </ScrollView>
                </LinearGradient>
              </View>
            )}
          </>
        ) : (
          <Spinner visible={loading}></Spinner>
        )}
        {/* end */}
      </View>
    </LinearGradient>
  );
}
