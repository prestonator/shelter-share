import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Config
const mailConfig = {
	host: "smtp.gmail.com",
	port: 465, // or 587
	secure: true, // true for 465, false for other ports
	auth: {
		user: "shelter.share.webmaster@gmail.com",
		pass: process.env.WEBMASTER_PASSWORD,
	},
};

const adminEmail = "Robert @ Shelter Share <shelter.share.webmaster@gmail.com>";

// Function for grabbing template files
async function getPubFile(file) {
	const res = await fetch(
		`${NEXT_PUBLIC_PRODUCTION_URL}/emailTemplates/${file}`
	);

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.text();
	return data;
}

export async function POST(req) {
	const res = await req.json();
	const { name, email, message, phone } = res;
	// Create our Nodemailer transport handler
	let transporter = nodemailer.createTransport(mailConfig);

	// Fetch our template files
	const template = await getPubFile("template.html");
	const custHtml = await getPubFile("customer.html");
	const adminHtml = await getPubFile("admin.html");
	const custTxt = await getPubFile("customer.txt");
	const adminTxt = await getPubFile("admin.txt");

	// Format our recipient email address
	const recipEmail = `${name} <${email}>`;

	// Format our customer-bound email from received form data
	let sendHtml = template
		.replace("%BODY%", custHtml)
		.replace("%NAME%", name)
		.replace("%EMAIL%", email)
		.replace("%PHONE%", phone)
		.replace("%MESSAGE%", message);

	let sendTxt = custTxt
		.replace("%NAME%", name)
		.replace("%EMAIL%", email)
		.replace("%MESSAGE%", message);

	// Customer Mail Data
	const custMailData = {
		from: adminEmail,
		to: recipEmail, // list of receivers
		subject: "Message Received ✔", // Subject line
		text: sendTxt, // plain text body
		html: sendHtml, // html body
	};


	// Send our customer-bound email
	transporter.sendMail(custMailData, (error, info) => {
		if (error) {
			console.log(error);
			res.status(500).send("Error sending message");
		} else {
			console.log(`Email sent: ${info.response}`);
			res.status(200).send("Message sent");
		}
	});


	sendHtml = template
		.replace("%BODY%", adminHtml)
		.replace("%NAME%", name)
		.replace("%EMAIL%", email)
		.replace("%PHONE%", phone)
		.replace("%MESSAGE%", message);

	sendTxt = adminTxt
		.replace("%NAME%", name)
		.replace("%EMAIL%", email)
		.replace("%PHONE%", phone)
		.replace("%MESSAGE%", message);

	// Admin Mail Data
	const adminMailData = {
		from: recipEmail,
		to: adminEmail, // list of receivers
		subject: `New Message From ${name}`, // Subject line
		text: sendTxt, // plain text body
		html: sendHtml, // html body
	};

	transporter.sendMail(adminMailData, (error, info) => {
		if (error) {
			console.log(error);
			res.status(500).send("Error sending message");
		} else {
			console.log(`Email sent: ${info.response}`);
			res.status(200).send("Message sent");
		}
	});


	return NextResponse.json({ res });
}
