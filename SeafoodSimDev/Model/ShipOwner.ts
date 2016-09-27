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

    public constructor(p_government: Government, p_shipStartPosition: Point2, p_id: string, p_scenario: Scenario, p_balance?: number) {
        this.m_scenario = p_scenario;
        this.m_government = p_government;
        this.m_shipStartPosition = p_shipStartPosition;
        this.m_id = p_id;
        this.m_license = p_scenario.getShipOwnerLicense();
        this.m_shipPrice = p_scenario.getShipPrice();
        if (p_balance) {
            this.m_balance = p_balance;
        }
        else {
            this.m_balance = p_scenario.getShipOwnerStartBalance();
        }
        this.m_taxPayed = 0;
    }
    public getID(): string {
        return this.m_id;
    }
    public getShips(): Ship[] {
        return this.m_ships;
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
        this.m_balance += p_amount * (1 - this.m_government.getTaxingRate());
        this.m_taxPayed += p_amount * this.m_government.getTaxingRate();
    }

    public buyShip(): Ship{
        var ship: Ship = new Ship(this, this.m_scenario);
        this.m_ships.push(ship);
        this.financialTransaction(-this.m_shipPrice);
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