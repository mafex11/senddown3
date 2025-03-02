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

    const files = await cloudinary.api.resources({
      type: 'upload', // Keep this for consistency with upload
      prefix: `rooms/${roomId}`,
      max_results: 100,
      resource_type: 'raw', // Explicitly fetch raw resources
    });

    console.log('Cloudinary response:', files);
    console.log('Resources found:', files.resources);
    return NextResponse.json(files.resources, { status: 200 });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
  }
}