import {onValue, ref} from 'firebase/database';
import {getItemFor, setItem} from '../DATA/storageHelper';
import {FIREBASE} from '../FIREBASE';
import {BASE_URL} from '..';
import axios from 'axios';

/*
function menecek data user di local storage jika ada 
berarti sudah login dan jika belum akan di arahkan ke halaman onboarding 
*/
export const checkUser = async ({setUser, setUserProfile, navigation}) => {
  // mengambil data user dari local storage
  const userStorage = await getItemFor('user');
  if (userStorage) {
    let user = JSON.parse(userStorage);
    if (user.token && user.data._id) {
      axios
        .get(BASE_URL + '/users/' + user.data._id, {
          headers: {Authorization: 'Bearer ' + user.token},
        })
        .then(async ({data}) => {
          await setItem('user', JSON.stringify(data));
          setUser && setUser(data);
          console.log(data)
        })
        .catch(error => {
          console.log(error);
          setUser && setUser(user.data);
        });
    } else {
      setUser && setUser(user.data);
    }
  } else {
    navigation && navigation.navigate('Onboarding');
  }
};
