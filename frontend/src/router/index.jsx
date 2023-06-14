import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {getItemFor} from '../config/DATA/storageHelper';

import Absensi from '../pages/Absensi';
import BottomBar from '../navigation/index';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import Onboarding from '../pages/Onboarding';
import Jurnal from '../pages/Jurnal';
import IsiJurnal from '../pages/Jurnal/IsiJurnal';
import DetailJurnal from '../pages/Jurnal/DetailJurnal';

// memebuat stack navigator
const Stack = createNativeStackNavigator();
// end

export default function Router() {
  const [initialRouteName, setInitialRouteName] = useState();
  // useEffect di jalankan pertama kali halaman di kunjungi
  useEffect(() => {
    // function check apakah user ada jika ada default route Bottom jika tidak maka default route Onboarding
    const checkUser = async () => {
      const user = await getItemFor('user');
      if (user) {
        setInitialRouteName('Bottom');
      } else {
        setInitialRouteName('Onboarding');
      }
    };
    // end
    // memanggil function checkUser
    checkUser();
    // end
  }, []);
  // end
  return (
    <>
      <Stack.Navigator
        // halaman yang pertama kali di buka
        initialRouteName={initialRouteName}
        // end
      >
        {/* mendefinisikan routeName halaman Bottom atau halaman denga bottom bar */}
        <Stack.Screen
          name="Bottom"
          component={BottomBar}
          // disable top bar
          options={{headerShown: false}}
          // end
        />
        {/* end */}

        {/* mendefinisikan routeName halamn absensi */}
        <Stack.Screen
          name="Absensi"
          component={Absensi}
          // disable top bar
          options={{headerShown: false}}
          // end
        />
        {/* end */}

        {/* mendefinisikan routeName halaman Jurnal */}
        <Stack.Screen
          name="Jurnal"
          component={Jurnal}
          // disable top bar
          options={{headerShown: false}}
          // end
        />
        {/* end */}

        {/* mendefinisikan routeName halaman IsiJurnal */}
        <Stack.Screen
          name="IsiJurnal"
          component={IsiJurnal}
          // disable top bar
          options={{headerShown: false}}
          // end
        />
        {/* end */}

        {/* mendefinisikan routeName halaman DetailJurnal */}
        <Stack.Screen
          name="DetailJurnal"
          component={DetailJurnal}
          // disable top bar
          options={{headerShown: false}}
          // end
        />
        {/* end */}

        {/* mendefinisikan routeName halaman Onboarding */}
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          // disable top bar
          options={{headerShown: false}}
          // end
        />
        {/* end */}

        {/* mendefinisikan routeName halaman LogIn */}
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          // disable top bar
          options={{headerShown: false}}
          // end
        />
        {/* end */}

        {/* mendefinisikan routeName halaman LogIn */}
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          // disable top bar
          options={{headerShown: false}}
          // end
        />
        {/* end */}
      </Stack.Navigator>
    </>
  );
}
