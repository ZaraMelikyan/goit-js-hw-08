import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

setCurrentTime();

function onPlay(event) {
  localStorage.setItem('videoplayer-current-time', event.seconds);
}

function setCurrentTime() {
  const currentTime = localStorage.getItem('videoplayer-current-time');

  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
}
