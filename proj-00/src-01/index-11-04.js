/*
	desc-00: In RxJs create some coding quizzes for zip() operator and iff() operator.
	desc-00a: rxjs-zip, rxjs-iif
	desc-01: Quiz 3:  Zip and iif Combined
	desc-02: Example 1: Combining Data Streams
	desc-03: Example 2:  Processing Asynchronous Results
	goal:
	line-code-added:
*/

const { of, from, Subject, interval, zip, iif } = require('rxjs');
const { map, take, combineAll, concatAll } = require('rxjs/operators');

// desc-01
const userInput$ = from(['correct', 'password123']);
const validationResults$ = from([true, true]);

const result00$ = zip(userInput$, validationResults$).pipe(
	map(([user, validation]) => iif(() => validation === true, 
		of('Valid'), 
		of('Invalid')
	)),
	combineAll()
);
const result01$ = zip(userInput$, validationResults$).pipe(
	map(([input, isValid]) => [isValid]),
	map(allValid => iif(() => allValid.every(result => result === true),
		of('Valid'),
		of('Invalid')
	)),
	concatAll()
)
//result00$.subscribe(console.log);

// desc-02
const name$ = new Subject();
const age$ = new Subject();
const result02$ = zip(name$, age$).pipe(map(([name, age]) => `My name is: ${name}, and I am: ${age}`));
//result02$.subscribe(console.log);

name$.next('Alice');
age$.next(22);
name$.next('Craig');
age$.next(32);

// desc-03
const async00$ = _ => new Promise(res => setTimeout(_ => res('John Doe'), 5000));
const async01$ = _ => new Promise(res => setTimeout(_ => res('Craig Johnson'), 2000));
const result03$ = zip(from(async00$()), from(async01$())).pipe(
	map(([async00, async01]) => `2 people: ${async00} and ${async01}`)
)
result03$.subscribe(console.log);
