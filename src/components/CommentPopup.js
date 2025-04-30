import React, { useState } from 'react';

function CommentPopup({ x, y, onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <div className="comment-popup" style={{ top: y, left: x }}>
      <textarea
        className="comment-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
      />
      <div className="comment-actions">
        <div>
        <span className="comment-icon">@</span>
        <span className="comment-icon">📎</span></div>
        <button className="comment-send" onClick={handleSubmit}>➤</button>
      </div>
    </div>
  );
}

export default CommentPopup;
