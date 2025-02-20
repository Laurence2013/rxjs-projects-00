/*
	desc-00: In RxJs  forkJoin() operator, explain this statement in detail... Tag(s) rxjs-forkjoin()
	desc-01: 
	goal:
	line-code-added:
*/

const { forkJoin, of, from, interval, concat } = require('rxjs');
const { mergeMap, take, map, concatMap, delay } = require('rxjs/operators');
