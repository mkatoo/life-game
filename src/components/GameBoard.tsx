import type { Component } from "solid-js";
import { For } from "solid-js";

interface GameBoardProps {
	grid: boolean[][];
	onCellClick: (row: number, col: number) => void;
	isRunning: boolean;
}

const GameBoard: Component<GameBoardProps> = (props) => {
	const handleCellClick = (row: number, col: number) => {
		if (!props.isRunning) {
			props.onCellClick(row, col);
		}
	};

	return (
		<div class="game-board">
			<For each={props.grid}>
				{(row, rowIndex) => (
					<div class="game-row">
						<For each={row}>
							{(cell, colIndex) => (
								<div
									class={`game-cell ${cell ? "alive" : "dead"} ${props.isRunning ? "running" : ""}`}
									onClick={() => handleCellClick(rowIndex(), colIndex())}
								/>
							)}
						</For>
					</div>
				)}
			</For>
		</div>
	);
};

export default GameBoard;
