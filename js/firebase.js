
/*
PASTE YOUR FULL FIREBASE CONFIG INTO firebaseConfig BELOW.
*/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getDatabase, ref, update, onValue } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

const firebaseConfig = {
  apiKey: "PASTE_API_KEY_HERE",
  authDomain: "basketball-scoreboard-ddf2d.firebaseapp.com",
  databaseURL: "https://basketball-scoreboard-ddf2d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "basketball-scoreboard-ddf2d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, update, onValue };
