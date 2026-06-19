import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';

import {
    getDatabase,
    ref,
    update,
    set,
    get,
    onValue
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

const firebaseConfig = {

    apiKey: "AIzaSyAIBoYj9wXuQhxGAvMmjxGSRhVF5lpoIDg",

    authDomain:
        "basketball-scoreboard-ddf2d.firebaseapp.com",

    databaseURL:
        "https://basketball-scoreboard-ddf2d-default-rtdb.europe-west1.firebasedatabase.app",

    projectId:
        "basketball-scoreboard-ddf2d"

};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export {
    db,
    ref,
    update,
    set,
    get,
    onValue
};
