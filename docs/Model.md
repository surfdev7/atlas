# Model

The __Model__ module contains basic model utilities.

Basic examples include: welding a model to its root, calculating the mass of a model, etc...

## Usage
```typescript
import { Model } from "@rbxts/atlas";
```

## Methods
- weldPartsToRoot
    > @param model: Model

    > @param ignoreParts?: Map<Instance, boolean>
- calculateModelMass
    > @param model: Model

    > @param multiplier?: number (ex: 196.2 = *gravity*)

    > @returns mass of model