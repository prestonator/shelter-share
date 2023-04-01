import { getMediaData } from "@/utils/fetch/mediaAPI";
import Image from "next/image";
import styles from "./Nav.module.css";

async function getData() {
	const [logoData] = await getMediaData([10]);
	return [logoData];
}

const NavLogo = async () => {
	const [logoData] = await getData();
	return (
		<li className={`${styles.navItem} ${styles.navLogo}`}>
			<Image
				src={logoData.fullUrl}
				alt={logoData.altText}
				fill
				className={styles.logo}
			/>
		</li>
	);
};

export default NavLogo;
