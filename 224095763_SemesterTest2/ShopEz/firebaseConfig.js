import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCWfxcaA2HeHDpyzSbZtSYW4v7-pOIGXfM",
  authDomain: "shopez-3974e.firebaseapp.com",
  databaseURL: "https://shopez-3974e-default-rtdb.firebaseio.com",
  projectId: "shopez-3974e",
  storageBucket: "shopez-3974e.firebasestorage.app",
  messagingSenderId: "641587453837",
  appId: "1:641587453837:web:b34782055a57cc20e227c4"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getDatabase(app);
