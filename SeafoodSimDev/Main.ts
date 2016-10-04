// <reference path = "../externals/controller.d.ts"/>
// <reference path = "../externals/test.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
class Main {
    private m_controller: Controller;
    

    constructor(p_test: boolean) {
        console.log("loading Game");
        //var p = new TKN_PathFinding();
        //var navMatrix = [
        //    [0, 1, 0, 0, 0, 1, 0, 0],
        //    [0, 1, 0, 1, 0, 1, 0, 0],
        //    [0, 1, 0, 1, 0, 1, 0, 0],
        //    [0, 1, 0, 1, 0, 1, 0, 0],
        //    [0, 0, 0, 1, 0, 0, 0, 0]
        //];
        //p.navTable = navMatrix;
        //debugger;
        //var f = p.findPath(new Point2(0, 0), new Point2(4,6));
        //debugger;
        //this.m_config = new Configuration();
        //this.m_config.loadConfig('Controller/configuration1.json', this.loadController);
        this.loadController();
        
        
        //if (p_test) 
        //    new Test();
    }

    public loadController = () => {
        //debugger;
       //this.m_controller = new Controller(true);
        
       this.m_controller = new Controller();
    }

}

