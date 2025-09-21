// src/modules/FileUpload.jsx
import React from "react";

function FileUpload() {
  return (
    <div className="module-box">
      <h2>Upload Documents</h2>
      <input type="file" className="file-input" />
      <button className="primary-btn">Upload</button>
    </div>
  );
}

export default FileUpload;
