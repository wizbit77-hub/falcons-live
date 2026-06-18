
import { db, ref, onValue } from './firebase.js';

const court = new URLSearchParams(window.location.search).get('court') || 'court1';
document.getElementById('courtTitle').textContent = court.toUpperCase() + ' Display';

onValue(ref(db,'courts/' + court), (snapshot) => {
 const data = snapshot.val() || {};
 document.getElementById('scoreboard').textContent =
   (data.homeScore || 0) + ' - ' + (data.awayScore || 0);
});
