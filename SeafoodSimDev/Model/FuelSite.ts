/// <reference path="Site.ts"/>
class FuelSite extends Site {
    private m_price: number;
    public constructor(p_shipCapacity: number, p_resourceCapacity: number, p_processPerDay: number, p_price: number, p_id: string, p_position: Point2) {
        super(p_shipCapacity, p_resourceCapacity, p_processPerDay, p_id, p_position);
        this.m_resourceAtSite = this.m_resourceCapacity;
        this.m_price = p_price;
    }

    public getPrice(): number {
        return this.m_price;
    }
    //Returns the actual amount of fuel that the site was able to provide 
    public provideFuel(p_desiredAmount: number): number {
        var amountProvided: number = Math.min(p_desiredAmount, this.m_resourceAtSite);
        this.m_resourceAtSite -= amountProvided;
        return amountProvided;
    }

    public restock(): void {
        this.m_resourceAtSite = this.m_resourceCapacity; //Always have max fuel
        /*
        if (this.m_resourceAtSite !== this.m_resourceCapacity) {
            this.m_resourceAtSite += this.m_processPerDay;
            if (this.m_resourceAtSite > this.m_resourceCapacity) {
                this.m_resourceAtSite = this.m_resourceCapacity;
            }
        }*/
    }

}