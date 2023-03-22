"use client";
import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
	return (
		<div>
			<ReactPlayer url={url} />
		</div>
	);
};

export default VideoPlayer;
