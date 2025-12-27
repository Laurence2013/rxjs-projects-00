/*
desc-00: RxJs Combination operators
desc-01: Main operators: withLatestFrom(), combineLatest()
desc-02: Tags: rxjs-withLatestFrom, rxjs-combineLatest, rxjs-quiz
goal: 
line-code-added:
*/
const { from, of, zip, interval, timer, combineLatest } = require('rxjs');
const { debounceTime, concatMap, delay, take, withLatestFrom } = require('rxjs/operators');

// 01 - concatMap()
const obs00$ = from(['R','X','J','S']).pipe(
	concatMap(char => of(char).pipe(delay(300)))
);
// const result$ = obs00$.pipe(debounceTime(300));
// result$.subscribe(console.log);

// 02 - zip()
const obs01$ = of('A', 'B');
const obs02$ = of(1,2,3,4,5);
const result99$ = zip(obs01$, obs02$);
// result99$.subscribe(console.log);

// 03 - withLatestFrom()
const objs03$ = interval(1000).pipe(take(3));
const objs04$ = of('X', 'Y');
const result98$ = objs03$.pipe(withLatestFrom(objs04$)); 
// result98$.subscribe(console.log);

// 03a - withLatestFrom()
const source00$ = interval(5000);
const source01$ = interval(1000);
const result97$ = source00$.pipe(withLatestFrom(source01$));
// result97$.subscribe(console.log);

// 03b - withLatestFrom()
const source02$ = interval(1000);
const source03$ = interval(5000);
const result96$ = source02$.pipe(withLatestFrom(source03$));
// result96$.subscribe(console.log);

// combineLatest()
const source04$ = timer(0, 1000).pipe(take(2));
const source05$ = timer(500, 1000).pipe(take(2));
const result95$ = combineLatest([source04$, source05$]);
result95$.subscribe(console.log);
