// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
class Map {
    private m_config: Configuration;
    private m_grid: Tile[][] = [];
    public m_schools: School[] = [];
    private m_restrictions: Restrictions;
    private m_fishingPercentage: number = 0.01;
    private m_ships: Ship[] = [];
    private m_yield: number; //in fish, will be tonnes

    public constructor(p_mapType: number,p_size: number, p_noOfSchools: number, p_restrictions: Restrictions, p_config: Configuration) {
        this.m_config = p_config;
        this.m_restrictions = p_restrictions;
        this.generateMap(p_mapType, p_size);
        this.placeSchools(p_noOfSchools);
        this.m_yield = 0;
    }
    public run(): void {
        var map: Map = this;
        this.m_schools.forEach(function (s) {
            //s.move(map);
            //s.live(map);
        });
        this.getLandingSites().forEach(function (ls) {
            ls.processFish();
        });
        this.getFuelSites().forEach(function (fs) {
            fs.restock();
        });
    }
    public ageAndRecruit(): void {
        var map: Map = this;
        this.m_schools.forEach(function (s) {
            s.live(map);
        });
    }
    public getYield(): number {
        return this.m_yield;
    }
    public setYield(p_yield: number) {
        this.m_yield = p_yield;
    }

    public getRestrictions(): Restrictions {
        return this.m_restrictions;
    }

    public getGrid(): Tile[][] {
        return this.m_grid;
    }
    public getShips(): Ship[] {
        return this.m_ships;
    }
    public getSchools(): School[] {
        return this.m_schools;
    }
    private placeSchools(p_n) {
        var schoolsPlaced: number = 0;
        var placedInSamePlace: number = 0;
        var schoolsInOnePlace: number = Math.ceil(p_n / 5);
        var point: Point2 = new Point2(Math.floor(Math.random() * this.getMapHeight()), Math.floor(Math.random() * this.getMapWidth()));
        while (schoolsPlaced < p_n) {
            if (placedInSamePlace === schoolsInOnePlace) {
                placedInSamePlace = 0;
                point = new Point2(Math.floor(Math.random() * this.getMapHeight()), Math.floor(Math.random() * this.getMapWidth()));
            }
            placedInSamePlace++;
            var tile: Tile = this.getTile(point);
            if (tile instanceof Ocean) {
                this.addSchool(new Cod(5000, 4500, point, this.m_config));
                schoolsPlaced++;
            }
        }
    }
    public addSchool(p_school: School): void {
        this.m_schools.push(p_school);
    }
    
    private generateMap(p_mapType: number, p_size: number) {

        var prices: { [fishType: number]: number } = {}
        prices[FishType.Cod] = 10;
        prices[FishType.Mackerel] = 5;

        for (var i = 0; i < p_size; i++) {
            var row: Tile[] = [];
            for (var j = 0; j < p_size; j++) {
                row.push(new Ocean(100000, 1));
            }
            this.m_grid.push(row);
        }
        switch (p_mapType) {
            case 1: this.placeLandAndSites(p_size, prices); break;
            case 2: this.placeLandAndSites2(p_size, prices); break;
        }
    }

    private placeLandAndSites2(p_size: number, p_prices: { [fishType: number]: number }) {

        for (var c = Math.floor(p_size/2); c < p_size; c++) {
            for (var r = 0; r < p_size / 10 + Math.sin(c) * (p_size/20); r++) {
                this.m_grid[r][c] = new Land();
            }
        }
        if (p_size > 10) {
            this.m_grid[0][Math.floor(p_size / 2) - 1] = new LandingSite(2, 10000, 2000, p_prices, "landingSite1");
            this.m_grid[p_size - p_size/5][p_size-1] = new FuelSite(2, 10000, 20, 10, "fuelsite1");
        }

        for (var r = Math.floor(p_size / 5); r < p_size/ 2; r++) {
            for (var c = 0; c < p_size / 20 +r % 3; c++) {
                this.m_grid[r][c] = new Land();
            }
        }
        for (var r = Math.floor(p_size / 5); r < p_size / 2 + 1; r++) {
            for (var c = 0; c < p_size/20 + r % 2; c++) {
                this.m_grid[r][c] = new Land();
            }
        }

        for (var r = Math.floor(p_size / 3); r < p_size / 1.5; r++) {
            for (var c = Math.floor(p_size / 2); c < r; c++) {
                this.m_grid[r][c] = new Land();
            }
        }
        for (var r = Math.floor(p_size / 2); r < p_size / 1.5; r++) {
            for (var c = Math.floor(p_size/2); c > p_size/3; c--) {
                this.m_grid[r][c] = new Land();
            }
        }
        this.m_grid[Math.floor(p_size / 2)][Math.floor(p_size / 3)] = new FuelSite(2, 10000, 20, 10, "fuelsite0");

        for (var c = 0; c < Math.floor(p_size / 6); c++) {
            for (var r = Math.floor(p_size - p_size / 8); r < p_size-c; r++) {
                this.m_grid[r][c] = new Land();
            }
        }
        this.m_grid[r - 1][2] = new LandingSite(2, 10000, 2000, p_prices, "landingSite0");

        for (var c = p_size / 2; c < p_size; c++) {
            for (var r = p_size - 1; r > p_size - c/5; r--) {
                this.m_grid[r][c] = new Land();
            }
        }

    }
    private placeLandAndSites(p_size: number, p_prices: { [fishType: number]: number }) {

        for (var c = 0; c < p_size / 2; c++) {
            for (var r = 0; r < p_size / (4 * (c + 1)); r++) {
                this.m_grid[r][c] = new Land();
            }
        }

        for (var r = p_size - Math.floor(p_size / 5); r < p_size; r++) {
            for (var c = Math.floor(p_size / 2 + p_size / 5); c < r; c++) {
                this.m_grid[r][c] = new Land();
            }
        }
        this.m_grid[p_size - 1][Math.floor(p_size / 2 + p_size / 5) - 1] = new LandingSite(2, 10000, 2000, p_prices, "landingSite0");
        for (var r = Math.floor(p_size / 3); r < Math.floor(p_size / 2); r++) {
            for (var c = Math.floor(p_size / 3); c < Math.floor(p_size / 2); c++) {
                this.m_grid[r][c] = new Land();

            }
        }
        this.m_grid[Math.floor(p_size / 3)][Math.floor(p_size / 2)] = new LandingSite(2, 10000, 2000, p_prices, "landingSite1");
        this.m_grid[Math.floor(p_size / 2)][Math.floor(p_size / 3)] = new FuelSite(2, 60000, 50, 10, "fuelSite0");

        for (var r = Math.floor(p_size / 10) + 5; r < Math.floor(p_size / 6) + 5; r++) {
            this.m_grid[r][p_size - Math.floor(p_size / 8)] = new Land();
        }
        this.m_grid[Math.floor(p_size / 6) + 4][p_size - Math.floor(p_size / 8) - 1] = new FuelSite(2, 10000, 20, 10, "fuelsite1");


        for (var c = 0; c < p_size / 2; c++) {
            for (var r = p_size - 1; r > p_size - (p_size / (4 * (c + 1))); r--) {
                this.m_grid[r][c] = new Land();
            }
        }
    }

