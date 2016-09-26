/// <reference path="School.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
class Cod extends School{
    private m_origin: Point2;

    public constructor(p_size: number, p_msy: number, p_position: Point2, p_scenario: Scenario, p_ages?: number[]) {
        super(p_size, p_msy, p_position, p_scenario);
        this.m_origin = p_position;
        this.m_maxAge = 8; // OBS Ship also uses this value. It is hardcoded there at the moment
        for (var i = 0; i < this.m_maxAge; i++) {
            this.m_ages.push(0);
        }
        if (!p_ages) {
            for (var i = 0; i < p_size; i++) {
                var age: number = Math.floor(Math.random() * this.m_maxAge);
                this.m_ages[age] += 1;
            }
        }
        else {
            this.m_ages = p_ages;
        }
        this.m_size = p_size;
    }

    public getOrigin(): Point2 {
        return this.m_origin;
    }
   
    //Move with a probability of 25% in a random direction
    public move(p_map: Map): void {
        //console.log("Original position: " + JSON.stringify(this.m_position));
        var move: boolean = Math.random() < 0.25;
        
        if (move) {
            
            var newPoint: Point2;
            //While loop runs until an ocean tile has been found
            do {
                var direction: number = Math.floor((Math.random() * 4));
                switch (direction) {
                    case 0:
                        if (this.m_position.row === p_map.getGrid().length - 1) {
                            newPoint = new Point2(0, this.m_position.col);
                        }
                        else {
                            newPoint = new Point2(this.m_position.row + 1, this.m_position.col)
                        }
                        break;
                    case 1:
                        if (this.m_position.col === 0) {
                            newPoint = new Point2(this.m_position.row, p_map.getGrid()[0].length - 1)
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
            } while (!(p_map.getTile(newPoint) instanceof Ocean) || newPoint.manhattanDistTo(this.m_origin) > this.m_scenario.getMovingRadius());
            this.m_position = newPoint;
        }
        //console.log("new postion: " + JSON.stringify(this.m_position));
    }


    protected recruit(p_map: Map): void {
        var tmp = (<Ocean>p_map.getTile(this.m_position)).getFishCapacity();
        var tmp2 = this.getSize();
        if ((<Ocean>p_map.getTile(this.m_position)).getFishCapacity() > p_map.getNoOfFishInTile(this.m_position)) {
            //Only recruit if the tile is not full
            var noOfNewFish: number = Math.floor(Math.random() * this.m_scenario.getRecrutingPercentage()*this.getSize());
            this.m_ages[0] = noOfNewFish;
            this.m_size += noOfNewFish;
            this.m_recruitTotal += noOfNewFish;
        }
    }

}