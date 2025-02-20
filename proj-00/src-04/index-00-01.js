/*
	desc-00: In RxJs what is the difference between audit() and auditTime()?
	desc-00a: rxjs-audit, rxjs-auditTime
	desc-01: 1. Periodic Data Fetching with Audit
	goal:
	line-code-added:
*/
const { interval, of, timer, zip, Subject, BehaviorSubject } = require('rxjs');
const { tap, map, switchMap, bufferCount, take, audit, auditTime, delay, mapTo } = require('rxjs/operators');

const fetchData00$ = _ => of({timestamp: new Date()}).pipe(delay(1000));
const result00$ = interval(500).pipe(
	auditTime(2000),
	switchMap(_ => fetchData00$()),
);
const result00a$ = interval(500).pipe(
	auditTime(2000),
	switchMap(fetchData00$),
);
result00a$.subscribe(console.log);
