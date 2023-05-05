"use client";
import { useState } from "react";
import styles from "../Footer.module.css";

const FooterForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Sending");
		let data = {
			name,
			email,
			message,
		};
		fetch("/api/contact", {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((res) => {
			console.log("Response received");
			console.log(res);
			if (res.status === 200) {
				console.log("Response succeeded!");
				setSubmitted(true);
				setName("");
				setEmail("");
				setMessage("");
			}
		});
	};

	return (
		<form className={styles.footerForm}>
			<div>
				<input
					className={styles.input}
					placeholder="Email"
					type="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					className={styles.input}
					placeholder="Full Name"
					type="text"
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
			</div>
			<div>
				<textarea
					className={styles.input}
					placeholder="Type your Message"
					type="text"
					onChange={(e) => {
						setMessage(e.target.value);
					}}
				/>
			</div>
			<div>
				<button
					className={styles.button}
					type="submit"
					onClick={(e) => {
						handleSubmit(e);
					}}
				>
					Send
				</button>
			</div>
		</form>
	);
};

export default FooterForm;
