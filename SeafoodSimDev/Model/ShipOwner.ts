// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
class ShipOwner {
    private m_scenario: Scenario;
    private m_ships: Ship[] = [];
    private m_balance: number;
    private m_license: boolean;
    private m_shipPrice: number;
    private m_shipStartPosition: Point2;
    private m_id: string;
    private m_government: Government;
    private m_taxPayed: number;
    public m_shipBought: boolean = false;
    
    public m_revenueCod: number = 0;
    public m_revenueMac: number = 0;
    public m_revenueOther: number = 0;

    public constructor(p_government: Government, p_shipStartPosition: Point2, p_id: string, p_balance?: number) {
        this.m_scenario = Scenario.getInstance();
        this.m_government = p_government;
        this.m_shipStartPosition = p_shipStartPosition;
        this.m_id = p_id;
        this.m_license = this.m_scenario.getShipOwnerLicense();
        this.m_shipPrice = this.m_scenario.getShipPrice();
        if (p_balance) {
            this.m_balance = p_balance;
        }
        else {
            this.m_balance = this.m_scenario.getShipOwnerStartBalance();
        }
        this.m_taxPayed = 0;
    }
    public getID(): string {
        return this.m_id;
    }
    public getAllShips(): Ship[] {
       return this.m_ships;
    }
    public getCodShips(): Ship[] {
        var ships: Ship[] = [];
        this.m_ships.forEach(function (s: Ship) {
            if (s.getType() === FishType.cod) {
                ships.push(s);
            }
        });
        return ships;
    }
    public getMackerelShips(): Ship[] {
        var ships: Ship[] = [];
        this.m_ships.forEach(function (s: Ship) {
            if (s.getType() === FishType.mackerel) {
                ships.push(s);
            }
        });
        return ships;
    }

    public getBalance(): number {
        return this.m_balance;
    }

    public getShipStartPosition(): Point2 {
        return this.m_shipStartPosition;
    }
    public hasLicense(): boolean {
        return this.m_license;
    }

    public obtainLisence(): void {
        this.m_license = true;
    }

    public looseLisence(): void {
        this.m_license = false;
    }

    public getShipPrice(): number {
        return this.m_shipPrice;
    }
    public financialTransaction(p_amount: number): void {
        if (p_amount < 0) {
            this.m_balance += p_amount;
        }
        else {
            this.m_balance += p_amount * (1 - this.m_government.getTaxingRate());
            this.m_taxPayed += p_amount * this.m_government.getTaxingRate();
        }
    }

    public buyShip(p_fishType: FishType, p_position: Point2): Ship{
        var ship: Ship = new Ship(this, p_fishType, p_position);
        this.m_ships.push(ship);
        this.financialTransaction(-this.m_shipPrice);
        this.m_shipBought = true;
        return ship;
    }

    public sellShip(ship: Ship): void {
        if (this.m_ships.indexOf(ship) === -1) {
            throw new Error("Ship owner does not own this ship");
        }
        else {
            this.m_ships.splice(this.m_ships.indexOf(ship), 1);
            this.financialTransaction(this.m_shipPrice);
        }
    }
    public getTaxPayed() {
        return this.m_taxPayed;
    }    
}