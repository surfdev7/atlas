/**
 * @author surfdev7
 * @description format utils for string and numbers.
 */

function pad(num: number, size: number) {
	let s = num + "";
	while (s.size() < size) s = "0" + s;
	return s;
}

namespace Format {
	/**
	 * @param seconds to calculate clock string.
	 * @returns clock string based on seconds. ex. clock(120) => "02:00"
	 */
	export function clock(seconds: number): string {
		const secondsLeft = seconds % 60;
		const minutesLeft = (seconds - secondsLeft) / 60;
		return `${pad(minutesLeft, 2)}:${pad(secondsLeft, 2)}`;
	}
	/**
	 * @param seconds to calculate clock string.
	 * @returns seconds formatted in hours and minutes. (use for larger numbers).
	 */
	export function stringClock(seconds: number): string {
		const hours = math.round((seconds - (seconds % 3600)) / 3600);
		const minutes = math.round((seconds % 3600) / 60);

		return `${pad(hours, 2)}h ${pad(minutes, 2)}m`;
	}
}

export { Format };
