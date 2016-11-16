/// <reference path="Tile.ts"/>
class Ocean extends Tile {
    //private m_carryingCapacity: number;
    private m_carryingCapacityC: CarryingCapacity;
    private m_shipCapacity: number;
    private m_tac: number;
    private m_fishingArea: boolean = false;
    private m_shipsInTile: number = 0;

    public constructor(p_carryingCapacity: CarryingCapacity, p_shipCapacity: number, p_fishingArea?: boolean) {
        super();
        this.m_carryingCapacityC = p_carryingCapacity;
        this.m_shipCapacity = p_shipCapacity;
        if (p_fishingArea) {
            this.m_fishingArea = p_fishingArea;
        }
    }

    public getCarryingCapacity(): CarryingCapacity {
        return this.m_carryingCapacityC;
    }

    public getCarryingCapacityBySpecies(p_name: string) {
        var ret;
    }

    public getShipCapacity(): number {
        return this.m_shipCapacity;
    }

    public getShipsInTile(): number {
        return this.m_shipsInTile;
    }

    public roomForAnotherShip(): boolean {
        return this.m_shipsInTile < this.m_shipCapacity;
    }
    public isFishingArea(): boolean {
        return this.m_fishingArea;
    }
    public claimTile(): void {
        if (this.m_shipsInTile >= this.m_shipCapacity) {
            throw "Error! Attempting to claim a tile that is full";
        }
        this.m_shipsInTile++;
    }
    public releaseTile(): void {
        if (this.m_shipsInTile < 1) {
            throw "Error! Trying to release tile, when there were no ships";
        }
        this.m_shipsInTile--;
    }
    
}