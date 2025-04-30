import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, setImage } from './redux/commentsSlice'; 
import AnnotationImage from './components/AnnotationImage';
import CommentSidebar from './components/CommentSidebar';
import UploadStatusPopup from './components/UploadStatusPopup';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

function App() {
  const dispatch = useDispatch();
  const { images, activeImage } = useSelector((state) => state.comments); 
  const [uploading, setUploading] = useState([]);  
  
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const uploadingItems = files.map((file) => ({ name: file.name, status: 'uploading' }));
    setUploading(uploadingItems);

   
    files.forEach((file, index) => {
      const url = URL.createObjectURL(file);
      setTimeout(() => {
        dispatch(addImage(url)); 
        setUploading((prev) => {
          const updated = [...prev];
          updated[index].status = 'done';
          return updated;
        });

       
        if (index === 0) dispatch(setImage(url)); 
      }, 1000 * (index + 1));  
    });
  };

  useEffect(() => {
    const allDone = uploading.every((u) => u.status === 'done');
    if (uploading.length && allDone) {
      const timer = setTimeout(() => setUploading([]), 1500);
      return () => clearTimeout(timer);
    }
  }, [uploading]);

  const handleSlideChange = (swiper) => {
    const imageUrl = images[swiper.activeIndex];
    if (imageUrl) dispatch(setImage(imageUrl));
  };

  return (
    <div className="app">
      <div className="toolbar">
        <input type="file" onChange={handleUpload} accept="image/*" multiple />
      </div>
      <div className="main">
        {images.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={handleSlideChange} 
            className="image-swiper"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <AnnotationImage imageUrl={img} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <CommentSidebar />
      </div>
      {uploading.length > 0 && <UploadStatusPopup files={uploading} />}
    </div>
  );
}

export default App;
