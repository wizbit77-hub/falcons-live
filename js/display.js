
import { db, ref, onValue } from './firebase.js';

const court = new URLSearchParams(window.location.search).get('court') || 'court1';
document.getElementById('courtTitle').textContent = court.toUpperCase() + ' Display';

onValue(ref(db,'courts/' + court), (snapshot) => {
 const data = snapshot.val() || {};
<h2 id="homeTeamName">
    HOME
</h2>

<div id="scoreboard">
    0 - 0
</div>

<h2 id="awayTeamName">
    AWAY
</h2>
