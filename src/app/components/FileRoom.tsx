'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { CloudinaryResource } from '../types';

export default function FileRoom({ roomId }: { roomId: string }) {
  const [files, setFiles] = useState<CloudinaryResource[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles(); // Initial fetch
    const interval = setInterval(fetchFiles, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [roomId]);

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      console.log(`Fetching files for room: ${roomId}`);
      const response = await axios.get(`/api/files/${roomId}`);
      setFiles(response.data);
      console.log('Files fetched successfully:', response.data);
    } catch (err) {
      setError('Failed to load files');
      console.error('Error fetching files:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      console.log('File selected:', file.name, 'Size:', file.size, 'Type:', file.type);
    }
  };

  const handleSend = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      console.warn('No file selected for upload');
      return;
    }

    setIsLoading(true);
    console.log('Sending file:', selectedFile.name);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('roomId', roomId);

      console.log('Uploading file to Cloudinary...');
      const response = await axios.post('/api/upload', formData);
      console.log('File uploaded successfully:', response.data);

      await fetchFiles(); // Refresh file list after upload
      setSelectedFile(null);
      setError(null);
    } catch (err) {
      setError('Upload failed');
      console.error('Error uploading file:', err);
    } finally {
      setIsLoading(false);
      console.log('Upload process completed');
    }
  };

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Room: {roomId}</h1>
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="file"
          onChange={handleFileChange}
          disabled={isLoading}
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !selectedFile}
          className="btn btn-primary"
        >
          {isLoading ? 'Uploading...' : 'Send'}
        </button>
      </div>
      {isLoading ? (
        <div className="loading loading-spinner loading-lg"></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {files.map((file) => (
            <div key={file.public_id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{file.original_filename}</h2>
                <p>Size: {(file.bytes / 1024).toFixed(2)} KB</p>
                <div className="card-actions justify-end">
                  <a href={file.secure_url} download className="btn btn-primary">
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}