/// <reference path="Tile.ts"/>
class Ocean extends Tile {
    private m_fishCapacity: number;
    private m_shipCapacity: number;
    private m_fishingArea: boolean = false;

    public constructor(p_fishCapacity: number, p_shipCapacity: number, p_fishingArea?: boolean) {
        super();
        this.m_fishCapacity = p_fishCapacity;
        this.m_shipCapacity = p_shipCapacity;
        if (p_fishingArea) {
            this.m_fishingArea = p_fishingArea;
        }
    }

    public getFishCapacity(): number {
        return this.m_fishCapacity;
    }

    public getShipCapacity(): number {
        return this.m_shipCapacity;
    }

    public isFishingArea(): boolean {
        return this.m_fishingArea;
    }
}