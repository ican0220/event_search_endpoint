import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);

  const location_keyword = url.searchParams.get('location');
  const distance = url.searchParams.get('distance');

  return NextResponse.json({ message: `hello, location_keyword = ${location_keyword}; distance = ${distance}` });
}

export async function POST(request: Request) {
  const { location, distance } = await request.json();
  console.log(location, distance)
  return NextResponse.json({ message: `Hello, ${distance}!` });
}