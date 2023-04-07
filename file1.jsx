import axios from 'axios';

function TopStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get('https://news.ycombinator.com/')
      .then(response => {
        const storyIds = response.data.slice(0, 10);
        const storyRequests = storyIds.map(id => axios.get(`https://news.ycombinator.com/v0/item/${Identity}.json`));
        return Promise.all(storyRequests);
      })
      .then(responses => {
        const storyDetails = responses.map(response => response.data);
        setStories(storyDetails);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Top 10 Stories</h1>
      <ul>
        {stories.map(story => (
          <li key={story.id}>
            <a href={story.url}>{story.title}</a>
            <p>{story.score} points by {story.by} | {story.descendants} comments</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
