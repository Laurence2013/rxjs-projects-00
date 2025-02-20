/*
	desc-00: In RxJs explain the concatMap() operator.
	desc-00a: rxjs-concatmap
	desc-01: 3. Animation Sequencing:
	goal:
	line-code-added:
*/
const { of, from, interval, timer } = require('rxjs');
const { tap, map, filter, flatMap, concatMap, mergeMap, switchMap, bufferWhen, delay, take, mergeAll } = require('rxjs/operators');

const animations00 = [
  { element: '#box1', animation: 'fadeIn' },
  { element: '#box2', animation: 'slideIn' },
  { element: '#box3', animation: 'zoomIn' }
];
const animations01 = [[
  { element: '#box1', animation: 'fadeIn' },
  { element: '#box2', animation: 'slideIn' },
  { element: '#box3', animation: 'zoomIn' }
]];
const result00$ = of(animations00).pipe(
	concatMap(data00 => from(data00).pipe(
		map(data01 => `Animation: ${data01.animation} - Element: ${data01.element}`),
		delay(1000)
	))
);
const result01$ = of(animations01).pipe(
	flatMap(data00 => of(data00.flat()).pipe(
		concatMap(data01 => of(data01).pipe(delay(1000)))
	))
);
const result02$ = of(animations01).pipe(
	flatMap(data00 => data00),
	flatMap(data01 => data01),
	concatMap(data02 => of(data02).pipe(delay(1000)))
);
result02$.subscribe(console.log);
