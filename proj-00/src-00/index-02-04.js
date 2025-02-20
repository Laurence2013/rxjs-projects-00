/*
desc-00: CCombining latest values from two observables, tag rxjs-combinelatest
goal:
line-code-added:
*/
const { interval, of, combineLatest } = require('rxjs');
const { delay } = require('rxjs/operators');

const source1 = interval(1000);
const source2 = of('apple', 'banana', 'orange').pipe(delay(4000));

const combined$ = combineLatest(source1, source2);

combined$.subscribe(console.log);
