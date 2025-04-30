import React from 'react';
import { useSelector } from 'react-redux';

function CommentSidebar() {
  const { activeImage, comments } = useSelector((state) => state.comments);

  return (
    <div className="sidebar">
      <h4>Comments</h4>
      {(comments[activeImage] || []).map((comment) => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <ul>
            {(comment.replies || []).map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CommentSidebar;