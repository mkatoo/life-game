import { countNeighbors, nextGeneration } from "../gameLogic";

describe("countNeighbors", () => {
	it("should return 0 for a cell with no neighbors", () => {
		const grid = [
			[false, false, false],
			[false, false, false],
			[false, false, false],
		];
		expect(countNeighbors(grid, 1, 1)).toBe(0);
	});

	it("should count all 8 neighbors correctly", () => {
		const grid = [
			[true, true, true],
			[true, false, true],
			[true, true, true],
		];
		expect(countNeighbors(grid, 1, 1)).toBe(8);
	});

	it("should count partial neighbors correctly", () => {
		const grid = [
			[true, false, false],
			[false, false, true],
			[false, true, false],
		];
		expect(countNeighbors(grid, 1, 1)).toBe(3);
	});

	it("should handle edge cases - top-left corner", () => {
		const grid = [
			[false, true, false],
			[true, false, false],
			[false, false, false],
		];
		expect(countNeighbors(grid, 0, 0)).toBe(2);
	});

	it("should handle edge cases - bottom-right corner", () => {
		const grid = [
			[false, false, false],
			[false, false, true],
			[false, true, false],
		];
		expect(countNeighbors(grid, 2, 2)).toBe(2);
	});

	it("should handle edge cases - top edge", () => {
		const grid = [
			[false, false, false],
			[true, true, true],
			[false, false, false],
		];
		expect(countNeighbors(grid, 0, 1)).toBe(3);
	});

	it("should handle edge cases - left edge", () => {
		const grid = [
			[false, true, false],
			[false, true, false],
			[false, true, false],
		];
		expect(countNeighbors(grid, 1, 0)).toBe(3);
	});
});

describe("nextGeneration", () => {
	it("should handle empty grid", () => {
		const grid = [
			[false, false, false],
			[false, false, false],
			[false, false, false],
		];
		const result = nextGeneration(grid);
		expect(result).toEqual(grid);
	});

	it("should handle single cell - dies (underpopulation)", () => {
		const grid = [
			[false, false, false],
			[false, true, false],
			[false, false, false],
		];
		const expected = [
			[false, false, false],
			[false, false, false],
			[false, false, false],
		];
		expect(nextGeneration(grid)).toEqual(expected);
	});

	it("should handle two cells - both die (underpopulation)", () => {
		const grid = [
			[false, false, false],
			[true, true, false],
			[false, false, false],
		];
		const expected = [
			[false, false, false],
			[false, false, false],
			[false, false, false],
		];
		expect(nextGeneration(grid)).toEqual(expected);
	});

	it("should handle blinker pattern (oscillator)", () => {
		// Vertical blinker
		const grid1 = [
			[false, false, false],
			[false, true, false],
			[false, true, false],
			[false, true, false],
			[false, false, false],
		];
		// Should become horizontal
		const expected1 = [
			[false, false, false],
			[false, false, false],
			[true, true, true],
			[false, false, false],
			[false, false, false],
		];
		expect(nextGeneration(grid1)).toEqual(expected1);

		// Horizontal blinker should become vertical
		const grid2 = [
			[false, false, false],
			[false, false, false],
			[true, true, true],
			[false, false, false],
			[false, false, false],
		];
		const expected2 = [
			[false, false, false],
			[false, true, false],
			[false, true, false],
			[false, true, false],
			[false, false, false],
		];
		expect(nextGeneration(grid2)).toEqual(expected2);
	});

	it("should handle block pattern (still life)", () => {
		const grid = [
			[false, false, false, false],
			[false, true, true, false],
			[false, true, true, false],
			[false, false, false, false],
		];
		// Block should remain unchanged
		expect(nextGeneration(grid)).toEqual(grid);
	});

	it("should handle beehive pattern (still life)", () => {
		const grid = [
			[false, false, false, false, false, false],
			[false, false, true, true, false, false],
			[false, true, false, false, true, false],
			[false, false, true, true, false, false],
			[false, false, false, false, false, false],
		];
		// Beehive should remain unchanged
		expect(nextGeneration(grid)).toEqual(grid);
	});

	it("should apply rule 1: underpopulation (< 2 neighbors)", () => {
		const grid = [
			[false, false, false],
			[false, true, false],
			[false, false, true],
		];
		const expected = [
			[false, false, false],
			[false, false, false],
			[false, false, false],
		];
		expect(nextGeneration(grid)).toEqual(expected);
	});

	it("should apply rule 2: survival (2-3 neighbors)", () => {
		const grid = [
			[true, true, false],
			[true, true, false],
			[false, false, false],
		];
		// All cells in 2x2 block have 3 neighbors, so they all survive
		expect(nextGeneration(grid)).toEqual(grid);
	});

	it("should apply rule 3: overpopulation (> 3 neighbors)", () => {
		const grid = [
			[true, true, true],
			[true, true, true],
			[true, true, true],
		];
		const expected = [
			[true, false, true],
			[false, false, false],
			[true, false, true],
		];
		expect(nextGeneration(grid)).toEqual(expected);
	});

	it("should apply rule 4: reproduction (exactly 3 neighbors)", () => {
		const grid = [
			[true, true, false],
			[true, false, false],
			[false, false, false],
		];
		const expected = [
			[true, true, false],
			[true, true, false],
			[false, false, false],
		];
		expect(nextGeneration(grid)).toEqual(expected);
	});

	it("should handle glider pattern (first step)", () => {
		const grid = [
			[false, true, false, false, false],
			[false, false, true, false, false],
			[true, true, true, false, false],
			[false, false, false, false, false],
			[false, false, false, false, false],
		];
		const expected = [
			[false, false, false, false, false],
			[true, false, true, false, false],
			[false, true, true, false, false],
			[false, true, false, false, false],
			[false, false, false, false, false],
		];
		expect(nextGeneration(grid)).toEqual(expected);
	});

	it("should preserve grid dimensions", () => {
		const grid = [
			[false, true],
			[true, false],
		];
		const result = nextGeneration(grid);
		expect(result).toHaveLength(2);
		expect(result[0]).toHaveLength(2);
		expect(result[1]).toHaveLength(2);
	});

	it("should not modify the original grid", () => {
		const grid = [
			[false, true, false],
			[false, true, false],
			[false, true, false],
		];
		const originalGrid = grid.map((row) => [...row]);
		nextGeneration(grid);
		expect(grid).toEqual(originalGrid);
	});
});
