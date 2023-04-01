"use client";
import { onBtnClick } from "@/utils/helpers";
import styles from "./Nav.module.css";

const Navbar = ({ children }) => {
	return (
		<nav className={styles.navWrapper}>
			<ul className={styles.navContainer}>
				{children}
				<li className={styles.navItem}>
					<button
						goto="about"
						onClick={onBtnClick}
						className={styles.navButton}
					>
						About Us
					</button>
				</li>
				<li className={styles.navItem}>
					<button
						goto="features"
						onClick={onBtnClick}
						className={styles.navButton}
					>
						Our Features
					</button>
				</li>
				<li className={styles.navItem}>
					<button
						goto="video"
						onClick={onBtnClick}
						className={styles.navButton}
					>
						Our Story
					</button>
				</li>
				<li className={styles.navItem}>
					<button goto="faq" onClick={onBtnClick} className={styles.navButton}>
						FAQ
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
