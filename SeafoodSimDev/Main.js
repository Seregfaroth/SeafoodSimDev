// <reference path = "../externals/controller.d.ts"/>
// <reference path = "../externals/test.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
var Main = (function () {
    function Main(p_test) {
        var _this = this;
        this.loadController = function () {
            //this.m_controller = new Controller(true);
            _this.m_controller = new Controller();
        };
        console.log("loading Game");
        //var cc = new CarryingCapacity([new FishGroup("group 1", ["cod", "mac"])], [1000]);
        this.loadController();
        if (p_test)
            new Test();
    }
    return Main;
}());
//# sourceMappingURL=Main.js.map