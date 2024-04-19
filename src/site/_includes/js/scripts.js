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

// Dynamically change theme-color on scroll
// It's looking for a "data-theme-color" attribute in the HTML to define it as a section
var theme = document.querySelector('meta[name="theme-color"]'),
sections = document.querySelectorAll("[data-theme-color]"),
currentThemeColor = "rgb(255,255,255)";

const options = {
	// These values make the intersecting area just the top part of the viewport
	// I only want to change the theme-color when a section hits the top
	// Given the unreliable nature of my stupid page layout, with the waves and such, it's not a straight forward approach and requires some manual tweaking until it "feels" right
	threshold: 0.1,
	rootMargin: "10% 0px -90% 0px"
};

// Creates an Observer for all the sections and triggers the color change when it intersects
const observer = new IntersectionObserver(function(entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
 		var color = entry.target.getAttribute('data-theme-color');
 		startColorFade(60, 0.3, currentThemeColor, color);
		}
	});
}, options);

// Fire the observers up and let them go wild
sections.forEach(section => {
	observer.observe(section);
})

// Here's the code to transition/animate the color change — it's a lot.
// TL;DR, we have to calculate each "frame" and update the <meta> tag as you go.
// This was remixed from a Stack Overflow answer by the user "ffdigital"
// https://stackoverflow.com/a/38381724/4746353

function startColorFade(fps, duration, currentColor, targetColor) {
	var stop = false;
	var fpsInterval = 1000 / fps;
	var now;
	var then = Date.now();
	var elapsed;
	var startTime = then;
	var currentColorArray = getElementBG(currentColor);
	var targetColorArray	= getElementBG(targetColor);
	var distance = calculateDistance(currentColorArray, targetColorArray);
	var increment = calculateIncrement(distance, fps, duration);
	animateColor(duration, currentColorArray, targetColorArray, increment, stop, fpsInterval, now, then, elapsed, startTime);
}

function animateColor( duration, currentColorArray, targetColorArray, increment, stop, fpsInterval, now, then, elapsed, startTime ) {
	var step = function() {
		if (stop) {
			return;
		}
		// Request another frame
		requestAnimationFrame(function() { //arguments can passed on the callback by an anonymous function
			animateColor(duration, currentColorArray, targetColorArray, increment, stop, fpsInterval, now, then, elapsed, startTime);
			colorTransition( currentColorArray, targetColorArray, increment);
		});

		// Calculate the elapsed time since last loop
		now = Date.now();
		elapsed = now - then;

    // If enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but...
      // Also, adjust for fpsInterval not being multiple of 16.67
      then = now - (elapsed % fpsInterval);
      var sinceStart = now - startTime;
    }

    if (sinceStart / 1000 * 100 >= duration * 100) {
      stop = true;
      // Update the currentThemeColor for the next transition
      currentThemeColor = "rgb(" + currentColorArray + ")";
    }
	}

  step();
}

function colorTransition(currentColorArray, targetColorArray, increment) {

  // Checking R (from RGB)
	if (currentColorArray[0] > targetColorArray[0]) {
    currentColorArray[0] -= increment[0];

    if (currentColorArray[0] <= targetColorArray[0]) {
      increment[0] = 0;
		}
	} else {
		currentColorArray[0] += increment[0];

    if (currentColorArray[0] >= targetColorArray[0]) {
			increment[0] = 0;
		}
	}

  // Checking G (from RGB)
	if (currentColorArray[1] > targetColorArray[1]) {
    currentColorArray[1] -= increment[1];

		if (currentColorArray[1] <= targetColorArray[1]) {
			increment[1] = 0;
		}
	} else {
		currentColorArray[1] += increment[1];

    if (currentColorArray[1] >= targetColorArray[1]) {
			increment[1] = 0;
		}
	}

	// Checking B (from RGB)
	if (currentColorArray[2] > targetColorArray[2]) {
		currentColorArray[2] -= increment[2];

  	if (currentColorArray[2] <= targetColorArray[2]) {
			increment[2] = 0;
		}
	} else {
		currentColorArray[2] += increment[2];

		if (currentColorArray[2] >= targetColorArray[2]) {
			increment[2] = 0;
		}
	}

  // Apply the new modified color
	theme.setAttribute("content", "rgb(" + currentColorArray + ")");

}

function getElementBG(elmBGColor) {
  var bg	= elmBGColor; // i.e: RGB(255, 0, 0)
			bg	= bg.match(/\((.*)\)/)[1];
			bg	= bg.split(",");

  for (var i = 0; i < bg.length; i++) {
		bg[i] = parseInt(bg[i], 10);
	}

  if (bg.length > 3) { bg.pop(); }

  return bg; // return array
}

function calculateDistance(colorArray1, colorArray2) {
	var distance = [];

  for (var i = 0; i < colorArray1.length; i++) {
		distance.push(Math.abs(colorArray1[i] - colorArray2[i]));
	}

  return distance;
}

function calculateIncrement(distanceArray, fps, duration) {
	var increment = [];
	for (var i = 0; i < distanceArray.length; i++) {
		increment.push(Math.abs(Math.floor(distanceArray[i] / (fps * duration))));

		if (increment[i] == 0) {
			increment[i]++;
		}
	}

	return increment;
}

// Mute/unmute video on hover
const video = document.getElementById('thwip-video');

video.addEventListener('mouseover', function() {
	video.muted = false;
});

video.addEventListener('mouseout', function() {
	video.muted = true;
});

// Spatialty Coffee Parallax Effect
const degrees = 8;
const element = document.querySelector('.appIcon');

const onPointerMove = (pointer) => {
  const icon = element.getBoundingClientRect();
  const halfSize = icon.width / 2;

  const xDist = minMaxValue(-(icon.x - pointer.x + halfSize), -halfSize, halfSize);
  const yDist = minMaxValue(icon.y - pointer.y + halfSize, -halfSize, halfSize);

  const x = Math.round(xDist / (halfSize / 100)) / 100;
  const y = Math.round(yDist / (halfSize / 100)) / 100;

  element.style.transform = `rotateX(${y * degrees}deg) rotateY(${x * degrees}deg)`;
};

const minMaxValue = (value, min, max) => Math.min(Math.max(value, min), max);

window.addEventListener('pointermove', onPointerMove);
