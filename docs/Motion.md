# Motion

__Motion__ objects move *Parts* or *Models* to their targets on a frame, by frame basis.

These objects prove extremely versatile at accomplishing their task.

## Usage
```typescript
import { Motion } from "@rbxts/atlas";
```

## Example
A motion object takes in two *parameters*, a list of __frames__ and a __target__.

Each frame must have the following attributes:
```typescript
interface frame {
	goal: CFrame;
	startLocation?: CFrame;
	timeLength: number;
	state?: string;
	easing: {
		style: Enum.EasingStyle;
		direction?: Enum.EasingDirection;
	};
	start?: number;
}
```
The __target__ is the *Part* or *Model* you want to move.

In this example, we have a part moving up and down.
```typescript
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
	Workspace.FindFirstChild("Part") as Part, // Instance goes here.
);
```
Once we have our __Motion__ created, we can run it.
```typescript
testMotion.run();
```
If we want to make it infinite, we can add:
```typescript
testMotion.finished.Connect(() => {
    testMotion.run();
});
```
## Methods
- run
    > @param config?: config type to alter behavior.

- setTarget
    > @param target: Instance (changes *Part* or *Model* target)
- finished (*signal*)