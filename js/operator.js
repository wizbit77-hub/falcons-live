
import { db, ref, update, onValue } from './firebase.js';

const court = new URLSearchParams(window.location.search).get('court') || 'court1';
document.getElementById('courtTitle').textContent = court.toUpperCase() + ' Operator';

const gameRef = ref(db, 'courts/' + court);

onValue(gameRef, (snapshot) => {
 const data = snapshot.val() || {};
 document.getElementById('homeScore').textContent = data.homeScore || 0;
 document.getElementById('awayScore').textContent = data.awayScore || 0;
});

window.changeScore = async function(team, points){
 const currentHome = parseInt(document.getElementById('homeScore').textContent);
 const currentAway = parseInt(document.getElementById('awayScore').textContent);

onValue(gameRef, (snapshot) => {

 const data = snapshot.val() || {};

 document.getElementById('homeScore').textContent =
     data.homeScore || 0;

 document.getElementById('awayScore').textContent =
     data.awayScore || 0;

 if(document.getElementById('homeNameInput')){
     document.getElementById('homeNameInput').value =
         data.homeName || '';
 }

 if(document.getElementById('awayNameInput')){
     document.getElementById('awayNameInput').value =
         data.awayName || '';
 }

});
