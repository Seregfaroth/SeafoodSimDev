var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="School.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
var Cod = (function (_super) {
    __extends(Cod, _super);
    function Cod(p_size, p_position) {
        _super.call(this, p_size, p_position);
        this.m_movingRadius = 3;
        this.m_origin = p_position;
        this.m_maxAge = 3;
        this.m_typeNumber = 0;
        for (var i = 0; i < p_size; i++) {
            this.m_fish.push(new Fish(this.m_typeNumber, Math.floor(Math.random() * this.m_maxAge)));
        }
    }
    //Move with a probability of 25% with a random direction
    Cod.prototype.move = function (p_map) {
        //console.log("Original position: " + JSON.stringify(this.m_position));
        var move = Math.random() < 0.25;
        if (move) {
            var newPoint;
            //While loop runs until an ocean tile has been found
            do {
                var direction = Math.floor((Math.random() * 4));
                switch (direction) {
                    case 0:
                        if (this.m_position.row === p_map.getGrid().length - 1) {
                            newPoint = new Point2(0, this.m_position.col);
                        }
                        else {
                            newPoint = new Point2(this.m_position.row + 1, this.m_position.col);
                        }
                        break;
                    case 1:
                        if (this.m_position.col === 0) {
                            newPoint = new Point2(this.m_position.row, p_map.getGrid()[0].length - 1);
                        }
                        else {
                            newPoint = new Point2(this.m_position.row, this.m_position.col - 1);
                        }
                        break;
                    case 2:
                        if (this.m_position.row === 0) {
                            newPoint = new Point2(p_map.getGrid().length - 1, this.m_position.col);
                        }
                        else {
                            newPoint = new Point2(this.m_position.row - 1, this.m_position.col);
                        }
                        break;
                    case 3:
                        if (this.m_position.col === p_map.getGrid()[0].length - 1) {
                            newPoint = new Point2(this.m_position.row, 0);
                        }
                        else {
                            newPoint = new Point2(this.m_position.row, this.m_position.col + 1);
                        }
                        break;
                    default:
                        break;
                }
            } while (!(p_map.getTile(newPoint) instanceof Ocean) || newPoint.manhattanDistTo(this.m_origin) > this.m_movingRadius);
            this.m_position = newPoint;
        }
        //console.log("new postion: " + JSON.stringify(this.m_position));
    };
    Cod.prototype.recruit = function (p_map) {
        if (p_map.getTile(this.m_position).getFishCapacity() > this.getSize()) {
            //Only recruit if the tile is not full
            var noOfNewFish = Math.random() * this.m_fish.length;
            for (var i = 0; i < noOfNewFish; i++) {
                this.m_fish.push(new Fish(this.m_typeNumber));
            }
        }
    };
    return Cod;
}(School));
//# sourceMappingURL=Cod.js.map