const { from, of, zip, interval } = require('rxjs');
const { debounceTime, concatMap, delay, take, withLatestFrom } = require('rxjs/operators');

// 01 - concatMap()
const obs00$ = from(['R','X','J','S']).pipe(
	concatMap(char => of(char).pipe(delay(300)))
);
//const result$ = obs00$.pipe(debounceTime(300));
//result$.subscribe(console.log);

// 02 - zip()
const obs01$ = of('A', 'B');
const obs02$ = of(1,2,3,4,5);
const result99$ = zip(obs01$, obs02$);
//result99$.subscribe(console.log);

// 03 - withLatestFrom()
const objs03$ = interval(1000).pipe(take(3));
const objs04$ = of('X', 'Y');
const result98$ = objs03$.pipe(withLatestFrom(objs04$)); 
result98$.subscribe(console.log);
