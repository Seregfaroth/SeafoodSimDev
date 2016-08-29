/// <reference path="Point.ts"/>

class TKN_PathFinding {
    private m_finder;
    private m_navGrid;

    constructor() {
        this.m_finder = new PF.AStarFinder();
        //this.m_navGrid = PF.Grid(navTable);
    }
    findPath(p_origin: Point2, p_dest: Point2): Point2[] {
        var retPath: number[][];
        var ret: Point2[] = [];
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
    }
    set navTable(p_nav: number[][]) {
        this.m_navGrid = new PF.Grid(p_nav);
    }
}