
import React from 'react';
import '../UploadStatusPopup.css';

function UploadStatusPopup({ files }) {
  return (
    <div className="upload-popup">
      <div className="upload-header">
        <span>Uploading {files.length} Item{files.length > 1 ? 's' : ''}</span>
        <span className="upload-cancel">Cancel</span>
      </div>
      <div className="upload-subheader">Less than a minute left</div>
      <div className="upload-list">
        {files.map((file, idx) => (
          <div className="upload-item" key={idx}>
            <div className="upload-thumb"></div>
            <div className="upload-name">{file.name}</div>
            <div className="upload-status">
              {file.status === 'done' ? '✔️' : <div className="loader"></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadStatusPopup;
