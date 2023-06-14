import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {
  faCheck,
  faClockRotateLeft,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default function Card({children, status, icon}) {
  const windowWidth = Dimensions.get('window').width;
  return (
    <View
      style={{width: windowWidth * 0.7}}
      className="p-3 h-28 rounded-xl shadow-lg shadow-slate-400 bg-white mb-7 flex flex-row items-center">
      <View
        className={`w-16 h-16 ${
          status == 'pending'
            ? 'bg-blue-300'
            : status == 'disetujui'
            ? 'bg-green-300'
            : 'bg-red-300'
        } rounded-full flex items-center justify-center`}>
        <FontAwesomeIcon
          icon={
            icon
              ? icon
              : status == 'pending'
              ? faClockRotateLeft
              : status == 'disetujui'
              ? faCheck
              : faTimes
          }
          color="white"
          size={30}
        />
      </View>
      <View className="ml-3">{children}</View>
    </View>
  );
}
