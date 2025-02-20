/*
	desc-00: Give some RxJs code examples for mergeAll(), using scenarios and examples. i
	desc-00a: Tag(s) rxjs-mergeall, difference-between-of()-n-from()
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
	desc-08: Part 2, using merge
	goal:
	line-code-added:
*/

const { fromEvent, of, combineLatest, interval, merge } = require('rxjs');
const { mergeAll, map, filter, concatAll, combineAll } = require('rxjs/operators');

const stockUpdates = [
  { symbol: 'AAPL', price: 150.25, previousClose: 148.50 },
  { symbol: 'MSFT', price: 287.10, previousClose: 285.75 },
  { symbol: 'GOOG', price: 1234.99, previousClose: 1230.00 },
  { symbol: 'AMZN', price: 3521.43, previousClose: 3510.22 }
];
const relevantStocks = ['AAPL', 'MSFT', 'GOOG'];
const updateStreams00$ = of(stockUpdates, stockUpdates, stockUpdates);
const updateStreams01$ = of(stockUpdates, stockUpdates, stockUpdates, stockUpdates, stockUpdates);
const updateStreams02$ = of(stockUpdates);

const marketSentiment$ = interval(2000).pipe(map(count => Math.random() < 0.5 ? 'positive' : 'negative'));
const economicIndicators$ = of({ gdpGrowth: 2.3, inflationRate: 1.8 })

const source00$ = updateStreams00$.pipe(
	mergeAll(),
	filter(update => relevantStocks.includes(update.symbol)),
	map(update => ({
		...update,
		priceChange: update.price - update.previousClose
	})),
);
const market00$ = merge([source00$, marketSentiment$, economicIndicators$], (stockUpdate, sentiment, indicators) => {
	return {
		...stockUpdate,
    sentiment,
    ...indicators
	}
});

market00$.pipe(concatAll()).subscribe(analysis => {
	console.log('Stock analysis:', analysis);
});

