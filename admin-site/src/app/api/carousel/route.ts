
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongoose';
import { CarouselItem } from '@/models/CarouselItem';

export async function GET() {
  try {
    await dbConnect();
    const images = await CarouselItem.find().sort({ createdAt: -1 });
    return NextResponse.json(images);
  } catch (e: unknown) {
    let errorMsg = 'Unknown error';
    let errorStack = '';
    if (typeof e === 'object' && e !== null) {
      if ('message' in e && typeof (e as { message?: unknown }).message === 'string') {
        errorMsg = (e as { message: string }).message;
      }
      if ('stack' in e && typeof (e as { stack?: unknown }).stack === 'string') {
        errorStack = (e as { stack: string }).stack;
      }
    }
    return NextResponse.json({ error: errorMsg, stack: errorStack }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { url, title } = await req.json();
    const image = await CarouselItem.create({ url, title });
    return NextResponse.json(image);
  } catch (e: unknown) {
    let errorMsg = 'Unknown error';
    let errorStack = '';
    if (typeof e === 'object' && e !== null) {
      if ('message' in e && typeof (e as { message?: unknown }).message === 'string') {
        errorMsg = (e as { message: string }).message;
      }
      if ('stack' in e && typeof (e as { stack?: unknown }).stack === 'string') {
        errorStack = (e as { stack: string }).stack;
      }
    }
    return NextResponse.json({ error: errorMsg, stack: errorStack }, { status: 500 });
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
  } catch (e: unknown) {
    let errorMsg = 'Unknown error';
    let errorStack = '';
    if (typeof e === 'object' && e !== null) {
      if ('message' in e && typeof (e as { message?: unknown }).message === 'string') {
        errorMsg = (e as { message: string }).message;
      }
      if ('stack' in e && typeof (e as { stack?: unknown }).stack === 'string') {
        errorStack = (e as { stack: string }).stack;
      }
    }
    return NextResponse.json({ error: errorMsg, stack: errorStack }, { status: 500 });
  }
}
