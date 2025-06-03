import { NextResponse } from 'next/server';

export async function GET() {
  // Generate random latitude and longitude
  // Simple approach: random values within a range
  const randomLat = Math.random() * 180 - 90; // Latitude range: -90 to +90
  const randomLng = Math.random() * 360 - 180; // Longitude range: -180 to +180

  const coords = {
    lat: randomLat,
    lng: randomLng,
  };

  return NextResponse.json(coords);
} 