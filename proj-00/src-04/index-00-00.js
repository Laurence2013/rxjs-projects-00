/*
	desc-00: In RxJs what is the difference between audit() and auditTime()?
	desc-00a: rxjs-audit, rxjs-auditTime
	desc-01: Give some code examples for audit() to illustrate a traffic light, use simulated APIs
	desc-02: Give some code examples using auditTime() to illustrate a traffic light, use simulated APIs
	desc-03: Can you give code examples where the audit() time changes depending on how long a questions is? From 'A game show buzzer'?
	goal:
	line-code-added:
*/
const { interval, of, timer, zip, Subject, BehaviorSubject } = require('rxjs');
const { tap, map, switchMap, bufferCount, take, audit, auditTime, delay, mapTo } = require('rxjs/operators');

// desc-01
const carArrival00$ = new Subject();
const gapInTraffic00$ = interval(5000).pipe(
	tap(_ => console.log('gap'))
);
const trafficLight00$ = carArrival00$.pipe(
	audit(_ => gapInTraffic00$),
	tap(_ => console.log('Car passes through'))
)
/*trafficLight00$.subscribe();
setInterval(_ => {
	carArrival00$.next(),
	console.log('Car arrives')
}, 2000);*/

// desc-02
const carArrival01$ = new Subject();
const trafficLight01$ = carArrival01$.pipe(
	auditTime(5000),
	tap(_ => console.log('Green light - Car passes through'))
);
/*trafficLight01$.subscribe();
setInterval(_ => {
	carArrival01$.next(),
	console.log('Car arrives')
}, 2000);*/

// desc-03
const buzzerPresses$ = new Subject();
const questions$ = new BehaviorSubject('');
const gameLogic$ = buzzerPresses$.pipe(
	audit(_ => {
		const currentQuestion = questions$.getValue();
		const estimatedReadingTimesMs = questions$.length * 50;
		console.log(estimatedReadingTimesMs);
		
		return timer(estimatedReadingTimesMs);
	}),
	tap(_ => console.log('Buzzer accepted!'))
);
gameLogic$.subscribe();

questions$.next('What is the capital of France?');
setTimeout(() => buzzerPresses$.next(), 2000); // Press buzzer too early

setTimeout(() => {
  questions$.next('Who painted the Mona Lisa?');
  setTimeout(() => buzzerPresses$.next(), 1000); // Press buzzer after a short question
}, 5000);

setTimeout(() => {
  questions$.next('Explain the theory of relativity in simple terms.');
  setTimeout(() => buzzerPresses$.next(), 8000); // Press buzzer after a long question
}, 10000);
