  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD4Pvd3dKcVpmBXNEhPUOGwv7fCMlhH3uQ",
  authDomain: "crud-firebase-6868d.firebaseapp.com",
  projectId: "crud-firebase-6868d",
  storageBucket: "crud-firebase-6868d.appspot.com",
  messagingSenderId: "542564871990",
  appId: "1:542564871990:web:04e83ae4d1b6ad6686cd97"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  const auth = firebase.auth()
  const googleProvider = new firebase.auth.GoogleAuthProvider()

  export {db,auth, googleProvider}

  