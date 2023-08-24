import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase
   .initializeApp({
      apiKey: 'AIzaSyAshW94r__mfOn_e73yFA224HzUaqEhW9E',
      authDomain: 'kiagram-73c6d.firebaseapp.com',
      projectId: 'kiagram-73c6d',
      storageBucket: 'kiagram-73c6d.appspot.com',
      messagingSenderId: '1005973821830',
      appId: '1:1005973821830:web:e69fcbed362ae936ed3407',
   })
   .auth();
