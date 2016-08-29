var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="Site.ts"/>
var LandingSite = (function (_super) {
    __extends(LandingSite, _super);
    function LandingSite(p_shipCapacity, p_resourceCapacity, p_processPerDay, p_prices, p_id) {
        _super.call(this, p_shipCapacity, p_resourceCapacity, p_processPerDay, p_id);
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
    //Returns a list of fish that were not taken in and a price
    LandingSite.prototype.receiveFish = function (p_fish) {
        var price = 0;
        while (p_fish.length > 0 && this.m_resourceAtSite < this.m_resourceCapacity) {
            price += this.m_prices[p_fish.shift().getType()]; //OBS should be affected by age too
            this.m_resourceAtSite++;
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