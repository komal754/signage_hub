import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongoose';
import { Item } from '../../../models/Item';

export async function GET() {
  await dbConnect();
  const items = await Item.find({});
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const newItem = await Item.create(data);
  return NextResponse.json(newItem);
}

export async function DELETE(req: Request) {
  await dbConnect();
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await Item.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