    public addShip(ship: Ship) {
        this.m_ships.push(ship);
    }

    public removeShip(ship: Ship): void {
        this.m_ships.splice(this.m_ships.indexOf(ship), 1);
    }

    public getNoOfShips(): number {
        return this.m_ships.length;
    }
    public getFishingPercentage(): number {
        return this.m_fishingPercentage;
    }

    /*public fish(p_position: Point2, p_capacity: number): Fish[] {
        var percentage: number = this.m_fishingPercentage;
        var noOfFishInTile: number = this.getNoOfFishInTile(p_position);
        var fish: Fish[] = [];
        if (p_capacity < noOfFishInTile * percentage) {
            //If the ship is not able to fish the full percentage
            percentage = p_capacity / noOfFishInTile;
        }
        var tmp = this.getSchoolsInTile(p_position);
        this.getSchoolsInTile(p_position).forEach(function (s) {
            s.shuffleFish(); //May not be necessary to shuffle every time
            var fishInSchool: Fish[] = s.getFish();
            //Take a percentage of fish out of the school and add it to the fish list
            var fishToAdd: Fish[] = fishInSchool.splice(0, fishInSchool.length * percentage);
            fish = fish.concat(fishToAdd);
        });
        return fish;
    }*/
    public getSchoolsInTile(p_position: Point2): School[] {
        var list: School[] = [];
        this.m_schools.forEach(function (s) {
           if (s.getPosition().compare( p_position) ){
                list.push(s);

            }
        });
        return list;
    }
    public getNoOfFishInTile(p_position: Point2): number {
        var num: number = 0;
        this.getSchoolsInTile(p_position).forEach(function (s) {
           num += s.getSize();
        });
        return num;
    }

    public getTile(p_position: Point2): Tile {
        return this.m_grid[p_position.row][p_position.col];
    }

    public getPathFindingMap(): number[][] {
        var map: number[][] = [];
        for (var row = 0; row < this.m_grid.length; row++) {
            var newRow: number[] = [];
            for (var col = 0; col < this.m_grid[0].length; col++) {
                if (this.m_grid[row][col] instanceof Land) {
                    newRow.push(1);
                } else {
                    newRow.push(0);
                }
            }
            map.push(newRow);
        }
        return map;
    }
    public getNoOfShipsInTile(p_point: Point2): number {
        var n: number = 0;
        this.m_ships.forEach(function (s) {
            if (s.getPosition().compare(p_point)) {
                n++;
            }
        });
        return n;
    }
    public getMapWidth(): number {
        return this.m_grid[0].length;
    }
    public getMapHeight(): number {
        return this.m_grid.length;
    }

    

    public getLandingSites(): LandingSite[] {
        var sites: LandingSite[] = [];
        for (var row = 0; row < this.getMapHeight(); row++) {
            for (var col = 0; col < this.getMapWidth(); col++) {
                if (this.m_grid[row][col] instanceof LandingSite) {
                    sites.push(<LandingSite>this.m_grid[row][col]);
                }
            }
        }
        return sites;
    }

    public getFuelSites(): FuelSite[] {
        var sites: FuelSite[] = [];
        for (var row = 0; row < this.getMapHeight(); row++) {
            for (var col = 0; col < this.getMapWidth(); col++) {
                if (this.m_grid[row][col] instanceof FuelSite) {
                    sites.push(<FuelSite>this.m_grid[row][col]);
                }
            }
        }
        return sites;
    }

    public emptyGrid(): void {
        for (var r = 0; r < this.getMapHeight(); r++) {
            for (var c = 0; c < this.getMapWidth(); c++) {
                this.m_grid[r][c] = new Ocean(100,1);
            }
        }
    }
}