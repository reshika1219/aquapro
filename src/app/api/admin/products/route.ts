import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

export async function GET() {
  try {
    const fileContent = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Bearer admin123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const newProduct = await request.json();
    const fileContent = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    const products = JSON.parse(fileContent);

    // Create or Update
    const existingIndex = products.findIndex((p: any) => p.id === newProduct.id);
    if (existingIndex >= 0) {
      products[existingIndex] = { ...products[existingIndex], ...newProduct, updatedAt: new Date().toISOString().split('T')[0] };
    } else {
      products.push({ ...newProduct, createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] });
    }

    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Bearer admin123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const fileContent = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    let products = JSON.parse(fileContent);
    products = products.filter((p: any) => p.id !== id);

    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
