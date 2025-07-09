import type { Component } from "solid-js";
import { createSignal, onCleanup } from "solid-js";
import Controls from "./components/Controls";
import GameBoard from "./components/GameBoard";
import { nextGeneration } from "./utils/gameLogic";
import "./styles/App.css";

const GRID_SIZE = 30;
const INITIAL_SPEED = 200;

const App: Component = () => {
	const [grid, setGrid] = createSignal<boolean[][]>(
		Array(GRID_SIZE)
			.fill(null)
			.map(() => Array(GRID_SIZE).fill(false)),
	);
	const [isRunning, setIsRunning] = createSignal(false);
	const [speed, setSpeed] = createSignal(INITIAL_SPEED);
	const [intervalId, setIntervalId] = createSignal<NodeJS.Timeout | null>(null);

	const toggleCell = (row: number, col: number) => {
		if (isRunning()) return;

		setGrid((prev) => {
			const newGrid = prev.map((r) => [...r]);
			newGrid[row][col] = !newGrid[row][col];
			return newGrid;
		});
	};

	const startSimulation = () => {
		if (isRunning()) return;

		setIsRunning(true);
		const id = setInterval(() => {
			setGrid((prev) => nextGeneration(prev));
		}, speed());
		setIntervalId(id);
	};

	const stopSimulation = () => {
		setIsRunning(false);
		const id = intervalId();
		if (id) {
			clearInterval(id);
			setIntervalId(null);
		}
	};

	const resetGrid = () => {
		stopSimulation();
		setGrid(
			Array(GRID_SIZE)
				.fill(null)
				.map(() => Array(GRID_SIZE).fill(false)),
		);
	};

	const updateSpeed = (newSpeed: number) => {
		setSpeed(newSpeed);
		if (isRunning()) {
			stopSimulation();
			startSimulation();
		}
	};

	onCleanup(() => {
		stopSimulation();
	});

	return (
		<div class="app">
			<header class="app-header">
				<h1>Conway's Game of Life</h1>
				<p>
					Click cells to toggle them, then press Start to begin the simulation
				</p>
			</header>

			<main class="app-main">
				<GameBoard
					grid={grid()}
					onCellClick={toggleCell}
					isRunning={isRunning()}
				/>

				<Controls
					isRunning={isRunning()}
					speed={speed()}
					onStart={startSimulation}
					onStop={stopSimulation}
					onReset={resetGrid}
					onSpeedChange={updateSpeed}
				/>
			</main>
		</div>
	);
};

export default App;
