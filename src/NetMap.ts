/**
 * @author surfdev7
 * @description NetMap objects allow the replication of a Map from the server to the client. [atlas-NetMap] Use the 'Server' and 'Client' namespaces respectively.
 */

import ClientEvent, { ClientListenerEvent } from "@rbxts/net/out/client/ClientEvent";
import ClientFunction from "@rbxts/net/out/client/ClientFunction";
import { BidirectionalEventDeclaration, ServerToClientEventDeclaration } from "@rbxts/net/out/definitions/Types";
import ServerEvent, { ServerSenderEvent } from "@rbxts/net/out/server/ServerEvent";
import ServerFunction from "@rbxts/net/out/server/ServerFunction";
import { RunService } from "@rbxts/services";
import Signal from "@rbxts/signal";
import Remotes from "./remotes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapCache = new Map<string | number, NetMap.Server<any, any> | NetMap.Client<any, any>>();

let transmitter:
	| ServerSenderEvent<[request: string, netMapId: string | number, data: Map<string, unknown>]>
	| ClientListenerEvent<[request: string, netMapId: string | number, data: Map<string, unknown>]>;

let connector: ServerFunction | ClientFunction<[request: "connect" | "disconnect", netMapId: string | number], unknown>;
if (RunService.IsServer()) {
	connector = Remotes.Server.Create("netMapConnector");
	transmitter = Remotes.Server.Create("netMapReplicator");
	// handle client connections
	connector.SetCallback((player, request, netMapId) => {
		let map = mapCache.get(tostring(netMapId));
		if (map) {
			map = map as NetMap.Server<string, string>;
			// add listener logic
			if (request === "connect") {
				// connect listener
				return map.addListener(player);
			} else if (request === "disconnect") {
				// disconnect listener
				map.listeners.delete(player);
			}
		}
	});
} else {
	connector = Remotes.Client.Get("netMapConnector");
	transmitter = Remotes.Client.Get("netMapReplicator");

	transmitter.Connect((request, netMap, data) => {
		const _map = mapCache.get(tostring(netMap));
		(data as Map<string, unknown>).forEach((_packet, packetIndex) => {
			const map = _map as NetMap.Client<string, unknown>;
			const packet = _packet as string[];

			const key = packet[0];
			const value = packet[1];

			if (request === "set") {
				map._map.set(key, value);
				map.changed.Fire(key, value);
			} else if (request === "delete") {
				map._map.delete(key);
				map.changed.Fire(key, value);
			} else if (request === "clear") {
				map._map.clear();
			}
		});
	});
	// handle replications
}

// TODO implement public type arguments in class for stronger typings.
export namespace NetMap {
	export class Client<t1, t2> {
		_map = new Map();
		private mapId: string;

		public changed = new Signal<(key: t1, value: t2) => void>();
		public forEach = (i: Callback) => {
			return this._map.forEach(i);
		};
		public get = (k: t1) => {
			return this._map.get(k);
		};
		public has = (k: t1) => {
			return this._map.has(k);
		};
		public isEmpty = (k: t1) => {
			return this._map.isEmpty();
		};
		public size = (k: t1) => {
			return this._map.size();
		};

		destroy() {
			(connector as ClientFunction<
				[request: "connect" | "disconnect", netMapId: string | number],
				undefined
			>).CallServer("connect", this.mapId);
		}
		constructor(mapId: string) {
			this.mapId = mapId;
			mapCache.set(this.mapId, this);
			// constructing network connections
			(connector as ClientFunction<
				[request: "connect" | "disconnect", netMapId: string | number],
				undefined
			>).CallServer("connect", mapId);
		}
	}
	/**
	 * @description Server side NetMap
	 */
	// TODO fix type safety (not safe rn)
	export class Server<t1, t2> {
		listeners = new Map<Player, true>();
		private _map = new Map<t1, t2>();
		private check?: Callback;
		private mapId: string | number;
		public changed = new Signal<(key: t1, value: t2) => void>();

		// default map methods
		public forEach = (i: Callback) => {
			return this._map.forEach(i);
		};

		public get = (k: t1): t2 | undefined => {
			return this._map.get(k);
		};
		public has = (k: t1) => {
			return this._map.has(k);
		};
		public isEmpty = () => {
			return this._map.isEmpty();
		};
		public size = () => {
			return this._map.size();
		};

		constructor(mapId: string | number, check?: Callback) {
			this.check = check;
			this.mapId = mapId;
			mapCache.set(mapId, this);
		}

		private replicateEvent(event: string, data?: [[t1, t2?]?]) {
			(data as [[t1, t2]]).forEach((value, key) => {
				this.changed.Fire(value[0], value[1]);
			});
			this.listeners.forEach((_, listener) => {
				(transmitter as ServerEvent).SendToPlayer(listener, event, tostring(this.mapId), data);
			});
		}
		// internal, do NOT use!
		public addListener(listener: Player) {
			// eslint-disable-next-line roblox-ts/lua-truthiness
			if (this.check) {
				// eslint-disable-next-line roblox-ts/lua-truthiness
				if (this.check(listener)) {
					this.listeners.set(listener, true);
					return true;
				}
			} else {
				this.listeners.set(listener, true);
				return true;
			}
			return false;
		}

		set(key: t1, value: t2) {
			this._map.set(key, value);
			this.replicateEvent("set", [[key, value]]);
		}

		delete(key: t1) {
			this._map.delete(key);
			this.replicateEvent("delete", [[key]]);
		}

		clear() {
			this._map.clear();
			this.replicateEvent("clear", []);
		}

		destroy() {
			this.replicateEvent("destroy");
			return;
		}
	}
}
