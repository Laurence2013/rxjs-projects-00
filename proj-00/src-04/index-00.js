/*
	desc-00: In RxJs, what is the audit() operator?
	desc-00a: rxjs-audit, settimeout-vs-timer
	desc-01: Example
	desc-02: 4. Combining with Other Operators
	desc-03: 3. Combining audit() with zip()
	desc-04: 1. Periodic Data Fetching with Audit
	desc-05: 3. Game Action Throttling
	desc-06: 2. User Input with Simulated API Updates
	goal:
	line-code-added:
*/
const { interval, of, timer, audit, zip, Subject } = require('rxjs');
const { map, switchMap, bufferCount, take, auditTime, delay } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000);
const source00a$ = timer(3000);
const result00$ = source00$.pipe(audit(() => source00a$));
//result00$.subscribe(console.log);

// desc-02
const source01$ = interval(900);
const result01$ = source01$.pipe(
	bufferCount(3),
	audit(() => interval(2000)),
	take(3)
);
//result01$.subscribe(console.log);

// desc-03
const source02$ = interval(100).pipe(map(x => x * 2));
const source02a$ = interval(100).pipe(map(x => x * 4));

const result02$ = zip(source02$.pipe(auditTime(3000)), source02a$.pipe(auditTime(1000)));
result02$.subscribe(([val1, val2]) => console.log(`Synchronised values: ${val1} - ${val2}`));

// desc-04
const source03$ = () => of({timestamp: new Date()}).pipe(delay(1000));
const result04$ = interval(500).pipe(
	audit(() => timer(6000)), //This pretends to make the API call
	switchMap(source03$)
);
//result04$.subscribe(data => console.log(data));

// desc-05
const source04$ = new Subject();
const performAction = action => of(`Performing action: ${action}`).pipe(delay(500));

const result05$ = source04$.pipe(
	audit(() => timer(1000)),
	switchMap(performAction)
);
/*result05$.subscribe(result => console.log(result));
source04$.next('attack');

setTimeout(_ => source04$.next('defend'), 300);
setTimeout(_ => source04$.next('heal'), 800);*/

// desc-06
const source05$ = new Subject();
const updateApi00$ = value => of(`API updated with: ${value}`).pipe(delay(800));
const updateApi01$ = value => of(`API updated with: ${value}`);

const result06$ = source05$.pipe(
	auditTime(1000),
	switchMap(updateApi01$)
)
const result07$ = source05$.pipe(switchMap(updateApi01$))

result07$.subscribe(res => console.log(res));

source05$.next('Hello');

/*setTimeout(_ => source05$.next('World'));
setTimeout(_ => source05$.next('!'));
setTimeout(_ => source05$.next('World'), 300);
setTimeout(_ => source05$.next('!'), 1000);*/
