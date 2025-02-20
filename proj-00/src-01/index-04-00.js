/*
	desc-00: Give some RxJs code examples for mergeAll(), using scenarios and examples. Tag(s) rxjs-mergeall
	desc-01: Give some RxJs code examples for mergeAll(), map(), using scenarios and examples
	desc-02: For this 'Scenario 2: Transforming API Data', create a sample array rather than using an API call
	desc-03: Part 2
	goal:
	line-code-added:
*/

const { of, from } = require('rxjs');
const { mergeAll, map } = require('rxjs/operators');

const users00 = [
	{ firstName: 'John1', lastName: 'Doe', age: 30 },
  { firstName: 'Jane1', lastName: 'Smith', age: 25 },
  { firstName: 'Mike1', lastName: 'Lee', age: 40 },
];
const users01 = [
	{ firstName: 'John2', lastName: 'Doe', age: 30 },
  { firstName: 'Jane2', lastName: 'Smith', age: 25 },
  { firstName: 'Mike2', lastName: 'Lee', age: 40 },
];

const source00$ = of(users00, users01).pipe(
	mergeAll(),
	map(user => ({
		Firstname: user.firstName,
		Lastname: user.lastName
	}))
);
const source01$ = from([users00, users01]).pipe(
	mergeAll(),
	map(user => ({
		Firstname: user.firstName,
		Lastname: user.lastName
	}))
);

source01$.subscribe(console.log);
