/*
	desc-00: In RxJs explain the concatMapTo() operator.
	desc-00a: rxjs-concatmapto
	desc-01: 3. Animation Sequencing
	goal:
	line-code-added:
*/
const { of, from, interval, timer } = require('rxjs');
const { tap, map, filter, flatMap, concatMap, concatMapTo, delay } = require('rxjs/operators');

const animations00 = [
  { element: '#box1', animation: 'fadeIn' },
  { element: '#box2', animation: 'slideIn' },
  { element: '#box3', animation: 'zoomIn' }
];

const animationStep = from(animations00);
const animate = step => of(`Animation ${step.element} with ${step.animation}`).pipe(delay(1000));

const result00$ = animationStep.pipe(
	concatMapTo(data01 => animate(data01))
);
result00$.subscribe(console.log);
