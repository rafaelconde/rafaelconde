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

var hue = 0;
var saturation = 0;
var lightness = 100;
 
function animateColor(h,s,l) {
  
  var delay = 10;
  
  if (h != hue || s != saturation || l != lightness ) {
    if (h != hue) {
      if (h < 180) {
        hue--;
      } else {
        hue++;
      }
   
      if (hue == 361) {
        hue = 0;
      }
  
    } else if (s != saturation) {
      saturation++;
   
      if (saturation == 101) {
        saturation = 0;
      }
    } else if (l != lightness) {
      if (l < 50) {
        lightness--;
      } else {
        lightness++;
      }
      if (lightness == 101) {
        lightness = 0;
      }
    }
    
    setTimeout(function() {
        theme.setAttribute("content", 'hsl(' + parseInt(hue) + ',' + parseInt(saturation) + '%,' + parseInt(lightness) + '%)');
        
        animateColor(h, s, l);
      }, delay);
  }
}

window.addEventListener('scroll', function() {
  var coordSuperlist = secSuperlist.getBoundingClientRect(),
  coordNetlify = secNetlify.getBoundingClientRect(),
  coordHandMirror = secHandMirror.getBoundingClientRect(),
  coordThwip = secThwip.getBoundingClientRect(),
  coordLayout = secLayout.getBoundingClientRect(),
  coordBreak = secBreak.getBoundingClientRect(),
  coordOther = secOther.getBoundingClientRect();
  
  if (coordSuperlist.top < 150 && coordSuperlist.top > 0 - coordSuperlist.height) {
    animateColor(0, 0, 5);
  } else if (coordNetlify.top < 0 && coordNetlify.top > -30 - coordNetlify.height) {
    animateColor(0, 0, 100);
  } else if (coordHandMirror.top < 200 && coordHandMirror.top > 100 - coordHandMirror.height) {
    animateColor(0, 0, 0);
  } else if (coordThwip.top < 100 && coordThwip.top > 50 - coordThwip.height) {
    animateColor(279, 90, 92);
  } else if (coordLayout.top < 100 && coordLayout.top > -50 - coordLayout.height) {
    animateColor(135, 100, 39);
  } else if (coordBreak.top < 150 && coordBreak.top > 0 - coordBreak.height) {
    animateColor(0, 0, 0);
  } else {
    animateColor(0, 0, 100);
  }
});

