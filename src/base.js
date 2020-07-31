import Rebase from 're-base';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDL0JKeDGIahv0Q05nKE4irVTx_v5VsZBY',
  authDomain: 'catch-of-the-day-4b3b2.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-4b3b2.firebaseio.com',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
