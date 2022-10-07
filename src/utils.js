export const generateUsername = () => {
  const usernames = [
    'Clarence Richardson',
    'Nellie Zavala',
    'Millie-Mae Hawes',
    'Sean Coffey',
    'Essa Heaton',
    'Omari Jackson',
    'Lukasz Moyer',
    'Imogen Oakley',
    'Yu Horton',
    'Mariella Howell'
  ]
  const randomIndex = Math.floor(Math.random() * 10)
  return usernames[randomIndex]
}

export const generateAvatar = () => {
  const avatars = [
    '/images/avatars/avatar-0.svg',
    '/images/avatars/avatar-1.svg',
    '/images/avatars/avatar-2.svg',
    '/images/avatars/avatar-3.svg',
    '/images/avatars/avatar-4.svg',
    '/images/avatars/avatar-5.svg',
    '/images/avatars/avatar-6.svg',
    '/images/avatars/avatar-7.svg',
    '/images/avatars/avatar-8.svg',
    '/images/avatars/avatar-9.svg'
  ]
  const randomIndex = Math.floor(Math.random() * 10)
  return avatars[randomIndex]
}

export const getChildComments = (comment, comments) => {
  return comments.filter(c => c.parentCommentId === comment.id)
}
