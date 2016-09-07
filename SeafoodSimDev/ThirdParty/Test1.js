/// <reference path = "Declarations/three.d.ts"/>
//
var TKN_Scene = (function () {
    //private m_scene: any;
    function TKN_Scene() {
        console.log("Test1 construct");
        this.m_scene = new THREE.Scene();
        //this.m_scene = new pc.Application();
    }
    Object.defineProperty(TKN_Scene.prototype, "scene", {
        get: function () {
            return this.m_scene;
        },
        enumerable: true,
        configurable: true
    });
    TKN_Scene.prototype.add = function (p_mesh) {
        this.m_scene.add(p_mesh.mesh);
    };
    return TKN_Scene;
}());
var TKN_Camera = (function () {
    function TKN_Camera() {
        this.m_camera = new THREE.PerspectiveCamera(60, 1, 0.3, 1000);
        this.m_camera.position.z = 10;
    }
    Object.defineProperty(TKN_Camera.prototype, "position", {
        get: function () {
            return this.m_position;
        },
        set: function (p_pos) {
            this.m_position = p_pos;
            this.m_camera.position.x = p_pos.col;
            this.m_camera.position.y = p_pos.row;
            this.m_camera.position.z = p_pos.depth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TKN_Camera.prototype, "camera", {
        get: function () {
            return this.m_camera;
        },
        enumerable: true,
        configurable: true
    });
    TKN_Camera.prototype.lookAt = function (p_point) {
        this.m_camera.lookAt(new THREE.Vector3(p_point.col, p_point.row, p_point.depth));
    };
    return TKN_Camera;
}());
var TKN_Renderer = (function () {
    function TKN_Renderer(p_div, p_width, p_height) {
        console.log("Construct TKN_Rendeerer");
        this.m_renderer = new THREE.WebGLRenderer();
        this.m_renderer.setSize(p_width, p_height);
        //document.getElementById(p_div).appendChild(this.m_renderer.domElement);
        document.body.insertBefore(this.m_renderer.domElement, document.body.lastChild);
    }
    TKN_Renderer.prototype.render = function (p_cam, p_scene) {
        this.m_renderer.render(p_scene.scene, p_cam.camera);
    };
    Object.defineProperty(TKN_Renderer.prototype, "domElement", {
        get: function () {
            return this.m_renderer.domElement;
        },
        enumerable: true,
        configurable: true
    });
    return TKN_Renderer;
}());
var TKN_Geometry = (function () {
    function TKN_Geometry(p_size) {
        if (p_size === void 0) { p_size = 0.8; }
        //this.m_geometry = new THREE.SphereGeometry(1, 24, 24);
        this.m_geometry = new THREE.PlaneGeometry(p_size, p_size);
    }
    Object.defineProperty(TKN_Geometry.prototype, "geometry", {
        get: function () {
            return this.m_geometry;
        },
        enumerable: true,
        configurable: true
    });
    return TKN_Geometry;
}());
var e_color;
(function (e_color) {
    e_color[e_color["Green"] = 0] = "Green";
    e_color[e_color["Blue"] = 1] = "Blue";
    e_color[e_color["Red"] = 2] = "Red";
    e_color[e_color["Yellow"] = 3] = "Yellow";
    e_color[e_color["White"] = 4] = "White";
    e_color[e_color["Black"] = 5] = "Black";
})(e_color || (e_color = {}));
;
var TKN_material = (function () {
    function TKN_material(p_color) {
        this.m_material = new THREE.MeshBasicMaterial();
        switch (p_color) {
            case e_color.Green:
                this.m_material.color.setHex(0x00ff00);
                break;
            case e_color.Blue:
                this.m_material.color.setHex(0x0000ff);
                break;
            case e_color.Red:
                this.m_material.color.setHex(0xff0000);
                break;
            case e_color.Yellow:
                this.m_material.color.setHex(0xffff00);
                break;
            case e_color.White:
                this.m_material.color.setHex(0xffffff);
                break;
            case e_color.Black:
                this.m_material.color.setHex(0x000000);
                break;
            default:
                this.m_material.color.setHex(0xff00ff);
                break;
        }
    }
    Object.defineProperty(TKN_material.prototype, "material", {
        get: function () {
            return this.m_material;
        },
        enumerable: true,
        configurable: true
    });
    return TKN_material;
}());
var TKN_Mesh = (function () {
    function TKN_Mesh(p_geometry, p_material) {
        this.m_geometry = p_geometry;
        this.m_material = p_material;
        this.m_mesh = new THREE.Mesh(p_geometry.geometry, p_material.material);
        this.m_position = new Point2(0, 0);
    }
    Object.defineProperty(TKN_Mesh.prototype, "position", {
        get: function () {
            return this.m_position;
        },
        set: function (p_pos) {
            this.m_position = p_pos;
            this.m_mesh.position.x = p_pos.col;
            this.m_mesh.position.y = -p_pos.row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TKN_Mesh.prototype, "mesh", {
        get: function () {
            return this.m_mesh;
        },
        enumerable: true,
        configurable: true
    });
    return TKN_Mesh;
}());
//# sourceMappingURL=Test1.js.map