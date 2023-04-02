"use client";
import React, { useState } from "react";
import AccordionItem from "./AccordionItem";
import "./Accordion.css";

const Accordion = ({ accordionItem }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const renderedQuestionsAnswers = accordionItem.map((item, index) => {
		const showDescription = index === activeIndex ? "show-description" : "";
		const fontWeightBold = index === activeIndex ? "font-weight-bold" : "";
		const ariaExpanded = index === activeIndex ? "true" : "false";
		return (
			<AccordionItem
				key={index}
				showDescription={showDescription}
				fontWeightBold={fontWeightBold}
				ariaExpanded={ariaExpanded}
				item={item}
				index={index}
				onClick={() => {
					setActiveIndex(index);
				}}
			/>
		);
	});
	return (
		<div className="faq">
			<dl className="faq__list">{renderedQuestionsAnswers}</dl>
		</div>
	);
};

export default Accordion;
