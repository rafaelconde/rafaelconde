function meetingSomeone() {

  var ticks = document.querySelectorAll (".tick");
  var rafa = document.getElementById('easterNope');

  for (var i = 0; i < ticks.length; ++i) {
    var tick = ticks[i];
    popout = function() {
      rafa.className = 'popout';
    }
    tick.onclick = function() {
      rafa.className = 'popin';
      console.log('If you can make this happen though, or if you are this person, lets TALK ON TWITTER;');
      setTimeout(popout, 3000);
    }
  }
}

meetingSomeone();


var mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  }
})

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  m = checkTime(m);
  h = h % 12;
  document.getElementById('clock').innerHTML =
  h + ":" + m;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

startTime()

function playSound(id) {
  var sound = document.getElementById(id);
  sound.play();
}

function playSound_Webshooter() {
  var soundFiles = document.getElementsByClassName('webshooter');
  const index = getRandomInt(soundFiles.length)
  
  soundFiles[index].play();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function presentHelp() {
  document.getElementById("WKMainView").style.transform = "translateX(-184px)";
}

function presentAbout() {
  document.getElementById("WKMainView").style.transform = "translateX(-184px)";
  document.getElementById("WKHelpView").style.zIndex = "2";
  document.getElementById("WKAboutView").style.zIndex = "3";
}

function backToMain() {
  document.getElementById("WKMainView").style.transform = "translateX(0px)";
  document.getElementById("WKHelpView").style.zIndex = "3";
  document.getElementById("WKAboutView").style.zIndex = "2";
}

var video = document.getElementById('demo-video');

function toggleMute(){
  video.muted = !video.muted;
  
  if (video.muted) {
    document.getElementById("mute-switch-button").classList.remove("mute-switch-on");
    document.getElementById("mute-switch-button").classList.add("mute-switch-off");
  } else {
    document.getElementById("mute-switch-button").classList.remove("mute-switch-off");
    document.getElementById("mute-switch-button").classList.add("mute-switch-on");
  }
}

// Dynamically change theme-color on scroll
// Incredibly janky bad code but I don't have a lot of time to experiment right now 😅
var theme = document.querySelector('meta[name="theme-color"]'),
secSuperlist = document.getElementById('superlist'),
secNetlify = document.getElementById("netlify"),
secHandMirror = document.getElementById("handmirror"),
secThwip = document.getElementById("thwip"),
secLayout = document.getElementById("layout"),
secBreak = document.getElementById("breakthissafe"),
secOther = document.getElementById("other-stuff");

window.addEventListener('scroll', function() {
  var coordSuperlist = secSuperlist.getBoundingClientRect(),
  coordNetlify = secNetlify.getBoundingClientRect(),
  coordHandMirror = secHandMirror.getBoundingClientRect(),
  coordThwip = secThwip.getBoundingClientRect(),
  coordLayout = secLayout.getBoundingClientRect(),
  coordBreak = secBreak.getBoundingClientRect(),
  coordOther = secOther.getBoundingClientRect();
  
  if (coordSuperlist.top < 150 && coordSuperlist.top > 0 - coordSuperlist.height) {
    theme.setAttribute("content", "#0e0e0e");
  } else if (coordNetlify.top < 0 && coordNetlify.top > -30 - coordNetlify.height) {
    theme.setAttribute("content", "#fff");
  } else if (coordHandMirror.top < 200 && coordHandMirror.top > 100 - coordHandMirror.height) {
    theme.setAttribute("content", "#000");
  } else if (coordThwip.top < 100 && coordThwip.top > 50 - coordThwip.height) {
    theme.setAttribute("content", "#f0d8fd");
  } else if (coordLayout.top < 100 && coordLayout.top > -50 - coordLayout.height) {
    theme.setAttribute("content", "#00C833");
  } else if (coordBreak.top < 150 && coordBreak.top > 0 - coordBreak.height) {
    theme.setAttribute("content", "#000");
  } else {
    theme.setAttribute("content", "#fff");
  }
});
