# DA Prints AI - Email Delivery Diagnostic Report
Date: April 4, 2026

## Problem Statement
Emails are not getting delivered to recipients after initial acceptance by Brevo SMTP relay.

## Investigation Results

### 1. SMTP Connection: WORKING
- Brevo SMTP relay (smtp-relay.brevo.com:587) accepts connections
- STARTTLS encryption working
- Authentication with SMTP credentials working
- Emails queued successfully (250 OK)

### 2. Brevo Account Status
- Email sending status: Validated
- Quota: 298 of 300 daily emails remaining
- Plan: Free tier (300 emails/day)
- No deliverability score yet (insufficient volume)

### 3. Brevo Transactional Logs Analysis
- Emails from henry_alcaide@hotmail.com: DELIVERED (status in Brevo)
- Emails from a715c7001@smtp-brevo.com: ERROR (sender not valid/verified)
- "Loaded by proxy" events seen (recipient opened email via proxy)
- Only test emails in logs - no customer purchase emails found

### 4. ROOT CAUSE: Freemail Sender + Missing Domain Authentication

#### Issue A: Freemail FROM Address
- Current FROM: henry_alcaide@hotmail.com (Hotmail/freemail)
- hotmail.com SPF: "v=spf1 include:spf2.outlook.com -all" (HARD FAIL)
- Brevo servers are NOT in spf2.outlook.com
- Result: SPF check FAILS at recipient mail servers
- Google/Yahoo/Microsoft 2024+ policies REJECT freemail FROM via 3rd-party relays

#### Issue B: No Custom Domain Configured
- daprintsai.com: NOT REGISTERED (WHOIS: "No match for domain")
- No domain added in Brevo Senders > Domains (empty - "Add your first domain")
- No SPF/DKIM/DMARC DNS records exist

#### Issue C: DKIM Alignment Failure
- Brevo DKIM signature: "Default" (signs as sendinblue.com/brevo.com)
- FROM domain: hotmail.com
- DKIM alignment: FAILS (sendinblue.com != hotmail.com)
- Brevo dashboard WARNING: "Senders not compliant with Google, Yahoo, Microsoft requirements"

#### Issue D: DMARC Non-Compliance
- Brevo dashboard WARNING: "Freemail domain is not recommended"
- hotmail.com has strict DMARC policy (Microsoft-owned)
- Emails from @hotmail.com via Brevo will fail DMARC checks

### 5. Why Self-Test Emails Appeared to Deliver
- Test emails sent FROM hotmail.com TO hotmail.com (same domain, same provider)
- Microsoft/Outlook may apply different filtering for same-domain delivery
- Emails to Gmail, Yahoo, other providers WILL fail authentication and be rejected/spammed

### 6. Delivery Chain Analysis
§§§
[Node.js App] --> [Brevo SMTP Relay] --> [Recipient Mail Server] --> [Inbox?]
                      |                          |
                  Accepts email            Checks:
                  Queues for delivery      1. SPF: FAIL (Brevo not in hotmail.com SPF)
                  Shows "Delivered" .       2. DKIM: MISALIGNED (sendinblue != hotmail)
                  in Brevo logs            3. DMARC: FAIL (hotmail.com policy violated)
                                           --> REJECTED or SPAM FOLDER
§§§

## Final Delivery Test Results (April 4, 2026 17:07)
§§§
=== FINAL DELIVERY TEST ===
From: DA Prints AI <henry_alcaide@hotmail.com>
SMTP: smtp-relay.brevo.com:587

[PASS] SMTP connection verified
[PASS] Email accepted by Brevo
  Message ID: <295bf6d9-343e-cc26-20eb-c1439116fc93@hotmail.com>
  Response: 250 2.0.0 OK: queued
  Accepted: ["henry_alcaide@hotmail.com"]
  Rejected: []
§§§
Note: Brevo accepts and queues the email, but downstream delivery to non-Hotmail
recipients will fail SPF/DKIM/DMARC authentication checks.

## Changes Applied During Investigation
1. BASE_URL updated: http://localhost:3000 -> https://daprintsai.com
2. TLS enforcement added to nodemailer transporter config
3. EMAIL_FROM tested and reverted to verified sender (hotmail.com)

## Required Actions to Fix Email Delivery

### Step 1: Register daprintsai.com Domain
- Purchase on Namecheap or preferred registrar
- Required before any DNS or email authentication can be set up

### Step 2: Add Domain in Brevo
- Brevo Dashboard > Settings > Senders, domains, IPs > Domains > "Add a domain"
- Add daprintsai.com
- Follow Brevo's verification steps (DNS TXT record)

### Step 3: Add DNS Records for Email Authentication
After domain is registered and added to Brevo:

SPF Record:
  Type: TXT | Host: @ | Value: v=spf1 include:sendinblue.com ±all

DKIM Record (exact value from Brevo dashboard):
  Type: TXT | Host: mail._domainkey | Value: (provided by Brevo)

DMARC Record:
  Type: TXT | Host: _dmarc | Value: v=DMARC1; p=none; rua=mailto:dmarc@daprintsai.com

### Step 4: Create and Verify New Sender
- Brevo > Settings > Senders > Add a sender
- Name: DA Prints AI
- Email: noreply@daprintsai.com (or orders@daprintsai.com)
- Verify the sender

### Step 5: Update .env
- Change EMAIL_FROM to: DA Prints AI <noreply@daprintsai.com>

### Step 6: Register Stripe Webhook
- Set webhook URL to: https://daprintsai.com/api/webhook
- This ensures purchase confirmation emails actually get triggered
