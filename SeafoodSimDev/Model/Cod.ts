/// <reference path="School.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
class Cod extends School{
    private m_movingRadius: number = 3;
    private m_origin: Point2;

    public constructor(p_size: number, p_position: Point2) {
        super(p_size, p_position);
        this.m_origin = p_position;
        this.m_maxAge = 3;
        this.m_typeNumber = 0;
        for (var i = 0; i < p_size; i++) {
            this.m_fish.push(new Fish(this.m_typeNumber, Math.floor(Math.random() * this.m_maxAge)));
        }
    }
   
    //Move with a probability of 25% with a random direction
    protected move(p_map: Map): void {
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
            } while (!(p_map.getTile(newPoint) instanceof Ocean) || newPoint.manhattanDistTo(this.m_origin) > this.m_movingRadius);
            this.m_position = newPoint;
        }
        //console.log("new postion: " + JSON.stringify(this.m_position));
    }


    protected recruit(p_map: Map): void {
        if ((<Ocean>p_map.getTile(this.m_position)).getFishCapacity() > this.getSize()) {
            //Only recruit if the tile is not full
            var tmp = this.m_fish.length;
            var noOfNewFish: number = Math.random() * this.m_fish.length*0.5;
            for (var i = 0; i < noOfNewFish; i++) {
                this.m_fish.push(new Fish(this.m_typeNumber));
            }
        }
    }

}