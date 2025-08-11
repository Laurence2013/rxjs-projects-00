const { from, of } = require('rxjs');
const { debounceTime, concatMap, delay } = require('rxjs/operators');

const searchInput$ = from(['R','X','J','S']).pipe(
	concatMap(char => of(char).pipe(delay(300)))
);
const result$ = searchInput$.pipe(debounceTime(500));
result$.subscribe(console.log);
