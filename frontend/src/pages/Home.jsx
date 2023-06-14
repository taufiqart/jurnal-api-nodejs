import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleRight,
  faBook,
  faClipboardUser,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import Card from '../components/Card';
import {Paragraph} from 'react-native-paper';
import {FIREBASE} from '../config/FIREBASE';
import {onValue, ref} from 'firebase/database';
import {checkUser} from '../config/helper';
import {faPiedPiper} from '@fortawesome/free-brands-svg-icons';
import {useIsFocused} from '@react-navigation/native';
import tw from 'twrnc';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import axios from 'axios';
import {BASE_URL} from '../config';
export default function Home({navigation}) {
  const isFocused = useIsFocused();

  const isDarkMode = useColorScheme() == 'dark';
  const windowWidth = Dimensions.get('window').width;
  const [historyAbsensi, setHistoryAbsensi] = useState();
  const [historyJurnal, setHistoryJurnal] = useState();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const h = new Date().getHours();
  const [greeting, setGreeting] = useState('Selamat pagi');

  // function redirect ke absensi
  const showAllAbsensi = () => {
    navigation.navigate('Absensi', {user});
  };
  // end
  // function redirect ke jurnal
  const showAllJurnal = () => {
    navigation.navigate('Jurnal', {user});
  };
  // end

  // mengucapkan selamat
  useEffect(() => {
    if (h >= 3 && h <= 9) {
      setGreeting('Selamat pagi.');
    } else if (h >= 9 && h <= 15) {
      setGreeting('Selamat siang.');
    } else if (h >= 15 && h <= 18) {
      setGreeting('Selamat sore.');
    } else {
      setGreeting('Selamat malam.');
    }
  }, [h, isFocused]);
  // end

  useEffect(() => {
    // tampilkan loader spinner
    setLoading(true);
    // end
    // hilangkan loader spiner setelah 1000 milidetik
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // end
  }, []);

  // mendapatkan history absensi
  const getHistoryAbsensi = () => {
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
  // mendapatkan history jurnal
  const getHistoryJurnal = () => {
    if (user) {
      axios
        .get(`${BASE_URL}/jurnal`, {
          headers: {Authorization: 'Bearer ' + user?.token},
        })
        .then(({data}) => {
          console.log(data);
          setHistoryJurnal(data);
        })
        .catch(error => {
          console.log({error});
        });
    }
  };
  // end

  /* 
    memanggil function getUser,getHistoryAbsensi,getHistoryJurnal 
    pada pertama kali halaman di tmapilkan atau
    jika ada perubahan pada data user atau isFocused atau loading
  */
  useEffect(() => {
    checkUser({setUser, navigation}).catch(error => {
      console.log(error);
    });
    getHistoryAbsensi();
    getHistoryJurnal();
  }, [loading, isFocused]);
  // end

  return (
    <>
      {/* merubah style statusbar */}
      <StatusBar barStyle={'light-content'} />
      {/* end */}
      <LinearGradient
        colors={['#6170FF', '#AEDDFF']}
        className="h-full w-[600px]"
        useAngle={true}
        angle={90}>
        <SafeAreaView
          style={{
            marginTop: Math.floor(StatusBar.currentHeight) + 5,
            width: windowWidth,
          }}
          className={`text-white absolute z-10 h-full`}>
          <View
            style={{display: 'flex'}}
            className="w-full h-14  px-5 justify-between flex-row items-center">
            <View>
              <Text className="text-lg text-white">{greeting}</Text>
              <Text className="font-bold text-xl text-white">
                {user?.data?.fullName}
              </Text>
            </View>
            <View className="flex flex-row bg-white p-3 rounded-full">
              <FontAwesomeIcon
                className=""
                size={20}
                icon={faUser}
                color="#818181"
              />
            </View>
          </View>
          <View className="bg-white h-14 mt-5 rounded-2xl overflow-hidden mx-5">
            <LinearGradient
              colors={['#7DD3FC', '#ECFEFF', '#A5F3FC']}
              useAngle={true}
              angle={120}
              className="h-full items-center justify-center">
              <View className="flex-row gap-x-3">
                <FontAwesomeIcon
                  icon={faPiedPiper}
                  size={30}
                  style={tw`text-cyan-900`}
                />

                <Text className="text-cyan-900 font-semibold text-xl">
                  E-Jurnal
                </Text>
              </View>
              <Paragraph className="leading-3 text-cyan-900">
                Aplikasi Jurnal dan Absensi
              </Paragraph>
            </LinearGradient>
          </View>
          <View className="w-full h-full rounded-t-3xl overflow-hidden bg-white mt-8">
            <LinearGradient colors={['white', '#F2F3F7']} className=" h-full">
              {!loading ? (
                <>
                  <View className="my-5 px-5  h-20 gap-x-4  flex flex-row">
                    {/* button absensi */}
                    <TouchableOpacity
                      onPress={showAllAbsensi}
                      className="w-auto flex-1 rounded-lg shadow-md shadow-green-400  bg-green-200 flex flex-row justify-center items-center">
                      <View className="bg-white  rounded-full h-12 w-12 justify-center items-center flex">
                        <FontAwesomeIcon
                          icon={faClipboardUser}
                          size={30}
                          color="#166534"
                        />
                      </View>

                      <Text className="ml-2 text-lg text-green-800">
                        Absensi
                      </Text>
                    </TouchableOpacity>
                    {/* end */}
                    {/* button jurnal */}
                    <TouchableOpacity
                      onPress={showAllJurnal}
                      className="w-auto flex-1 rounded-lg shadow-md shadow-fuchsia-600   bg-purple-200 flex flex-row justify-center items-center">
                      <View className="bg-white  rounded-full h-12 w-12 justify-center items-center flex">
                        <FontAwesomeIcon
                          icon={faBook}
                          size={30}
                          color="#6B21A8"
                        />
                      </View>
                      <Text className="ml-2 text-lg text-purple-800">
                        Jurnal
                      </Text>
                    </TouchableOpacity>
                    {/* end */}
                  </View>
                  <View className="px-5">
                    <Text className="text-black text-[16px] font-bold">
                      {user?.data?.role == 'siswa' ? 'History' : 'Laporan'}{' '}
                      Absensi
                    </Text>
                  </View>
                  {/* menampilkan history absensi jika ada */}
                  {historyAbsensi && historyAbsensi.length > 0 ? (
                    <View
                      style={{flexDirection: 'row'}}
                      className="w-full mt-2">
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        className="w-full gap-x-4 pl-5">
                        {/* menampilkan history absensi jika ada */}
                        {historyAbsensi &&
                          Object.keys(historyAbsensi)
                            .splice(0, 4)
                            .map((key, indx) => {
                              return (
                                <View key={indx}>
                                  <Card
                                    status={historyAbsensi[key].status}
                                    type={'absensi'}>
                                    <Text className="text-black">
                                      {new Date(
                                        historyAbsensi[key].tanggal,
                                      ).toLocaleString()}
                                    </Text>
                                    {user?.data.role != 'siswa' && (
                                      <Paragraph className="text-black w-40">
                                        {historyAbsensi[key].userId?.fullName}
                                      </Paragraph>
                                    )}
                                    <Text className="text-black">
                                      Absensi : {historyAbsensi[key].absensi}
                                    </Text>
                                    <Text className="text-black">
                                      Status : {historyAbsensi[key].status}
                                    </Text>
                                  </Card>
                                </View>
                              );
                            })}
                        {/* end */}
                        {/* menampilkan button show all jika absensi lebih dari 3 */}
                        {historyAbsensi &&
                        Object.keys(historyAbsensi).length > 3 ? (
                          <View className="flex justify-center items-center h-28 pr-10">
                            <TouchableOpacity
                              onPress={showAllAbsensi}
                              className="w-20 h-20 bg-white shadow-xl shadow-slate-400 rounded-full flex justify-center items-center">
                              <FontAwesomeIcon
                                icon={faAngleRight}
                                color="black"
                                size={30}
                              />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View className="pr-5"></View>
                        )}
                        {/* end */}
                      </ScrollView>
                    </View>
                  ) : (
                    <View className="flex justify-center items-center h-28 py-2 px-10 ">
                      <View className="w-full h-full bg-white shadow-xl shadow-slate-400 rounded-2xl flex justify-center items-center">
                        <Paragraph className="text-[17px] px-4 text-center text-slate-600">
                          {user?.role == 'siswa'
                            ? 'Kamu belum melakukan Absensi'
                            : 'Belum ada absensi'}
                        </Paragraph>
                      </View>
                    </View>
                  )}
                  {/* end */}
                  <View className="px-5">
                    <Text className="text-black text-[16px] font-bold">
                      {user?.data?.role == 'siswa' ? 'History' : 'Laporan'}{' '}
                      Jurnal
                    </Text>
                  </View>
                  {/* menampilkan history jurnal jika ada */}
                  {historyJurnal && historyJurnal.length > 0 ? (
                    <View
                      style={{flexDirection: 'row'}}
                      className="w-full mt-2">
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        className="w-full gap-x-4 pl-5">
                        {/* menampilkan history jurnal jika ada */}
                        {Object.keys(historyJurnal) &&
                          Object.keys(historyJurnal)
                            .splice(0, 4)
                            .map(key => {
                              return (
                                <TouchableOpacity
                                  activeOpacity={0.8}
                                  key={key}
                                  onPress={() => {
                                    navigation.navigate('DetailJurnal', {
                                      data: historyJurnal[key],
                                      user: user,
                                    });
                                  }}>
                                  <Card status={'disetujui'} icon={faPiedPiper}>
                                    <Text className="text-black text-[12px]">
                                      {new Date(
                                        historyJurnal[key].tanggal,
                                      ).toLocaleString()}
                                    </Text>
                                    {user.data?.role != 'siswa' && (
                                      <Paragraph className="text-black w-40">
                                        {historyJurnal[key].userId?.fullName}
                                      </Paragraph>
                                    )}
                                    <Paragraph className="text-black">
                                      {historyJurnal[key].judul}
                                    </Paragraph>
                                  </Card>
                                </TouchableOpacity>
                              );
                            })}
                        {/* end */}
                        {/* menampilkan button show all jika data jurnal lebih dari 3 */}
                        {historyJurnal &&
                        Object.keys(historyJurnal).length > 3 ? (
                          <View className="flex justify-center items-center h-28 pr-10 ">
                            <TouchableOpacity
                              onPress={showAllJurnal}
                              className="w-20 h-20 bg-white shadow-xl shadow-slate-400 rounded-full flex justify-center items-center">
                              <FontAwesomeIcon
                                icon={faAngleRight}
                                color="black"
                                size={30}
                              />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View className="pr-5"></View>
                        )}
                        {/* end */}
                      </ScrollView>
                    </View>
                  ) : (
                    <View className="flex justify-center items-center h-28 py-2 px-10 ">
                      <View className="w-full h-full bg-white shadow-xl shadow-slate-400 rounded-2xl flex justify-center items-center">
                        <Paragraph className="text-[17px] px-4 text-center text-slate-600">
                          {user?.data?.role == 'siswa'
                            ? 'Kamu belum mengisi Jurnal'
                            : 'Belum ada jurnal'}
                        </Paragraph>
                      </View>
                    </View>
                  )}
                  {/* end jurnal */}
                </>
              ) : (
                <Spinner visible={loading}></Spinner>
              )}
            </LinearGradient>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}
