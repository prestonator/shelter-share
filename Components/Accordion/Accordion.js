import AccordionItem from "./AccordionItem";

const Accordion = ({ accordionItem, ...props }) => {
	return (
		<div className="accordion">
			{accordionItem.map((item) => {
				return (
					<AccordionItem key={item.id} title={item.itemHeading}>
						{item.itemContent}
					</AccordionItem>
				);
			})}
		</div>
	);
};

export default Accordion;
