// app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { odooJson2Service } from '@/lib/odoo-json2';

export async function GET(request: NextRequest) {
  try {
    console.log('Jobs API endpoint called - using JSON-2 API');
    
    // Test connection first
    const connectionTest = await odooJson2Service.testConnection();
    console.log('JSON-2 API connection test result:', connectionTest);
    
    if (!connectionTest.success) {
      console.error('JSON-2 API connection failed:', connectionTest.error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unable to connect to Odoo via JSON-2 API', 
          details: connectionTest.error,
          data: []
        },
        { status: 500 }
      );
    }

    // Fetch job positions
    const jobs = await odooJson2Service.getJobPositions();
    console.log('Retrieved jobs via JSON-2:', jobs);
    
    return NextResponse.json({
      success: true,
      data: jobs,
      count: jobs.length,
      api: 'JSON-2'
    });
  } catch (error) {
    console.error('Jobs API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch jobs from Odoo',
        details: error instanceof Error ? error.message : 'Unknown error',
        data: []
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobId, applicantData } = body;
    
    if (!jobId || !applicantData) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For now, just return success - we'll implement this once we get the connection working
    return NextResponse.json({ success: true, message: 'Application received' });
  } catch (error) {
    console.error('Job application API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}