/// <reference path = "Declarations/three.d.ts"/>
//

class TKN_Scene {
    private m_scene: THREE.Scene;
    //private m_scene: any;
    constructor() {
        console.log("Test1 construct");
        this.m_scene = new THREE.Scene();
        //this.m_scene = new pc.Application();
    }
    get scene(): THREE.Scene {
        return this.m_scene;
    }
    add(p_mesh: TKN_Mesh) {
        this.m_scene.add(p_mesh.mesh);
    }
}


class TKN_Camera {
    private m_camera: THREE.Camera;
    private m_position: Point3;
    constructor() {
        this.m_camera = new THREE.PerspectiveCamera(60, 1, 0.3, 1000);
        this.m_camera.position.z = 10;
    }
    get position(): Point3 {
        return this.m_position;
    }
    set position(p_pos: Point3) {
        this.m_position = p_pos;
        this.m_camera.position.x = p_pos.col;
        this.m_camera.position.y = p_pos.row;
        this.m_camera.position.z = p_pos.depth;
    }
    get camera(): THREE.Camera {
        return this.m_camera;
    }
    lookAt(p_point: Point3) {
        this.m_camera.lookAt(new THREE.Vector3(p_point.col, p_point.row, p_point.depth));
    }
}

class TKN_Renderer {
    private m_renderer: THREE.WebGLRenderer;
    constructor(p_div: string, p_width: number, p_height: number) {
        console.log("Construct TKN_Rendeerer");
        this.m_renderer = new THREE.WebGLRenderer();
        this.m_renderer.setSize(p_width, p_height);
        //document.getElementById(p_div).appendChild(this.m_renderer.domElement);
        document.body.insertBefore(this.m_renderer.domElement, document.body.lastChild);
        
    }

    render(p_cam: TKN_Camera, p_scene: TKN_Scene) {
        this.m_renderer.render(p_scene.scene, p_cam.camera);
    }
    get domElement(): any {
        return this.m_renderer.domElement;
    }
}

class TKN_Geometry {
    public m_geometry: THREE.Geometry;
    constructor(p_size: number = 0.8) {
        //this.m_geometry = new THREE.SphereGeometry(1, 24, 24);
        this.m_geometry = new THREE.PlaneGeometry(p_size, p_size);
    }
    get geometry(): THREE.Geometry {
        return this.m_geometry;
    }
}
enum e_color { Green, Blue, Red, Yellow, White, Black }; 

class TKN_material {
    private m_material: THREE.MeshBasicMaterial;
    constructor(p_color: e_color) {
        this.m_material = new THREE.MeshBasicMaterial();
        switch (p_color) {            
            case e_color.Green: this.m_material.color.setHex(0x00ff00); break;
            case e_color.Blue: this.m_material.color.setHex(0x0000ff); break;
            case e_color.Red: this.m_material.color.setHex(0xff0000); break;
            case e_color.Yellow: this.m_material.color.setHex(0xffff00); break;
            case e_color.White: this.m_material.color.setHex(0xffffff); break;
            case e_color.Black: this.m_material.color.setHex(0x000000); break;
            default: this.m_material.color.setHex(0xff00ff); break;
        }
    }
    get material(): THREE.Material {
        return this.m_material;
    }
}

class TKN_Mesh {
    private m_mesh: THREE.Mesh;
    private m_position: Point2; 
    private m_geometry: TKN_Geometry;
    private m_material: TKN_material;
    constructor(p_geometry: TKN_Geometry, p_material: TKN_material) {
        this.m_geometry = p_geometry;
        this.m_material = p_material;
        this.m_mesh = new THREE.Mesh(p_geometry.geometry, p_material.material);
        this.m_position = new Point2(0,0);
    }
    set position(p_pos: Point2) {
        this.m_position = p_pos;
        this.m_mesh.position.x = p_pos.col;
        this.m_mesh.position.y = -p_pos.row;       
    }
    get position(): Point2 {
        return this.m_position;
    }
    get mesh(): THREE.Mesh {
        return this.m_mesh;
    }
}

