export const x = 1;

/**
 * import { Remotes, Updates, Mode } from "shared/libraries/remotes";


type folderType = { [name: string]: { [name: string]: number } };


const driveIndex = new Map<string | number, Drive>();

const eventReplicator = Remotes.Client.Get("DriveReplicator");
const driveConnector = Remotes.Client.Get("DriveConnector");

const receivedDriveEvent = (id: string | number, mode: Mode, updates: Updates) => {
	const drive = driveIndex.get(id) as Drive;
	// check for existence
	if (drive) {
		drive._update(mode, updates);
	} else {
		print(`drive '${id}' does not exist!`);
	}
};

eventReplicator.Connect((id, mode, updates) => {
	receivedDriveEvent(id as string | number, mode as Mode, updates as Updates);
});


export class Drive {
	folders = new Map<string, unknown>();
	callback: Callback;
	constructor(id: string | number, callback: Callback) {
		this.callback = callback;

		driveConnector.CallServerAsync(id).then().catch();
		driveIndex.set(id, this);
	}
	// handles updates
	_update(mode: Mode, changes: Updates) {
		// update Drive
		changes.forEach((items, folder) => {
			if (mode === "init") {
				this.folders.set(folder, new Map<string, number>());
			}
			const location = this.folders.get(folder) as Map<string, number>;
			items.forEach((count: unknown, item) => {
				if (mode === "set") {
					location.set(item, count as number);
					this.callback(item, location.get(item));
				}
			});
		});
	}
}

export { Updates, Mode };

 */
