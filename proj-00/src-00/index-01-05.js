/*
desc-00: Combining user clicks with a runner timer, tag rxjs-combineall
goal: This throws a ReferenceError...
line-code-added:
*/
const { take, map, combineAll } = require('rxjs/operators');
const { fromEvent, interval } = require('rxjs');

const clicks$ = fromEvent(document, 'click');

clicks$.subscribe(console.log);

