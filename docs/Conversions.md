 # Conversions

The __Conversions__ module contains basic conversion methods.

Mostly done on the basis of *stud* to *metric* conversion.

## Usage
```typescript
import { Conversions } from "@rbxts/atlas";
```

## Methods
- distance
    - studsToMeters
        > @param studs: number
     
        > @returns studs converted to meters. (20 studs/meter)

    - studsToKilometers
        > @param studs: number
     
        > @returns studs converted to kilometers. (20,000 studs/meter)

    - studsToMiles
        > @param studs: number
     
        > @returns studs converted to miles. (32,186.8 studs/mile)

    - studsToFeet
        > @param studs: number
     
        > @returns studs converted to feet. (0.164042 feet/stud)

- speed
    - kmph
        > @param studsPerSecond: number
     
        > @returns studs/second converted into kmph

    - mph
        > @param studsPerSecond: number
     
        > @returns studs/second converted into mph