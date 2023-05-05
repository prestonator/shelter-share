"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../Footer.module.css";

const FooterForm = () => {
	// Initialize our states
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [isSubmitted, setIsSubmitted] = React.useState(false);

	// Yup error message overrides
	const errMess = {
		req: "Error: Please fill this out",
		name: "Error: Name is required",
		email: "Error: Email is required",
		phone: "Error: Phone number is required",
		message: "Error: Message is required",
	};

	// Our Yup Schema for this form
	const ContactSchema = yup.object().shape({
		name: yup.string().label("Full Name").required(errMess.name).min(3).max(20),
		email: yup
			.string()
			.label("Email Address")
			.required(errMess.email)
			.email("Invalid Email Address"),
		phone: yup
			.string()
			.label("Phone Number")
			.required(errMess.phone)
			.min(8)
			.max(14),
		message: yup
			.string()
			.label("Message")
			.required(errMess.message)
			.min(10)
			.max(1000),
	});

	// Destruct useForm() and set our Yup schema as the validation resolver
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(ContactSchema),
	});

	const submitForm = async (data) => {
		setIsSubmitting(true);
		const id = toast.loading("Please wait...", { position: "bottom-center" });

		try {
			await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then((res) => {
				console.log("Response received");
				console.log(res);
				if (res.status === 200) {
					console.log("Response succeeded!");
					setIsSubmitted(true);
				} else if (!res.ok) {
					throw new Error("Network response was not ok");
				} else {
					alert(res.message);
				}
			});


			setIsSubmitting(false);
			toast.update(id, {
				render: "All is good",
				type: "success",
				isLoading: false,
				position: "bottom-center",
				autoClose: 5000,
			});

		} catch (e) {
			alert("An error occurred. See log for details.");
			toast.update(id, {
				render: "Something went wrong",
				type: "error",
				isLoading: false,
				position: "bottom-center",
			});
			console.error(e);
		}
	};

	return (
		<>
			<ToastContainer />
			{!isSubmitted ? (
				<form
					className={styles.footerForm}
					onSubmit={handleSubmit((data) => submitForm(data))}
				>
					<div>
						<input
							className={styles.input}
							type="text"
							placeholder="John Doe"
							{...register("name", { required: true })}
						/>
						<p>{errors.name?.message}</p>
					</div>
					<div>
						<div>
							<input
								className={styles.input}
								type="email"
								placeholder="john@example.com"
								{...register("email", { required: true })}
							/>
							<p>{errors.email?.message}</p>
						</div>
						<div>
							<input
								className={styles.input}
								type="tel"
								placeholder="(555) 555-5555"
								{...register("phone", {
									required: true,
									min: 8,
									maxLength: 14,
								})}
							/>
							<p>{errors.phone?.message}</p>
						</div>
					</div>
					<div>
						<textarea
							className={styles.input}
							placeholder="Please type your message..."
							{...register("message", { required: true })}
						/>
						<p>{errors.message?.message}</p>
					</div>
					<div>
						<input
							className={styles.button}
							type="submit"
							value={isSubmitting ? "Sending..." : "Send Message"}
							disabled={isSubmitting}
						/>
					</div>
				</form>
			) : (
				<>
					<h3 className={styles.submitHeader}>Thank you!</h3>
					<p className={styles.submitBody}>
						Your message has been received. Please check your email for
						confirmation.
					</p>
				</>
			)}
		</>
	);
};

export default FooterForm;
