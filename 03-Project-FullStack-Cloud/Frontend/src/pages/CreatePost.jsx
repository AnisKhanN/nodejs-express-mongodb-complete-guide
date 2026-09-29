import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      await axios.post("http://localhost:3000/create-post", formData);

      alert("Post created successfully!");

      e.target.reset();

      navigate("/feed");
    } catch (error) {
      console.error(error);

      alert("Error creating post.");
    }
  };

  return (
    <section className="create-post-section">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h1>Create New Post</h1>

        <input type="file" name="image" accept="image/*" required />

        <input
          type="text"
          name="caption"
          placeholder="Write your caption..."
          required
        />

        <button type="submit">Upload Post</button>
      </form>
    </section>
  );
};

export default CreatePost;
