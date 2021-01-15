'use strict';

const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  //Sounds
  const Sounds = document.querySelectorAll('.sound-picker button');

  //Time Display  => 0:00
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');

  //Get the Length of the outline
  const outlineLength = outline.getTotalLength();
  
  //Duration  => data-time
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Pick different Sounds
  Sounds.forEach( sound => {
    sound.addEventListener('click', function(){
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    })
  })

  //Play sound
  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  // Select sound
  timeSelect.forEach(option => {
    option.addEventListener('click', function(){
      fakeDuration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`

    })
  })


  //Create a function specific to stop and play the sounds
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg'
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg'
    }
  };

  //Animated the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;
    if(currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src ='./svg/play.svg';
      video.pause();
    }
  }
}

app();