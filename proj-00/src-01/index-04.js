/*
	desc-00: Give some RxJs code examples for mergeAll(), using scenarios and examples. Tag(s) rxjs-mergeall
	desc-01: Give some RxJs code examples for mergeAll(), map(), using scenarios and examples
	desc-02: For this 'Scenario 2: Transforming API Data', create a sample array rather than using an API call
	desc-03: Part 1
	goal:
	line-code-added:
*/

const { of } = require('rxjs');
const { mergeAll, map } = require('rxjs/operators');

const users00 = [
	{ firstName: 'John', lastName: 'Doe', age: 30 },
  { firstName: 'Jane', lastName: 'Smith', age: 25 },
  { firstName: 'Mike', lastName: 'Lee', age: 40 },
];

const source00$ = of(users00).pipe(
	mergeAll(),
	map(user => ({
		Firstname: user.firstName,
		Lastname: user.lastName
	}))
);

source00$.subscribe(console.log);
