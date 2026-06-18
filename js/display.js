import { db, ref, onValue } from './firebase.js';

const court =
    new URLSearchParams(window.location.search)
    .get('court') || 'court1';

onValue(ref(db, 'courts/' + court), (snapshot) => {

    const data = snapshot.val() || {};

    document.getElementById('scoreboard').textContent =
        (data.homeScore || 0) +
        ' - ' +
        (data.awayScore || 0);

    if (document.getElementById('homeTeamName')) {
        document.getElementById('homeTeamName').textContent =
            data.homeName || 'HOME';
    }

    if (document.getElementById('awayTeamName')) {
        document.getElementById('awayTeamName').textContent =
            data.awayName || 'AWAY';
    }

});
