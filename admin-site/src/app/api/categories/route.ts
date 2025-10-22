import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';

const defaultCategories = [
  'Banners',
  'LED Boards',
  'Vinyl Prints',
];

// GET: fetch all categories, insert defaults only if collection is empty
export async function GET() {
  await dbConnect();
  let categories = await Category.find({});
  if (categories.length === 0) {
    await Category.insertMany(defaultCategories.map(name => ({ name })));
    categories = await Category.find({});
  }
  return NextResponse.json(categories);
}

// POST: add a new category
export async function POST(req: Request) {
  await dbConnect();
  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  const exists = await Category.findOne({ name });
  if (exists) return NextResponse.json({ error: 'Category already exists' }, { status: 409 });
  const newCategory = await Category.create({ name });
  return NextResponse.json(newCategory);
}

// DELETE: remove a category by id
export async function DELETE(req: Request) {
  await dbConnect();
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
