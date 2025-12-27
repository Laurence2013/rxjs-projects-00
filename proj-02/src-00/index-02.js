/*
desc-00: rxjs, quiz-07
desc-01: Main operators: withLatestFrom(), combineLatest()
desc-02: Tags: rxjs-withLatestFrom, rxjs-combineLatest, rxjs-quiz
goal: 
line-code-added:
*/
const { from, of, zip, interval, timer, combineLatest } = require('rxjs');
const { debounceTime, concatMap, delay, take, mapTo, map, withLatestFrom } = require('rxjs/operators');

// 1. Predict the output of the following code
const source04$ = timer(0, 1000).pipe(take(4));
const source05$ = timer(500, 1000).pipe(take(4));
const result99$ = combineLatest([source04$, source05$]);
// result99a$.subscribe(console.log);

// 2. What will happen when this code executes?
const source06$ = of('click');
const source07$ = timer(1000).pipe(mapTo('data'));
// const result98$ = source06$.pipe(combineLatest(source07$));
// result98$.subscribe(console.log);

// The Creation Function (Most Common)
const source08$ = timer(0, 1000).pipe(take(4));
const source09$ = timer(500, 1000).pipe(take(4));
const result97$ = combineLatest([source08$, source09$]).pipe(
	map(([valA, valB]) => `A: ${valA} - B: ${valB}`))
// result97$.subscribe(console.log);

// Using an Object Map (Readability)
const source10$ = of('Alice');
const source11$ = of('Online');
const result96$ = combineLatest({
	user: source10$,
	presense: source11$
});
result96$.subscribe(result => console.log(`${result.user} is now ${result.presense}`))

