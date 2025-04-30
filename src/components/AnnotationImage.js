import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../redux/commentsSlice';
import CommentPopup from './CommentPopup';

function AnnotationImage({ imageUrl }) {
  const [popup, setPopup] = useState(null);
  const comments = useSelector((state) => state.comments.comments[imageUrl] ?? []);


  const dispatch = useDispatch();

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPopup({ x, y });
  };

  const submitComment = (text) => {
    const newComment = {
      id: Date.now().toString(),
      text,
      x: popup.x,
      y: popup.y,
      replies: [],
    };
    dispatch(addComment({ image: imageUrl, comment: newComment }));
    setPopup(null);
  };

  return (
    <div className="annotation-container">
      <img src={imageUrl} onClick={handleImageClick} className="annotation-image" alt="annotated" />
      {comments.map((comment) => (
        <div key={comment.id} className="marker" style={{ top: comment.y, left: comment.x }}>
          💬
        </div>
      ))}
      {popup && <CommentPopup x={popup.x} y={popup.y} onSubmit={submitComment} />}
    </div>
  );
}

export default AnnotationImage;