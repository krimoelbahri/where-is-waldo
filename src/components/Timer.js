import React, { useEffect, useState } from "react";

export default function Timer(props) {
	const { setTimeInSeconds } = props;
	const [time, setTime] = useState("00:00:00");
	const start = Date.now();

	function timer() {
		var delta = Date.now() - start; // milliSeconds elapsed since start
		let output = new Date(delta).toISOString().substr(11, 8); // To HH:MM:SS
		let seconds = Math.floor(delta / 1000); // converting to seconds
		setTimeInSeconds(seconds);
		setTime(output);
	}
	useEffect(() => {
		let interval = setInterval(() => timer(), 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	return <div>{time}</div>;
}
