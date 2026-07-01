import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formType, data, techStack, files } = body;

    let dbError = null;

    if (formType === 'contact') {
      const { error } = await supabase.from('contact_inquiries').insert([
        {
          name: data.name,
          email: data.email,
          company: data.company || null,
          inquiry_type: data.inquiryType,
          message: data.message,
        },
      ]);
      dbError = error;
    } else {
      const { error } = await supabase.from('project_requests').insert([
        {
          full_name: data.fullName,
          email: data.email,
          company: data.company || null,
          job_title: data.jobTitle || null,
          project_type: data.projectType || null,
          budget: data.budget || null,
          timeline: data.timeline || null,
          requirements: data.requirements,
          tech_stack: techStack?.length > 0 ? techStack : null,
          files: files?.length > 0 ? files : null,
        },
      ]);
      dbError = error;
    }

    if (dbError) {
      console.error('Supabase Error:', dbError);
      return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
    }

    // Try to send email, but don't fail the request if it fails (unless RESEND_API_KEY is completely missing)
    if (process.env.RESEND_API_KEY) {
      try {
        let emailHtml = '';
        
        if (formType === 'contact') {
          emailHtml = `
            <h2>New Contact Inquiry</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
            <p><strong>Type:</strong> ${data.inquiryType}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message}</p>
          `;
        } else {
          emailHtml = `
            <h2>New Project Request</h2>
            <p><strong>Name:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
            <p><strong>Title:</strong> ${data.jobTitle || 'N/A'}</p>
            <p><strong>Project Type:</strong> ${data.projectType}</p>
            <p><strong>Budget:</strong> ${data.budget}</p>
            <p><strong>Timeline:</strong> ${data.timeline}</p>
            <p><strong>Tech Stack:</strong> ${techStack?.join(', ') || 'N/A'}</p>
            <h3>Requirements:</h3>
            <p>${data.requirements}</p>
            <h3>Attachments:</h3>
            <ul>
              ${files?.length > 0 ? files.map((url: string) => `<li><a href="${url}">${url}</a></li>`).join('') : '<li>No files attached</li>'}
            </ul>
          `;
        }

        await resend.emails.send({
          from: 'Teamify <onboarding@resend.dev>', // Use the default Resend testing email
          to: 'agnihotrihimanshu06@gmail.com', // User's email from the CSV dump
          subject: formType === 'contact' ? 'New Contact Inquiry' : 'New Project Request',
          html: emailHtml,
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
