import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields.' },
        { status: 400 },
      );
    }

    const inquiry = {
      id: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      subject: subject ? String(subject) : 'general',
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
    };

    const dataDir = path.join(process.cwd(), 'src', 'data');
    const inquiriesFile = path.join(dataDir, 'inquiries.json');

    let inquiries: unknown[] = [];
    if (fs.existsSync(inquiriesFile)) {
      inquiries = JSON.parse(fs.readFileSync(inquiriesFile, 'utf-8'));
    }

    inquiries.push(inquiry);
    fs.writeFileSync(inquiriesFile, JSON.stringify(inquiries, null, 2), 'utf-8');

    return NextResponse.json({ success: true, inquiryId: inquiry.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to save inquiry:', error);
    return NextResponse.json({ success: false, error: 'Failed to send inquiry' }, { status: 500 });
  }
}
