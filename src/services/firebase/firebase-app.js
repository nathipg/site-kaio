import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBztUsQmpi8hahWgH_GgSYiyXI_9l47ixc',
  authDomain: 'site-kaio.firebaseapp.com',
  projectId: 'site-kaio',
  storageBucket: 'site-kaio.firebasestorage.app',
  messagingSenderId: '653664265873',
  appId: '1:653664265873:web:17449f505a13aa4b6b0130',
};

const app = initializeApp(firebaseConfig);

export { app };
