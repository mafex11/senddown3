'use client';

import { useState } from 'react';
import axios from 'axios';
import FileRoom from './components/FileRoom';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const [inputRoomId, setInputRoomId] = useState('');

  const createRoom = async () => {
    const response = await axios.post('/api/room/create');
    setRoomId(response.data.roomId);
  };

  const joinRoom = () => {
    setRoomId(inputRoomId);
  };

  return (
    <main className="min-h-screen p-8">
      {!roomId ? (
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="text-3xl font-bold text-center">
            File Sharing Room
          </h1>
          <button onClick={createRoom} className="btn btn-primary w-full">
            Create New Room
          </button>
          <div className="divider">OR</div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter Room ID</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputRoomId}
                onChange={(e) => setInputRoomId(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter room ID"
              />
              <button onClick={joinRoom} className="btn btn-secondary">
                Join
              </button>
            </div>
          </div>
        </div>
      ) : (
        <FileRoom roomId={roomId} />
      )}
    </main>
  );
}