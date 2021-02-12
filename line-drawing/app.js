let limit = 0;
const log = a => limit++ < 100 ? console.log(a) : '';
let maxCircles = 100, radius = 10;
const { sqrt, abs, floor, round } = Math;

const mean_deviance = (a, b, c) => {
	let m1 = abs(a - b), m2 = abs(b - c), m3 = abs(c - a);
	return (m1 + m2 + m3) / 3;
}

const getLength = (y, r) => floor(2 * round(abs(sqrt((r*r) - (y*y)))));

const paintPixel = (data, pixel, color) => {
	data[pixel] = color[0];
	data[pixel + 1] = color[1];
	data[pixel + 2] = color[2];
}

const convertCoordinateToIndex = (coord, width) => (coord[1] * width * 4) + (coord[0] * 4);
const convertIndexToCoordinate = (index, width) => [floor((index % (width * 4)) / 4), floor(index / (width * 4))];
const converIndexToMapCoordinate = (index, width) => [(index % width), floor(index / width)];
const convertMapCoordinateToIndex = (coord, width) => (coord[1] * width) + coord[0];

let counter = 0;
const getCircleCoordinates = (point, width, data) => {
	const points = [];
	const r2 = 2 * radius;
	let i = 0;
	while (i <= r2) {
		const length = getLength(r2 - i, r2);
		let start = [point[0] - (length / 2), point[1] - r2 + i];
		let j = -1;
		while (++j < length) {
			points.push([start[0] + j, start[1]]);
			points.push([start[0] + j, point[1] + r2 - i])
		}
		i++;
	}
	return points;
}

const getPoints = (data, height, width) => {
	let map = (new Array(height * width)).fill(undefined);
	let centers = [];
	let i = 0;
	while (i < data.length) {
		let index = i;
		let point = [data[i], data[i + 1], data[i + 2]];
		if (point.reduce((t, c) => t + c) == 0 && map[i / 4] != 0) {
			let center = convertIndexToCoordinate(i, width);
			if (map[convertMapCoordinateToIndex(center, width)] !== 0) {
				const pointsToDisable = getCircleCoordinates(center, width, data);
				pointsToDisable.map(p => {
					mapIndex = convertMapCoordinateToIndex(p, width);
					if (mapIndex > -1 && mapIndex < (height * width)) map[mapIndex] = 0;
				});
				centers.push(i);
			}
		}
		i += 4;
	}
	return centers;
}

const getCircleCenters = function({ data, width, height }) {
	width = 400;
	height = 400;
	let lightnessThreshold = 120;
	let devianceThreshold = 10;

	// TRAVERSING AS THE MATRIX
	let i = 0;
	while (i < height) {
		let j = 0;
		while (j < width) {
			let start = ((i * width) + j) * 4;
			let [r, g, b] = [data[start + 0], data[start + 1], data[start + 2]];
			let lightness = (r + g + b) / 3;
			let deviance = mean_deviance(r, g, b);
			if (lightness < lightnessThreshold && deviance > devianceThreshold) paintPixel(data, start, [0, 0, 0]);
			else paintPixel(data, start, [255, 255, 255]);
			j++;
		}
		i++;
	}

	let points = getPoints(data, height, width);
	const newPoints = [];
	
	let skip = points.length / maxCircles;
	if (skip < 1) skip = 1;
	for (i = 0; i < points.length; i += skip) {
		newPoints.push(points[floor(i)]);
	}

	return newPoints.map(p => convertIndexToCoordinate(p, width));
}

const oDiv = document.getElementById('overlay');

class Circle {

	constructor(config) {
		Object.keys(config).map(key => this[key] = config[key]);
		this.drawCircle();
		this.float();
	}

	setRadius(r) {
		this.radius = r;
		this.drawCircle();
	}

	setTop(t) {
		this.top = t;
		this.drawCircle();
	}

	setLeft(l) {
		this.left = l;
		this.drawCircle();
	}

	drawCircle() {
		if (!this.obj) {
			this.obj = document.createElement('div');
			let { obj } = this;
			obj.classList.add('circle');
			obj.style.width = 2 * this.radius + 'px';
			obj.style.height = 2 * this.radius + 'px';
			oDiv.appendChild(this.obj);
		}
		const { obj } = this;
		obj.style.top = this.top + 'px';
		obj.style.left = this.left + 'px';
	}

	float() {
		const { obj } = this;
		if (obj) {
			const deviation = 5;
			const randLeft = this.left + (2 * (Math.random() - 0.5) * deviation);
			const randTop = this.top + (2 * (Math.random() - 0.5) * deviation);
			obj.style.top = randTop + 'px';
			obj.style.left = randLeft + 'px';
		}
		this.timeout = setTimeout(() => this.float(), 400);
	}

	destroy() {
		clearInterval(this.timeout);
	}
}

const createCircles = length => {
	const circles = [];
	while (length--) {
		const circle = new Circle({
			radius,
			top: Math.random() * window.innerHeight,
			left: Math.random() * window.innerWidth
		});
		circles.push(circle);
	}
	return circles;
}







