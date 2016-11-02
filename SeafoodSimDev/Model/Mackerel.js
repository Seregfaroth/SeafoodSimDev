var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="School.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
var Mackerel = (function (_super) {
    __extends(Mackerel, _super);
    function Mackerel(p_size, p_position) {
        _super.call(this, p_size, p_position);
        this.m_maxAge = 1100; // OBS Ship also uses this value. It is hardcoded there at the moment
        this.m_type = "mac";
        this.m_growthRate = 0.15;
        for (var i = 0; i < this.m_maxAge; i++) {
            this.m_ages.push(0);
        }
        for (var i = 0; i < p_size; i++) {
            var age = Math.floor(Math.random() * this.m_maxAge);
            this.m_ages[age] += 1;
        }
    }
    Mackerel.prototype.move = function () {
    };
    Mackerel.prototype.recruit = function (p_map) {
        var currentTile = p_map.getTile(this.m_position);
        var recruitment = 0;
        //for each of the fishGroups in CarryingCapacity get the carrying Capacity 
        for (var _i = 0, _a = currentTile.getCarryingCapacity().m_fishGroups; _i < _a.length; _i++) {
            var group = _a[_i];
            var cc = currentTile.getCarryingCapacity().getCapacityGroupNumbers(group.m_name);
            //var sbb = p_map.getSsbOf(this.getType(), this.m_position);      
            var ssb = this.getSsb();
            var fraction = p_map.getBiosmassFractionOf(this.getType(), this.m_position);
            recruitment += this.m_growthRate * ssb * (1 - ssb / (cc * fraction));
        }
        this.m_ages[0] = recruitment;
        this.m_size += recruitment;
        this.m_recruitTotal += recruitment;
        //var tmp = (<Ocean>p_map.getTile(this.m_position)).getCarryingCapacity();// getFishCapacity();
        //var tmp2 = this.getSize();
        //if ((<Ocean>p_map.getTile(this.m_position)).getFishCapacity() > this.getSize()) {
        //    //Only recruit if the tile is not full
        //    var noOfNewFish: number = Math.random() * this.getSize();
        //    this.m_ages[0] = noOfNewFish;
        //}
    };
    return Mackerel;
}(School));
//# sourceMappingURL=Mackerel.js.map