import React, { useEffect } from "react";
import { timerReducer } from "../reducers/timerReducer";

export default function Timer(props) {
	const { setTimeInSeconds } = props;
	const [state, dispatch] = React.useReducer(timerReducer, {
		start: Date.now(),
		time: "00:00:00",
		timeInSeconds: 0,
	});

	useEffect(() => {
		let interval = setInterval(() => dispatch("start"), 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	useEffect(() => {
		setTimeInSeconds(state.timeInSeconds);
	}, [setTimeInSeconds, state.timeInSeconds]);
	return <div>{state.time}</div>;
}
