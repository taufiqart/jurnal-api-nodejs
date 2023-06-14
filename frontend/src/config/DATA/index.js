// import {useState} from 'react';

const historyAbsensiDumy = {
  id1: {
    siswa_key: 'user1',
    tanggal: '10/6/2023 12:30',
    absensi: 'Pulang',
    status: 'disetujui',
  },
  id2: {
    siswa_key: 'user1',
    tanggal: '20/10/2023 07:30',
    absensi: 'Masuk',
    status: 'ditolak',
  },
  id3: {
    siswa_key: 'user1',
    tanggal: '20/10/2023 12:30',
    absensi: 'Pulang',
    status: 'ditolak',
  },
  id4: {
    siswa_key: 'user1',
    tanggal: '20/10/2023 07:30',
    absensi: 'Masuk',
    status: 'disetujui',
  },
  id5: {
    siswa_key: 'user1',
    tanggal: '20/10/2023 12:30',
    absensi: 'Pulang',
    status: 'disetujui',
  },
  id6: {
    siswa_key: 'user1',
    tanggal: '20/10/2023 07:30',
    absensi: 'Masuk',
    status: 'disetujui',
  },
  id7: {
    siswa_key: 'user1',
    tanggal: '20/10/2023 12:30',
    absensi: 'Pulang',
    status: 'disetujui',
  },
  id8: {
    siswa_key: 'user1',
    tanggal: '20/10/2023 07:30',
    absensi: 'Masuk',
    status: 'disetujui',
  },
};
const historyJurnalDumy = {
  id1: {
    siswa_key: 'user1',
    tanggal: '20/10/2023 12:30',
    deskripsi: 'Melakukan pengecekan komputer',
  },
  id2: {
    siswa_key: 'user1',
    tanggal: '21/10/2023 12:30',
    deskripsi: 'Menginputkan data ke database',
  },
};

const userDumy = {
  user1: {
    nama: 'Taufiq Art',
    role: 'siswa',
    email: 'taufiqart@gmail.com',
    password: 'taufiqart',
  },
  user2: {
    nama: 'Pak oong',
    role: 'guru',
    email: 'pakoong@gmail.com',
    password: 'pakoong',
  },
  user3: {
    nama: 'humas',
    role: 'humas',
    email: 'humas@gmail.com',
    password: 'humas',
  },
};

// const [data, setData] = useState();
let data;
export {historyAbsensiDumy, userDumy, historyJurnalDumy, data};
// data dumy digunakan sebelum terhubung ke firebase
