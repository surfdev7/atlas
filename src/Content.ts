/**
 * @author surfdev7
 * @description Handles retrieval and loading of game content. Use the 'get' method to retrieve it. To add content, set it in the 'assets' dictionary from a json file.
 */

import { ContentProvider } from "@rbxts/services";

type assetTypes = "image" | "sound" | "texture" | "mesh";

type asset = {
	id: number;
	size?: number;
	extra?: { [key: string]: number | string };
};

export const assets: { [key: string]: { [key: string]: asset } } = { image: {}, sound: {}, texture: {}, mesh: {} };

export namespace content {
	/**
	 * @param contentName name of registered asset.
	 * @param contentType type of registered asset.
	 * @returns data for asset.
	 */
	export function get(contentName: string, contentType: assetTypes): asset {
		return assets[contentType][contentName];
	}

	// returns assets left to load
	export function getAssetsLeftToLoad(): number {
		return ContentProvider.RequestQueueSize;
	}

	/**
	 * @param assetName name of registered asset.
	 * @param assetType type of registered asset.
	 * @returns nothing
	 */
	export function preloadAsset(assetName: string, assetType: assetTypes) {
		const asset = get(assetName, assetType);
		if (assetType === "image") {
			const image = new Instance("Decal");
			image.Texture = `rbxassetid://${asset.id}`;
			ContentProvider.PreloadAsync([image]);
			return;
		} else if (assetType === "sound") {
			const sound = new Instance("Sound");
			sound.SoundId = `rbxassetid://${asset.id}`;
			ContentProvider.PreloadAsync([sound]);
			return;
		} else if (assetType === "texture") {
			const texture = new Instance("Texture");
			texture.Texture = `rbxassetid://${asset.id}`;
			ContentProvider.PreloadAsync([texture]);
			return;
		} else if (assetType === "mesh") {
			const mesh = new Instance("SpecialMesh");
			mesh.MeshId = `rbxassetid://${asset.id}`;
			ContentProvider.PreloadAsync([mesh]);
			return;
		}
	}
}
