"use client";
import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
	return (
		<div>
			<ReactPlayer url={url} width="var(--size-115)" height="var(--size-65)" />
		</div>
	);
};

export default VideoPlayer;
