/**
 * Vercel Serverless: /api/subscribe
 * Adds subscribers via Brevo SMTP
 */
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  const { email, tag, gift } = req.body || {};
  if (!email || !email.includes('@') || !email.includes('.'))
    return res.status(400).json({ success: false, message: 'Valid email required' });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    let subject = 'Welcome to DA Prints AI!';
    let body = '<h2>Welcome to DA Prints AI!</h2>';

    if (tag === 'free-wallpapers') {
      subject = 'Your Free 4K Wallpapers Are Here!';
      body += '<p>Thank you for joining! Your 3 free exclusive 4K wallpapers are ready.</p>';
      body += '<p>Visit <a href="https://daprintsai.live">daprintsai.live</a> to download.</p>';
    } else if (tag === 'discount-15') {
      subject = 'Your 15% Discount Code Inside!';
      body += '<p>Here is your exclusive discount code:</p>';
      body += '<h3 style="background:#6c5ce7;color:white;padding:12px;text-align:center;border-radius:8px;">DAPRINTS15</h3>';
      body += '<p>Use at checkout on <a href="https://daprintsai.live">daprintsai.live</a></p>';
    } else if (tag === 'newsletter') {
      subject = 'Welcome to Artist Tips Newsletter!';
      body += '<p>You are subscribed to our weekly Artist Tips Newsletter!</p>';
    } else if (tag === 'giveaways') {
      subject = "You're In! Giveaway Notifications Active";
      body += '<p>You will be first to know about monthly giveaways and contests!</p>';
    } else if (tag === 'community') {
      subject = 'Welcome to the DA Prints Community!';
      body += '<p>Stay connected across DeviantArt, Behance, and ArtStation.</p>';
    } else {
      body += '<p>You will receive updates about new artwork drops and exclusive offers.</p>';
    }

    body += '<br><p style="color:#888;font-size:12px;">Signed up for: ' + (gift || 'updates') + '</p>';
    body += '<p style="color:#888;font-size:12px;">DA Prints AI - 85 digital artworks at $1.99 | <a href="https://daprintsai.live">daprintsai.live</a></p>';

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'DA Prints AI <noreply@daprintsai.live>',
      to: email,
      subject: subject,
      html: body
    });

    return res.status(200).json({ success: true, message: 'Subscribed! Check your email.' });
  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ success: false, message: 'Failed to subscribe. Try again later.' });
  }
};
