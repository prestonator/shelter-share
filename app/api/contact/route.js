import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
	const res = await request.json();

	const { name, email, message } = res;

	const transporter = nodemailer.createTransport({
		port: 465,
		host: "smtp.gmail.com",
		auth: {
			user: "prestonator4000@gmail.com",
			pass: "",
		},
		secure: true,
	});

	const mailData = {
		from: email,
		to: "preston@eltonjenkinslaw.com",
		subject: `Message From ${name}`,
		text: message + " | Sent from: " + email,
		html: `<div>${message}</div><p>Sent from: ${email}</p>`,
	};

	transporter.sendMail(mailData, (error, info) => {
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


