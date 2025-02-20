/*
	desc-00: 1. Simulating User Input (Typing)
	desc-00a: js-simulation, rxjs-withlatestfrom(), rxjs-debouncetime()
	goal:
	line-code-added:
*/
const { Observable } = require('rxjs');
const { withLatestFrom, debounceTime } = require('rxjs/operators');

const userInput00$ = new Observable(obs => {
	const text = 'Hello World';
	let i = 0;
	const intervalId = setInterval(() => {
		obs.next(text.slice(0, i + 1));
		i++;
		if(i === text.length){
			clearInterval(intervalId);
			obs.complete();
		}
	}, 1000);
});
const userInput01$ = new Observable(obs => {
	const text = 'Hello World';
	let i = 0;
	const intervalId = setInterval(() => {
		obs.next(text.slice(0, i + 1));
		i++;
		if(i === text.length){
			clearInterval(intervalId);
			obs.complete();
		}
	}, 150);
});
const userInput02$ = new Observable(obs => {
	const text = 'Hello World';
	let i = 0;
	let typing = true;
	const intervalId = setInterval(() => {
		if(typing === true){
			obs.next(text.slice(0, i + 1));
			i++;
		};
		if(typing === false){
			obs.next(text.slice(0, i - 1));
			i--;
		};
		if(i === 6) typing = false;
		if(i === 0){
			clearInterval(intervalId);
			obs.complete();
		};
	}, 100);
});
const result00$ = userInput00$.pipe(withLatestFrom(userInput00$));
const result01$ = userInput01$.pipe(debounceTime(200));
const result02$ = userInput02$.pipe(withLatestFrom(userInput02$));
result02$.subscribe(val => console.log(val[0]));
