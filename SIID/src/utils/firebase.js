import firebase from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyCGWhO5bZP35dSoDhRMF4g8ZdjTqfNTHQI",
    authDomain: "musicfy-317d6.firebaseapp.com",
    databaseURL: "https://musicfy-317d6.firebaseio.com",
    projectId: "musicfy-317d6",
    storageBucket: "musicfy-317d6.appspot.com",
    messagingSenderId: "803455382179",
    appId: "1:803455382179:web:f053a6f90653ecd4e90516"
  };

  export default firebase.initializeApp(firebaseConfig);
