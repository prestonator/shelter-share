"use client";


const scroll2El = (elID) => {
	window.scrollTo({
		top: document.getElementById(elID).offsetTop - 60,
		behavior: "smooth",
	});
};

export const onBtnClick = (e) => {
	e.preventDefault();
	const goto = e.target.getAttribute("goto");
	setTimeout(() => {
		scroll2El(goto);
	}, 100);
};
