import React from "react";
import "./Accordion.css";

const AccordionItem = ({
	showDescription,
	ariaExpanded,
	fontWeightBold,
	item,
	index,
	onClick,
}) => {
	return (
		<div className="faq__question" key={item.title}>
			<dt>
				<button
					aria-expanded={ariaExpanded}
					aria-controls={`faq${index + 1}_desc`}
					data-qa="faq__question-button"
					className={`faq__question-button ${fontWeightBold}`}
					onClick={onClick}
				>
					{item.itemHeading}
				</button>
			</dt>
			<dd>
				<p
					id={`faq${index + 1}_desc`}
					data-qa="faq__desc"
					className={`faq__desc ${showDescription}`}
				>
					{item.itemContent}
				</p>
			</dd>
		</div>
	);
};

export default AccordionItem;
