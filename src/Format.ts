/**
 * @author surfdev7
 * @description format utils for strings and numbers.
 */

import Conversions from "./Conversions";

function pad(num: number, size: number) {
	let s = num + "";
	while (s.size() < size) s = "0" + s;
	return s;
}

namespace Format {
	/**
	 * returns padded number with decimals. ex: padDecimal(1.18687358, 2) => 1.19
	 * @param num to be padded.
	 * @param decimals decimal places to be added.
	 * @returns number with decimals padded.
	 */
	export function padDecimal(num: number, decimals: number) {
		const d = 10 ^ decimals;
		return math.round(num * d) / d;
	}
	/**
	 * @param seconds to calculate clock string.
	 * @param padding number of zeros to pad in front of clock string.
	 * @returns seconds formatted in minutes and seconds.
	 */
	export function smallClock(seconds: number, padding?: number): string {
		const secondsLeft = seconds % 60;
		const minutesLeft = (seconds - secondsLeft) / 60;
		// eslint-disable-next-line roblox-ts/lua-truthiness
		return `${pad(minutesLeft, padding || 2)}:${pad(secondsLeft, padding || 2)}`;
	}
	/**
	 * @param seconds to calculate clock string.
	 * @returns seconds formatted in hours and minutes. (use for larger numbers).
	 */
	export function largeClock(seconds: number): string {
		const hours = math.round((seconds - (seconds % 3600)) / 3600);
		const minutes = math.round((seconds % 3600) / 60);

		return `${pad(hours, 2)}h ${pad(minutes, 2)}m`;
	}
	/**
	 * returns studs formatted in meters.
	 * @param studs number to be converted.
	 * @param noAbbreviation if true, 'm' becomes 'meters'.
	 * @returns formatted string.
	 */
	export function meters(studs: number, decimals?: number, noAbbreviation?: boolean): string {
		// eslint-disable-next-line roblox-ts/lua-truthiness
		return `${padDecimal(Conversions.distance.studsToMeters(studs), decimals || 2)}${
			(noAbbreviation === undefined && "m") || "meters"
		})}`;
	}
	/**
	 * returns studs formatted in kilometers.
	 * @param studs number to be converted.
	 * @param noAbbreviation if true, 'km' becomes 'kilometers'.
	 * @returns formatted string.
	 */
	export function kilometers(studs: number, decimals?: number, noAbbreviation?: boolean): string {
		// eslint-disable-next-line roblox-ts/lua-truthiness
		return `${padDecimal(Conversions.distance.studsToKilometers(studs), decimals || 2)}${
			(noAbbreviation === undefined && "km") || "kilometers"
		})}`;
	}

	export function kmph(studsPerSecond: number, decimals?: number, noAbbreviation?: boolean): string {
		// eslint-disable-next-line roblox-ts/lua-truthiness
		return `${padDecimal(Conversions.speed.kmph(studsPerSecond), decimals || 2)}${
			(noAbbreviation === undefined && "kmph") || "kilometers per hour"
		})}`;
	}

	export function mph(studsPerSecond: number, decimals?: number, noAbbreviation?: boolean): string {
		// eslint-disable-next-line roblox-ts/lua-truthiness
		return `${padDecimal(Conversions.speed.mph(studsPerSecond), decimals || 2)}${
			(noAbbreviation === undefined && "mph") || "miles per hour"
		})}`;
	}
}

export { Format };
