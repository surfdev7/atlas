# NetMap

### Description
__NetMaps__ are (nearly) the exact same as regular __Map__ objects, but with replication built in. Making it evermore easier to set up *Shops*, *Inventories*, *etc*... 
### Usage
```
import { NetMap } from "@rbxts/atlas";
```

### Basic Example  (shop)
> ### Server
```
import { NetMap } from "@rbxts/atlas";

const shop = new NetMap.Server<string, number>("shop");

// add more potions to shop.
while (true) {
    shop.set("potion", shop.get(potion) + 1);
    wait(1)
}
```

> ### Client
```
import { NetMap } from "@rbxts/atlas";

const shop = new NetMap.Client<string, number>("shop");

// prints the updated quantity of item(s) in the shop.
shop.changed.Connect((key, value) => {
    print(`there are now ${value} ${key}(s) in the shop.`);
});
```