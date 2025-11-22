import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, responses, contactInfo, authMethod, status } = body;

    // Save questionnaire response to database
    // For now, we'll just log it and return success
    // In production, you'd save to a QuestionnaireResponse table
    
    console.log('Questionnaire submission:', {
      type,
      responses,
      contactInfo,
      authMethod,
      status
    });

    // TODO: Save to database
    // const questionnaireResponse = await prisma.questionnaireResponse.create({
    //   data: {
    //     type,
    //     responses: JSON.stringify(responses),
    //     contactName: contactInfo.name,
    //     contactEmail: contactInfo.email,
    //     contactPhone: contactInfo.phone,
    //     authMethod,
    //     status
    //   }
    // });

    // If callback requested, send notification to admin team
    if (authMethod === 'callback') {
      // TODO: Send email notification
      console.log('Callback requested for:', contactInfo);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Questionnaire submission error:', error);
    return NextResponse.json(
      { error: 'Failed to save questionnaire data' },
      { status: 500 }
    );
  }
}