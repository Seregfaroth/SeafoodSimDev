// <reference path = "../externals/controller.d.ts"/>
// <reference path = "../externals/test.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
class Main {
    private m_controller: Controller;

    

    constructor(p_test: boolean) {
        console.log("loading Game");
        //var cc = new CarryingCapacity([new FishGroup("group 1", ["cod", "mac"])], [1000]);
        this.loadController();
        
        
        if (p_test)
           new Test();
    }

    public loadController = () => {
       //this.m_controller = new Controller(true);
        
       this.m_controller = new Controller();
    }

}

