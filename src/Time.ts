/**
 * @author: surfdev7
 * @description basic time utilities.
 */

export namespace Time {
	export namespace timeZones {
		/**
		 * @returns UTC time.
		 */
		export function utc() {
			const hoursOffset = (tonumber(os.date("%z")) as number) / 100;
			return os.time() + hoursOffset * -math.pow(60, 2);
		}
	}
}
