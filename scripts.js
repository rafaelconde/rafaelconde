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
