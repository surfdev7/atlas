export namespace Conversions {
	export namespace distance {
		export function studsToMeters(studs: number) {
			return studs / 20;
		}
		export function studsToFeet(studs: number) {
			return studsToMeters(studs) * 3.28084;
		}

		export function studsToKilometers(studs: number) {
			return studsToMeters(studs) / 1000;
		}

		export function studsToMiles(studs: number) {
			return studsToMeters(studs) / 1609.34;
		}
	}

	export namespace speed {
		export function kmph(studsPerSecond: number) {
			const studsPerHour = studsPerSecond * 60 * 60;
			return distance.studsToKilometers(studsPerHour);
		}

		export function mph(studsPerSecond: number) {
			const studsPerHour = studsPerSecond * 60 * 60;
			return kmph(studsPerHour) * 0.621371;
		}
	}
}
