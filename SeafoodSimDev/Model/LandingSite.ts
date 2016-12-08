/// <reference path="Site.ts"/>
class LandingSite extends Site {
    private m_prices: { [fishType: number]: number } = {};
    private m_untaxedValue: number = 0;

    public constructor(p_shipCapacity: number, p_resourceCapacity: number, p_processPerDay: number, p_prices: { [fishType: number]: number }, p_id: string, p_position: Point2) {
        super(p_shipCapacity, p_resourceCapacity, p_processPerDay, p_id, p_position);
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

    //Returns a price
    public receiveFish(p_fish: number[][]): number {
        var price: number = 0;

        var percentage: number = 1;
        //Count how much fish there is
        var noOfFish: number = 0;
        for (var i = 0; i < p_fish[FishType.cod].length; i++) {
            noOfFish += p_fish[FishType.cod][i];
        }
        for (var i = 0; i < p_fish[FishType.mackerel].length; i++) {
            noOfFish += p_fish[FishType.mackerel][i];
        }
        if (this.m_resourceCapacity < this.m_resourceAtSite + noOfFish) {
            // If landing site is not able to take all the fish it should take a percentage
            percentage = (this.m_resourceCapacity - this.m_resourceAtSite) / noOfFish;
        }
        //Receive cod
        for (var i = 0; i < p_fish[FishType.cod].length; i++) {
            var noOfReceivedFish: number = p_fish[FishType.cod][i] * percentage;
            p_fish[FishType.cod][i] -= noOfReceivedFish;
            price += this.m_prices[FishType.cod] * noOfReceivedFish;
            this.m_resourceAtSite += noOfReceivedFish;
        }
        
        //Receive mackarel
        for (var i = 0; i < p_fish[FishType.mackerel].length; i++) {
            var noOfReceivedFish: number = p_fish[FishType.mackerel][i] * percentage;
            p_fish[FishType.mackerel][i] -= noOfReceivedFish;
            price += this.m_prices[FishType.mackerel] * noOfReceivedFish;
            this.m_resourceAtSite += noOfReceivedFish;
        }

        this.m_untaxedValue += price;
        console.log("untax: " + this.m_untaxedValue + " recfish: " + this.m_resourceAtSite + " price: " + price);  
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