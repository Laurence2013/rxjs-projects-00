/*
	desc-00: Give more complex code example to differentiate expand() operator.
	desc-00a: rxjs-expand
	desc-01: Scenario: Imagine you have a file system represented as a nested JSON object. You want to flatten this structure and get a list of all files, 
					 including their paths.
	desc-02: Just like 'fileSystem', can you make another code example that is nested that utilises expand() and takeWhile().
		desc-02-00: Using the provided nested comments data structure, write an RxJS code snippet that utilizes expand and takeWhile to output the text of
			each comment and its replies in a flattened sequence.
	desc-03: Fetching Paginated Data:	
		desc-03-00: Imagine an API that returns a list of users in chunks (pages). You can use expand to recursively fetch all pages:
	desc-04: This nested object represents a tree-like structure
	goal:
	line-code-added:
*/
const { of, from, interval, timer } = require('rxjs');
const { tap, map, reduce, filter, delay, take, takeWhile, flatMap, concatMap, expand } = require('rxjs/operators');

// desc-01
const fileSystem = {
   "name":"root",
   "type":"directory",
   "children":[
      {
         "name":"documents",
         "type":"directory",
         "children":[
            {"name":"report.pdf", "type":"file"},
            {"name":"notes.txt", "type":"file"}
         ]
      },
      {
         "name":"images",
         "type":"directory",
         "children":[{"name":"vacation.jpg", "type":"file"}]
      }
   ]
};
const result00$ = of(fileSystem).pipe(
	expand(file99 => (file99.children ? from(file99.children) : of(null))),
	takeWhile(file98 => file98 !== null),
	map(file97 => ({name: file97.name, type: file97.type}))
);
// result00$.subscribe(console.log);

// desc-02, desc-02-00
const comments = [
  {
    text: 'This is a great post!',
    replies: [
      { text: 'I agree!' },
      {
        text: 'I have a question...',
        replies: [{ text: 'Here is the answer.' }],
      },
    ],
  },
  {
    text: 'Another comment here.',
    replies: [{ text: 'Thanks for sharing!' }],
  },
];
const source00$ = comment => {
	return of(comment).pipe(
		expand(text99 => text99.replies ? from(text99.replies) : of(null)),
		takeWhile(text98 => text98 !== null)
	)
};
const result01$ = from(comments).pipe(
	concatMap(comment99 => source00$(comment99)),
	map(text97 => text97.text)
);
// result01$.subscribe(console.log);

// desc-03, desc-03-00
function fetchUsers(page){
	const mockData = {
    1: {
      users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
      nextPage: 2,
    },
    2: {
      users: [{ id: 3, name: 'Charlie' }, { id: 4, name: 'David' }],
      nextPage: 3,
    },
    3: {
      users: [{ id: 5, name: 'Craig' }, { id: 6, name: 'James' }],
      nextPage: null,
    },
  };
  return of(mockData[page]).pipe(delay(1000));
};
const initialPage = 1;
const result02$ = fetchUsers(initialPage).pipe(
	expand(pages99 => pages99.nextPage ? fetchUsers(pages99.nextPage) : of(null)),
	takeWhile(pages98 => pages98 !== null),
	map(pages97 => pages97.users)
);
const result02a$ = fetchUsers(initialPage).pipe(
	expand(pages99 => pages99.nextPage ? fetchUsers(pages99.nextPage) : of(null)),
	takeWhile(pages98 => pages98 !== null),
	map(pages97 => pages97.users),
	reduce((acc, pages96) => acc.concat(pages96), [])
);
const result02b$ = fetchUsers(initialPage).pipe(
	expand(pages99 => pages99.nextPage ? fetchUsers(pages99.nextPage) : of(null)),
	//takeWhile(pages98 => pages98 !== null), This causes an error because the recusive function expand() cannot see a base case
	map(pages97 => pages97.users),
	reduce((acc, pages96) => acc.concat(pages96), [])
);
// result02b$.subscribe(console.log);

// desc-04
const tree = {
  value: 'A',
  children: [
    { value: 'B', children: [] },
    {
      value: 'C',
      children: [{ value: 'D', children: [] }]
    }
  ]
};
const result03$ = of(tree).pipe(
	expand(val99 => val99.children ? from(val99.children) : of(null)),
	takeWhile(val98 => val98 !== null),
	reduce((acc, curr) => acc.concat(curr.value),[])
);
result03$.subscribe(console.log);
