import { Regions } from "shared/utility/Regions";
import { Remotes, serverMessageData } from "shared/data/remotes";
import { Chat, StarterGui } from "@rbxts/services";
import { platformChanges } from "./Platform";
import { signals } from "client/core/signals";
/**const map = Regions.compile({
	gridSize: 10,
	modelsOnly: true,
	ignoreTerrain: true,
	debug: true,
});
**/

Remotes.Client.Get("ServerChatMessage").Connect((data) => {
	StarterGui.SetCore("ChatMakeSystemMessage", data as serverMessageData);
});

const PlatformData = platformChanges();
PlatformData.changed.Connect((platform) => {
	print("Platform changed: ", platform);
	signals.updateClientPlatform.Fire(platform);
});

print("Platform inference: ", PlatformData.platform);
signals.updateClientPlatform.Fire(PlatformData.platform);
