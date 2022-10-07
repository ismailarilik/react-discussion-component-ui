import { DateTime } from "luxon"
import { generateUsername, generateAvatar } from '../utils'

export default class Comment {
  constructor (
    {
      id = null,
      username = generateUsername(),
      avatar = generateAvatar(),
      commentDate = DateTime.now(),
      commentText,
      upvotes = 0,
      parentCommentId = null
    } = {}
  ) {
    this.id = id
    this.username = username
    this.avatar = avatar
    this.commentDate = commentDate
    this.commentText = commentText
    this.upvotes = upvotes
    this.parentCommentId = parentCommentId
  }
}
