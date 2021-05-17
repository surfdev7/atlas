/**
 * @author surfdev7
 * @description basic utilities for Models.
 */

export namespace Model {
	/**
	 * @param model weld target.
	 * @param ignore list of parts to ignore when welding.
	 * @returns number of welds constructed.
	 */
	export function weldPartsToRoot(model: Model, ignore?: Map<Instance, boolean>): number {
		let welds = 0;
		if (model) {
			model?.GetDescendants().forEach((part) => {
				if (part.IsA("BasePart") && !ignore?.has(part)) {
					// weld
					welds += 1;
					const weld = new Instance("Weld");
					weld.Part0 = model.PrimaryPart;
					weld.Part1 = part as BasePart;
					weld.C0 = model.PrimaryPart?.CFrame.Inverse() as CFrame;
					weld.C1 = part.CFrame.Inverse();
					weld.Parent = model.PrimaryPart;
					weld.Name = `weld${part.Name}`;
				}
			});
		} else {
			warn("[weld-error]: param 'model' is nil.");
		}
		return welds;
	}

	/**
	 * @param model target.
	 * @param multiplier add multiplier, ex. 196.2 (gravity)
	 * @returns mass of model.
	 */
	export function calculateModelMass(model: Model, multiplier?: number): number {
		let mass = 0;
		model.GetDescendants().forEach((part) => {
			if (part.IsA("BasePart")) {
				mass += part.GetMass() * (multiplier as number) || 1;
			}
		});
		return mass;
	}
}
