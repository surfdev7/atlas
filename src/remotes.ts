import { Definitions } from "@rbxts/net";

const Remotes = Definitions.Create({
	netMapConnector: Definitions.ServerFunction<
		(request: "connect" | "disconnect", netMapId: string | number) => boolean | Map<string, unknown>
	>(),
	netMapReplicator: Definitions.ServerToClientEvent<
		[request: string, netMapId: string | number, data: Map<string, unknown>]
	>(),
});

export = Remotes;

/**
 * [request: string, netMapId: string | number, data: Map<string, unknown>],
		[request: string, netMapId: string | number, data: Map<string, unknown>]
 */
