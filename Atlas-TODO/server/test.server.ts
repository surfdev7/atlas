import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Motion } from "shared/classes/Motion";
import { Regions } from "shared/utility/Regions";
/**
import { Vehicle } from "server/classes/Vehicle";

const testCar = ReplicatedStorage.FindFirstChild("Car") as Model;
const testVehicle = new Vehicle.Server({
	rig: testCar,
	id: "test",
	color: new Color3(0.75, 0, 0),
	spawnLocation: (Workspace.FindFirstChild("SpawnLocation") as SpawnLocation).CFrame.mul(new CFrame(0, 100, 0)),
	suspension: {
		bounce: 500,
		suspension: 10,
		height: 2,
	},
	topSpeed: 10,
});
 */

/**
 * 
const ignore = new Map<Instance, boolean>();
//ignore.set(Workspace.FindFirstChild("something") as Part, true);

 Regions.compile({
	gridSize: 128,
	ignoreTerrain: true,
	ignoreModels: ignore,
});
 

const testMotion = new Motion(
	[
		{
			goal: new CFrame(0, 10.5, 25),
			timeLength: 2,
			easing: {
				style: Enum.EasingStyle.Back,
			},
		},
		{
			goal: new CFrame(25, 10.5, 25),
			timeLength: 2,
			easing: {
				style: Enum.EasingStyle.Back,
			},
		},
		{
			goal: new CFrame(25, 10.5, 0),
			timeLength: 2,
			easing: {
				style: Enum.EasingStyle.Back,
			},
		},
		{
			goal: new CFrame(0, 10.5, 0),
			timeLength: 2,
			easing: {
				style: Enum.EasingStyle.Back,
			},
		},
	],
	Workspace.FindFirstChild("TEST") as Part,
);

const testMotion2 = new Motion(
	[
		{
			goal: new CFrame(0, 20.5, 0),
			timeLength: 2,
			easing: {
				style: Enum.EasingStyle.Back,
			},
		},
		{
			goal: new CFrame(0, 10.5, 0),
			timeLength: 2,
			easing: {
				style: Enum.EasingStyle.Back,
			},
		},
		{
			goal: new CFrame(0, 10.5, 0),
			timeLength: 2,
			easing: {
				style: Enum.EasingStyle.Back,
			},
		},
	],
	Workspace.FindFirstChild("TEST") as Part,
);

testMotion2.finished.Connect(() => {
	print("motion finished.");
	testMotion2.run();
});

testMotion2.run({
	speedModifier: 2,
});

 */
