/**
 * @author: surfdev7
 * @description basic time utilities.
 */
import StringUtils from "@rbxts/string-utils";

const times = {
	utc: 0,
};

const timeZoneOffset = os.date("%z");
let offsetHours = tonumber(StringUtils.slice(timeZoneOffset, 2, 3)) as number;
const offsetNegative = StringUtils.slice(timeZoneOffset, 0, 1) === "-";
if (!offsetNegative) {
	offsetHours = offsetHours * -1;
}

// eslint-disable-next-line prettier/prettier
times.utc = (offsetHours * (60 * 60));

export namespace Time {
	export namespace timeZones {
		/**
		 * @returns UTC time.
		 */
		export function utc() {
			return tick() + times.utc;
		}
	}
}
