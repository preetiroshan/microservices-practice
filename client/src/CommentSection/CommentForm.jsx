import axios from "axios";
import React, { useState } from "react";

const CommentForm = ({ postId }) => {
  const [text, setText] = useState("")
  const handleChange = (e) => {
    setText(e.target.value)
  }
  const onSubmit = async(e) => {
    e.preventDefault()
    await axios.post(
      `http://localhost:4001/posts/${postId}/comments`, {
        content: text
      }
    );
    setText('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input label="Add Comment" value={text} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CommentForm;
