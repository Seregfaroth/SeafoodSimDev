var Point2 = (function () {
    function Point2(p_row, p_col) {
        this.row = p_row;
        this.col = p_col;
    }
    Point2.prototype.compare = function (p_com) {
        return this.row === p_com.row && this.col === p_com.col;
    };
    Point2.prototype.manhattanDistTo = function (p_point) {
        return Math.abs(this.row - p_point.row) + Math.abs(this.col - p_point.col);
    };
    return Point2;
}());
var Point3 = (function () {
    function Point3(p_row, p_col, p_depth) {
        this.row = p_row;
        this.col = p_col;
        this.depth = p_depth;
    }
    Point3.prototype.compare = function (p_com) {
        return this.row === p_com.row && this.col === p_com.col && this.depth === p_com.depth;
    };
    return Point3;
}());
//# sourceMappingURL=Point.js.map