import { HttpRequest } from "@rbxts/http-queue";
import { HttpService } from "@rbxts/services";
import { Drive } from "server/utility/Drive";
import { Users } from "shared/classes/Users";

import { eMath, Motion } from "@rbxts/atlas-test";

const test_drive = new Drive("shop", ["crates"]);

while (true) {
	wait(1);
	test_drive.add("common", 1, "crates");
	test_drive.get("common", "crates");
}

const test = new Motion(
	[
		{
			goal: new CFrame(0, 0, 0),
			timeLength: 2,
			easing: { style: Enum.EasingStyle.Circular },
		},
	],
	new Instance("Part"),
);
