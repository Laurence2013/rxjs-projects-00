/*
	desc-00: Give more complex code example to differentiate expand() operator. Tag(s) rxjs-expand
	desc-01: Scenario 2: Traversing a File System-like Structure (Tree Traversal)
	desc-02: Scenario 3: Generating Fibonacci Sequence up to a Limit
	desc-03: Example 2: Factorial Sequence
	desc-04: Example 3: Traversing a Tree Structure
	goal:
	line-code-added:
*/
const { of, from, interval, timer } = require('rxjs');
const { tap, map, reduce, filter, delay, take, takeWhile, flatMap, concatMap, expand, mergeMap, toArray, pluck } = require('rxjs/operators');

// desc-01
const fileSystem = {
  name: 'root',
  type: 'directory',
  children: [
    {
      name: 'folder1',
      type: 'directory',
      children: [
        { name: 'file1.txt', type: 'file', content: 'text 1' },
        { name: 'file2.js', type: 'file', content: 'js code' },
      ],
    },
    {
      name: 'folder2',
      type: 'directory',
      children: [
        { name: 'file3.txt', type: 'file', content: 'text 3' },
        {
          name: 'folder3',
          type: 'directory',
          children: [
            { name: 'file4.js', type: 'file', content: 'more js' },
            { name: 'file5.ts', type: 'file', content: 'typescript' }
          ]
        }
      ],
    },
    { name: 'file6.md', type: 'file', content: 'markdown' },
  ],
};
const getChildre00$ = file19 => file19.children ? from(file19.children) : of();
const result00$ = of(fileSystem).pipe(
	expand(file99 => file99.type === 'directory' ? from(getChildre00$(file99)) : of()),
	filter(node99 => node99.type === 'file' && node99.name.endsWith('.js')),
	map(file97 => file97.name)
);
const result01$ = of(fileSystem).pipe(
	expand(file99 => file99.type === 'directory' ? getChildre00$(file99) : of()),
	takeWhile(file98 => file98 !== of()),
	map(file97 => file97.type === 'file' ? `File: ${file97.name}, Content: ${file97.content}` : `Directory: ${file97.name}`)
);
// result01$.subscribe(console.log);

// desc-03
const source00$ = of([1, 1]);
const result02$ = source00$.pipe(
	expand(([prev, curr]) => {
		const nextN = prev + 1;
		const nextFact = curr * nextN;
		return of([nextN, nextFact])
	}),
	takeWhile(([_, result]) => result <= 1000),
	map(([_, fact]) => fact)
);
// result02$.subscribe(console.log);

// desc-02
const source01$ = of([1,1]).pipe(
	expand(([prev, curr]) => {
		const nextNum = prev + curr;
		return of([curr, nextNum])
	}),
	takeWhile(([_, nextNum]) => nextNum <= 1000),
	map(([_, num99]) => num99)
);
// source01$.subscribe(console.log);

// desc-04
const tree = {
  value: 1,
  children: [
    { value: 2, children: [] },
    {
      value: 3,
      children: [
        { value: 4, children: [] },
        { value: 5, children: [] },
      ],
    },
  ],
};
const result03$ = of(tree).pipe(
	expand(file99 => file99.value ? from(file99.children) : of(null)),
	takeWhile(file98 => file98 !== null),
	map(file97 => file97.value)
);
const result03a$ = of(tree).pipe(
	expand(file98 => file98.children ? from([...file98.children]) : of()),
	map(file97 => file97.value)
);
result03a$.subscribe(console.log);
