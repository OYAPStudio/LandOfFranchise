import { NextResponse } from 'next/server';
import { companyInfo, restaurants, companyStats } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    companyInfo,
    restaurants,
    companyStats
  });
} 