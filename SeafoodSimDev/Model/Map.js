// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
var Map = (function () {
    function Map(p_mapType, p_size, p_noOfSchools, p_restrictions, p_config) {
        this.m_grid = [];
        this.m_schools = [];
        this.m_ships = [];
        this.m_config = p_config;
        this.m_restrictions = p_restrictions;
        this.generateMap(p_mapType, p_size, this.m_config.getPrices(), this.m_config.getOceanFishCapacity());
        this.placeSchools(p_noOfSchools, this.m_config.getSchoolSize(), this.m_config.getSchoolMsy(), this.m_config.getSchoolsInOnePlace());
        this.m_yield = 0;
        this.m_fishingPercentage = this.m_config.getFishingPercentage();
    }
    Map.prototype.run = function () {
        var map = this;
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
    };
    Map.prototype.ageAndRecruit = function () {
        var map = this;
        this.m_schools.forEach(function (s) {
            s.live(map);
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
    Map.prototype.getSchools = function () {
        return this.m_schools;
    };
    Map.prototype.placeSchools = function (p_n, p_schoolSize, p_schoolMsy, p_schoolsInOnePlace) {
        var schoolsPlaced = 0;
        var placedInSamePlace = 0;
        var point = new Point2(Math.floor(Math.random() * this.getMapHeight()), Math.floor(Math.random() * this.getMapWidth()));
        while (schoolsPlaced < p_n) {
            if (placedInSamePlace === p_schoolsInOnePlace) {
                placedInSamePlace = 0;
                point = new Point2(Math.floor(Math.random() * this.getMapHeight()), Math.floor(Math.random() * this.getMapWidth()));
            }
            placedInSamePlace++;
            var tile = this.getTile(point);
            if (tile instanceof Ocean) {
                this.addSchool(new Cod(p_schoolSize, p_schoolMsy, point, this.m_config));
                schoolsPlaced++;
            }
        }
    };
    Map.prototype.addSchool = function (p_school) {
        this.m_schools.push(p_school);
    };
    Map.prototype.generateMap = function (p_mapType, p_size, p_prices, p_oceanFishCapacity) {
        for (var i = 0; i < p_size; i++) {
            var row = [];
            for (var j = 0; j < p_size; j++) {
                row.push(new Ocean(p_oceanFishCapacity, 1));
            }
            this.m_grid.push(row);
        }
        switch (p_mapType) {
            case 1:
                this.placeLandAndSites(p_size, p_prices);
                break;
            case 2:
                this.placeLandAndSites2(p_size, p_prices);
                break;
        }
    };
    Map.prototype.placeLandAndSites2 = function (p_size, p_prices) {
        for (var c = Math.floor(p_size / 2); c < p_size; c++) {
            for (var r = 0; r < p_size / 10 + Math.sin(c) * (p_size / 20); r++) {
                this.m_grid[r][c] = new Land();
            }
        }
        if (p_size > 10) {
            this.m_grid[0][Math.floor(p_size / 2) - 1] = new LandingSite(2, 10000, 2000, p_prices, "landingSite1");
            this.m_grid[p_size - p_size / 5][p_size - 1] = new FuelSite(2, 10000, 20, 10, "fuelsite1");
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
        this.m_grid[Math.floor(p_size / 2)][Math.floor(p_size / 3)] = new FuelSite(2, 10000, 20, 10, "fuelsite0");
        for (var c = 0; c < Math.floor(p_size / 6); c++) {
            for (var r = Math.floor(p_size - p_size / 8); r < p_size - c; r++) {
                this.m_grid[r][c] = new Land();
            }
        }
        this.m_grid[r - 1][2] = new LandingSite(2, 10000, 2000, p_prices, "landingSite0");
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
    Map.prototype.getFishingPercentage = function () {
        return this.m_fishingPercentage;
    };
    Map.prototype.getSchoolsInTile = function (p_position) {
        var list = [];
        this.m_schools.forEach(function (s) {
            if (s.getPosition().compare(p_position)) {
                list.push(s);
            }
        });
        return list;
    };
    Map.prototype.getNoOfFishInTile = function (p_position) {
        var num = 0;
        this.getSchoolsInTile(p_position).forEach(function (s) {
            num += s.getSize();
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
    Map.prototype.emptyGrid = function () {
        for (var r = 0; r < this.getMapHeight(); r++) {
            for (var c = 0; c < this.getMapWidth(); c++) {
                this.m_grid[r][c] = new Ocean(100, 1);
            }
        }
    };
    return Map;
}());
//# sourceMappingURL=Map.js.map