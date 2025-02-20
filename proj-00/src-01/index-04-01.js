/*
	desc-00: Give some RxJs code examples for mergeAll(), using scenarios and examples. Tag(s) rxjs-mergeall
	desc-01: Give some RxJs code examples for mergeAll(), map(), using scenarios and examples
	desc-02: For this 'Scenario 2: Transforming API Data', create a sample array rather than using an API call
	desc-03: Part 3
	desc-04: Group all the ages betwenn 20 - 30, 31 - 40, 41 - 50
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
	{ firstName: 'John2', lastName: 'Doe', age: 32 },
  { firstName: 'Jane2', lastName: 'Smith', age: 23 },
  { firstName: 'Mike2', lastName: 'Lee', age: 44 },
];
const users02 = [
	{ firstName: 'John3', lastName: 'Doe', age: 36 },
  { firstName: 'Jane3', lastName: 'Smith', age: 25 },
  { firstName: 'Mike3', lastName: 'Lee', age: 48 },
];

