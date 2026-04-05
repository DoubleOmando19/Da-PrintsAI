// Test script to verify PDF attachments are properly included in emails
// This simulates the email sending logic from handleSuccessfulPayment
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

async function testEmailWithAttachment() {
  console.log('=== Testing Email with PDF Attachment ===');
  
  // Create transporter using .env credentials
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: { rejectUnauthorized: false }
  });

  // Verify SMTP connection
  try {
    await transporter.verify();
    console.log('[OK] SMTT connection verified');
  } catch (err) {
    console.error('[FAIL] SMTP verification failed:', err.message);
    return;
  }

  // Load a product and find its PDF
  const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'backend', 'products.json'), 'utf8'));
  const testProduct = products[0]; // First product
  console.log('Test product:', testProduct.name, '| PDF:', testProduct.image1);

  // Resolve the PDF path (same logic as in server.js)
  const pdfPath = path.join(__dirname, testProduct.image1);
  console.log('Resolved PDF path:', pdfPath);
  
  if (!fs.existsSync(pdfPath)) {
    // Try with backend/../ prefix like server.js does
    const altPath = path.join(__dirname, 'backend', '..', testProduct.image1);
    console.log('Alt PDF path:', altPath);
    if (!fs.existsSync(altPath)) {
      console.error('[FAIL] PDF file not found at either path!');
      return;
    }
  }
  
  const finalPath = fs.existsSync(pdfPath) ? pdfPath : path.join(__dirname, 'backend', '..', testProduct.image1);
  const fileSize = fs.statSync(finalPath).size;
  console.log('[OK] PDF file found, size:', (fileSize / 1024).toFixed(1), 'KB');

  // Build attachments array (same as server.js)
  const attachments = [{
    filename: path.basename(testProduct.image1),
    path: finalPath,
    contentType: 'application/pdf'
  }];

  // Send test email
  const mailOptions = {
    from: process.env.EMAIL_FROM || '"DA Prints AI" <noreply@daprintsai.live>',
    to: 'henry_alcaide@hotmail.com',
    subject: '[TEST] DA Prints - PDF Attachment Verification',
    html: '<h2>Test Email</h2><p>This email tests that PDF attachments are properly included.</p><p>Attached: ' + testProduct.name + '</p>',
    attachments: attachments
  };

  console.log('Sending email with attachment to:', mailOptions.to);
  console.log('Attachment:', attachments[0].filename, '(' + (fileSize/1024).toFixed(1) + ' KB)');

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('[OK] Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Accepted:', JSON.stringify(info.accepted));
    console.log('=== TEST PASSED - Email with PDF attachment sent! ===');
  } catch (err) {
    console.error('[FAIL] Email send failed:', err.message);
  }
}

testEmailWithAttachment().catch(console.error);
