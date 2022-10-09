import Comment from './comment';

test('new comment instance has a default id', () => {
  const comment = new Comment()
  expect(comment.id).toBeNull()
});

test('new comment instance has a default username', () => {
  const comment = new Comment()
  expect(comment.username).toBeDefined()
});

test('new comment instance has a default avatar', () => {
  const comment = new Comment()
  expect(comment.avatar).toBeDefined()
});

test('new comment instance has a default commentDate', () => {
  const comment = new Comment()
  expect(comment.commentDate).toBeDefined()
});

test('new comment instance has a default upvotes value', () => {
  const comment = new Comment()
  expect(comment.upvotes).toEqual(0)
});

test('new comment instance has a default parentCommentId', () => {
  const comment = new Comment()
  expect(comment.parentCommentId).toBeNull()
});
