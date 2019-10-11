const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let iW = window.innerWidth;
let iH = window.innerHeight;
canvas.width = iW;
canvas.height = iH;
let cX;
let cY;
let scaleFactor = .01;
let color = "black";
let dotSize = 4/scaleFactor;

function primeDot(i) {
	this.i = i;
	this.color = color;

	this.draw = function () {
		this.x = cX + Math.sin(i) * i;
		this.y = cY - Math.sin((Math.PI/2)-i) * i;
		ctx.beginPath();
		ctx.arc(this.x, this.y, dotSize, 0, 2 * Math.PI);
		ctx.fill();
	};
}

var dots = []

function init() {
	let primes = genPrimes(100/scaleFactor);
	console.log(primes);
	primes.forEach(prime => {
		dots.push(new primeDot(prime));
	});

	ctx.fillStyle = color;

	cX = canvas.width / 2;
	cY = canvas.height / 2;

	ctx.translate(cX, cY);
	ctx.scale(scaleFactor, scaleFactor);
	ctx.translate(-cX, -cY)
	dots.forEach(dot => { dot.draw() });
}

function isPrime(n) {
	for (var i = 2; i*i < n; i++) {
		if (n % i === 0) {
			return false;
		}
	}
	return true;
}

function genPrimes(n) {
	let i = 0;
	let j = 0;
	let primes = [];
	while (j < n){
		if (isPrime(i)){
			primes.push(i);
			j++;
		}
		i++;
	}
	return primes;
}

init();