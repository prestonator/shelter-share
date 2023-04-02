import styles from "../Footer.module.css";


const FooterForm = () => {
    return (
			<form className={styles.footerForm}>
				<div>
					<input className={styles.input} placeholder="Email" type="email" />
					<input className={styles.input} placeholder="Full Name" type="text" />
				</div>
				<div>
					<textarea
						className={styles.input}
						placeholder="Type your Message"
						type="text"
					/>
				</div>
				<div>
                    <button className={styles.button} type="submit">Send</button>
                </div>
			</form>
		);
};

export default FooterForm;