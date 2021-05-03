import Signal from "@rbxts/signal";
import { Remotes, Updates, Mode } from "shared/libraries/remotes";
/**
 * Setup
 */
const driveIndex = new Map<string | number, Drive>();

const eventReplicator = Remotes.Server.Create("DriveReplicator");
const driveConnector = Remotes.Server.Create("DriveConnector");

function createChanges(item: string, quantity: number, folder: string) {
	const changes = new Map<string, Map<string, number>>();
	changes.set(folder, new Map<string, number>());
	changes.get(folder)?.set(item, quantity);
	return changes;
}

/**
 * replicator and connector callbacks
 */
const playerConnectingToDrive = (id: string | number, player: Player) => {
	const drive = driveIndex.get(id) as Drive;
	// check for existence
	if (drive) {
		// check for existing listener
		if (drive.listeners.includes(player)) {
			return false;
		} else {
			// check for permission
			if (drive.canPass(player) as boolean) {
				drive.listeners.push(player);
				drive._initListener(player);
				return true;
			} else {
				return false;
			}
		}
	} else {
		return false;
	}
};

driveConnector.SetCallback((player, id) => {
	return playerConnectingToDrive(id, player);
});
/**
 * Drive object class
 */
export class Drive {
	canPass: Callback;
	listeners: Player[] = [];
	folders = new Map<string, Map<string, number | string>>();
	id: number | string;
	updated = new Signal<(changes: Map<string, Map<string, number>>) => void>();

	constructor(id: string | number, folders: string[], security?: void) {
		this.id = id;
		// security setup
		if (security) {
			this.canPass = security;
		} else {
			this.canPass = (player: Player): boolean => {
				return true;
			};
		}

		// folder setup
		for (const folder of folders) {
			this.folders.set(folder, new Map<string, number>());
		}

		driveIndex.set(id, this);
	}

	// replicates changes to listeners
	_replicateChanges(mode: Mode, changes: unknown) {
		this.updated.Fire(changes as Map<string, Map<string, number>>);
		eventReplicator.SendToPlayers(this.listeners, this.id, mode, changes);
	}

	_initListener(listener: Player) {
		eventReplicator.SendToPlayer(listener, this.id, "init", this.folders);
	}

	/**
	 * changes data in drive
	 */
	add(item: string, quantity: number, folder: string) {
		this._check(item, folder);
		this.folders.get(folder)?.set(item, (this.folders.get(folder)?.get(item) as number) + quantity);
		this._replicateChanges("set", createChanges(item, this.folders.get(folder)?.get(item) as number, folder));
	}
	remove(item: string, quantity: number, folder: string) {
		this._check(item, folder);
		this.add(item, quantity, folder);
	}
	set(item: string, quantity: number, folder: string) {
		this.folders.get(folder)?.set(item, quantity);
		this._replicateChanges("set", createChanges(item, this.folders.get(folder)?.get(item) as number, folder));
	}

	// creates missing items if needed.
	_check(item: string, folder: string) {
		if (!this.folders.get(folder)?.has(item)) {
			this.folders.get(folder)?.set(item, 0);
		}
	}

	get(item: string, folder: string): number {
		return (this.folders.get(folder)?.get(item) as number) || 0;
	}

	serialize() {
		const serialized = new Map();
		this.folders.forEach((name, folder) => {
			serialized.set(folder, new Map());
			name.forEach((value, item) => {
				(serialized.get(folder) as Map<string, number>).set(item, value as number);
			});
		});

		return serialized;
	}

	// removes all connections and deconstructs object
	destroy() {}
}
