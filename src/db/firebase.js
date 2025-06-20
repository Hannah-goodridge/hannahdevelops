// Firebase.js

export default async function loadFirebase() {
  const { initializeApp } = await import('firebase/app');
  const { getDatabase } = await import('firebase/database');

  const firebaseConfig = {
    apiKey: 'AIzaSyAwJ7yNaXh0SsatWPT8fmNn65J2qfFZ7A0',
    authDomain: 'hannahdevelops.firebaseapp.com',
    databaseURL: 'https://hannahdevelops-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'hannahdevelops',
    storageBucket: 'hannahdevelops.appspot.com',
    messagingSenderId: '107226631159',
    appId: '1:107226631159:web:6763576d760f228c403cf2',
    measurementId: 'G-XGYQS98FM4',
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  return { app, database };
}
