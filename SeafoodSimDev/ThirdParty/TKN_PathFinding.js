/// <reference path="Point.ts"/>
var TKN_PathFinding = (function () {
    function TKN_PathFinding() {
        this.m_finder = new PF.AStarFinder();
        //this.m_navGrid = PF.Grid(navTable);
    }
    TKN_PathFinding.prototype.findPath = function (p_origin, p_dest) {
        var retPath;
        var ret = [];
        var backup = this.m_navGrid.clone();
        var t1 = p_origin.col;
        var t2 = this.m_navGrid.height - p_origin.row - 1;
        var t3 = p_dest.col;
        var t4 = this.m_navGrid.height - p_dest.row - 1;
        retPath = this.m_finder.findPath(p_origin.col, p_origin.row, p_dest.col, p_dest.row, this.m_navGrid);
        //ret = this.m_finder.findPath(this.m_navGrid.width - p_origin.col, p_origin.row, this.m_navGrid.width - p_dest.col, p_dest.row, this.m_navGrid);
        //ret = this.m_finder.findPath(this.m_navGrid.height - p_origin.row-1, p_origin.col, this.m_navGrid.height - p_dest.row-1, p_dest.col,  this.m_navGrid);
        //debugger;
        this.m_navGrid = backup;
        for (var i = 0; i < retPath.length; i++) {
            ret[i] = new Point2(retPath[i][1], retPath[i][0]);
        }
        return ret;
    };
    Object.defineProperty(TKN_PathFinding.prototype, "navTable", {
        set: function (p_nav) {
            this.m_navGrid = new PF.Grid(p_nav);
        },
        enumerable: true,
        configurable: true
    });
    return TKN_PathFinding;
}());
//# sourceMappingURL=TKN_PathFinding.js.map