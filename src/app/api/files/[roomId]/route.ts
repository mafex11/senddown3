import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    const { roomId } = await params;
    console.log('Fetching files for room ID:', roomId);
    console.log('Using prefix:', `rooms/${roomId}`);

    // Fetch all resource types
    const [rawFiles, imageFiles, videoFiles] = await Promise.all([
      cloudinary.api.resources({
        type: 'upload',
        prefix: `rooms/${roomId}`,
        max_results: 100,
        resource_type: 'raw',
      }),
      cloudinary.api.resources({
        type: 'upload',
        prefix: `rooms/${roomId}`,
        max_results: 100,
        resource_type: 'image',
      }),
      cloudinary.api.resources({
        type: 'upload',
        prefix: `rooms/${roomId}`,
        max_results: 100,
        resource_type: 'video',
      }),
    ]);

    const allFiles = [
      ...rawFiles.resources,
      ...imageFiles.resources,
      ...videoFiles.resources,
    ];

    console.log('Raw files:', rawFiles.resources);
    console.log('Image files:', imageFiles.resources);
    console.log('Video files:', videoFiles.resources);
    console.log('All files combined:', allFiles);
    return NextResponse.json(allFiles, { status: 200 });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
  }
}