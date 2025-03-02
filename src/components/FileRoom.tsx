'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { CloudinaryResource } from '../app/types';

export default function FileRoom({ roomId }: { roomId: string }) {
  const [files, setFiles] = useState<CloudinaryResource[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial fetch
    fetchFiles();

    // Poll every 5 seconds
    const interval = setInterval(fetchFiles, 5000);
    return () => clearInterval(interval);
  }, [roomId]);

  const fetchFiles = async () => {
    try {
      console.log(`Fetching files for room: ${roomId}`);
      const response = await axios.get(`/api/files/${roomId}`);
      
      // Update files only with new or changed items
      setFiles((prevFiles) => {
        const newFiles = response.data;
        // Merge new files with existing ones, avoiding duplicates
        const updatedFiles = [...prevFiles];
        newFiles.forEach((newFile: CloudinaryResource) => {
          const existingIndex = updatedFiles.findIndex(
            (file) => file.public_id === newFile.public_id
          );
          if (existingIndex === -1) {
            // Add new file if not already present
            updatedFiles.push(newFile);
          } else {
            // Update existing file if it has changed (e.g., size or version)
            updatedFiles[existingIndex] = newFile;
          }
        });
        return updatedFiles;
      });
      console.log('Files fetched successfully:', response.data);
    } catch (err) {
      setError('Failed to load files');
      console.error('Error fetching files:', err);
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

    setIsUploading(true);
    console.log('Sending file:', selectedFile.name);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('roomId', roomId);

      console.log('Uploading file to Cloudinary...');
      const response = await axios.post('/api/upload', formData);
      console.log('File uploaded successfully:', response.data);

      await fetchFiles(); // Fetch after upload to include the new file
      setSelectedFile(null);
      setError(null);
    } catch (err) {
      setError('Upload failed');
      console.error('Error uploading file:', err);
    } finally {
      setIsUploading(false);
      console.log('Upload process completed');
    }
  };

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">Room: {roomId}</h1>
      <div className="mb-4 flex flex-col items-start space-y-2">
        <div className="flex items-center space-x-4">
          <input
            type="file"
            onChange={handleFileChange}
            disabled={isUploading}
            className="file-input file-input-bordered w-full max-w-xs"
          />
          <button
            onClick={handleSend}
            disabled={isUploading || !selectedFile}
            className="btn btn-primary"
          >
            Send
          </button>
        </div>
        {isUploading && (
          <span className="text-green-500 text-sm">Uploading...</span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {files.map((file) => {
          const filenameFromPublicId = file.public_id.split('/').pop() || 'Unnamed File';
          const displayName =
            file.original_filename && file.original_filename !== 'file'
              ? file.original_filename
              : filenameFromPublicId;
          return (
            <div key={file.public_id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{displayName}</h2>
                <p>Size: {(file.bytes / 1024).toFixed(2)} KB</p>
                <div className="card-actions justify-end">
                  <a href={file.secure_url} download className="btn btn-primary">
                    Download
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}