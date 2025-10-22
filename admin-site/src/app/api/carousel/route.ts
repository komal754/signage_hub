
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongoose';
import { CarouselItem } from '@/models/CarouselItem';

export async function GET() {
  try {
    await dbConnect();
    const images = await CarouselItem.find().sort({ createdAt: -1 });
    return NextResponse.json(images);
  } catch (e: any) {
    return NextResponse.json({ error: e.message, stack: e.stack }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { url, title } = await req.json();
    const image = await CarouselItem.create({ url, title });
    return NextResponse.json(image);
  } catch (e: any) {
    return NextResponse.json({ error: e.message, stack: e.stack }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await CarouselItem.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message, stack: e.stack }, { status: 500 });
  }
}
