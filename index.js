var canvas = document.getElementById('canvas');
var ctx    = canvas.getContext('2d');

var image = document.getElementById('chip');

var x = 0;
var y = 0;

var xDir = 1;
var yDir = 1;

var leakingArray = [];

var leak = function leak() {
    leakingArray.push(new Array(10000000).join('.'));

    setTimeout(leak, 500);
};

var loop = function loop() {
    if (Math.random() > 0.98) {
        xDir *= -1;
    }

    if (Math.random() > 0.98) {
        yDir *= -1;
    }

    x += Math.floor(Math.random() * 4) * xDir;
    y += Math.floor(Math.random() * 4) * yDir;

    if (x > canvas.width - 64) {
        x = canvas.width - 64;

        xDir = -1;
    }

    if (x < 0) {
        x = 0;

        xDir = 1;
    }

    if (y > canvas.height - 64) {
        y = canvas.height - 64;

        yDir = -1;
    }

    if (y < 0) {
        y = 0;

        yDir = 1;
    }

    ctx.drawImage(image, x, y, 64, 64);

    window.requestAnimationFrame(loop);
};

var warn = function warn() {
    ctx.font = '30px monospace';

    ctx.fillText(
        'MEMORY LEAK',
        Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height)
    );
};

var jump = function jump() {
    x = Math.floor(Math.random() * (canvas.width - 64));
    y = Math.floor(Math.random() * (canvas.height - 64));
};

var onClick = function onClick(ev) {
    var clickX = ev.pageX - canvas.offsetLeft;
    var clickY = ev.pageY - canvas.offsetTop;

    if (clickX >= x && clickX < x + 64 && clickY >= y && clickY < y + 64) {
        jump();
        leak();

        setInterval(warn, 1000);
    }
};

var run = function run() {
    canvas.width  = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;

    canvas.addEventListener('click', onClick);

    warn();
    jump();

    setInterval(warn, 2000);

    window.requestAnimationFrame(loop);
};

run();
