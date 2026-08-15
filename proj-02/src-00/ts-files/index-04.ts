/*
desc-00: rxjs, quiz-
desc-01: Main operators: AsyncSubject()
desc-02: Tags: rxjs-asyncsubject
goal: 
line-code-added:
*/
const { Observable, AsyncSubject } = require('rxjs');
const { delay } = require('rxjs/operators');

// 1. Predict the output of the following code

const sub$ = new AsyncSubject();
//sub.subscribe(console.log);
sub$.next(123);
//sub.subscribe(console.log);
sub$.next(444);
sub$.complete();

// 2. Quiz 1: Triggering the Emission
// Goal: Make the subscriber log the final calculated 100

const calcSubject$ = new AsyncSubject<string>();
//calcSubject.subscribe(val => console.log(`Result: ${val}`));
calcSubject$.next(25);
calcSubject$.next(250);
calcSubject$.next(2500);
calcSubject$.complete()

// 3 Quiz 2: The late subscriber
// Goal: Allow subscriber 2 to receive the cached outcome

const task$ = new AsyncSubject<string>();
task$.next('In progess');
task$.next('Operational successful');
task$.complete();
//task$.pipe(delay(2000)).subscribe(console.log);

// 4 Quiz 3: One-Shot HTTP simulation
// Goal: Safely complete the stream inside the promise handler

function fetchUserData(id: number | string): Observable<{name: string, [key: string]: any}>{
	const subject$ = new AsyncSubject<{name: string, [key: string]: any}>();
	
	fetch(`https://swapi.py4e.com/api/people/${id}/`)
	.then(res => !res.ok ? Promise.reject(new Error(`Request failed with status ${res.status}`)) : res.json())
	.then(data => {
		subject$.next(data);
		subject$.complete();
	})
	.catch(err => subject$.error(err))

	return subject$.asObservable();
};

const luke$ = fetchUserData(1);
luke$.subscribe({
	next: char => console.log('Character Name: ', char.name),
	error: err => console.log('API Error: ', err),
	complete: _ => console.log('Stream finished successfully')
});
