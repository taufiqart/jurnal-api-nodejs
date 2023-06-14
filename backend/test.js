const axios  = require("axios");

axios.get('http://localhost:3000/absensi').then((data)=>{
    console.log(data)
}).catch((error)=>{
    console.log(error)
})