import { getChildComments } from './utils'
import Comment from './models/comment'

test('gets child comments', () => {
  const comments = [
    new Comment({
      id: 1
    }),
    new Comment({
      id: 2,
      parentCommentId: 1
    }),
    new Comment({
      id: 3,
      parentCommentId: 1
    })
  ]

  const childComments = getChildComments(comments[0], comments)

  expect(childComments).toHaveLength(2)
  expect(childComments.find(childComment => childComment.id === 2)).toBeDefined()
  expect(childComments.find(childComment => childComment.id === 3)).toBeDefined()
});
