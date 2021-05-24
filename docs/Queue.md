# Queue

__Queue__ is an object allowing for __*sequential*__ processing of entries to avoid errors like *duplication*.

## Usage
```typescript
import { Queue } from "@rbxts/atlas";
```

## Example
```typescript
type entry = {
	player: Player;
	item: string;
};

// set up.
const sellQueue = new Queue<entry>((offer) => {
    const player = purchase.player;
    const item = purchase.item;
    // check if player has the item, otherwise do nothing.
});

// add purchase
function playerSelling(player, item) {
     sellQueue.push({
        player: player,
        item: item
    });
}

// processor
while (true) {
    if (sellQueue.size() > 0) {
        sellQueue.process();
    }
}
```

## Object Methods
- push

    > @param entry: T
- size

    > @returns number of entries remaining in queue.