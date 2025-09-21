import React, { useState, useRef } from 'react';
import './FileUpload.css';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState({});

  const documentTypes = [
    { type: 'methodology', label: 'Methodology Documentation' },
    { type: 'measurement', label: 'Measurement Data' },
    { type: 'verification', label: 'Verification Reports' },
    { type: 'monitoring', label: 'Monitoring Plans' },
    { type: 'stakeholder', label: 'Stakeholder Consultations' }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles).map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      type: '',
      status: 'pending',
      timestamp: new Date().toISOString()
    }));
    setFiles(prev => [...prev, ...fileArray]);
  };

  const simulateUpload = (fileId) => {
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = (prev[fileId] || 0) + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setFiles(prevFiles => 
            prevFiles.map(f => 
              f.id === fileId ? { ...f, status: 'completed' } : f
            )
          );
        }
        
        return { ...prev, [fileId]: Math.min(newProgress, 100) };
      });
    }, 500);
  };

  const handleUpload = (fileId) => {
    // In a real application, you would handle the actual file upload to IPFS or another storage solution
    simulateUpload(fileId);
  };

  const handleRemoveFile = (fileId) => {
    setFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const handleTypeSelect = (fileId, type) => {
    setFiles(prevFiles =>
      prevFiles.map(f =>
        f.id === fileId ? { ...f, type } : f
      )
    );
  };

  return (
    <div className="file-upload-container">
      <div className="upload-header">
        <h1>Upload MRV Documentation</h1>
        <p>Upload your project documentation for verification and tokenization</p>
      </div>

      <div 
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <div className="upload-prompt">
          <i className="fas fa-cloud-upload-alt"></i>
          <p>Drag and drop your files here or</p>
          <button onClick={() => fileInputRef.current.click()}>
            Browse Files
          </button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="files-list">
          <h2>Uploaded Files</h2>
          {files.map(file => (
            <div key={file.id} className="file-item">
              <div className="file-info">
                <i className="fas fa-file-alt"></i>
                <div className="file-details">
                  <span className="file-name">{file.file.name}</span>
                  <span className="file-size">
                    {(file.file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>

              <div className="file-actions">
                <select
                  value={file.type}
                  onChange={(e) => handleTypeSelect(file.id, e.target.value)}
                  className="file-type-select"
                >
                  <option value="">Select Document Type</option>
                  {documentTypes.map(doc => (
                    <option key={doc.type} value={doc.type}>
                      {doc.label}
                    </option>
                  ))}
                </select>

                {file.status === 'pending' ? (
                  <button
                    className="upload-btn"
                    onClick={() => handleUpload(file.id)}
                    disabled={!file.type}
                  >
                    Upload
                  </button>
                ) : (
                  <div className="upload-progress">
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${uploadProgress[file.id] || 0}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {uploadProgress[file.id]}%
                    </span>
                  </div>
                )}

                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFile(file.id)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="upload-guidelines">
        <h3>Upload Guidelines</h3>
        <ul>
          <li>Accepted file formats: PDF, DOCX, XLSX, CSV</li>
          <li>Maximum file size: 50MB</li>
          <li>All documents must be properly labeled and categorized</li>
          <li>Ensure data is in the required format for each document type</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
