import React, { useState } from "react";
import axios from "axios";

const PostForm = () => {
  const [val, setVal] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/posts", {
      title: val,
    });
    setVal("");
  };
  return (
    <form onSubmit={onSubmit}>
      Title
      <input
        label="Title"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
