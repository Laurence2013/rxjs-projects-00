/*
	desc-00: In RxJs give code examples using 'Destructuring'
	desc-00a: destructuring
	desc-01: 1. Destructuring Observables from an Array
	desc-02: 2. Destructuring Values Emitted by an Observable
	desc-03: 4. Destructuring with the next Notification
	desc-04: 1. Destructuring with Higher-Order Observables
	goal:
	line-code-added:
*/
const { generate, of, from, timer, throwError, iif, combineLatest, Subject } = require('rxjs');
const { map, filter, delay, mergeMap, concatMap, catchError, takeWhile, scan } = require('rxjs/operators');

// desc-01
const source00$ = [from([1,2,3,4,5]), from(['a','b','c','d','e','f'])];
const [numbers$, letters$] = source00$;
//numbers$.subscribe(console.log);
//letters$.subscribe(console.log);

// desc-02
const source01$ = [of({name: 'Laurence', age: 24, email: 'lozza@gmail.com'})];
//const source01a$ = [from({name: 'Laurence', age: 24, email: 'lozza@gmail.com'})]; Dont work!
//const source01e$ = [from({name: 'Laurence', age: 24, email: 'lozza@gmail.com'})]; Dont work!
const source01d$ = [from([{name: 'Laurence', age: 24, email: 'lozza@gmail.com'}])];
const [person00$] = source01$;
//person00$.subscribe(({name, age}) => console.log(`name: ${name} - age: ${age}`));

// desc-02a
const source01c$ = of({name: 'Laurence', age: 24, email: 'lozza@gmail.com'});
//source01c$.subscribe(({name, age}) => console.log(`name: ${name} - age: ${age}`));

// desc-02b
const source01b$ = from([{name: 'Laurence', age: 24, email: 'lozza@gmail.com'}]);
const person01$ = source01b$;
//person01$.subscribe(({name, age}) => console.log(`name: ${name} - age: ${age}`));

// desc-03
const subj00 = new Subject();
//subj00.subscribe({next: ({value, completed}) => console.log(`Value: ${value}, Completed: ${completed}`)});
subj00.next({value: 44, completed: false});

// desc-04
const source02$ = from(['Alice', 'Bob', 'Charlie']);
const result00$ = source02$.pipe(
	concatMap(name => {
		const age$ = of(Math.floor(Math.random() * 40) + 20);
		return age$.pipe(
			map(age => ({name, age}))
		)
	})
);
result00$.subscribe(({name, age}) => console.log(`Name: ${name} - Age: ${age}`));
