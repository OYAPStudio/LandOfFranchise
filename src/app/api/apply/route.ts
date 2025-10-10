import { NextRequest, NextResponse } from 'next/server';
import { odooJson2Service } from '@/lib/odoo-json2';

export async function POST(request: NextRequest) {
  try {
    console.log('Job application API endpoint called');
    
    const formData = await request.formData();
    
    const jobId = formData.get('jobId') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const experience = formData.get('experience') as string;
    const cvFile = formData.get('cv') as File;

    console.log('Creating job application:', {
      jobId,
      name,
      email,
      phone,
      coverLetter,
      experience,
      cvFile: cvFile ? `${cvFile.name} (${cvFile.size} bytes)` : 'No file'
    });

    // Validate required fields
    if (!jobId || !name || !email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: jobId, name, and email are required' 
        },
        { status: 400 }
      );
    }

    // Convert CV to base64 if provided
    let cvBase64 = '';
    if (cvFile && cvFile.size > 0) {
      const arrayBuffer = await cvFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      cvBase64 = buffer.toString('base64');
    }

    // Create application in Odoo
    const result = await odooJson2Service.createJobApplication({
      jobId: parseInt(jobId),
      name,
      email,
      phone,
      coverLetter,
      experience,
      cv: cvBase64
    });

    if (result.success) {
      console.log('Application created successfully:', result.data);
      return NextResponse.json({
        success: true,
        message: 'Application submitted successfully',
        data: result.data
      });
    } else {
      console.error('Failed to create application:', result.error);
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || 'Failed to submit application' 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Application API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Server error occurred while processing application' 
      },
      { status: 500 }
    );
  }
}

// Optional: Get applicant fields for dynamic form generation
export async function GET() {
  try {
    const fields = await odooJson2Service.getApplicantFields();
    return NextResponse.json({
      success: true,
      data: fields
    });
  } catch (error) {
    console.error('Error fetching applicant fields:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch form fields' },
      { status: 500 }
    );
  }
}