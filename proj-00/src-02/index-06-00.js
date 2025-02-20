/*
	desc-00: In RxJs how does defer() work? / In RxJs what is defer()?
	desc-00a: rxjs-defer
	desc-01: In RxJs, how would you code 'A Just-in-Time Factory'?
	desc-02: 3. Simulating Cold Observables with interval()
	desc-03: Example 1: Dynamic Value Generation
	desc-04: Example 2: Time-Dependent Behavior
	desc-05: Example 4: Resource Management
	goal:
	line-code-added:
*/

const { defer, of, from, interval, timer } = require('rxjs');
const { take } = require('rxjs/operators');

// desc-01
function produceGoods(){
	const goods = [];
	for(let i = 0; i < 3; i++){
		goods.push(`Item ${i + 1}`);
	};
	return of(...goods)
};
const factory00$ = defer(() => {
	console.log('Order received, starting production...');
	return produceGoods();
});
//factory00$.subscribe(data => console.log(`Customer 1 received: ${data}`));
//factory00$.subscribe(data => console.log(`Customer 2 received: ${data}`));

// desc-02
const source00$ = defer(() => interval(1000).pipe(take(5)));
/*source00$.subscribe(value => console.log(`Subscriber 1: ${value}`));

setTimeout(() => source00$.subscribe(value => console.log(`Subscriber 2: ${value}`)), 3000)*/

// desc-03
const source01$ = defer(() => of(Math.random()));
//source01$.subscribe(val => console.log(`Subscriber 1: ${val}`));
//source01$.subscribe(val => console.log(`Subscriber 2: ${val}`));

// desc-04
const source02$ = defer(() => timer(2000));
/*source02$.subscribe(() => console.log('Subscriber 1 starts after 2 seconds'));

setTimeout(() => source02$.subscribe(() => console.log('Subscriber 2 starts 3 seconds later, also after 2 seconds')), 3000);*/

// desc-05
const fetchDataFromAPI = () => new Promise(resolve => setTimeout(() => resolve(['Data 1', 'Data 2']), 1000));
const source03$ = defer(() => from(fetchDataFromAPI()));
source03$.subscribe(data => console.log('Subscriber 1:', data));
setTimeout(() => source03$.subscribe(data => console.log('Subscriber 2 (delayed):', data)), 2000);
