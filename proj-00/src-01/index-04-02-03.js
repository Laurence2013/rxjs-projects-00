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
	desc-08: Part 5, using concatMap()
	goal:
	line-code-added:
*/

const { delay, of, from, interval, combineLatest } = require('rxjs');
const { map, filter, concatMap, mergeAll } = require('rxjs/operators');

const stockUpdates = [
  { symbol: 'GOOG', price: 1234.99, previousClose: 1230.00 },
  { symbol: 'AAPL', price: 150.25, previousClose: 148.50 },
  { symbol: 'MSFT', price: 287.10, previousClose: 285.75 },
  { symbol: 'AMZN', price: 3521.43, previousClose: 3510.22 }
];

const marketSentiment00$ = interval(1000).pipe(
	map(_ => (Math.floor(Math.random() * 10)) < 5 ? 'positive' : 'negative'),
	concatMap(_ => of(stockUpdates))
);

const relevantStocks = ['MSFT', 'GOOG', 'AAPL'];
const updateStreams03$ = from(stockUpdates).pipe(
	concatMap(stocks => of(stocks).pipe(
		filter(stock => relevantStocks.includes(stock.symbol)),
		map(stock => ({
			...stock,
			sentiment: marketSentiment00
		})),
		delay(1000),
	)),
);
const economicIndicators$ = of({ gdpGrowth: 2.3, inflationRate: 1.8 });

const source00$ = combineLatest([updateStreams03$, economicIndicators$], (updates, indicators) => {
	return {
		...updates,
		indicators
	}
});

//1: updateStreams03$.subscribe(console.log);
//2: source00$.subscribe(console.log);

marketSentiment00$.subscribe(console.log);
