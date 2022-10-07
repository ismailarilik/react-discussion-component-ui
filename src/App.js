import { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import { getChildComments, generateAvatar } from './utils'
import Comment from './models/comment'

function App() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [comments, setComments] = useState([])
  // To keep which comment is being replied and making related create comment view visible
  const [commentReplyStatuses, setCommentReplyStatuses] = useState({})
  // To keep input values in create comment views,
  // for both new (the key will be null) and reply (the key will be comment.id)
  const [inputValues, setInputValues] = useState({})

  // Fetch comments and display them in screen
  const fetchComments = async () => {
    try {
      const response = await fetch('/comments')

      if (response.ok) {
        const data = await response.json()

        const comments = data.comments
        // Iterate over comments and replace commentDate strings with Luxon DateTime objects; they will be necessary
        comments.forEach(comment => {
          comment.commentDate = DateTime.fromISO(comment.commentDate)
        })
        // Sort comments by their commentDate attributes
        comments.sort((a, b) => b.commentDate - a.commentDate)

        // Initialize input values on create comment views so inputs becomes controlled components
        const inputValues = { null: '' }
        comments.filter(comment => comment.parentCommentId === null).forEach(comment => {
          inputValues[comment.id] = ''
        })
        setInputValues(inputValues)

        setIsLoaded(true)
        setComments(comments)
      } else {
        throw Error(`${response.statusText} Error message: ${await response.text()}`)
      }
    } catch (e) {
      setIsLoaded(true)
      setError(e)
      console.log(e)
    }
  }

  /*
   * Create a root comment (if comment param is not given) or a nested comment (if comment param is given)
   */
  const createComment = async comment => {
    let commentFromClass = null
    if (!comment) {
      // Create a root comment
      const commentInputValue = inputValues[null]
      commentFromClass = new Comment({
        commentText: commentInputValue
      })
    } else {
      // Create a nested comment
      const commentId = comment.id
      const commentInputValue = inputValues[commentId]
      commentFromClass = new Comment({
        commentText: commentInputValue,
        parentCommentId: commentId
      })

      // Hide the input at the end
      setCommentReplyStatuses({ ...commentReplyStatuses, ...({ [commentId]: false }) })
    }

    try {
      const response = await fetch('/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comment: {
            username: commentFromClass.username,
            avatar: commentFromClass.avatar,
            commentDate: commentFromClass.commentDate,
            commentText: commentFromClass.commentText,
            upvotes: commentFromClass.upvotes,
            parentCommentId: commentFromClass.parentCommentId
          }
        })
      })

      if (response.ok) {
        fetchComments()
      } else {
        throw Error(`${response.statusText} Error message: ${await response.text()}`)
      }
    } catch (e) {
      console.log(e)
    }
  }

  /*
   *Update this comment by increasing its upvotes attribute by one
   */
  const upvoteComment = async comment => {
    const commentId = comment.id
    const upvotesValue = comment.upvotes
    try {
      const response = await fetch(`/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comment: {
            upvotes: upvotesValue + 1
          }
        })
      })

      if (response.ok) {
        fetchComments()
      } else {
        throw Error(`${response.statusText} Error message: ${await response.text()}`)
      }
    } catch (e) {
      console.log(e)
    }
  }

  /*
   * Add a create comment fragment below this comment to provide user a way to reply to this comment
   */
  const replyComment = comment => {
    const commentId = comment.id
    setCommentReplyStatuses({ ...commentReplyStatuses, ...({ [commentId]: true }) })
  }

  useEffect(() => {
    fetchComments()
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="container w-1/2 mx-auto my-4 space-y-4">
        <h1 className="text-3xl font-bold">Lorem Ipsum</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed dignissim justo erat, vitae condimentum mi auctor sed.
          Phasellus in enim aliquam, volutpat turpis sit amet, aliquet turpis.
          Cras vitae magna quis diam tempor facilisis.
          Curabitur nisi eros, efficitur in pharetra vitae, auctor a tellus.
          Proin sodales ex metus, non ultricies erat viverra non.
          Cras interdum ullamcorper neque at pretium.
          Sed vulputate finibus orci accumsan pulvinar.
          Duis molestie malesuada enim ut efficitur.
          Proin auctor, justo ac viverra sagittis, est lacus malesuada ligula, nec lobortis arcu felis id est.
          Nam venenatis ultricies quam auctor auctor.
          Proin imperdiet vulputate vestibulum.
        </p>
        <p>
          Fusce consectetur ipsum ante, non congue metus bibendum eget.
          Donec laoreet molestie blandit.
          Proin faucibus nulla a orci molestie, at finibus turpis scelerisque.
          Nullam dapibus augue ex, sit amet cursus nisi porttitor quis.
          Duis id velit posuere elit aliquam auctor sit amet sed odio.
          Praesent felis nunc, faucibus quis velit ac, dictum faucibus risus.
          Morbi auctor facilisis augue in scelerisque.
          Donec aliquam orci turpis, eu molestie arcu ultricies et.
          Donec consequat mi pellentesque posuere ultrices.
          Vivamus dolor augue, volutpat in rutrum luctus, ultrices eu ante.
          Aliquam porta, ipsum id molestie scelerisque, lorem purus elementum tortor, vitae volutpat velit libero ac risus.
          Fusce egestas, nulla nec blandit vehicula, elit dui aliquam dui, eget tincidunt tortor orci at urna.
          Vivamus a odio ullamcorper tortor rhoncus mollis.
          Nunc non mi sodales, porttitor velit sed, accumsan enim.
        </p>
        <p>
          Phasellus vitae velit libero.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam ut porttitor sem, ac efficitur velit.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          Nullam nisi lorem, venenatis in rutrum consectetur, porttitor rutrum lorem.
          Vivamus rutrum ultrices tortor, quis vestibulum dolor rhoncus a.
          Nam quam lorem, laoreet vitae nisi a, scelerisque blandit mauris.
          Nunc commodo rutrum vestibulum.
          Curabitur sollicitudin orci augue, lacinia malesuada ipsum consequat non.
          Suspendisse pulvinar, nibh vitae blandit tempus, orci erat accumsan est, non dignissim tortor dolor at nibh.
          Etiam feugiat interdum felis, et fermentum mi efficitur aliquam.
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          Donec porttitor felis massa, a sagittis nulla vehicula id.
          Pellentesque ultrices rutrum erat, non facilisis massa pretium in.
          Nam finibus eget ipsum non pellentesque.
        </p>
        <p>
          Curabitur vulputate arcu eu nulla sollicitudin euismod.
          Praesent fermentum lacinia sem at lacinia.
          Cras laoreet, mauris accumsan egestas elementum, turpis eros porta mi, a faucibus ex libero quis dui.
          Integer congue scelerisque elit quis elementum.
          Quisque ligula felis, malesuada a vestibulum id, eleifend et ipsum.
          Etiam non vestibulum turpis, a cursus quam.
          Morbi augue justo, finibus et sollicitudin ac, commodo a nulla.
          Integer vel tortor malesuada est commodo tempus condimentum eget ipsum.
          Donec ut justo quis tortor laoreet placerat quis ac ligula.
          Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Vivamus volutpat velit id est mattis, ut sodales sem placerat.
          Integer ante diam, tincidunt at mollis auctor, blandit vitae quam.
        </p>
        <p>
          Pellentesque lectus nibh, aliquam in rutrum non, blandit eu augue.
          Curabitur vel placerat elit, nec tristique diam.
          Nulla finibus rutrum ornare.
          Maecenas nec purus sodales, imperdiet lectus eget, vestibulum est.
          Nam eleifend nunc non elit scelerisque mollis.
          Suspendisse volutpat dignissim facilisis.
          Sed consequat finibus tortor, sed gravida diam laoreet egestas.
          In a lacinia risus, a cursus elit.
          Aliquam ultricies posuere cursus.
          Vestibulum blandit venenatis dolor in laoreet.
          Phasellus tempor tincidunt ultricies.
        </p>

        {/* Discussion component */}
        <div>
          <h2 className="text-2xl font-bold">Discussion</h2>
          {/* New comment */}
          <div id="new-comment" className="mt-8 flex gap-x-3">
            <img id="new-commenter-image" src={generateAvatar()} alt="Avatar" className="inline w-8 h-8"/>
            <input
              type="text"
              id="comment"
              name="comment"
              placeholder="What are your thoughts?"
              required
              className="
                grow
                px-2
                placeholder:text-xs
                border-2
                rounded
                focus:outline-none
                focus:border-2
                focus:border-purple-500
              "
              minLength="10"
              maxLength="255"
              value={inputValues[null]}
              onChange={event => setInputValues({ ...inputValues, ...({ null: event.target.value }) })}
            />
            <button
              id="create-comment"
              className="
                bg-purple-700
                text-sm
                text-white
                px-4
                py-1
                rounded
                hover:bg-purple-800
                active:bg-purple-900
                focus:outline-none
                focus:ring
                focus:ring-purple-500
              "
              onClick={() => { createComment() }}
            >
              Comment
            </button>
          </div>

          <hr className="my-10"/>

          {/* Comments */}
          <ul id="comments">
            {
              // Display root comments
              comments.filter(comment => comment.parentCommentId === null).map(comment => (
                <li key={comment.id} className="flex gap-x-3 mt-8">
                  <div className="flex-none flex flex-col">
                    <img src={comment.avatar} alt="Avatar" className="w-8 h-8"/>
                    <div
                      className={
                        `h-full ml-4 border-l-2 ${getChildComments(comment, comments).length === 0 ? 'hidden' : ''}`
                      }
                    >
                    </div>
                  </div>
                  <div className="grow">
                    <div className="flex gap-x-3">
                      {/* User name */}
                      <div className="font-medium">{comment.username}</div>
                      {/* Separator */}
                      <div>&middot;</div>
                      {/* Time */}
                      <div className="text-sm my-auto text-slate-400">
                        {comment.commentDate.toRelative({ style: 'narrow' })}
                      </div>
                    </div>
                    <div>
                      {/* Comment */}
                      <div>
                        {comment.commentText}
                      </div>
                    </div>
                    <div className="mt-3 font-medium text-sm text-slate-500">
                      {/* Upvote button */}
                      <button comment-id={comment.id} className="upvotes" onClick={() => { upvoteComment(comment) }}>
                        &#9650; Upvote
                      </button>
                      &nbsp;
                      {/* Upvote count */}
                      <span comment-id={comment.id} className="upvotes view">{comment.upvotes}</span>
                      {/* Reply button */}
                      <button comment-id={comment.id} className="ml-8 reply" onClick={() => { replyComment(comment) }}>
                        Reply
                      </button>
                    </div>
                    {/* Sub-comments */}
                    <ul>
                      <li
                        comment-id={comment.id}
                        className={
                          `new-comment nested mt-8 gap-x-3 ${commentReplyStatuses[comment.id] ? 'flex' : 'hidden'}`
                        }
                      >
                        <img src={generateAvatar()} alt="Avatar" className="commenter new inline w-8 h-8"/>
                        <input
                          type="text"
                          name="comment"
                          placeholder="What are your thoughts?"
                          required
                          className="
                            comment
                            grow
                            px-2
                            placeholder:text-xs
                            border-2
                            rounded
                            focus:outline-none
                            focus:border-2
                            focus:border-purple-500
                          "
                          minLength="10"
                          maxLength="255"
                          value={inputValues[comment.id]}
                          onChange={
                            event => setInputValues({ ...inputValues, ...({ [comment.id]: event.target.value }) })
                          }
                        />
                        <button
                          className="
                            create-comment
                            bg-purple-700
                            text-sm
                            text-white
                            px-4
                            py-1
                            rounded
                            hover:bg-purple-800
                            active:bg-purple-900
                            focus:outline-none
                            focus:ring
                            focus:ring-purple-500
                          "
                          onClick={() => { createComment(comment) }}
                        >
                          Comment
                        </button>
                      </li>
                      {
                        getChildComments(comment, comments).map(comment => (
                          <li key={comment.id} className="flex gap-x-3 mt-8">
                            <div className="flex-none flex flex-col">
                              <img src={comment.avatar} alt="Avatar" className="w-8 h-8"/>
                            </div>
                            <div className="grow">
                              <div className="flex gap-x-3">
                                {/* User name */}
                                <div className="font-medium">{comment.username}</div>
                                {/* Separator */}
                                <div>&middot;</div>
                                {/* Time */}
                                <div className="text-sm my-auto text-slate-400">
                                  {comment.commentDate.toRelative({ style: 'narrow' })}
                                </div>
                              </div>
                              <div>
                                {/* Comment */}
                                <div>
                                  {comment.commentText}
                                </div>
                              </div>
                              <div className="mt-3 font-medium text-sm text-slate-500">
                                {/* Upvote button */}
                                <button
                                  comment-id={comment.id}
                                  className="upvotes"
                                  onClick={() => { upvoteComment(comment) }}
                                >
                                  &#9650; Upvote
                                </button>
                                &nbsp;
                                {/* Upvote count */}
                                <span comment-id={comment.id} className="upvotes view">{comment.upvotes}</span>
                              </div>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
