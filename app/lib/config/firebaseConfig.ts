// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBk_uMhUeKRf__8Wk8QrKEYyzNke6ELoVE',
  authDomain: 'dreambudz-7b543.firebaseapp.com',
  projectId: 'dreambudz-7b543',
  storageBucket: 'dreambudz-7b543.appspot.com',
  messagingSenderId: '98801219932',
  appId: '1:98801219932:web:987455bc9a767363aea999'
}

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

export { storage }
