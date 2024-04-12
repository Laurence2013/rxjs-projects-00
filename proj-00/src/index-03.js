/*
desc-00: Using the concat() function, tag rxjs-concat
desc-01: https://www.learnrxjs.io/learn-rxjs/operators/combination/concat
goal: 
line-code-added:
*/

//Example 1: Basic concat usage with three observables
const { interval, of, concat } = require('rxjs');

const example00 = concat(
	of(1,2,3),
	of(4,5,6),
	of(7,8,9)
);
example00.subscribe(console.log);

//Example 3: (Warning!), concant with source that does not complete
const example01 = concat(
	interval(1000),
	of(1,2,3)
);
//example01.subscribe(console.log);
