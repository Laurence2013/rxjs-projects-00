/*
desc-00: https://www.learnrxjs.io/learn-rxjs/operators/combination/concatall, tag rxjs-concatall
desc-01: Example 1: concatAll with observable
desc-02: Using of() within the source observable
goal:
line-code-added:
*/

const { of, interval } = require('rxjs');
const { map, concatAll } = require('rxjs/operators');

const source$ = interval(1000);
const example$ = source$.pipe(
	map(val => of(val + 10)),
	concatAll(),
);
example$.subscribe(val => console.log(`Example with basic observable: ${val}`));
