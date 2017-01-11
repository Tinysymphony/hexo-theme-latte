(function() {
  var canvas, ctx, points, animateCanvas = true;
  var FPS = 60;
  var requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (func) { return setTimeout(func, 1000 / FPS); };

  function Point() { this.init(); }

  Point.prototype.init = function () {
    this.pos = {};
    this.pos.x = Math.random() * canvas.width;
    this.pos.y = - Math.random() * 80;
    this.opactiy = 0.1 + Math.random() * 0.4;
    this.scale = 0.1 + Math.random() * 0.3;
    this.speed = Math.random();
    this.r = Math.round(Math.random() * 255);
    this.g = Math.round(Math.random() * 255);
    this.b = Math.round(Math.random() * 255);
    return this;
  };

  Point.prototype.draw = function () {
    if(this.opactiy <= 0) this.init();
    this.pos.y += this.speed;
    this.opactiy -= 0.001;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.scale * 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ','+ this.opactiy+')';
    ctx.fill();
  };

  // main
  init();
  bindEvents();

  function init() {
     canvas = document.getElementById('canvas-points');
     resizeCanvas();
     ctx = canvas.getContext('2d');
     points = [];
     for (var i = 0; i < canvas.width * 0.4; i++) {
       points.push(new Point());
     }
     animate();
  }

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = window.innerHeight;
  }

  function checkCanvasInView() {
    if(document.body.scrollTop > window.innerHeight) animateCanvas = false;
    else animateCanvas = true;
  }

  function bindEvents() {
    window.addEventListener('scroll', throttle(checkCanvasInView));
    window.addEventListener('resize', throttle(resizeHandler, 100));
  }

  function resizeHandler() {
    resizeCanvas();
  }

  function animate() {
    if(animateCanvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      points.forEach(point => point.draw());
    }
    requestAnimationFrame(animate);
  }

  function throttle (fn, time) {
    var running = false
    var isFrame = false
    if (!time) isFrame = true

    function getCallback(self, args) {
      return function () {
        fn.apply(self, args);
        running = false;
      }
    }

    return function () {
      if (running) return
      running = true
      if (isFrame) {
        window.requestAnimationFrame(getCallback(this, arguments))
      } else {
        setTimeout(getCallback(this, arguments), time)
      }
    }
  }
}());
