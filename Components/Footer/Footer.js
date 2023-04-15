import styles from "./Footer.module.css";
import FooterForm from "./parts/FooterForm";
import { BsLinkedin, BsInstagram, BsFacebook } from "react-icons/bs";
import { AiOutlineCopyright } from "react-icons/ai";


const Footer = async () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.footerContainer}>
				<div className={styles.headingWrapper}>
					<h4>Join Shelter Share Today!</h4>
				</div>
				<FooterForm />
				<div className={styles.socials}>
					<a
						href="https://www.linkedin.com/in/robert-washington-7855984a"
						target="_blank"
					>
						<BsLinkedin />
					</a>
					<a
						href="https://www.instagram.com/sheltersharewithme/?igshid=YmMyMTA2M2Y%3D"
						target="_blank"
					>
						<BsInstagram />
					</a>
					<a
						href="https://www.facebook.com/ShelterShareOklahoma?mibextid=LQQJ4d"
						target="_blank"
					>
						<BsFacebook />
					</a>
				</div>
				<div className={styles.copyright}>
					<span>
						Shelter Share <AiOutlineCopyright /> {currentYear} Shelter Share -
						All Rights Reserved
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
