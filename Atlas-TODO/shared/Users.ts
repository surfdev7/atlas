import ProfileService, { GetProfileStore } from "@rbxts/profileservice";
import { Profile, ProfileStore } from "@rbxts/profileservice/globals";
import { Players } from "@rbxts/services";
import Signal from "@rbxts/signal";
import { Drive } from "../../server/utility/Drive";

interface userData {}
const defaultProfileData = {
	inventory: new Map<string, Map<string, number>>(),
};

const dataStore = GetProfileStore("dev6", defaultProfileData);

/**
 * contains all user objects and their methods
 */
const userCache = new Map<string, user>();
namespace users {
	export function get(user: string | Player): user {
		if (type(user) === "string") {
			return userCache.get(user as string) as user;
		} else {
			return userCache.get((user as Player).Name) as user;
		}
	}
	let moduleInitialized = false;
	export function init() {
		if (!moduleInitialized) {
			moduleInitialized = true;
			/**
			 * creates new users on join
			 */
			Players.PlayerAdded.Connect((player: Player) => {
				// TODO implement moderation before data retrieval.
				const client = new user(player);
				userJoined.Fire(client);
			});

			Players.PlayerRemoving.Connect((player: Player) => {
				const client = users.get(player);
				client.dataProfile?.Release();
				userLeft.Fire(users.get(player));
			});
		}
	}
}

/**
 * replacements for playerAdded and playerRemoving
 */
const userJoined = new Signal<(user: user) => void>();
const userLeft = new Signal<(user: user) => void>();

/**
 * user class
 *
 * holds inventory, stats, etc.
 */
class user {
	inventory: Drive;
	player: Player;
	name: string;
	userId: number;
	dataProfile?: Profile<{}>;

	constructor(player: Player) {
		this.inventory = new Drive(player.UserId, ["settings", "items", "stats"]);
		this.player = player;
		this.name = player.Name;
		this.userId = player.UserId;

		userCache.set(player.Name, this);

		this.dataProfile = dataStore.LoadProfileAsync(tostring(this.player.UserId), "ForceLoad");

		// load data into inventory, from profile.
		if (this.dataProfile) {
			this.dataProfile.Reconcile();
			this.dataProfile.ListenToRelease(() => {
				player.Kick("Data loaded by other server.");
				userLeft.Fire(this);
			});
			if (player.IsDescendantOf(Players)) {
				// populate inventory
				const data = this.dataProfile.Data as typeof defaultProfileData;
				data.inventory.forEach((folder, name) => {
					folder.forEach((quantity, item) => {
						this.inventory.set(item, quantity, name);
					});
				});
			} else {
				// they left
				this.dataProfile.Release();
			}
		} else {
			player.Kick("Waiting for data to sync.. please join back later!");
		}
		// load data into profile, from inventory.
		this.inventory.updated.Connect((changes) => {
			changes.forEach((items, folder) => {
				const data = this.dataProfile?.Data as typeof defaultProfileData;
				if (!data.inventory.has(folder)) {
					data.inventory.set(folder, new Map<string, number>());
				}
				items.forEach((quantity, item) => {
					data.inventory.get(folder)?.set(item, quantity);
				});
			});
		});

		return this;
	}
}

// exports
export { users as Users, userJoined, userLeft };
