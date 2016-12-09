// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/model.d.ts"/>
var MapView = (function () {
    function MapView(p_map) {
        var _this = this;
        this.m_mapTile = [];
        this.m_schools = [];
        this.m_ships = [];
        this.setMapSize = function () {
            var windowHeight = $(window).height();
            var windowWidth = $(window).width() * 0.75;
            var size = Math.min(windowHeight, windowWidth) * 0.9;
            _this.m_renderer.setSize(size, size);
            _this.m_renderer.render(_this.m_camera, _this.m_scene);
        };
        console.log("The View construct");
        this.m_renderer = new TKN_Renderer("mainDiv", 800, 800);
        this.m_camera = new TKN_Camera();
        //debugger;
        //this.m_camera.position = new Point3(p_map.getMapWidth() / 2.0, p_map.getMapHeight() / 2.0, 10);
        //this.m_camera.position = new Point3(p_map.getMapWidth(), p_map.getMapHeight(), 10);
        this.m_camera.position = new Point3(-p_map.getMapWidth() / 2.0 + 0.5, p_map.getMapHeight() / 2.0 - 0.5, p_map.getMapHeight());
        var t = p_map.getMapWidth() / 2.0;
        var t2 = p_map.getMapHeight() / 2.0;
        //this.m_camera.m_camera.position.z = 5;
        //this.m_camera.m_camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.m_scene = new TKN_Scene();
        this.m_geometry = new TKN_Geometry(0.90);
        this.m_redMaterial = new TKN_material(e_color.Red);
        this.m_greenMaterial = new TKN_material(e_color.Green);
        this.m_blueMaterial = new TKN_material(e_color.Blue);
        this.m_restrictedMaterial = new TKN_material(e_color.DarkBlue);
        this.m_yellowMaterial = new TKN_material(e_color.Yellow);
        this.m_whiteMaterial = new TKN_material(e_color.White);
        this.m_blackMaterial = new TKN_material(e_color.Black);
        this.m_fishMat = new TKN_material(8);
        this.m_noM = new TKN_material(1);
        this.setMapSize();
        //this.m_camera.position = new Point
        //create fish
        var i = 0;
        for (var _i = 0, _a = p_map.m_schools; _i < _a.length; _i++) {
            var school = _a[_i];
            this.m_schools[i] = new TKN_Mesh(new TKN_Geometry(0.1), this.m_whiteMaterial);
            this.m_schools[i].position = new Point2(i, i);
            this.m_scene.add(this.m_schools[i]);
            i++;
        }
        //create ships
        i = 0;
        var ships = p_map.getShips();
        //debugger;
        for (var _b = 0, ships_1 = ships; _b < ships_1.length; _b++) {
            var ship = ships_1[_b];
            this.m_ships[i] = new TKN_Mesh(new TKN_Geometry(0.3), this.m_blackMaterial);
            this.m_ships[i].position = new Point2(i, i);
            this.m_scene.add(this.m_ships[i]);
            i++;
        }
        //create map tiles
        for (var h = 0; h < p_map.getMapHeight(); h++) {
            //debugger;
            var rot = 0;
            this.m_mapTile[h] = [];
            for (var w = 0; w < p_map.getMapWidth(); w++) {
                var pos = new Point2(h, w);
                //console.log((p_map.getTile(pos) instanceof  Ocean) + " " + h + "  " + w);
                if (p_map.getTile(pos) instanceof Ocean)
                    this.m_mapTile[h][w] = new TKN_Mesh(this.m_geometry, this.m_blueMaterial);
                else if (p_map.getTile(pos) instanceof Land)
                    this.m_mapTile[h][w] = new TKN_Mesh(this.m_geometry, this.m_greenMaterial);
                else if (p_map.getTile(pos) instanceof LandingSite)
                    this.m_mapTile[h][w] = new TKN_Mesh(this.m_geometry, this.m_redMaterial);
                else if (p_map.getTile(pos) instanceof FuelSite)
                    this.m_mapTile[h][w] = new TKN_Mesh(this.m_geometry, this.m_yellowMaterial);
                else
                    this.m_mapTile[h][w] = new TKN_Mesh(this.m_geometry, this.m_noM);
                this.m_mapTile[h][w].position = new Point2(h, w);
                //this.m_mapTile[h][w].mesh.
                this.m_scene.add(this.m_mapTile[h][w]);
            }
        }
        //add the canvas that will be rendered to the mainDiv
        //document.getElementById("mainDiv").appendChild(this.m_renderer.domElement);
        //document.body.insertBefore(this.m_renderer.domElement, document.body.firstChild);
    }
    MapView.prototype.reset = function (p_map) {
        for (var i = 0; i < this.m_ships.length; i++) {
            this.m_scene.remove(this.m_ships[i]);
        }
        this.m_ships = [];
    };
    MapView.prototype.updateMap = function (p_map) {
        for (var row = 0; row < p_map.getMapHeight(); row++) {
            for (var col = 0; col < p_map.getMapWidth(); col++) {
                var pos = new Point2(row, col);
                var tile = p_map.getTile(pos);
                if (tile instanceof Ocean) {
                    this.m_scene.remove(this.m_mapTile[row][col]); //Remove old tile
                    if (p_map.getRestrictions().isRestricted(tile)) {
                        this.m_mapTile[row][col] = new TKN_Mesh(this.m_geometry, this.m_restrictedMaterial);
                    }
                    else {
                        this.m_mapTile[row][col] = new TKN_Mesh(this.m_geometry, this.m_blueMaterial);
                    }
                    this.m_mapTile[row][col].position = new Point2(row, col);
                    this.m_scene.add(this.m_mapTile[row][col]);
                }
            }
        }
        this.m_renderer.render(this.m_camera, this.m_scene); //Apply the changes
    };
    MapView.prototype.updateMapView = function (p_map) {
        //console.log("updating MapView");
        var i = 0;
        var t = this.m_schools.length;
        var tm = this.m_schools;
        var t4 = p_map.getCarryingCapacityBySpeciesTotal(Cod);
        var t5 = p_map.getCarryingCapacityBySpeciesTotal(Mackerel);
        while (this.m_schools.length > p_map.getSchools().length) {
            //If there are more schools in scene than in the map
            this.m_scene.remove(this.m_schools[0]);
            this.m_schools.splice(0, 1);
        }
        for (var _i = 0, _a = this.m_schools; _i < _a.length; _i++) {
            var sc = _a[_i];
            sc.position = new Point2(p_map.m_schools[i].getVisualPos().row, p_map.m_schools[i++].getVisualPos().col);
        }
        i = this.m_schools.length;
        while (this.m_schools.length < p_map.getSchools().length) {
            //If there are more schools in map than in the scene
            this.m_schools[i] = new TKN_Mesh(new TKN_Geometry(0.1), this.m_whiteMaterial);
            this.m_schools[i].position = p_map.getSchools()[i].getVisualPos();
            this.m_scene.add(this.m_schools[i]);
            i++;
        }
        while (this.m_ships.length > p_map.getShips().length) {
            //If there are more ships in scene than in the map
            this.m_scene.remove(this.m_ships[0]);
            this.m_ships.splice(0, 1);
        }
        for (var i = 0; i < this.m_ships.length; i++) {
            this.m_ships[i].position = new Point2(p_map.getShips()[i].getPosition().row, p_map.getShips()[i].getPosition().col);
        }
        i = this.m_ships.length;
        while (this.m_ships.length < p_map.getShips().length) {
            //If there are more ships in map than in scene
            this.m_ships[i] = new TKN_Mesh(new TKN_Geometry(0.3), this.m_blackMaterial);
            this.m_ships[i].position = p_map.getShips()[i].getPosition();
            this.m_scene.add(this.m_ships[i]);
            i++;
        }
        //debugger;
        this.m_renderer.render(this.m_camera, this.m_scene);
        //debugger;
    };
    return MapView;
}());
//# sourceMappingURL=MapView.js.map