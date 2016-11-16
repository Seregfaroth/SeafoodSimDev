// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
var Map = (function () {
    function Map(p_restrictions) {
        this.m_grid = []; // we could change this to a class called MapGrid
        this.m_schools = [];
        this.m_ships = [];
        this.m_yield = 0; //in fish, will be tonnes
        this.m_natDeath = 0;
        this.m_recruitCod = 0;
        this.m_recruitMac = 0;
        this.m_recruitOther = 0;
        this.m_scenario = Scenario.getInstance();
        this.m_restrictions = p_restrictions;
        this.m_yield = 0;
        //this.generateExampleMap();
        this.setScenario(this.m_scenario);
    }
    Map.prototype.setScenario = function (p_scenario) {
        this.m_scenario = p_scenario;
        //    this.generateMap(this.m_scenario.getMapType(), this.m_scenario.getMapSize(), this.m_scenario.getPrices(), this.m_scenario.getOceanFishCapacity(), this.m_scenario.getNumberOfSchools(), this.m_scenario.getSchoolsInOnePlace());
        this.generateMap(this.m_scenario.getMapType(), this.m_scenario.getMapSize(), this.m_scenario.getPrices(), new CarryingCapacity([new FishGroup("group 1", ["cod", "mac"])], [100000]), this.m_scenario.getNumberOfSchools(), this.m_scenario.getSchoolsInOnePlace(), this.m_scenario.getOceanShipCapacity());
    };
    Map.prototype.run = function () {
        var map = this;
        this.m_schools.forEach(function (s) {
            s.move(map);
        });
        this.getLandingSites().forEach(function (ls) {
            ls.processFish();
        });
        this.getFuelSites().forEach(function (fs) {
            fs.restock();
        });
    };
    Map.prototype.removeSchool = function (p_school) {
        //this.m_recruit += p_school.getRecruitTotal();
        //this.m_natDeath += p_school.getNatDeathTotal();
        //this.m_schools.splice(this.m_schools.indexOf(p_school), 1);
    };
    Map.prototype.splitCodSchool = function (p_school) {
        var newSchoolAges = [];
        var noOfFishInNewSchool = 0;
        for (var i = 0; i < p_school.getMaxAge(); i++) {
            //The number of fish that are splitting to a new school
            var noOfFish = Math.ceil(0.3 * p_school.getAges()[i]);
            newSchoolAges.push(noOfFish);
            noOfFishInNewSchool += noOfFish;
            //Remove from school
            p_school.getAges()[i] -= noOfFish;
        }
        this.m_schools.push(new Cod(noOfFishInNewSchool, p_school.getOrigin(), newSchoolAges));
    };
    Map.prototype.generateExampleMap = function () {
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                row.push(new Ocean(new CarryingCapacity([new FishGroup("grp1", ["fish"])], [100]), 1));
            }
            this.m_grid.push(row);
        }
        for (var c = 5; c < 10; c++) {
            for (var r = 0; r < c - 5; r++) {
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
    };
    Map.prototype.ageAndRecruit = function () {
        var map = this;
        this.m_schools.forEach(function (s) {
            s.ageAndRecruit(map);
            if (s.getSize() < map.m_scenario.getSchoolMinimum()) {
                map.removeSchool(s);
            }
            else if (s.getSize() > map.m_scenario.getSchoolMaximum()) {
            }
        });
    };
    Map.prototype.getYield = function () {
        return this.m_yield;
    };
    Map.prototype.setYield = function (p_yield) {
        this.m_yield = p_yield;
    };
    Map.prototype.getRestrictions = function () {
        return this.m_restrictions;
    };
    Map.prototype.getGrid = function () {
        return this.m_grid;
    };
    Map.prototype.getShips = function () {
        return this.m_ships;
    };
    Map.prototype.getCodShips = function () {
        var ships = [];
        this.m_ships.forEach(function (s) {
            if (s.getType() === FishType.cod) {
                ships.push(s);
            }
        });
        return ships;
    };
    Map.prototype.getMackerelShips = function () {
        var ships = [];
        this.m_ships.forEach(function (s) {
            if (s.getType() === FishType.mackerel) {
                ships.push(s);
            }
        });
        return ships;
    };
    Map.prototype.getSchools = function () {
        return this.m_schools;
    };
    Map.prototype.placeSchools = function (p_n, p_schoolSize, p_schoolMsy, p_schoolsInOnePlace) {
        var schoolsPlaced = 0;
        var placedInSamePlace = 0;
        var schoolPoints = [];
        schoolPoints[0] = new Point2(1, 0);
        var point = schoolPoints[0]; // = new Point2(Math.floor(Math.random() * this.getMapHeight()), Math.floor(Math.random() * this.getMapWidth()));
        //schoolPoints[1] = new Point2(5, 12);
        //schoolPoints[2] = new Point2(7, 10);
        //schoolPoints[3] = new Point2(7, 13);
        //schoolPoints[4] = new Point2(9, 11);
        var i = 1;
        while (schoolsPlaced < p_n) {
            if (placedInSamePlace === p_schoolsInOnePlace) {
                placedInSamePlace = 0;
                //point = new Point2(Math.floor(Math.random() * this.getMapHeight()), Math.floor(Math.random() * this.getMapWidth()));
                point = schoolPoints[i++ % 5];
            }
            placedInSamePlace++;
            var tile = this.getTile(point);
            if (tile instanceof Ocean) {
                this.addSchool(new Cod(20000, point));
                this.addSchool(new Mackerel(10000, point));
                schoolsPlaced++;
            }
        }
    };
    Map.prototype.addSchool = function (p_school) {
        this.m_schools.push(p_school);
    };
    Map.prototype.generateMap = function (p_mapType, p_size, p_prices, p_oceanFishCapacity, p_noOfSchools, p_schoolsInOnePlace, p_oceanShipCapacity) {
        this.m_grid = [];
        for (var i = 0; i < p_size; i++) {
            var row = [];
            for (var j = 0; j < p_size; j++) {
                row.push(new Ocean(p_oceanFishCapacity, p_oceanShipCapacity));
            }
            this.m_grid.push(row);
        }
        switch (p_mapType) {
            case 0:
                this.tinyTest(p_size, p_prices);
                break;
            case 1:
                this.placeLandAndSites(p_size, p_prices);
                break;
            case 2:
                this.placeLandAndSites2(p_size, p_prices);
                break;
        }
        this.placeSchools(p_noOfSchools, this.m_scenario.getSchoolSize(), this.m_scenario.getSchoolMsy(), p_schoolsInOnePlace);
    };
    Map.prototype.tinyTest = function (p_size, p_prices) {
        this.m_grid[0][0] = new LandingSite(2, 100000, 20000, p_prices, "landingSite1", new Point2(0, 0));
        this.m_grid[0][1] = new FuelSite(2, 10000, 20, this.m_scenario.getFuelsiteFuelPrize(), "fuelsite1", new Point2(0, 1));
    };
    Map.prototype.placeLandAndSites3 = function (p_size, p_prices) {
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
    };
    Map.prototype.placeLandAndSites2 = function (p_size, p_prices) {
        for (var c = Math.floor(p_size / 2); c < p_size; c++) {
            for (var r = 0; r < p_size / 10 + Math.sin(c) * (p_size / 20); r++) {
                this.m_grid[r][c] = new Land();
            }
        }
        if (p_size > 10) {
            this.m_grid[0][Math.floor(p_size / 2) - 1] = new LandingSite(2, 100000, 20000, p_prices, "landingSite1", new Point2(0, Math.floor(p_size / 2) - 1));
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
    };
    Map.prototype.placeLandAndSites = function (p_size, p_prices) {
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
    };
    Map.prototype.addShip = function (ship) {
        this.m_ships.push(ship);
    };
    Map.prototype.removeShip = function (ship) {
        this.m_ships.splice(this.m_ships.indexOf(ship), 1);
    };
    Map.prototype.getNoOfShips = function () {
        return this.m_ships.length;
    };
    Map.prototype.getSchoolsInTile = function (p_position) {
        var list = [];
        this.m_schools.forEach(function (s) {
            if (s.getOrigin().compare(p_position)) {
                list.push(s);
            }
        });
        return list;
    };
    Map.prototype.getNoOfCodInTile = function (p_position) {
        var num = 0;
        this.getSchoolsInTile(p_position).forEach(function (s) {
            if (s instanceof Cod) {
                num += s.getSize();
            }
        });
        return num;
    };
    Map.prototype.getNoOfMackerelInTile = function (p_position) {
        var num = 0;
        this.getSchoolsInTile(p_position).forEach(function (s) {
            if (s instanceof Mackerel) {
                num += s.getSize();
            }
        });
        return num;
    };
    Map.prototype.getTile = function (p_position) {
        return this.m_grid[p_position.row][p_position.col];
    };
    Map.prototype.getPathFindingMap = function () {
        var map = [];
        for (var row = 0; row < this.m_grid.length; row++) {
            var newRow = [];
            for (var col = 0; col < this.m_grid[0].length; col++) {
                if (this.m_grid[row][col] instanceof Land) {
                    newRow.push(1);
                }
                else {
                    newRow.push(0);
                }
            }
            map.push(newRow);
        }
        return map;
    };
    Map.prototype.getNoOfShipsInTile = function (p_point) {
        var n = 0;
        this.m_ships.forEach(function (s) {
            if (s.getPosition().compare(p_point)) {
                n++;
            }
        });
        return n;
    };
    Map.prototype.getMapWidth = function () {
        return this.m_grid[0].length;
    };
    Map.prototype.getMapHeight = function () {
        return this.m_grid.length;
    };
    Map.prototype.getLandingSites = function () {
        var sites = [];
        for (var row = 0; row < this.getMapHeight(); row++) {
            for (var col = 0; col < this.getMapWidth(); col++) {
                if (this.m_grid[row][col] instanceof LandingSite) {
                    sites.push(this.m_grid[row][col]);
                }
            }
        }
        return sites;
    };
    Map.prototype.getFuelSites = function () {
        var sites = [];
        for (var row = 0; row < this.getMapHeight(); row++) {
            for (var col = 0; col < this.getMapWidth(); col++) {
                if (this.m_grid[row][col] instanceof FuelSite) {
                    sites.push(this.m_grid[row][col]);
                }
            }
        }
        return sites;
    };
    Map.prototype.emptyGrid = function (p_oceanShipCapacity) {
        for (var r = 0; r < this.getMapHeight(); r++) {
            for (var c = 0; c < this.getMapWidth(); c++) {
                this.m_grid[r][c] = new Ocean(new CarryingCapacity([new FishGroup("grp1", ["fish"])], [100]), p_oceanShipCapacity);
            }
        }
    };
    Map.prototype.getCarryingCapacityBySpecies = function (p_species, m_position) {
        var ret;
        return ret;
    };
    Map.prototype.getBiomassOfinTile = function (p_type, p_position) {
        var ret;
        for (var _i = 0, _a = this.getSchoolsInTile(p_position); _i < _a.length; _i++) {
            var school = _a[_i];
            if (school instanceof p_type) {
                ret = school.getSize();
                break;
            }
            else
                ret = 0;
        }
        return ret;
    };
    //Calculate how big a fraction the type p_name is of the total biomass
    Map.prototype.getBiosmassFractionOf = function (p_type, p_position) {
        var ret;
        var totalBiomass = 0;
        for (var _i = 0, _a = this.getSchoolsInTile(p_position); _i < _a.length; _i++) {
            var school = _a[_i];
            totalBiomass += school.getSize();
        }
        if (totalBiomass !== 0) {
            ret = this.getBiomassOfinTile(p_type, p_position) / totalBiomass;
        }
        else
            ret = 0;
        return ret;
    };
    Map.prototype.getSsbOf = function (p_name, p_position) {
        var ret;
        return ret;
    };
    return Map;
}());
//# sourceMappingURL=Map.js.map