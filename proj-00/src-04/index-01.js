/*
	desc-00: What does higher observable mean in Reactive programming?
	desc-00a: higher-order-observables
	desc-00b: Implementing looping dynamics
	desc-01: 1. flatMap (Processing All Data)
	goal:
	line-code-added:
*/

const { of, from } = require('rxjs');
const { map, flatMap, concatMap, switchMap } = require('rxjs/operators');

const source00$ = of('England', 'Wales', 'Scotland', 'Northern Ireland', 'Ireland');
const result00$ = source00$.pipe(
	flatMap(countries => from(['Electronics', 'Clothing', 'Footwear', 'Hoodies', 'Caps']).pipe(
		flatMap(categories => of(['BrandA', 'BrandB', 'BrandC', 'BrandD', 'BrandE']).pipe(
			map(brands => `Country: ${countries} - Category: ${categories} - Brand: ${brands}`)
		))
	))
);
const result01$ = source00$.pipe(
	flatMap(countries => from(['Electronics', 'Clothing', 'Footwear', 'Hoodies', 'Caps']).pipe(
		flatMap(categories => of(['BrandA', 'BrandB', 'BrandC', 'BrandD', 'BrandE']).pipe(
			flatMap(brands => brands.map(brand => `Country: ${countries} - Category: ${categories} - Brand: ${brand}`))
		))
	))
);
const result02$ = source00$.pipe(
	concatMap(countries => from(['Electronics', 'Clothing', 'Footwear', 'Hoodies', 'Caps']).pipe(
		concatMap(categories => of(['BrandA', 'BrandB', 'BrandC', 'BrandD', 'BrandE']).pipe(
			map(brands => `Country: ${countries} - Category: ${categories} - Brand: ${brands}`)
		))
	))
);
const result03$ = source00$.pipe(
	switchMap(countries => from(['Electronics', 'Clothing', 'Footwear', 'Hoodies', 'Caps']).pipe(
		switchMap(categories => of(['BrandA', 'BrandB', 'BrandC', 'BrandD', 'BrandE']).pipe(
			map(brands => `Country: ${countries} - Category: ${categories} - Brand: ${brands}`)
		))
	))
);
result03$.subscribe(console.log);
