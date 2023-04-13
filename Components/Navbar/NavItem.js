import { getMediaData } from "@/utils/fetch/mediaAPI";
import { navItems } from "./items.js";
import Image from "next/image";
import styles from "./Nav.module.css";

async function getData() {
	const [logoData] = await getMediaData([10]);
	return [logoData];
}

async function NavItem({ onBtnClick }) {
	const [logoData] = await getData();
	return (
		<>
			<li className={`${styles.navItem} ${styles.navLogo}`}>
				<Image
					src={logoData.fullUrl}
					alt={logoData.altText}
					fill
					className={styles.logo}
				/>
			</li>
			{navItems.map((item) => (
				<li key={item.goto} className={styles.navItem}>
					<button
						goto={item.goto}
						onClick={onBtnClick}
						className={styles.navButton}
					>
						{item.label}
					</button>
				</li>
			))}
		</>
	);
}

export default NavItem;
