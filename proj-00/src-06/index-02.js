/*
	desc-00: In RxJs explain in detail the toPromise() operator.
	desc-00a: rxjs-firstValueFrom, rxjs-lastValueFrom  
	desc-01: lastValueFrom() -> Example: 
	goal:
	line-code-added:
*/
const { of, from, interval, timer, throwError, lastValueFrom, firstValueFrom } = require('rxjs');
const { tap, map, filter, flatMap } = require('rxjs/operators');

async function getLastValue(){
	const source00$ = of([1,2,3,4,5,6,7,8,9]).pipe(flatMap(dat00 => dat00));
	const lastNumber = await lastValueFrom(source00$);
	console.log(`The last number is ${lastNumber}`);
}
async function getFirstValue(){
	const source00$ = of([1,2,3,4,5,6,7,8,9]).pipe(flatMap(dat00 => dat00));
	const lastNumber = await firstValueFrom(source00$);
	console.log(`The first number is ${lastNumber}`);
}
getFirstValue();
