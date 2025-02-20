/*
	desc-00: Give some RxJs code examples for mergeAll(), using scenarios and examples. 
	desc-00a: Tag(s) rxjs-mergeall, rxjs-concatmap
	desc-00a-00: What is the difference between of() and from()?
	desc-00a-01: In RxJs do you need to know the specific values you want to emit in of() or from()?

	desc-01: Give some RxJs code examples for mergeAll(), map(), combineLatest() and Javascript built-in filter(), using scenarios and examples
	desc-02: Scenario 1: Filtering and Transforming Stock Updates
	desc-03: Expand this 'Scenario 1: Filtering and Transforming Stock Updates' with sample array in the of()
	desc-04: Add the necessary code in the combineLatest()
	desc-05: In 'Scenario 1: Filtering and Transforming Stock Updates (with Sample Data)' where does this code come from 
		'filter(update => relevantStocks.includes(update.symbol)),'?
	desc-06: Show the extra code for this 'relevantStocks.includes(update.symbol)'?

	desc-07: Rather than using from() to real world simulate asychronous data coming in. Here we use of() multiple times with different amount of
		data comming in to simulate asychronous data coming in.
	desc-08: Part 6
	goal:
	line-code-added:
*/

const { of, interval, from } = require('rxjs');
const { map, concatMap, delay } = require('rxjs/operators');

const test00 = [1,2,3,4,5]
const test01 = [
	{1: '1', 2: '2'},
	{3: '3', 4: '4'},
	{5: '5', 6: '6'}
]

const source00$ = interval(1000).pipe(
	map(_ => (Math.floor(Math.random() * 10)) < 5 ? 'positive' : 'negative'),
	concatMap(_ => test01)
);
const source01$ = from(test00).pipe(
	map(num => ({
		index: num,
		sentiment: (Math.floor(Math.random() * 10)) < 5 ? 'positive' : 'negative'
	}))
);
const source02$ = from(test01).pipe(
	concatMap(obj => of(obj).pipe(
		delay(1000),
		map(ob => ({
			key: Object.values(ob),
			sentiment: (Math.floor(Math.random() * 10)) < 5 ? 'positive' : 'negative'
		}))
	))
);

source02$.subscribe(console.log);

