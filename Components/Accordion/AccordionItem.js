import { BsPlusLg } from "react-icons/bs";

const AccordionItem = ({ children, title, ...props }) => {
	return (
		<details className="accordion-item">
			<summary className="accordion-title">
				<h3>{title}</h3>
				<div className="accordion-icon">
					<BsPlusLg />
				</div>
			</summary>
			<div className="accordion-content">{children}</div>
		</details>
	);
};

export default AccordionItem;
