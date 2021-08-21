function timerReducer(state, action) {
	if (action === "start") {
		let delta = Date.now() - state.start; // milliSeconds elapsed since start
		let output = new Date(delta).toISOString().substr(11, 8); // To HH:MM:SS
		let seconds = Math.floor(delta / 1000); // converting to seconds
		return {
			...state,
			time: output,
			timeInSeconds: seconds,
		};
	}

	//setTimeInSeconds(seconds);
	//setTime(output);
}
let initialState = {
	start: Date.now(),
	time: "00:00:00",
	timeInSeconds: 0,
};
export { timerReducer, initialState };

/*
function timer() {
    let delta = Date.now() - start; // milliSeconds elapsed since start
    let output = new Date(delta).toISOString().substr(11, 8); // To HH:MM:SS
    let seconds = Math.floor(delta / 1000); // converting to seconds
    setTimeInSeconds(seconds);
    setTime(output);
}*/
