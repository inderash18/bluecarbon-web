import React, { useState, useRef } from 'react';
import './FileUpload.css';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState({});

  const documentTypes = [
    { 
      type: 'methodology', 
      label: 'Methodology Documentation', 
      icon: 'fas fa-book',
      required: true
    },
    { 
      type: 'measurement', 
      label: 'Measurement Data', 
      icon: 'fas fa-ruler-combined',
      required: true
    },
    { 
      type: 'verification', 
      label: 'Verification Reports', 
      icon: 'fas fa-check-double',
      required: true
    },
    { 
      type: 'monitoring', 
      label: 'Monitoring Plans', 
      icon: 'fas fa-chart-line',
      required: false
    },
    { 
      type: 'stakeholder', 
      label: 'Stakeholder Consultations', 
      icon: 'fas fa-users',
      required: false
    }
  ];

  const acceptedFormats = ['.pdf', '.docx', '.xlsx', '.csv', '.jpg', '.png', '.zip'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB

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
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
      e.target.value = '';
    }
  };

  const validateFile = (file) => {
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!acceptedFormats.includes(fileExtension)) {
      return { valid: false, error: 'Invalid file format' };
    }
    if (file.size > maxFileSize) {
      return { valid: false, error: 'File size exceeds 50MB limit' };
    }
    return { valid: true, error: null };
  };

  const processFiles = (newFiles) => {
    const validFiles = [];
    
    Array.from(newFiles).forEach(file => {
      const validation = validateFile(file);
      if (validation.valid) {
        validFiles.push({
          id: Math.random().toString(36).substring(2, 15),
          file,
          type: '',
          status: 'pending',
          timestamp: new Date(),
          uploadTime: null,
          size: file.size
        });
      }
    });

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const simulateUpload = (fileId) => {
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
    setFiles(prevFiles => 
      prevFiles.map(f => 
        f.id === fileId ? { ...f, status: 'uploading' } : f
      )
    );
    
    const uploadTime = Math.random() * 3000 + 2000;
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / uploadTime) * 100, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setFiles(prevFiles => 
            prevFiles.map(f => 
              f.id === fileId ? { 
                ...f, 
                status: 'completed',
                uploadTime: new Date()
              } : f
            )
          );
        }
        
        return { ...prev, [fileId]: Math.floor(newProgress) };
      });
    }, 100);
  };

  const handleUpload = (fileId) => {
    simulateUpload(fileId);
  };

  const handleBulkUpload = () => {
    const pendingFiles = files.filter(f => f.status === 'pending' && f.type);
    pendingFiles.forEach(file => handleUpload(file.id));
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

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const iconMap = {
      pdf: 'fas fa-file-pdf',
      docx: 'fas fa-file-word',
      xlsx: 'fas fa-file-excel',
      csv: 'fas fa-file-csv',
      jpg: 'fas fa-file-image',
      png: 'fas fa-file-image',
      zip: 'fas fa-file-archive'
    };
    return iconMap[ext] || 'fas fa-file';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      uploading: '#3498db',
      completed: '#2ecc71',
      error: '#e74c3c'
    };
    return colors[status] || '#95a5a6';
  };

  const pendingFiles = files.filter(f => f.status === 'pending').length;
  const completedFiles = files.filter(f => f.status === 'completed').length;
  const totalFiles = files.length;

  return (
    <div className="file-upload-container">
      <div className="upload-header">
        <div className="header-content">
          <h1>Upload Documentation</h1>
          <p>Upload your project files for verification process</p>
        </div>
        <div className="upload-stats">
          <div className="stat">
            <span className="stat-value">{totalFiles}</span>
            <span className="stat-label">Total Files</span>
          </div>
          <div className="stat">
            <span className="stat-value">{pendingFiles}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat">
            <span className="stat-value">{completedFiles}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
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
          accept={acceptedFormats.join(',')}
          style={{ display: 'none' }}
        />
        <div className="upload-prompt">
          <div className="upload-icon">
            <i className="fas fa-cloud-upload-alt"></i>
          </div>
          <h3>Drop your files here</h3>
          <p>or click to browse your computer</p>
          <button 
            className="browse-btn"
            onClick={() => fileInputRef.current.click()}
          >
            <i className="fas fa-folder-open"></i>
            Select Files
          </button>
          <div className="upload-info">
            <span>Supported formats: PDF, DOCX, XLSX, CSV, JPG, PNG, ZIP</span>
            <span>Max file size: 50MB</span>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="files-section">
          <div className="section-header">
            <h2>Upload Queue ({files.length} files)</h2>
            {pendingFiles > 0 && (
              <button 
                className="bulk-upload-btn"
                onClick={handleBulkUpload}
                disabled={files.filter(f => f.status === 'pending' && f.type).length === 0}
              >
                <i className="fas fa-play"></i>
                Upload All ({files.filter(f => f.status === 'pending' && f.type).length})
              </button>
            )}
          </div>

          <div className="files-list">
            {files.map(file => (
              <div key={file.id} className={`file-item ${file.status}`}>
                <div className="file-main">
                  <div className="file-icon">
                    <i className={getFileIcon(file.file.name)}></i>
                  </div>
                  <div className="file-details">
                    <div className="file-header">
                      <span className="file-name">{file.file.name}</span>
                      <span className="file-size">
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                      </span>
                    </div>
                    <div className="file-meta">
                      <span className="file-date">
                        Added: {file.timestamp.toLocaleDateString()}
                      </span>
                      {file.uploadTime && (
                        <span className="file-upload-time">
                          Uploaded: {file.uploadTime.toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="file-actions">
                  <select
                    value={file.type}
                    onChange={(e) => handleTypeSelect(file.id, e.target.value)}
                    className="file-type-select"
                    disabled={file.status !== 'pending'}
                  >
                    <option value="">Select Document Type</option>
                    {documentTypes.map(doc => (
                      <option key={doc.type} value={doc.type}>
                        {doc.label} {doc.required && ' *'}
                      </option>
                    ))}
                  </select>

                  <div className="upload-controls">
                    {file.status === 'pending' ? (
                      <button
                        className="upload-btn"
                        onClick={() => handleUpload(file.id)}
                        disabled={!file.type}
                      >
                        <i className="fas fa-upload"></i>
                        Upload
                      </button>
                    ) : file.status === 'uploading' ? (
                      <div className="upload-progress">
                        <div className="progress-info">
                          <span>Uploading...</span>
                          <span>{uploadProgress[file.id]}%</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ 
                              width: `${uploadProgress[file.id] || 0}%`,
                              backgroundColor: getStatusColor(file.status)
                            }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <div className="upload-status">
                        <i className="fas fa-check-circle"></i>
                        <span>Completed</span>
                      </div>
                    )}

                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveFile(file.id)}
                      disabled={file.status === 'uploading'}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>

                <div 
                  className="file-status-indicator"
                  style={{ backgroundColor: getStatusColor(file.status) }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="upload-guidelines">
        <div className="guidelines-header">
          <i className="fas fa-info-circle"></i>
          <h3>Upload Guidelines</h3>
        </div>
        <div className="guidelines-content">
          <div className="guideline-item">
            <i className="fas fa-check-circle"></i>
            <span>Ensure all documents are properly labeled</span>
          </div>
          <div className="guideline-item">
            <i className="fas fa-check-circle"></i>
            <span>Verify data accuracy before uploading</span>
          </div>
          <div className="guideline-item">
            <i className="fas fa-check-circle"></i>
            <span>Keep file sizes under 50MB</span>
          </div>
          <div className="guideline-item">
            <i className="fas fa-check-circle"></i>
            <span>Select appropriate document type for each file</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;