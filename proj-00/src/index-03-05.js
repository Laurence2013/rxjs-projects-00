/*
desc-00: Using the concat() function, tag rxjs-concat, coding-challenge-00
desc-01: Coding Challenge: Process Nested Data with RxJS concat()
desc-02: You are provided with three arrays of data: users, posts, and comments. Your task is to use RxJS to process this data sequentially and produce a combined output.
desc-03: Task 1: Grab all posts and comments and group them to the related user
desc-04: Look at the section 'Desired Output Structure'
goal: 
line-code-added:
*/

const { of } = require('rxjs');
const { concat, map, catchError, delay } = require('rxjs/operators');

const users = [
  { id: 1, name: 'Alice',  location: { city: 'New York', country: 'USA' } },
  { id: 2, name: 'Bob',  location: { city: 'London', country: 'UK' } },
  { id: 3, name: 'Charlie', location: { city: 'Sydney', country: 'Australia' } }
];

const posts = [
    { postId: 100, title: 'Interesting Insights', authorId: 1 },
    { postId: 101, title: 'Observations', authorId: 3 },
    { postId: 102, title: 'Latest Trends', authorId: 2 },
    { postId: 100, title: 'Additional Thoughts', authorId: 2 }, 
    { postId: 103, title: 'Emerging Patterns', authorId: 1 }, 
    { postId: 104, title: 'Community Feedback', authorId: 3 },
  ];

const comments = [
  { commentId: 5, text: 'Great point!', postId: 100 },
  { commentId: 6, text: 'Thanks for sharing', postId: 101 },
  { commentId: 7, text: 'Interesting take', postId: 101 },
  { commentId: 8, text: 'Love this analysis', postId: 100 } 
];

const getUsers00$ = of(users);
const getPosts00 = (user) => posts.filter(author => author.authorId === user.id);
const getUserPosts$ = (user) => {
	return user.pipe(
		map(user => user.map(usr => ({
			...usr,
			posts: getPosts00(usr)
		}))),
		delay(1000)
	)
};
getUserPosts$(getUsers00$).subscribe(data => data.forEach(d => console.log(d)));
