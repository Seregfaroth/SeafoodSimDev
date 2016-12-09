var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="Site.ts"/>
var FuelSite = (function (_super) {
    __extends(FuelSite, _super);
    function FuelSite(p_shipCapacity, p_resourceCapacity, p_processPerDay, p_price, p_id, p_position) {
        _super.call(this, p_shipCapacity, p_resourceCapacity, p_processPerDay, p_id, p_position);
        this.m_resourceAtSite = this.m_resourceCapacity;
        this.m_price = p_price;
    }
    FuelSite.prototype.getPrice = function () {
        return this.m_price;
    };
    //Returns the actual amount of fuel that the site was able to provide 
    FuelSite.prototype.provideFuel = function (p_desiredAmount) {
        var amountProvided = Math.min(p_desiredAmount, this.m_resourceAtSite);
        this.m_resourceAtSite -= amountProvided;
        return amountProvided;
    };
    FuelSite.prototype.restock = function () {
        this.m_resourceAtSite = this.m_resourceCapacity; //Always have max fuel
        /*
        if (this.m_resourceAtSite !== this.m_resourceCapacity) {
            this.m_resourceAtSite += this.m_processPerDay;
            if (this.m_resourceAtSite > this.m_resourceCapacity) {
                this.m_resourceAtSite = this.m_resourceCapacity;
            }
        }*/
    };
    return FuelSite;
}(Site));
//# sourceMappingURL=FuelSite.js.map