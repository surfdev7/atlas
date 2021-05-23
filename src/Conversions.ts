function studsToMeters(studs: number) {
	return studs / 20;
}
function studsToFeet(studs: number) {
	return studsToMeters(studs) * 3.28084;
}

function studsToKilometers(studs: number) {
	return studsToMeters(studs) * 1000;
}

function studsToMiles(studs: number) {
	return studsToMeters(studs) / 1609.34;
}

function kmph(studsPerSecond: number) {
	const studsPerHour = studsPerSecond * 60 * 60;
	return studsToKilometers(studsPerHour);
}

function mph(studsPerSecond: number) {
	const studsPerHour = studsPerSecond * 60 * 60;
	return kmph(studsPerHour) * 0.621371;
}

export = {
	distance: {
		studsToMeters,
		studsToKilometers,
		studsToMiles,
		studsToFeet,
	},
	speed: {
		kmph,
		mph,
	},
};
