const nodemailer = require('nodemailer');
const { productKeywords } = require('../scripts/productKeywords');

module.exports = async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, artworkId } = req.body;

        if (!email || !artworkId) {
            return res.status(400).json({ error: 'Email and artworkId are required' });
        }

        // Find the artwork in productKeywords
        const artwork = productKeywords.find(p => p.id === artworkId);
        if (!artwork) {
            return res.status(404).json({ error: 'Artwork not found' });
        }

        // Build the wallpaper download URL
        const siteUrl = 'https://daprintsai.live';
        const pdfUrl = siteUrl + artwork.pdf;
        const imageUrl = siteUrl + '/' + artwork.image;

        // Send email via Brevo SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const subject = 'Your Free Wallpaper from DA Prints AI!';
        const body = `
            <h2>Your Free Wallpaper Is Here!</h2>
            <p>Thank you for choosing DA Prints AI! Here is your free digital wallpaper:</p>
            <h3>${artwork.name}</h3>
            <p><img src="${imageUrl}" alt="${artwork.name}" style="max-width:400px;border-radius:8px;" /></p>
            <p><a href="${pdfUrl}" style="display:inline-block;padding:12px 24px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px;font-weight:bold;">Download Your Wallpaper (PDF)</a></p>
            <p>Enjoy your artwork! Visit <a href="${siteUrl}">daprintsai.live</a> to browse our full collection.</p>
            <br><hr><p style="font-size:12px;color:#888;">DA Prints AI | <a href="${siteUrl}">daprintsai.live</a></p>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_FROM || 'DA Prints AI <noreply@daprintsai.live>',
            to: email,
            subject: subject,
            html: body,
            attachments: [
                {
                    filename: artwork.name + ".pdf",
                    path: pdfUrl,
                    contentType: "application/pdf"
                }
            ]
        });

        console.log('Free wallpaper email sent to:', email, 'artwork:', artwork.name);

        // Simulate successful charge response (as if Stripe succeeded)
        return res.status(200).json({
            success: true,
            message: 'Free wallpaper sent successfully!',
            artworkName: artwork.name,
            // Simulated charge response fields
            chargeSimulated: true,
            amount: 0,
            currency: 'usd',
            status: 'succeeded'
        });

    } catch (error) {
        console.error('Free wallpaper error:', error);
        return res.status(500).json({ error: 'Failed to send free wallpaper email' });
    }
};
