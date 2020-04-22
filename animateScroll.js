var _containerHeight = 4000;
var _width, _height, _scrollHeight;
var letters = document.getElementsByTagName('span');
var _movingElements = [];
var _scrollPercent = 0;
var pre = prefix();
var _jsPrefix  = pre.lowercase;
if(_jsPrefix == 'moz') _jsPrefix = 'Moz'
var _cssPrefix = pre.css;
var _positions = [
  /*{
    name: 'harry', 
    start: {
      percent: 0.11, x: 0.02, y: 0.05
    },
    end: {
      percent: 0.61, x: 1.16, y: 0.1
    }
  },
  {
    name: 'building1',
    start: {
      percent: 0.1, x: 0.01, y: 0.05
    },
    end: {
      percent: 0.6, x: -0.9, y: 0.1
    }
  },
  {
    name: 'building2', 
    start: {
      percent: 0.1, x: 0.4, y: 0.02
    },
    end: {
      percent: 0.6, x: 0.01, y: 0.1
    }
  },
  {
    name: 'lightning', 
    start: {
      percent: 0, x: 0.3575, y: 0.015
    },
    end: {
      percent: 0.6, x: 0.095, y: 0.1
    }
  },
  {
    name: 'stars', 
    start: {
      percent: 0.02, x: 0.2, y: 0.05
    },
    end: {
      percent: 0.8, x: 0.8, y: 0.00002
    }
  },
  {
    name: 'logos', 
    start: {
      percent: 0.1, x: 0, y: 0.05
    },
    end: {
      percent: 0.8, x: 0, y: 0
    }
  },
  // {
  //   name: 'ordernow', 
  //   start: {
  //     percent: 0.5, x: 0, y: 0.1
  //   },
  //   end: {
  //     percent: 1.2, x: 0, y: 0.05
  //   }
  // },
  //  {
  //   name: 'orderNowPh', 
  //   start: {
  //     percent: 0, x: 0, y: 0.1
  //   },
  //   end: {
  //     percent: 3.2, x: 0, y: 0.05
  //   }
  // },
  {
    name: 'jonathanPh', 
    start: {
      percent: 0, x: 0.1, y: 0
    },
    end: {
      percent: 0.60, x: 0.001, y: 0.07
    }
  },
  {
    name: 'harryPh', 
    start: {
      percent: 0, x: 0.02, y: 0.05
    },
    end: {
      percent: 0.61, x: 1.16, y: 0.1
    }
  },
  {
    name: 'building1Ph', 
    start: {
      percent: 0.05, x: 0.01, y: 0.05
    },
    end: {
      percent: 0.8, x: -0.9, y: 0.1
    }
  },
  {
    name: 'building2Ph', 
    start: {
      percent: 0.05, x: 0.4, y: 0.02
    },
    end: {
      percent: 0.8, x: 0.01, y: 0.1
    }
  },
  {
    name: 'lightningPh', 
    start: {
      percent: 0, x: 0.2575, y: 0.015
    },
    end: {
      percent: 0.3, x: 0.095, y: 0.1
    }
  },*/
  {
    name: 'write1', 
    start: {
      percent: 0, x: 0, y: 0
    },
    end: {
      percent: 0.8, x: 0, y: -0.25
    }
  },
  {
    name: 'write2', 
    start: {
      percent: 0.05, x: 0, y: 0
    },
    end: {
      percent: 0.1, x: 0.03, y: 0
    }
  },
  {
    name: 'write3', 
    start: {
      percent: 0, x: 0, y: 0
    },
    end: {
      percent: 0.8, x: 0, y: -0.2
    }
  },
]

resize();
initMovingElements();

function initMovingElements() {
  for (var i = 0; i < _positions.length; i++) {
    _positions[i].diff = {
      percent: _positions[i].end.percent - _positions[i].start.percent,
      x: _positions[i].end.x - _positions[i].start.x,
      y: _positions[i].end.y - _positions[i].start.y,
    }
    var el = document.getElementsByClassName('anim '+_positions[i].name)[0];
    _movingElements.push(el);
  }
}

function resize() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  _scrollHeight = _containerHeight-_height;
}

function rotateLetters() {
  for (var i = 0; i < letters.length; i++) {
    letters[i].style[_jsPrefix+'Transform'] = 'rotateY('+(_scrollPercent*500)+'deg)'
  }
}

function updateElements() {
  for (var i = 0; i < _movingElements.length; i++) {
    var p = _positions[i];
    if(_scrollPercent <= p.start.percent) {
      _movingElements[i].style[_jsPrefix+'Transform'] = 'translate3d('+(p.start.x*_width)+'px, '+(p.start.y*_containerHeight)+'px, 0px)';
    } else if(_scrollPercent >= p.end.percent) {
      _movingElements[i].style[_jsPrefix+'Transform'] = 'translate3d('+(p.end.x*_width)+'px, '+(p.end.y*_containerHeight)+'px, 0px)';
    } else {
      _movingElements[i].style[_jsPrefix+'Transform'] = 'translate3d('+(p.start.x*_width + (p.diff.x*(_scrollPercent-p.start.percent)/p.diff.percent*_width))+'px, '+
        (p.start.y*_containerHeight + (p.diff.y*(_scrollPercent-p.start.percent)/p.diff.percent*_containerHeight))+'px, 0px)';
    }
  }
}



function loop() {
  _scrollOffset = window.pageYOffset || window.scrollTop;
  _scrollPercent = _scrollOffset/_scrollHeight || 0;
  rotateLetters();
  updateElements();
  
  requestAnimationFrame(loop);
}

loop();

window.addEventListener('resize', resize);

/* prefix detection http://davidwalsh.name/vendor-prefix */

function prefix() {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
}