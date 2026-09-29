import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/posts");

        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="feed-section">
        <h2>Loading posts...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="feed-section">
        <h2>{error}</h2>
      </section>
    );
  }

  return (
    <section className="feed-section">
      <h1>Community Feed</h1>

      {posts.length === 0 ? (
        <h2>No posts available.</h2>
      ) : (
        <div className="feed-grid">
          {posts.map((post) => (
            <div className="post-card" key={post._id}>
              <img
                src={post.image}
                alt={post.caption}
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/600x400?text=Image+Not+Found";
                }}
              />

              <div className="post-content">
                <p>{post.caption}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Feed;
