# Format

## Description
__Format__ is a library used for formatting *numbers* into readable *strings*.

For example: *clocks*, *speed*, *distance*, etc...
## Usage
```typescript
import { Format } from "@rbxts/atlas";
```

## Methods
- smallClock (formats seconds into *minutes* and *seconds* remaining.
    > @param seconds: number

    > @param padding?: number

    > @returns small clock string. (ex: 130 => "02:10")
- largeClock (formats seconds into *hours* and *minutes* remaining.
    > @param seconds: number

    > @param padding?: number

    > @returns small clock string. (ex: 43200 => "12h 0m")
- meters (formats studs into *meters*. @ 20 studs/m )
    > @param studs: number

    > @param decimals?: number (ex: 3 => 3.257m, 8 => 3.25729364m)

    > @param noAbbreviation?: boolean (specifies 'm' or 'meter' ending)

    > @returns studs formatted in meters. (ex: 65 => "3.25m")
- kilometers (exactly the same as *meters* but with *km* and *kilometer* endings.
- kmph (exactly the same as *meters* but with *kmph* and *kilometer per hour* endings.
- mph (exactly the same as *meters* but with *mph* and *miles per hour* endings.