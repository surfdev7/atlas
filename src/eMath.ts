/**
 * @author surfdev7
 * @description 'extra' Math utilities.
 */

function cloneList(list: number[]) {
	const newList: number[] = [];
	list.forEach((i) => {
		newList.push(i);
	});
	return newList;
}

export namespace eMath {
	/**
	 * @param a variable a in pythagorean theorem.
	 * @param b variable b in pythagorean theorem.
	 * @returns variable c in pythagorean theorem.
	 */
	export function pyth(a: number, b: number): number {
		return math.sqrt(math.pow(a, 2) + math.pow(b, 2));
	}

	/**
	 * @param a start number
	 * @param b finish number
	 * @param t progress (delta)
	 * @returns linear lerp from a to b at time t
	 */
	export function lerp(a: number, b: number, t: number): number {
		return a + t * (b - a);
	}

	/**
	 * @description Returns the sum of provided inputs.
	 * @param args inputs.
	 * @returns sum of inputs.
	 */
	export function sum(...args: number[]) {
		let sum = 0;
		args.forEach((x) => (sum += x));
		return sum;
	}

	const avg = statistics.mean; // same thing

	export namespace statistics {
		/**
		 * @description Returns mean of inputs.
		 * @param args inputs.
		 * @returns mean of inputs.
		 */
		export function mean(...args: number[]): number {
			let sum = 0;
			args.forEach((x) => (sum += x));
			return sum / args.size();
		}

		/**
		 * @description Returns median of inputs.
		 * @param args inputs.
		 * @returns median of inputs.
		 */
		export function median(...args: number[]): number {
			const numbers = cloneList(args);
			numbers.sort((a, b) => {
				return a > b;
			});

			const isEven = numbers.size() % 2 === 0;
			if (isEven) {
				const mid_up = math.round(numbers.size() / 2);
				// eslint-disable-next-line prettier/prettier
				const mid_down = math.round((numbers.size() / 2) - 0.5);
				return (numbers[mid_up] + numbers[mid_down]) / 2;
			} else {
				const mid = math.round(numbers.size() / 2);
				return numbers[mid];
			}
		}

		/**
		 * @description Returns mode of inputs.
		 * @param args inputs.
		 * @returns mode of inputs.
		 */
		export function mode(...args: number[]): number {
			const occurrences = new Map<number, number>();
			args.forEach((n) => {
				if (occurrences.has(n)) {
					occurrences.set(n, (occurrences.get(n) as number) + 1);
				} else {
					occurrences.set(n, 1);
				}
			});

			const sortedOccurrences: [number, number][] = [];
			occurrences.forEach((v, k) => {
				sortedOccurrences.push([k, v]);
			});
			sortedOccurrences.sort((a, b) => {
				return a[1] > b[1];
			});
			return sortedOccurrences[0][0];
		}
	}
	export namespace CFrame {}
}
