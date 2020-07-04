var scores, roundScore, activePlayer;

function hideDice() {
  document.querySelector('.dice').style.display = 'none';
}

function resetCurrentScores() {
  roundScore = 0;
  document.querySelector('#current-0').textContent= '0';
  document.querySelector('#current-1').textContent= '0';
}

function changeActivePlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

function resetPlayerScores() {
  scores = [0, 0];
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
}

function nextPlayer() {
  hideDice();
  resetCurrentScores();
  changeActivePlayer();
}

function setInitialState() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  hideDice();
  resetCurrentScores();
  resetPlayerScores();
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.btn-hold').style.display = 'block';
  document.querySelector('.btn-roll').style.display = 'block';
}

setInitialState();

document.querySelector('.btn-roll').addEventListener('click', function () {
  var dice = Math.floor(Math.random() * 6 + 1);
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = '../assets/dice-' + dice + '.png';

  if (dice !== 1) {
    roundScore += dice;
    document.querySelector('#current-'+activePlayer).textContent= roundScore;
  } else {
    nextPlayer();
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  scores[activePlayer] += roundScore;

  document.getElementById('score-'+ activePlayer).textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    hideDice();
    document.getElementById('name-'+ activePlayer).textContent = 'Winner!';
    document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
    document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
    document.querySelector('.btn-hold').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
  } else {
    nextPlayer();
  }
});

document.querySelector('.btn-new').addEventListener('click', setInitialState);
