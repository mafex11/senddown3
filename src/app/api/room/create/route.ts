// src/app/api/room/create/route.ts
import { NextResponse } from 'next/server';

// Function to generate a 6-character random string
function generateShortRoomId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function POST() {
  try {
    const roomId = generateShortRoomId();
    return NextResponse.json({ roomId }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}