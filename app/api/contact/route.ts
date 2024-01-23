import { NextResponse } from 'next/server';

function htmlEmail(name: string, email: string, message: string): string {
	let finalMessage = `<h1>Support Message</h1>
		<p>${message}<p>
		<a href="mailto:${email}">Reply to ${name}</a>`;
	return finalMessage;
}

export async function POST(request: Request) {
	const { name, email, message } = await request.json();
	let nodemailer = require('nodemailer');
	const transporter = nodemailer.createTransport({
		port: process.env.SUPPORT_EMAIL_PORT,
		host: process.env.SUPPORT_EMAIL_HOST,
		auth: {
			user: process.env.SUPPORT_EMAIL_USERNAME,
			pass: process.env.SUPPORT_EMAIL_API_KEY,
		},
		secureConnection: false,
		tls: {
			ciphers: 'SSLv3',
		},
	});

	const mailOptions = {
		from: process.env.SUPPORT_FROM_EMAIL,
		to: process.env.SUPPORT_TO_EMAIL,
		subject: 'Message from ' + name,
		text: message,
		html: htmlEmail(name, email, message),
	};
	transporter.sendMail(mailOptions, function (err: any, info: any) {
		if (err) {
			NextResponse.json({ message: 'Message failed to send. ' + err });
		} else {
			NextResponse.json({ message: 'Message sent successfully!' });
		}
	});
	return NextResponse.json({ message: 'Waiting for success/failure' });
}
