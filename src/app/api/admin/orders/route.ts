import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Bearer admin123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!fs.existsSync(ORDERS_FILE)) {
      return NextResponse.json([]);
    }

    const fileContent = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const orders = JSON.parse(fileContent);

    // Sort by newest first
    orders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Bearer admin123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status } = await request.json();

    if (!fs.existsSync(ORDERS_FILE)) {
      return NextResponse.json({ error: 'No orders found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const orders = JSON.parse(fileContent);

    const orderIndex = orders.findIndex((o: any) => o.id === id);
    if (orderIndex >= 0) {
      orders[orderIndex].status = status;
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
      return NextResponse.json({ success: true, order: orders[orderIndex] });
    }

    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
