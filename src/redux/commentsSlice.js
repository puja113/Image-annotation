import { createSlice } from '@reduxjs/toolkit';


const initialState = JSON.parse(localStorage.getItem('commentsState')) || {
  images: [], 
  activeImage: null, 
  comments: JSON.parse(localStorage.getItem('comments')) || {}, 
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setImage: (state, action) => {
      
      state.activeImage = action.payload;
    },
    addImage: (state, action) => {
      
      state.images.push(action.payload);
    },
    addComment: (state, action) => {
      const { image, comment } = action.payload;
      state.comments[image] = state.comments[image] || [];
      state.comments[image].push(comment);
    },
    addReply: (state, action) => {
      const { image, parentId, reply } = action.payload;
      const comment = state.comments[image].find(c => c.id === parentId);
      if (comment) comment.replies.push(reply);
    },
    editComment: (state, action) => {
      const { image, id, text } = action.payload;
      const comment = state.comments[image].find(c => c.id === id);
      if (comment) comment.text = text;
    },
    deleteComment: (state, action) => {
      const { image, id } = action.payload;
      state.comments[image] = state.comments[image].filter(c => c.id !== id);
    },
    editReply: (state, action) => {
      const { image, parentId, replyId, text } = action.payload;
      const comment = state.comments[image].find(c => c.id === parentId);
      const reply = comment.replies.find(r => r.id === replyId);
      if (reply) reply.text = text;
    },
    deleteReply: (state, action) => {
      const { image, parentId, replyId } = action.payload;
      const comment = state.comments[image].find(c => c.id === parentId);
      comment.replies = comment.replies.filter(r => r.id !== replyId);
    },
  },
});


export const {
  addImage,
  addComment,
  addReply,
  editComment,
  deleteComment,
  editReply,
  deleteReply,
  setImage,
} = commentsSlice.actions;

export default commentsSlice.reducer;


export const persistStateMiddleware = store => next => action => {
  const result = next(action);


  const { images, activeImage, comments } = store.getState().comments;
  const stateToPersist = {
    images,
    activeImage,
    comments,
  };

 
  localStorage.setItem('commentsState', JSON.stringify(stateToPersist));
  localStorage.setItem('comments', JSON.stringify(comments));

  return result;
};
