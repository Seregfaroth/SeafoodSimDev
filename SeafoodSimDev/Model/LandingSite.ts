/// <reference path="Site.ts"/>
class LandingSite extends Site {
    private m_prices: { [fishType: number]: number } = {};
    private m_untaxedValue: number = 0;

    public constructor(p_shipCapacity: number, p_resourceCapacity: number, p_processPerDay: number, p_prices: { [fishType: number]: number }, p_id: string) {
        super(p_shipCapacity, p_resourceCapacity, p_processPerDay, p_id);
        this.m_resourceAtSite = 0;
        this.m_prices = p_prices;
        
    }
    public getPrices(): { [fishType: number]: number } {
        return this.m_prices;
    }

    public tax(p_taxingRate: number): number {
        var tax: number = this.m_untaxedValue * p_taxingRate;
        this.m_untaxedValue = 0;
        return tax;
    }

    //Returns a list of fish that were not taken in and a price
    public receiveFish(p_fish: Fish[]): number {
        var price: number = 0;
        while (p_fish.length > 0 && this.m_resourceAtSite < this.m_resourceCapacity ) {
            price += this.m_prices[p_fish.shift().getType()]; //OBS should be affected by age too
            this.m_resourceAtSite++;
        }
        this.m_untaxedValue += price;
        return price
    }

    public processFish(): void {
        if (this.m_resourceAtSite !== 0) {
            this.m_resourceAtSite -= this.m_processPerDay;
            if (this.m_resourceAtSite < 0) {
                this.m_resourceAtSite = 0;
            }
        }
    }
}