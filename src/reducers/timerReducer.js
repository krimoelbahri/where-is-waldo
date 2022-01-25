function timerReducer(state, action) {
	if (action === "start") {
		let delta = Date.now() - state.start; // milliSeconds elapsed since start
		let output = new Date(delta).toISOString(); // To HH:MM:SS
		let seconds = Math.floor(delta / 1000); // converting to seconds
		return {
			...state,
			time: output,
			timeInSeconds: seconds,
		};
	}
}

export { timerReducer };
