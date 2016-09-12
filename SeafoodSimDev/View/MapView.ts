// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/model.d.ts"/>


class MapView {
    private m_renderer: TKN_Renderer;
    private m_camera: TKN_Camera;
    private m_scene: TKN_Scene;
    private m_geometry: TKN_Geometry;
    private m_mapTile: TKN_Mesh[][] = [];
    private m_redMaterial: TKN_material;
    private m_greenMaterial: TKN_material;
    private m_blueMaterial: TKN_material;
    private m_yellowMaterial: TKN_material;
    private m_whiteMaterial: TKN_material;
    private m_blackMaterial: TKN_material;
    private m_fishMat;
    private m_noM;
    private m_schools: TKN_Mesh[] = [];
    private m_ships: TKN_Mesh[] = [];
    
    constructor(p_map: Map) {
        console.log("The View construct");
        this.m_renderer = new TKN_Renderer("mainDiv", 800,800);
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
        this.m_yellowMaterial = new TKN_material(e_color.Yellow);
        this.m_whiteMaterial = new TKN_material(e_color.White);
        this.m_blackMaterial = new TKN_material(e_color.Black);
        this.m_fishMat = new TKN_material(8);
        this.m_noM = new TKN_material(1);

        //this.m_camera.position = new Point

        //create fishses
        var i = 0;
        for (var school of p_map.m_schools) {
            this.m_schools[i] = new TKN_Mesh(new TKN_Geometry(0.1), this.m_whiteMaterial);
            this.m_schools[i].position = new Point2(i, i);
            this.m_scene.add(this.m_schools[i]);
            i++;
        }

        //create ships
        i = 0;
        var ships: Ship[] = p_map.getShips();
        //debugger;
        for (var ship of ships) {
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
                if (p_map.getTile(pos) instanceof  Ocean) 
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
                //this.m_renderer.m_renderer.render(this.m_scene.m_scene, this.m_camera.m_camera);  
                //debugger;       
            }          
        }
        //add the canvas that will be rendered to the mainDiv
        //document.getElementById("mainDiv").appendChild(this.m_renderer.domElement);
        //document.body.insertBefore(this.m_renderer.domElement, document.body.firstChild);
        
    }
    reset(p_map: Map) {
        var ships: Ship[] = p_map.getShips();
    }
    updateMapView(p_map: Map) {
        //console.log("updating MapView");
        var i = 0;
        for (var sc of this.m_schools) {
            sc.position = new Point2(p_map.m_schools[i].getPosition().row, p_map.m_schools[i++].getPosition().col);
        }
        for(var i = 0; i < this.m_ships.length; i++) {
            this.m_ships[i].position = new Point2(p_map.getShips()[i].getPosition().row, p_map.getShips()[i].getPosition().col);
        }
        
        i = this.m_ships.length;
        while (this.m_ships.length < p_map.getShips().length) {
            this.m_ships[i] = new TKN_Mesh(new TKN_Geometry(0.3), this.m_blackMaterial);
            this.m_ships[i].position = p_map.getShips()[i].getPosition();
            this.m_scene.add(this.m_ships[i]);
            i++;
        }

        //debugger;
        this.m_renderer.render(this.m_camera, this.m_scene );
        //debugger;
    }
}