﻿/// <reference path="Tile.ts"/>
class Site extends Tile {
    protected m_shipCapacity: number;
    protected m_resourceCapacity: number;
    protected m_resourceAtSite: number;
    protected m_processPerDay: number;
    protected m_runningCost: number;
    protected m_id: string;
    protected m_position: Point2;

    public constructor(p_shipCapacity: number, p_resourceCapacity: number, p_processPerDay: number, p_id: string, p_position: Point2) {
        super();
        this.m_shipCapacity = p_shipCapacity;
        this.m_resourceCapacity = p_resourceCapacity;
        this.m_processPerDay = p_processPerDay;
        this.m_runningCost = p_processPerDay * 0.005;
        this.m_id = p_id;
        this.m_position = p_position;
    }
    public getID(): string {
        return this.m_id;
    }
    public getShipCapacity(): number {
        return this.m_shipCapacity;
    }

    public getRunningCost(): number {
        return this.m_runningCost;
    }

    public getResourceCapacity(): number {
        return this.m_resourceCapacity;
    }

    public getResourceAtSite(): number {
        return this.m_resourceAtSite;
    }

    public getProcessPerDay(): number {
        return this.m_processPerDay;
    }
    public getPosition(): Point2 {
        return this.m_position;
    }
    
}