import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyATYEP6pybvQDxiGGf_RDspw-4Bgpz5EtM",
    authDomain: "radionstore-4d1fb.firebaseapp.com",
    projectId: "radionstore-4d1fb",
    storageBucket: "radionstore-4d1fb.appspot.com",
    messagingSenderId: "605440720394",
    appId: "1:605440720394:web:36fcf6965554a86fd669f3",
    measurementId: "G-PYWLM0SFRX"
})

export const auth = app.auth()
export default app

