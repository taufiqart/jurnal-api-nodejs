import {View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCheck,
  faClockRotateLeft,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

export default function SmallCard({children, status, icon}) {
  return (
    <View className="p-3 m-1 rounded-xl shadow-lg shadow-slate-400 bg-white flex flex-row items-center">
      <View
        className={`w-9 h-9 ${
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
          size={20}
        />
      </View>
      <View className="ml-3">{children}</View>
    </View>
  );
}
