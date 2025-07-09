import type { Component } from "solid-js";

interface ControlsProps {
	isRunning: boolean;
	speed: number;
	onStart: () => void;
	onStop: () => void;
	onReset: () => void;
	onSpeedChange: (speed: number) => void;
}

const Controls: Component<ControlsProps> = (props) => {
	const handleSpeedChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		props.onSpeedChange(parseInt(target.value));
	};

	return (
		<div class="controls">
			<div class="control-buttons">
				<button
					type="button"
					class="control-btn start-btn"
					onClick={props.onStart}
					disabled={props.isRunning}
				>
					Start
				</button>

				<button
					type="button"
					class="control-btn stop-btn"
					onClick={props.onStop}
					disabled={!props.isRunning}
				>
					Stop
				</button>

				<button
					type="button"
					class="control-btn reset-btn"
					onClick={props.onReset}
					disabled={props.isRunning}
				>
					Reset
				</button>
			</div>

			<div class="speed-control">
				<label for="speed-slider">Speed:</label>
				<input
					id="speed-slider"
					type="range"
					min="50"
					max="1000"
					step="50"
					value={props.speed}
					onInput={handleSpeedChange}
					disabled={props.isRunning}
				/>
				<span class="speed-value">{props.speed}ms</span>
			</div>
		</div>
	);
};

export default Controls;
