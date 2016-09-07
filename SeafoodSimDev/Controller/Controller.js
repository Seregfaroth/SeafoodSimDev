/// <reference path = "../Model/EndScreenStats.ts"/>
var simState;
(function (simState) {
    simState[simState["starting"] = 0] = "starting";
    simState[simState["running"] = 1] = "running";
    simState[simState["paused"] = 2] = "paused";
    simState[simState["ending"] = 3] = "ending";
    simState[simState["fast"] = 4] = "fast";
})(simState || (simState = {}));
var Controller = (function () {
    function Controller() {
        var _this = this;
        this.simulationTick = function () {
            //console.log("Controller running simulationtick");
            if (_this.m_model.getTime() % _this.m_statFreq)
                _this.updateStats();
            if (_this.m_model.getTime() > 90 * 1) {
                _this.m_simState = simState.ending;
            }
            else {
                _this.m_model.run();
                _this.m_view.updateMainView(_this.m_model);
            }
        };
        this.runSimulation = function (p_ticks) {
            if (_this.m_simState == simState.paused || _this.m_simState == simState.fast) {
                clearInterval(_this.m_timer);
                _this.m_timer = setInterval(_this.simulationTick, 1000);
                _this.m_simState = simState.running;
            }
            if (_this.m_simState = simState.ending) {
                clearInterval(_this.m_timer);
                _this.endSimulation();
            }
        };
        console.log("Controller loading");
        this.m_simState = simState.paused;
        this.m_delayPerTick = 1000;
        this.m_fastDelayPerTick = 1;
        this.m_statFreq = 30;
        this.m_model = new Model();
        this.m_view = new MainView(this.m_model.getMap(), this.m_model.getShipOwners(), this.m_model.getGovernment().getTaxingRate());
        this.m_eventHandler = new EventHandler(this);
        this.m_stats = new EndScreenStats(this.m_model);
        this.m_view.updateMainView(this.m_model);
    }
    Controller.prototype.getModel = function () {
        return this.m_model;
    };
    Controller.prototype.getEventHandler = function () {
        return this.m_eventHandler;
    };
    Controller.prototype.getSimState = function () {
        return this.m_simState;
    };
    Controller.prototype.getMainView = function () {
        return this.m_view;
    };
    Controller.prototype.updateStats = function () {
        var biomass = 0;
        for (var _i = 0, _a = this.m_model.getMap().getSchools(); _i < _a.length; _i++) {
            var sc = _a[_i];
            biomass += sc.getBiomass();
        }
        this.m_stats.setBiomassPrYearAt(this.m_model.getTime() / this.m_statFreq, biomass);
    };
    Controller.prototype.getStats = function () {
        return this.m_stats;
    };
    Controller.prototype.endSimulation = function () {
        console.log("Simulation ended" + this.getStats());
    };
    Controller.prototype.pause = function () {
        if (this.m_simState == simState.running || this.m_simState == simState.fast) {
            clearInterval(this.m_timer);
            this.m_simState = simState.paused;
        }
    };
    Controller.prototype.fastForward = function () {
        if (this.m_simState == simState.running || this.m_simState == simState.paused) {
            clearInterval(this.m_timer);
            this.m_simState = simState.fast;
            this.m_timer = setInterval(this.simulationTick, this.m_fastDelayPerTick);
        }
    };
    return Controller;
}());
//# sourceMappingURL=Controller.js.map