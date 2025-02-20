/*
	desc-00: Give some RxJs code examples using zip() with other operators
	desc-00a: rxjs-zip
	desc-01: 1. Filtering with zip() and filter()
	desc-02: 2. Mapping with zip() and map()
	desc-03: 3. Timing with zip() and timer()
	desc-04: 4. Combining multiple sources with zip() and other operators
	desc-05: 5. Error Handling with zip() and catchError()
	desc-06: 6. Conditional Logic with zip() and iif()
	goal:
	line-code-added:
*/

// desc-01
const { of, zip, timer, combineLatest, throwError, iif, combineAll } = require('rxjs');
const { filter, map, catchError, concatAll } = require('rxjs/operators');

const numbers00$ = of(1,2,3,4,5);
const letters00$ = of('a', 'b', 'c', 'd', 'e');
const results00$ = zip(numbers00$, letters00$).pipe(
	filter(([numbers, letters]) => numbers % 2 === 0)
);
//results00$.subscribe(console.log);

// desc-02
const names00$ = of('Alice', 'Bob', 'Carol');
const ages00$ = of(25, 30, 35);
const results01$ = zip(names00$, ages00$).pipe(
	map(([name, age]) => ({name, age}))
);
const results01a$ = zip(names00$, ages00$).pipe(
	map((name, age) => ({name, age}))
);
//2: results01a$.subscribe(console.log);

// desc-03
const messages00$ = of('Hello', 'World');
const timing00$ = timer(1000, 2000);
const results02$ = zip(messages00$, timing00$);
//3: results02$.subscribe(([message, time]) => console.log(`${message} at ${time}s`))

// desc-04, this has errors, re-do later
const user$ = of({ id: 1, name: 'John' });
const permissions$ = of(['read', 'write']);
const lastLogin$ = of(new Date());
/*const results03$ = combineLatest([user$, permissions$, lastLogin$]).pipe(
	zip(of('User details:')),
	map(([combinedData, loginDetail]) => [loginDetail, ...combinedData])
);
4: results03$.subscribe(console.log);*/

// desc-05
const numbers01$ = of(1,2,3,4,5);
const error00$ = throwError(() => new Error('Oops!'));
const results04$ = zip(numbers01$, error00$).pipe(
	map(([numbers, errorValue]) => numbers * 2),
	catchError(error => of('Error occured'))
);
//4: results04$.subscribe(console.log);

// desc-06
// At results05$, the of('Student') only passes one therefore, zip() only gets the first parameter from scores00$, which is 60, even though there are
// two more parameters. The zip() operator try to match both observable elements at scores00$() and of('Student') one by one.
const scores00$ = of(60, 92, 78);
const student00$ = of('Student', 'Student', 'Student');
const passingScore = 80;
const results05$ = zip(scores00$, of('Student')).pipe(
	map(([scores, student]) => ({scores, student})),
	map(results => iif(() => results.scores >= passingScore, 
		of(`${results.student} passed with ${results.scores}`),
		of(`${results.student} failed with ${results.scores}`)
	))
);
const results06$ = zip(scores00$, student00$).pipe(
	map(([scores, student]) => ({scores, student})),
	map(results => iif(() => results.scores >= passingScore, 
		of(`${results.student} passed with ${results.scores}`),
		of(`${results.student} failed with ${results.scores}`)
	))
);
results06$.pipe(combineAll()).subscribe(console.log);
