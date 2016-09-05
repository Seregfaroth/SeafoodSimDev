/// <reference path = "Map.ts"/>
/// <reference path = "Government.ts"/>
/// <reference path = "ShipOwner.ts"/>
/// <reference path = "Restrictions.ts"/>

class Model {
    private m_map: Map;
    private m_shipOwners: ShipOwner[] = [];
    private m_goverment: Government;
    private m_ai: AI;
    private m_time: number = 0;

    constructor() {
        console.log("constructing model");
        var restrictions: Restrictions = new Restrictions();
        this.m_map = new Map(20, 20, restrictions);
        this.m_goverment = new Government(restrictions);
        this.m_ai = new AI();
        this.createShipOwner(new Point2(3, 3), 100000000000);
    }

    public run() {
        this.m_time++;
        //console.log("running model");
        this.m_map.run();
        for (var i = 0; i < this.m_shipOwners.length; i++) {
            this.m_ai.run(this.m_shipOwners[i], this.m_map);
        }
        this.m_goverment.getScore().updateScore(this.m_map, this.m_goverment, this.m_time);
    }

    public getShipOwners(): ShipOwner[] {
        return this.m_shipOwners;
    }

    public getMap(): Map {
        return this.m_map;
    }
    public getTime(): number {
        return this.m_time;
    }
    public getGovernment(): Government {
        return this.m_goverment;
    }
    public createShipOwner(p_startingPoint: Point2, p_balance?: number) {
        this.m_shipOwners.push(new ShipOwner(p_startingPoint, "shipOwner" + this.m_shipOwners.length, p_balance));
    }
    
    
}