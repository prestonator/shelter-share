// Components/VideoPlayer/VideoPlayer.js
"use client";
import React from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(
	() => import("react-player").then((mod) => mod.default),
	{
		ssr: false,
		loading: () => <div>Loading...</div>,
	}
);

const VideoPlayer = ({ url }) => {
	return (
		<div>
			<ReactPlayer url={url} width="var(--size-115)" height="var(--size-65)" />
		</div>
	);
};

export default VideoPlayer;
