/*
	desc-00: In RxJs explain the buffer() operator.
	desc-00a: rxjs-buffer
	desc-02: Without using fromEvent() how can you simulate a API request using buffer()?
	goal:
	line-code-added:
*/
const { of, from, interval, timer } = require('rxjs');
const { map, filter, concatMap, switchMap, buffer, bufferCount, delay, take } = require('rxjs/operators');

const apiData00$ = of({id: 1, name: 'Product A'},{id: 2, name: 'Product B'},{id: 3, name: 'Product C'});
const apiData01$ = from([1,2,3,4,5,6,7,8,9,10]);

const apiRequest00$ = apiData00$.pipe(
	delay(3000),
	buffer(interval(3000)),
	take(1)
);
const apiRequest01$ = apiData01$.pipe(
	bufferCount(2),
	concatMap(batch00 => of(`Processing batch: ${batch00}`).pipe(delay(1000)))
);
apiRequest01$.subscribe(console.log);
