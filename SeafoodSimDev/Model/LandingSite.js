var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="Site.ts"/>
var LandingSite = (function (_super) {
    __extends(LandingSite, _super);
    function LandingSite(p_shipCapacity, p_resourceCapacity, p_processPerDay, p_prices, p_id, p_position) {
        _super.call(this, p_shipCapacity, p_resourceCapacity, p_processPerDay, p_id, p_position);
        this.m_prices = {};
        this.m_untaxedValue = 0;
        this.m_resourceAtSite = 0;
        this.m_prices = p_prices;
    }
    LandingSite.prototype.getPrices = function () {
        return this.m_prices;
    };
    LandingSite.prototype.tax = function (p_taxingRate) {
        var tax = this.m_untaxedValue * p_taxingRate;
        this.m_untaxedValue = 0;
        return tax;
    };
    //Returns a price
    LandingSite.prototype.receiveFish = function (p_fish) {
        var price = 0;
        var percentage = 1;
        //Count how much fish there is
        var noOfFish = 0;
        for (var i = 0; i < p_fish[FishType.Cod].length; i++) {
            noOfFish += p_fish[FishType.Cod][i];
        }
        for (var i = 0; i < p_fish[FishType.Mackerel].length; i++) {
            noOfFish += p_fish[FishType.Mackerel][i];
        }
        if (this.m_resourceCapacity < this.m_resourceAtSite + noOfFish) {
            // If landing site is not able to take all the fish it should take a percentage
            percentage = (this.m_resourceCapacity - this.m_resourceAtSite) / noOfFish;
        }
        //Receive cod
        for (var i = 0; i < p_fish[FishType.Cod].length; i++) {
            var noOfReceivedFish = p_fish[FishType.Cod][i] * percentage;
            p_fish[FishType.Cod][i] -= noOfReceivedFish;
            price += this.m_prices[FishType.Cod] * noOfReceivedFish;
            this.m_resourceAtSite += noOfReceivedFish;
        }
        //Receive mackarel
        for (var i = 0; i < p_fish[FishType.Mackerel].length; i++) {
            var noOfReceivedFish = p_fish[FishType.Mackerel][i] * percentage;
            p_fish[FishType.Mackerel][i] -= noOfReceivedFish;
            price += this.m_prices[FishType.Mackerel] * noOfReceivedFish;
            this.m_resourceAtSite += noOfReceivedFish;
        }
        this.m_untaxedValue += price;
        return price;
    };
    LandingSite.prototype.processFish = function () {
        if (this.m_resourceAtSite !== 0) {
            this.m_resourceAtSite -= this.m_processPerDay;
            if (this.m_resourceAtSite < 0) {
                this.m_resourceAtSite = 0;
            }
        }
    };
    return LandingSite;
}(Site));
//# sourceMappingURL=LandingSite.js.map