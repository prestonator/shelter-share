"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "./debounce";
import { onBtnClick } from "@/utils/helpers";
import styles from "./Nav.module.css";

const Navbar = ({ children }) => {
	// Initialize state variables
	const [isNavExpanded, setIsNavExpanded] = useState(false);
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);
	const [isNavbarOverCta, setIsNavbarOverCta] = useState(false);

	// Create a reference to the navbar component
	const navRef = useRef(null);


	const ctaRef = useRef(null);

	useEffect(() => {
		ctaRef.current = document.getElementById("cta");
	}, []);
	// Debounce scroll events to not trigger the function too often
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleScroll = useCallback(
		debounce(() => {
			const currentScrollPos = window.pageYOffset;

			const isOverCta =
				currentScrollPos >=
				ctaRef.current.offsetTop - navRef.current.clientHeight;

			setIsNavbarOverCta(isOverCta);
			setVisible(prevScrollPos > currentScrollPos && currentScrollPos > 70);
			setPrevScrollPos(currentScrollPos);

			navRef.current.style.top =
				prevScrollPos > currentScrollPos
					? "0"
					: `-${navRef.current.clientHeight}px`;
		}, 100),
		[prevScrollPos]
	);

	// Set up scroll event listener when component mounts
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		// Clean the event listener when component is unmounted
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	// CSS for navbar when hidden or visible
	const stickyStyles = {
		position: "fixed",
		width: "100%",
		height: `${navRef.current ? navRef.current.clientHeight : "auto"}`,
		transition: "top 0.6s",
		zIndex: "100",
	};

	const navbarClassName = isNavbarOverCta ? styles.navbarOverCta : "";
	return (
		<nav
			className={`${styles.navWrapper} ${navbarClassName}`}
			style={stickyStyles}
			ref={navRef}
		>
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
