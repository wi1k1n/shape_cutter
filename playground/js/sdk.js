class CtxStyle {
	color;
	width;
	type;

	constructor(c, w, t) {
		this.color = c;
		this.width = w;
		this.type = t;
	}
}

function intersectLines(a1, a2, b1, b2) {
	// intersect line a with line b; a1, a2 - points on line a; b1, b2 - points on line b
	// returns point of intersection and booleans saying if intersection point lies inside of provided intervals
	const denom = (b2[1] - b1[1]) * (a2[0] - a1[0]) - (b2[0] - b1[0]) * (a2[1] - a1[1]);
	if (Math.abs(denom) < EPS) {
		return [null, false, false];
	}
	const ua = ((b2[0] - b1[0]) * (a1[1] - b1[1]) - (b2[1] - b1[1]) * (a1[0] - b1[0])) / denom;
	const ub = ((a2[0] - a1[0]) * (a1[1] - b1[1]) - (a2[1] - a1[1]) * (a1[0] - b1[0])) / denom;
	return [[a1[0] + ua * (a2[0] - a1[0]), a1[1] + ua * (a2[1] - a1[1])],
			ua >= 0 && ua <= 1,
			ub >= 0 && ub <= 1];
}
function isPointAboveTheLine(p, line) {
	const p1 = line[0], p2 = line[1];
	const det = (p1[0] - p[0]) * (p2[1] - p[1]) - (p2[0] - p[0]) * (p1[1] - p[1]);
	return Math.sign(det);
}

function translateShape(shape, p) {
	for (let i = 0; i < shape.length; i++) {
		shape[i] = add(shape[i], p);
	}
}

function dot(v1, v2) {
	return v1[0] * v2[0] + v1[1] * v2[1];
}
function cross2d(v1, v2) {
	return [0, 0, v1[0] * v2[1] - v1[1] * v2[0]];
}
function cross(v1, v2) {
	return [v1[1] * v2[2] - v1[2] * v2[1], v1[2] * v2[0] - v1[0] * v2[2], v1[0] * v2[1] - v2[1] * v2[0]];
}
function add(p1, p2) {
	return [p1[0] + p2[0], p1[1] + p2[1]];
}
function subtract(p1, p2) {
	return add(p1, negate(p2));
}
function multiply(p1, p2) {
	return [p1[0] * p2[0], p1[1] * p2[1]];
}
function scale(v, p) {
	return [v * p[0], v * p[1]];
}
function divide(p1, p2) {
	return [p1[0] / p2[0], p1[1] / p2[1]];
}
function negate(p) {
	return [-p[0], -p[1]];
}
function norm(v) {
	return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}
function norm2(v) {
	return v[0] * v[0] + v[1] * v[1];
}
function normalize(v) {
	const n = norm(v);
	return scale(1. / n, v);
}
function dst(p1, p2) {
	return norm(subtract(p2, p1));
}
function dst2(p1, p2) {
	return norm2(subtract(p2, p1));
}

function getRandomColor() {
	const randomColor = Math.floor(Math.random()*16777215).toString(16);
	return '#' + randomColor;
}
function getBBOX(shape) {
	let left = Math.min.apply(null, shape.map(x => x[0]));
	let right = Math.max.apply(null, shape.map(x => x[0]));
	let top = Math.min.apply(null, shape.map(x => x[1]));
	let bottom = Math.max.apply(null, shape.map(x => x[1]));
	return [left, right, top, bottom];
}
function getShapeCM(shape) {
	return [shape.reduce((p, c) => p + c[0], 0) / shape.length,
			shape.reduce((p, c) => p + c[1], 0) / shape.length];
}