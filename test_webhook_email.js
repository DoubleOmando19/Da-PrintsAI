const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: { rejectUnauthorized: true },
});
const sim = {
    id: 'cs_test_sim_' + Date.now(),
    customer_details: { email: 'henry_alcaide@hotmail.com' },
    amount_total: 500,
    metadata: { order_items: JSON.stringify([
        { name: 'AI Artwork - Fall Trail', quantity: 1, priceCents: 250, image1: '/images/New Project picz PDF/FallTrail.pdf' },
        { name: 'AI Artwork - Flowers', quantity: 1, priceCents: 250, image1: '/images/New Project picz PDF/Flowers.pdf' }
    ])}
};
async function run() {
    console.log('=== WEBHOOK-TO-EMAIL FLOW TEST ===');
    console.log('Date:', new Date().toISOString());
    try { await transporter.verify(); console.log('[PASS] SMTP verified'); } catch(e) { console.error('[FAIL]', e.message); return; }
    const email = sim.customer_details.email;
    const items = JSON.parse(sim.metadata.order_items);
    console.log('[SIM] Email:', email, '| Items:', items.length);
    const att = [];
    const bd = path.join(__dirname, 'backend');
    for (const it of items) {
        const p = path.join(bd, '..', it.image1);
        const fn = path.basename(it.image1);
        if (!fs.existsSync(p)) { console.error('[MISS]', p); continue; }
        console.log('[ATTACH]', fn, (fs.statSync(p).size/1024).toFixed(0)+'KB');
        att.push({ filename: fn, path: p, contentType: fn.endsWith('.pdf') ? 'application/pdf' : 'image/png' });
    }
    const il = items.map(i => '- '+i.name+' $'+(i.priceCents/100).toFixed(2)).join('\n');
    const mo = {
        from: process.env.EMAIL_FROM,
        to: email,
        replyTo: process.env.SMTP_USER,
        subject: 'Your DA Prints AI Purchase - Digital Downloads (TEST)',
        html: '<h1>DA Prints AI</h1><h2>Thank You!</h2><p>Your artwork is attached.</p><pre>'+il+'</pre><p>Total: $'+(sim.amount_total/100).toFixed(2)+'</p>',
        attachments: att
    };
    console.log('[SEND] From:', mo.from, '| To:', mo.to, '| Att:', att.length);
    const info = await transporter.sendMail(mo);
    console.log('[OK] ID:', info.messageId);
    console.log('[OK] Resp:', info.response);
    console.log('[OK] Accepted:', JSON.stringify(info.accepted));
    console.log('[OK] Envelope:', JSON.stringify(info.envelope));
    console.log('=== DONE ===');
}
run().catch(e => console.error('[ERR]', e));