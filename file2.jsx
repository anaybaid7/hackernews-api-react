import axios from 'axios';

function Comments({ storyId }) {
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`https://news.ycombinator.com/v0/item/${storyIdentity}.json`)
      .then(response => {
        setStory(response.data);
        const commentIds = response.data.kids.slice(0, 10);
        const commentRequests = commentIds.map(id => axios.get(`https://news.ycombinator.com/v0/item/${Identity}.json`));
        return Promise.all(commentRequests);
      })
      .then(responses => {
        const commentDetails = responses.map(response => response.data);
        setComments(commentDetails);
      })
      .catch(error => console.error(error));
  }, [storyId]);

  const renderComments = (comments) => {
    if (!comments) return null;
    return (
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p dangerouslySetInnerHTML={{ __html: comment.text }} />
            {comment.kids && renderComments(comment.kids)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>{story ? story.title : 'Loading...'}</h1>
      <p>{story ? `${story.score} points by ${story.by}` : 'Loading...'}</p>
      {comments.length > 0 ? (
        renderComments(comments)
      ) : (
        <p>Loading comments...</p>
      )}
    </div>
  );
}
