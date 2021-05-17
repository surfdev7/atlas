/**
 * @author surfdev7
 * @description easily handles moving objects, with tween service implementation.
 */
import { RunService, TweenService } from "@rbxts/services";
import Signal from "@rbxts/signal";

/**
 * TODO
 * implement configs.
 */

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

interface executionConfig {
	timeDelay?: number;
	speedModifier?: number; // divisor for timeLength. ex. tL/2
	shouldYield?: boolean;
}

// location, execution time, state, style, direction.
type framesArrayType = frame;
export class Motion {
	frames = new Array<framesArrayType>();
	target: Part | Model;
	updater?: RBXScriptConnection;
	finished = new Signal<() => void>();
	currentFrame = 0;

	constructor(frames: Array<framesArrayType>, target: Part | Model) {
		this.frames = frames;
		this.target = target;
	}

	// updates target based on time
	_update(alpha: number) {
		// locate next frame
		const frame = this.frames[this.currentFrame];
		const clockTime = tick();

		if (this.currentFrame <= this.frames.size() - 1) {
			// declare target location
			let currentTargetLocation = new CFrame(0, 0, 0);
			if (this.target.ClassName === "Part") {
				currentTargetLocation = (this.target as Part).CFrame;
			} else if (this.target.ClassName === "Model") {
				currentTargetLocation = ((this.target as Model).PrimaryPart as Part).CFrame;
			}

			// init frame if idle.
			if (frame.state !== undefined) {
				// set time stamps
				frame.start = clockTime;
				frame.startLocation = currentTargetLocation;
				frame.state = "running";
			} else if (frame.state === "running") {
				// check if finished
				const frameFinishedTimeStamp = (frame.start as number) + frame.timeLength;
				if (clockTime > frameFinishedTimeStamp) {
					frame.state = "end";
				}
			} else if (frame.state === "end") {
				// cleanup
				this.currentFrame += 1;
			}
			const frameStart = frame.start as number;
			const delta = (clockTime - frameStart) / (frameStart + frame.timeLength - frameStart);
			const targetLocation = frame.startLocation?.Lerp(
				frame.goal,
				TweenService.GetValue(
					delta,
					frame.easing.style,
					(frame.easing.direction as Enum.EasingDirection) || Enum.EasingDirection.InOut,
				),
			);
			if (targetLocation) {
				if (this.target.ClassName === "Part") {
					(this.target as Part).CFrame = targetLocation;
				} else if (this.target.ClassName === "Model") {
					(this.target as Model).SetPrimaryPartCFrame(targetLocation);
				}
			}
			// set target cframe
		} else {
			// reset frame state
			this.frames.forEach((frame) => {
				frame.state = undefined;
			});
			// motion finished, clean up.
			this.currentFrame = 0;
			this.finished.Fire();
			this.updater?.Disconnect();
		}
	}

	run(config?: executionConfig) {
		// apply configs here.
		this.frames.forEach((frame) => {
			frame.timeLength = frame.timeLength / ((config?.speedModifier !== undefined && config?.speedModifier) || 1);
		});
		// TODO: use better alternative.
		wait((config?.timeDelay !== undefined && config?.timeDelay) || 0);
		if (RunService.IsServer()) {
			// server
			this.updater = RunService.Heartbeat.Connect((dt: number) => {
				this._update(dt);
			});
			if (config?.shouldYield) {
				this.finished.Wait();
			}
		} else {
			// client
			this.updater = RunService.RenderStepped.Connect((dt: number) => {
				this._update(dt);
			});
			if (config?.shouldYield) {
				this.finished.Wait();
			}
		}
	}

	// sets target
	setTarget(target: Part | Model) {
		this.target = target;
	}
}
