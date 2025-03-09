// src/app/components/FileRoom.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { CloudinaryResource } from '../app/types';
import { useDropzone } from 'react-dropzone';
import { Upload, X, QrCode, Copy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';

export default function FileRoom({ roomId }: { roomId: string }) {
  const [files, setFiles] = useState<CloudinaryResource[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [showQR, setShowQR] = useState(false);
  const [isCopied, setIsCopied] = useState(false); // New state for copy feedback

  useEffect(() => {
    fetchFiles();
    const interval = setInterval(fetchFiles, 5000);
    return () => clearInterval(interval);
  }, [roomId]);

  const fetchFiles = async () => {
    try {
      console.log(`Fetching files for room: ${roomId}`);
      const response = await axios.get(`/api/files/${roomId}`);
      setFiles((prevFiles) => {
        const newFiles = response.data;
        const updatedFiles = [...prevFiles];
        newFiles.forEach((newFile: CloudinaryResource) => {
          const existingIndex = updatedFiles.findIndex(
            (file) => file.public_id === newFile.public_id
          );
          if (existingIndex === -1) {
            updatedFiles.push(newFile);
          } else {
            updatedFiles[existingIndex] = newFile;
          }
        });
        return updatedFiles;
      });
      console.log('Files fetched successfully:', response.data);
    } catch (err) {
      setError('Failed to load files or API limit reached, please try again in 20 mins, or try donating');
      console.error('Error fetching files:', err);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      handleUpload(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    console.log('Sending file:', file.name);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('roomId', roomId);
      console.log('Uploading file to Cloudinary...');
      const response = await axios.post('/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });
      console.log('File uploaded successfully:', response.data);
      await fetchFiles();
      setSelectedFile(null);
      setError(null);
      setUploadProgress(0);
    } catch (err) {
      setError('Upload failed');
      console.error('Error uploading file:', err);
    } finally {
      setIsUploading(false);
      console.log('Upload process completed');
    }
  };

  const roomUrl = `https://sendupv3.vercel.app/CreateRoom?roomId=${roomId}`;

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-start space-x-2 text-red-600 dark:text-red-400">
              <X className="w-5 h-5 mt-0.5" />
              <span>{error}</span>
            </div>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/donate'}
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Support Sh*tup with a Donation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center ">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Room: {roomId}</h1>
          <button
            onClick={handleCopyRoomId}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
            title="Copy Room ID"
          >
            <Copy className="w-5 h-5" />
          </button>
          {isCopied && (
            <span className="text-sm text-green-500 dark:text-green-400 animate-fadeInOut relative ">
              Copied!
            </span>
          )}
        </div>
        <button
          onClick={() => setShowQR(!showQR)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
        >
          <QrCode className="w-5 h-5" />
          <span>QR Code</span>
        </button>
      </div>

      {showQR && (
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <QRCodeSVG
              value={roomUrl}
              size={200}
              level="H"
              includeMargin
              className="bg-white p-2 rounded-lg"
            />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Scan to open this room on your phone
            </p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={roomUrl}
                readOnly
                className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm w-full"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(roomUrl);
                }}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors duration-200 ease-in-out
            ${isDragActive 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-4">
            <Upload 
              className={`w-12 h-12 ${
                isDragActive ? 'text-blue-500' : 'text-gray-400 dark:text-gray-600'
              }`}
            />
            {isDragActive ? (
              <p className="text-lg text-blue-500 dark:text-blue-400">Drop the file here...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Drag & drop a file here, or click to select
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Supports any file type
                </p>
              </div>
            )}
          </div>
        </div>

        {isUploading && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
              <X className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
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
            <div key={file.public_id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
                  {displayName}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Size: {(file.bytes / 1024).toFixed(2)} KB
                </p>
                <div className="mt-4 flex justify-end">
                  <a
                    href={file.secure_url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                  >
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