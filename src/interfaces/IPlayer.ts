export interface ISaveData {
	TownName: string;
	Villagers: string[];
	Museum: {
		Fishes: string[];
		Bugs: string[];
		Art: string[];
		Fossils: string[];
	};
	Catalogued: {
		Furniture: string[];
		Clothing: string[];
		Fishes: string[];
		Bugs: string[];
		Art: string[];
		Fossils: string[];
	};
}
export interface IPlayer {
	GoogleId: string;
	Name: string;
	NewLeaf: ISaveData;
	NewHorizons: ISaveData;
}
