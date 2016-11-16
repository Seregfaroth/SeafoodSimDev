// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
class Map {    
    private m_scenario: Scenario;
    private m_grid: Tile[][] = []; // we could change this to a class called MapGrid
    public m_schools: School[] = [];
    private m_restrictions: Restrictions;
    private m_ships: Ship[] = [];
    private m_yield: number =0; //in fish, will be tonnes
    public m_natDeath: number=0; 
    public m_recruitCod: number = 0;
    public m_recruitMac: number = 0;
    public m_recruitOther: number = 0;
    

    public constructor(p_restrictions: Restrictions) {
        this.m_scenario = Scenario.getInstance();
        this.m_restrictions = p_restrictions;
        this.m_yield = 0;
        //this.generateExampleMap();
        this.setScenario(this.m_scenario);
    }
    public setScenario(p_scenario: Scenario): void {
        this.m_scenario = p_scenario;
    //    this.generateMap(this.m_scenario.getMapType(), this.m_scenario.getMapSize(), this.m_scenario.getPrices(), this.m_scenario.getOceanFishCapacity(), this.m_scenario.getNumberOfSchools(), this.m_scenario.getSchoolsInOnePlace());
        this.generateMap(this.m_scenario.getMapType(), this.m_scenario.getMapSize(), this.m_scenario.getPrices(), new CarryingCapacity([new FishGroup("group 1", ["cod", "mac"])], [100000]), this.m_scenario.getNumberOfSchools(), this.m_scenario.getSchoolsInOnePlace(), this.m_scenario.getOceanShipCapacity());
    }
    public run(): void {
        var map: Map = this;
        this.m_schools.forEach(function (s: School) {
            s.move(map);
        });
        this.getLandingSites().forEach(function (ls) {
            ls.processFish();
        });
        this.getFuelSites().forEach(function (fs) {
            fs.restock();
        });
    }
    private removeSchool(p_school: School): void {
        //this.m_recruit += p_school.getRecruitTotal();
        //this.m_natDeath += p_school.getNatDeathTotal();
        //this.m_schools.splice(this.m_schools.indexOf(p_school), 1);
    }
    private splitCodSchool(p_school: Cod): void {
        var newSchoolAges: number[] = [];
        var noOfFishInNewSchool: number = 0;
        for (var i = 0; i < p_school.getMaxAge(); i++) {
            //The number of fish that are splitting to a new school
            var noOfFish: number = Math.ceil(0.3 * p_school.getAges()[i]);
            newSchoolAges.push(noOfFish);
            noOfFishInNewSchool += noOfFish;
            //Remove from school
            p_school.getAges()[i] -= noOfFish;
        }
        this.m_schools.push(new Cod(noOfFishInNewSchool, p_school.getOrigin(), newSchoolAges));
    }
    public generateExampleMap() {
        for (var i = 0; i < 10; i++) {
            var row: Tile[] = [];
            for (var j = 0; j < 10; j++) {
                row.push(new Ocean(new CarryingCapacity([new FishGroup("grp1", ["fish"])], [100]), 1));
            }
            this.m_grid.push(row);
        }
        for (var c = 5; c < 10; c++) {
            for (var r = 0; r < c-5; r++) {
                this.m_grid[r][c] = new Land();
            }
        }
        for (var r = 3; r < 6; r++) {
            for (var c = 3; c < 6; c++) {
                this.m_grid[r][c] = new Land();
            }
        }
        for (var c = 0; c < 8; c++) {
            this.m_grid[9][c] = new Land();
        }
    }
    public ageAndRecruit(): void {
        var map: Map = this;
        this.m_schools.forEach(function (s) {
            s.ageAndRecruit(map);
            if (s.getSize() < map.m_scenario.getSchoolMinimum()) {
                
                map.removeSchool(s);
            }
            else if (s.getSize() > map.m_scenario.getSchoolMaximum()) {
                //map.splitCodSchool(s as Cod);
            }
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
    private placeSchools(p_n: number, p_schoolSize: number, p_schoolMsy: number, p_schoolsInOnePlace: number) {
        var schoolsPlaced: number = 0;
        var placedInSamePlace: number = 0;
        var schoolPoints: Point2[] = []; 
        schoolPoints[0] = new Point2(1, 0);
        var point: Point2 = schoolPoints[0]; // = new Point2(Math.floor(Math.random() * this.getMapHeight()), Math.floor(Math.random() * this.getMapWidth()));
        
        //schoolPoints[1] = new Point2(5, 12);
        //schoolPoints[2] = new Point2(7, 10);
        //schoolPoints[3] = new Point2(7, 13);
        //schoolPoints[4] = new Point2(9, 11);
        var i = 1;
        while (schoolsPlaced < p_n) {
            if (placedInSamePlace === p_schoolsInOnePlace) {
                placedInSamePlace = 0;
                //point = new Point2(Math.floor(Math.random() * this.getMapHeight()), Math.floor(Math.random() * this.getMapWidth()));
                point = schoolPoints[i++%5];
            }
            placedInSamePlace++;
            var tile: Tile = this.getTile(point);
            if (tile instanceof Ocean) {
                this.addSchool(new Cod(20000, point));
                this.addSchool(new Mackerel(10000, point));

                schoolsPlaced++;
            }
        }
    }
    public addSchool(p_school: School): void {
        this.m_schools.push(p_school);
    }

    public generateMap(p_mapType: number, p_size: number, p_prices: { [fishType: number]: number }, p_oceanFishCapacity: CarryingCapacity, p_noOfSchools: number, p_schoolsInOnePlace: number, p_oceanShipCapacity: number) {
        this.m_grid = [];
        for (var i = 0; i < p_size; i++) {
            var row: Tile[] = [];
            for (var j = 0; j < p_size; j++) {
                row.push(new Ocean(p_oceanFishCapacity, p_oceanShipCapacity));
            }
            this.m_grid.push(row);
        }
        switch (p_mapType) {
            case 0: this.tinyTest(p_size, p_prices); break;
            case 1: this.placeLandAndSites(p_size, p_prices); break;
            case 2: this.placeLandAndSites2(p_size, p_prices); break;
        }
        this.placeSchools(p_noOfSchools, this.m_scenario.getSchoolSize(), this.m_scenario.getSchoolMsy(), p_schoolsInOnePlace);
    }
    private tinyTest(p_size, p_prices) {
        this.m_grid[0][0] = new LandingSite(2, 100000, 20000, p_prices, "landingSite1", new Point2(0,0));
        this.m_grid[0][1] = new FuelSite(2, 10000, 20, this.m_scenario.getFuelsiteFuelPrize(), "fuelsite1", new Point2(0, 1));
    }

    private placeLandAndSites3(p_size: number, p_prices: { [fishType: number]: number }) {

        for (var r = Math.floor(p_size / 2); r < p_size; r++) {
            for (var c = 0; c < p_size / 10 + Math.sin(r) * (p_size / 20); c++) {
                this.m_grid[r][c] = new Land();
            }
        }
        if (p_size > 10) {
            this.m_grid[Math.floor(p_size / 2) - 1][0] = new LandingSite(2, 100000, 20000, p_prices, "landingSite1", new Point2(0, Math.floor(p_size / 2) - 1));
            var t = p_size - p_size / 5;
            var t3 = p_size - 1;
            this.m_grid[p_size - Math.floor(p_size / 5)][p_size - 1] = new FuelSite(2, 10000, 20, this.m_scenario.getFuelsiteFuelPrize(), "fuelsite1", new Point2(p_size - Math.floor(p_size / 5), p_size - 1));
        }

        for (var r = Math.floor(p_size / 5); r < p_size / 2; r++) {
            for (var c = 0; c < p_size / 20 + r % 3; c++) {
                this.m_grid[r][c] = new Land();
            }
        }
        for (var r = Math.floor(p_size / 5); r < p_size / 2 + 1; r++) {
            for (var c = 0; c < p_size / 20 + r % 2; c++) {
                this.m_grid[r][c] = new Land();
            }
        }

        for (var r = Math.floor(p_size / 3); r < p_size / 1.5; r++) {
            for (var c = Math.floor(p_size / 2); c < r; c++) {
                this.m_grid[r][c] = new Land();
            }
        }
        for (var r = Math.floor(p_size / 2); r < p_size / 1.5; r++) {
            for (var c = Math.floor(p_size / 2); c > p_size / 3; c--) {
                this.m_grid[r][c] = new Land();
            }
        }
        this.m_grid[Math.floor(p_size / 2)][Math.floor(p_size / 3)] = new FuelSite(2, 10000, 20, this.m_scenario.getFuelsiteFuelPrize(), "fuelsite0", new Point2(Math.floor(p_size / 2), Math.floor(p_size / 3)));

        for (var c = 0; c < Math.floor(p_size / 6); c++) {
            for (var r = Math.floor(p_size - p_size / 8); r < p_size - c; r++) {
                this.m_grid[r][c] = new Land();
            }
        }
        this.m_grid[r - 1][2] = new LandingSite(2, 100000, 20000, p_prices, "landingSite0", new Point2(r - 1, 2));

        for (var c = p_size / 2; c < p_size; c++) {
            for (var r = p_size - 1; r > p_size - c / 5; r--) {
                this.m_grid[r][c] = new Land();
            }
        }

    }

    private placeLandAndSites2(p_size: number, p_prices: { [fishType: number]: number }) {

        for (var c = Math.floor(p_size/2); c < p_size; c++) {
            for (var r = 0; r < p_size / 10 + Math.sin(c) * (p_size/20); r++) {
                this.m_grid[r][c] = new Land();
            }
        }
        if (p_size > 10) {
            this.m_grid[0][Math.floor(p_size / 2) - 1] = new LandingSite(2, 100000, 20000, p_prices, "landingSite1", new Point2(0, Math.floor(p_size / 2) - 1));
            var t = p_size - p_size / 5;
            var t3 = p_size - 1;
            this.m_grid[p_size - Math.floor(p_size / 5)][p_size - 1] = new FuelSite(2, 10000, 20, this.m_scenario.getFuelsiteFuelPrize(), "fuelsite1", new Point2(p_size - Math.floor(p_size / 5), p_size - 1));
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
        this.m_grid[Math.floor(p_size / 2)][Math.floor(p_size / 3)] = new FuelSite(2, 10000, 20, this.m_scenario.getFuelsiteFuelPrize(), "fuelsite0", new Point2(Math.floor(p_size / 2), Math.floor(p_size / 3)));

        for (var c = 0; c < Math.floor(p_size / 6); c++) {
            for (var r = Math.floor(p_size - p_size / 8); r < p_size-c; r++) {
                this.m_grid[r][c] = new Land();
            }
        }
        this.m_grid[r - 1][2] = new LandingSite(2, 100000, 20000, p_prices, "landingSite0", new Point2(r - 1,2));

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
        this.m_grid[p_size - 1][Math.floor(p_size / 2 + p_size / 5) - 1] = new LandingSite(2, 100000, 20000, p_prices, "landingSite0", new Point2(p_size - 1, Math.floor(p_size / 2 + p_size / 5) - 1));
        for (var r = Math.floor(p_size / 3); r < Math.floor(p_size / 2); r++) {
            for (var c = Math.floor(p_size / 3); c < Math.floor(p_size / 2); c++) {
                this.m_grid[r][c] = new Land();

            }
        }
        this.m_grid[Math.floor(p_size / 3)][Math.floor(p_size / 2)] = new LandingSite(2, 100000, 20000, p_prices, "landingSite1", new Point2(Math.floor(p_size / 3), Math.floor(p_size / 2)));
        this.m_grid[Math.floor(p_size / 2)][Math.floor(p_size / 3)] = new FuelSite(2, 60000, 50, this.m_scenario.getFuelsiteFuelPrize(), "fuelSite0", new Point2(Math.floor(p_size / 2), Math.floor(p_size / 3)));

        for (var r = Math.floor(p_size / 10) + 5; r < Math.floor(p_size / 6) + 5; r++) {
            this.m_grid[r][p_size - Math.floor(p_size / 8)] = new Land();
        }
        this.m_grid[Math.floor(p_size / 6) + 4][p_size - Math.floor(p_size / 8) - 1] = new FuelSite(2, 10000, 20, this.m_scenario.getFuelsiteFuelPrize(), "fuelsite1", new Point2(Math.floor(p_size / 6) + 4, p_size - Math.floor(p_size / 8) - 1));


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

    public emptyGrid(p_oceanShipCapacity: number): void {
        for (var r = 0; r < this.getMapHeight(); r++) {
            for (var c = 0; c < this.getMapWidth(); c++) {
                this.m_grid[r][c] = new Ocean(new CarryingCapacity([new FishGroup("grp1", ["fish"])], [100]), p_oceanShipCapacity);
            }
        }
    }
    getCarryingCapacityBySpecies(p_species: string, m_position: Point2): number {
        var ret;

        return ret;
    }
    public getBiomassOf(p_name: string, m_position: Point2): number {
        var ret;
        for (var school of this.m_schools) {
            if (school.getType() === p_name) {
                ret = school.getSize();
                break;
            }
            else
                ret = 0;
        }
        return ret;
    }
    //Calculate how big a fraction the type p_name is of the total biomass
    public getBiosmassFractionOf(p_name: string, m_position: Point2): number {
        var ret;
        var totalBiomass = 0;
        for (var school of this.m_schools) {
            totalBiomass += school.getSize();
        }
        if (totalBiomass !== 0) {
            ret = this.getBiomassOf(p_name, m_position) / totalBiomass;
        }
        else
            ret = 0;
        return ret;
    }
    public getSsbOf(p_name: string, p_position: Point2): number {
        var ret: number;

        return ret;
    }


}