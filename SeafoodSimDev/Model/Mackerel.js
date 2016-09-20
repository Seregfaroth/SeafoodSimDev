var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="School.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
var Mackerel = (function (_super) {
    __extends(Mackerel, _super);
    function Mackerel(p_size, p_msy, p_position, p_config) {
        _super.call(this, p_size, p_msy, p_position, p_config);
        this.m_maxAge = 18; // OBS Ship also uses this value. It is hardcoded there at the moment
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
        var tmp = p_map.getTile(this.m_position).getFishCapacity();
        var tmp2 = this.getSize();
        if (p_map.getTile(this.m_position).getFishCapacity() > this.getSize()) {
            //Only recruit if the tile is not full
            var noOfNewFish = Math.random() * this.getSize();
            this.m_ages[0] = noOfNewFish;
        }
    };
    return Mackerel;
}(School));
//# sourceMappingURL=Mackerel.js.map