import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import './FileUpload.css';

const FileUpload = () => {
  // Animation triggers
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [uploadRef, uploadInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [filesRef, filesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [guidelinesRef, guidelinesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState({});

  const documentTypes = [
    { type: 'methodology', label: 'Methodology Documentation', required: true },
    { type: 'measurement', label: 'Measurement Data', required: true },
    { type: 'verification', label: 'Verification Reports', required: true },
    { type: 'monitoring', label: 'Monitoring Plans', required: false },
    { type: 'stakeholder', label: 'Stakeholder Consultations', required: false }
  ];

  const acceptedFormats = ['.pdf', '.docx', '.xlsx', '.csv', '.jpg', '.png', '.zip'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB

  // Drag & Drop handlers
  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files);
  };

  const handleFileSelect = e => {
    if (e.target.files.length) processFiles(e.target.files);
    e.target.value = '';
  };

  const validateFile = file => {
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!acceptedFormats.includes(ext)) return { valid: false, error: 'Invalid format' };
    if (file.size > maxFileSize) return { valid: false, error: 'File too large' };
    return { valid: true };
  };

  const processFiles = newFiles => {
    const validFiles = Array.from(newFiles)
      .map(file => ({ file, validation: validateFile(file) }))
      .filter(f => f.validation.valid)
      .map(f => ({
        id: Math.random().toString(36).substring(2, 15),
        file: f.file,
        type: '',
        status: 'pending',
        timestamp: new Date(),
        uploadTime: null,
        size: f.file.size
      }));
    if (validFiles.length) setFiles(prev => [...prev, ...validFiles]);
  };

  // Upload simulation
  const simulateUpload = fileId => {
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
    setFiles(prevFiles => prevFiles.map(f => f.id === fileId ? { ...f, status: 'uploading' } : f));
    const uploadTime = Math.random() * 3000 + 2000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const progress = Math.min(((Date.now() - startTime) / uploadTime) * 100, 100);
        if (progress >= 100) {
          clearInterval(interval);
          setFiles(prevFiles => prevFiles.map(f => f.id === fileId ? { ...f, status: 'completed', uploadTime: new Date() } : f));
        }
        return { ...prev, [fileId]: Math.floor(progress) };
      });
    }, 100);
  };

  const handleUpload = fileId => simulateUpload(fileId);
  const handleBulkUpload = () => files.filter(f => f.status === 'pending' && f.type).forEach(f => handleUpload(f.id));
  const handleRemoveFile = fileId => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => { const p = { ...prev }; delete p[fileId]; return p; });
  };
  const handleTypeSelect = (fileId, type) => setFiles(prev => prev.map(f => f.id === fileId ? { ...f, type } : f));

  const getFileIcon = fileName => {
    const ext = fileName.split('.').pop().toLowerCase();
    const icons = { pdf: 'fas fa-file-pdf', docx: 'fas fa-file-word', xlsx: 'fas fa-file-excel', csv: 'fas fa-file-csv', jpg: 'fas fa-file-image', png: 'fas fa-file-image', zip: 'fas fa-file-archive' };
    return icons[ext] || 'fas fa-file';
  };

  const getStatusColor = status => ({ pending: '#f39c12', uploading: '#3498db', completed: '#2ecc71', error: '#e74c3c' })[status] || '#95a5a6';

  const pendingFiles = files.filter(f => f.status === 'pending').length;
  const completedFiles = files.filter(f => f.status === 'completed').length;

  return (
    <div className="file-upload-container">

      {/* Header */}
      <div ref={headerRef} className={`upload-header ${headerInView ? 'animate-in' : ''}`}>
        <div className="header-content">
          <h1>Upload Project Documentation</h1>
          <p>Submit files for verification process</p>
        </div>
        <div className="upload-stats">
          <div className="stat"><span className="stat-value">{files.length}</span><span className="stat-label">Total</span></div>
          <div className="stat"><span className="stat-value">{pendingFiles}</span><span className="stat-label">Pending</span></div>
          <div className="stat"><span className="stat-value">{completedFiles}</span><span className="stat-label">Completed</span></div>
        </div>
      </div>

      {/* Drag & Drop Area */}
      <div ref={uploadRef} className={`upload-area ${dragActive ? 'drag-active' : ''} ${uploadInView ? 'animate-in' : ''}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={() => fileInputRef.current.click()}>
        <input type="file" multiple ref={fileInputRef} onChange={handleFileSelect} accept={acceptedFormats.join(',')} style={{ display: 'none' }} />
        <div className="upload-prompt">
          <i className="fas fa-cloud-upload-alt upload-icon"></i>
          <h3>Drag & Drop Files Here</h3>
          <p>or click to select from your computer</p>
          <button className="browse-btn"><i className="fas fa-folder-open"></i> Browse Files</button>
          <small>Supported: PDF, DOCX, XLSX, CSV, JPG, PNG, ZIP | Max 50MB</small>
        </div>
      </div>

      {/* Files Section */}
      {files.length > 0 && (
        <div ref={filesRef} className={`files-section ${filesInView ? 'animate-in' : ''}`}>
          <div className="section-header">
            <h2>Upload Queue ({files.length})</h2>
            {pendingFiles > 0 && <button className="bulk-upload-btn" onClick={handleBulkUpload} disabled={files.filter(f => f.status === 'pending' && f.type).length === 0}><i className="fas fa-play"></i> Upload All</button>}
          </div>
          <div className="files-list">
            {files.map(file => (
              <div key={file.id} className={`file-item ${file.status}`}>
                <div className="file-main">
                  <i className={`${getFileIcon(file.file.name)} file-icon`}></i>
                  <div className="file-details">
                    <div className="file-header"><span className="file-name">{file.file.name}</span><span className="file-size">{(file.size / 1024 / 1024).toFixed(1)} MB</span></div>
                    <div className="file-meta"><span>Added: {file.timestamp.toLocaleDateString()}</span>{file.uploadTime && <span>Uploaded: {file.uploadTime.toLocaleTimeString()}</span>}</div>
                  </div>
                </div>
                <div className="file-actions">
                  <select value={file.type} onChange={e => handleTypeSelect(file.id, e.target.value)} className="file-type-select" disabled={file.status !== 'pending'}>
                    <option value="">Select Document Type</option>
                    {documentTypes.map(doc => <option key={doc.type} value={doc.type}>{doc.label}{doc.required && ' *'}</option>)}
                  </select>

                  {file.status === 'pending' && <button className="upload-btn" onClick={() => handleUpload(file.id)} disabled={!file.type}><i className="fas fa-upload"></i> Upload</button>}
                  {file.status === 'uploading' && <div className="upload-progress"><div className="progress-info"><span>Uploading</span><span>{uploadProgress[file.id] || 0}%</span></div><div className="progress-bar"><div className="progress-fill" style={{ width: `${uploadProgress[file.id] || 0}%`, backgroundColor: getStatusColor(file.status) }}></div></div></div>}
                  {file.status === 'completed' && <div className="upload-status"><i className="fas fa-check-circle"></i> Completed</div>}

                  <button className="remove-btn" onClick={() => handleRemoveFile(file.id)} disabled={file.status === 'uploading'}><i className="fas fa-times"></i></button>
                </div>
                <div className="file-status-indicator" style={{ backgroundColor: getStatusColor(file.status) }}></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guidelines */}
      <div ref={guidelinesRef} className={`upload-guidelines ${guidelinesInView ? 'animate-in' : ''}`}>
        <div className="guidelines-header"><i className="fas fa-info-circle"></i><h3>Upload Guidelines</h3></div>
        <div className="guidelines-content">
          {['Label all files properly','Verify data accuracy','Keep files under 50MB','Select correct document type'].map((text, idx) => (
            <div key={idx} className="guideline-item"><i className="fas fa-check-circle"></i><span>{text}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
