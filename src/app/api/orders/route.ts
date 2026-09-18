import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Generate a simple order ID (e.g., ORD-123456)
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: orderId,
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Define path to orders.json in the data directory
    const dataDir = path.join(process.cwd(), 'src', 'data');
    const ordersFile = path.join(dataDir, 'orders.json');

    // Read existing orders or initialize empty array
    let orders = [];
    if (fs.existsSync(ordersFile)) {
      const fileContent = fs.readFileSync(ordersFile, 'utf-8');
      orders = JSON.parse(fileContent);
    }

    // Add new order
    orders.push(newOrder);

    // Save back to file
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), 'utf-8');

    return NextResponse.json({ success: true, orderId }, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'src', 'data');
    const ordersFile = path.join(dataDir, 'orders.json');

    if (!fs.existsSync(ordersFile)) {
      return NextResponse.json([]);
    }

    const fileContent = fs.readFileSync(ordersFile, 'utf-8');
    const orders = JSON.parse(fileContent);

    // Sort by newest first
    orders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
  }
}
