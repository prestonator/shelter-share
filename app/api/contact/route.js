import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Mail configuration with environment variables
const mailConfig = {
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.WEBMASTER_EMAIL,
		pass: process.env.WEBMASTER_PASSWORD,
	},
};

const adminEmail = "Robert @ Shelter Share <shelter.share.webmaster@gmail.com>";

// Function for loading email template files
async function getPubFile(file) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/emailTemplates/${file}`
	);

	// If the response is not ok, return null
	if (!res.ok) {
		return null;
	}

	return await res.text();
}

// Function for processing email templates with placeholders
function processTemplate(template, placeholders) {
	return Object.entries(placeholders).reduce(
		(result, [key, value]) => result.replace(`%${key}%`, value),
		template
	);
}

// Function for sending email using async/await and returning a Promise
async function sendMailAsync(transporter, mailOptions) {
	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				reject(error);
			} else {
				resolve(info);
			}
		});
	});
}

// POST function for handling email sending
export async function POST(req) {
	const requestData = await req.json();
	const { name, email, message, phone } = requestData;

	// Create Nodemailer transport handler
	let transporter = nodemailer.createTransport(mailConfig);

	// Load email templates
	const template = await getPubFile("template.html");
	const custHtml = await getPubFile("customer.html");
	const adminHtml = await getPubFile("admin.html");
	const custTxt = await getPubFile("customer.txt");
	const adminTxt = await getPubFile("admin.txt");

	// Check if any template failed to load and return an error response
	if (!template || !custHtml || !adminHtml || !custTxt || !adminTxt) {
		return NextResponse.error(500, "Error loading email templates");
	}

	// Format our recipient email address
	const recipEmail = `${name} <${email}>`;

	/// Process customer email template
	let sendHtml = processTemplate(template, {
		BODY: custHtml,
		NAME: name,
		EMAIL: email,
		PHONE: phone,
		MESSAGE: message,
	});

	let sendTxt = processTemplate(custTxt, {
		NAME: name,
		EMAIL: email,
		MESSAGE: message,
	});

	// Customer email data
	const custMailData = {
		from: adminEmail,
		to: recipEmail,
		subject: "Message Received ✔",
		text: sendTxt,
		html: sendHtml,
	};

	// Send customer email
	try {
		const custInfo = await sendMailAsync(transporter, custMailData);
		console.log(`Email sent: ${custInfo.response}`);
	} catch (error) {
		console.log(error);
		return NextResponse.error(500, "Error sending message");
	}

	// Process admin email template
	sendHtml = processTemplate(template, {
		BODY: adminHtml,
		NAME: name,
		EMAIL: email,
		PHONE: phone,
		MESSAGE: message,
	});

	sendTxt = processTemplate(adminTxt, {
		NAME: name,
		EMAIL: email,
		PHONE: phone,
		MESSAGE: message,
	});

	// Admin email data
	const adminMailData = {
		from: recipEmail,
		to: adminEmail,
		subject: `New Message From ${name}`,
		text: sendTxt,
		html: sendHtml,
	};

	// Send admin email
	try {
		const adminInfo = await sendMailAsync(transporter, adminMailData);
		console.log(`Email sent: ${adminInfo.response}`);
	} catch (error) {
		console.log(error);
		return NextResponse.error(500, "Error sending message");
	}

	// Return success response
	return NextResponse.json({ message: "Message sent" });
}
