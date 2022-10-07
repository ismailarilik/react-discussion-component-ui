import { getChildComments, generateAvatar } from './utils'
import Comment from './models/comment'

function App() {
  const comments = [
    new Comment({
      id: 1,
      commentText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
    }),
    new Comment({
      id: 2,
      commentText: `Sed dignissim justo erat, vitae condimentum mi auctor sed.`
    }),
    new Comment({
      id: 3,
      commentText: `Phasellus in enim aliquam, volutpat turpis sit amet, aliquet turpis.`
    }),
    new Comment({
      id: 4,
      commentText: `Cras vitae magna quis diam tempor facilisis.`,
      parentCommentId: 1
    }),
    new Comment({
      id: 5,
      commentText: `Curabitur nisi eros, efficitur in pharetra vitae, auctor a tellus.`,
      parentCommentId: 1
    }),
    new Comment({
      id: 6,
      commentText: `Proin sodales ex metus, non ultricies erat viverra non.`,
      parentCommentId: 2
    })
  ]

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
                    <button comment-id={comment.id} className="upvotes">&#9650; Upvote</button>
                    &nbsp;
                    {/* Upvote count */}
                    <span comment-id={comment.id} className="upvotes view">{comment.upvotes}</span>
                    {/* Reply button */}
                    <button comment-id={comment.id} className="ml-8 reply">Reply</button>
                  </div>
                  {/* Sub-comments */}
                  <ul>
                    <li comment-id={comment.id} className="new-comment nested hidden mt-8 gap-x-3">
                      <img alt="Avatar" className="commenter new inline w-8 h-8"/>
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
                              <button comment-id={comment.id} className="upvotes">&#9650; Upvote</button>
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

export default App;
