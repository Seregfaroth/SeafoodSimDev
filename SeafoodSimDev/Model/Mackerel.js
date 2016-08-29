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
        this.m_maxAge = 18;
        this.m_typeNumber = 1;
        for (var i = 0; i < p_size; i++) {
            this.m_fish.push(new Fish(this.m_typeNumber, Math.floor(Math.random() * this.m_maxAge)));
        }
    }
    Mackerel.prototype.move = function () {
    };
    Mackerel.prototype.recruit = function () {
        var noOfNewFish = Math.random() * this.m_fish.length;
        for (var i = 0; i < noOfNewFish; i++) {
            this.m_fish.push(new Fish(this.m_typeNumber));
        }
    };
    return Mackerel;
}(School));
//# sourceMappingURL=Mackerel.js.map