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
        this.m_noGraphicSimulation = false;
        this.restart = function () {
            _this.m_model = new Model();
            _this.m_view.reset(_this.m_model);
            _this.m_view.updateMainView(_this.m_model);
            _this.m_eventHandler.bindFunctions(true);
            _this.m_simState = simState.paused;
            clearInterval(_this.m_timer);
            $("#startButton").removeClass("marked");
            $("#fastForwardButton").removeClass("marked");
            $("#pauseButton").addClass("marked");
        };
        this.simulationTick = function () {
            //console.log("Controller running simulationtick");
            if (!(_this.m_model.getTime() % _this.m_model.m_statFreq))
                _this.m_model.updateStats();
            if (_this.m_model.getTime() >= _this.m_endTime) {
                _this.m_simState = simState.ending;
                console.log("Simulation ended" + _this.m_model.getStats());
                clearInterval(_this.m_timer);
                _this.m_view.updateMainView(_this.m_model);
                _this.m_eventHandler.unBindFunctions(true);
                new EndScreen(_this.m_model.getStats());
            }
            else {
                _this.m_model.run(_this.m_ticksPerMove);
                if (!_this.m_noGraphicSimulation)
                    _this.m_view.updateMainView(_this.m_model);
            }
        };
        this.runSimulation = function (p_ticks) {
            if (_this.m_simState == simState.paused || _this.m_simState == simState.fast) {
                clearInterval(_this.m_timer);
                _this.m_timer = setInterval(_this.simulationTick, _this.m_delayPerTick);
                _this.m_simState = simState.running;
            }
            /*if (this.m_simState = simState.ending) {
                clearInterval(this.m_timer);
                this.m_view.updateMainView(this.m_model);
                this.endSimulation();
            }*/
        };
        console.log("Controller loading");
        this.m_simState = simState.paused;
        this.m_delayPerTick = 1000;
        this.m_fastDelayPerTick = 1;
        //this.m_statFreq = 30;
        this.m_model = new Model();
        this.m_view = new MainView(this.m_model.getMap(), this.m_model.getShipOwners(), this.m_model.getGovernment().getTaxingRate());
        this.m_eventHandler = new EventHandler(this);
        this.m_startScreenEventHandler = new StartScreenEventHandler(this);
        this.m_view.updateMainView(this.m_model);
    }
    Controller.prototype.getScenario = function () {
        return this.m_scenario;
    };
    Controller.prototype.setScenario = function (p_scenario) {
        this.m_scenario = p_scenario;
    };
    Controller.prototype.getModel = function () {
        return this.m_model;
    };
    Controller.prototype.setTickPerMove = function (p_n) {
        this.m_ticksPerMove = p_n;
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
    Controller.prototype.setEndTime = function (p_endTime) {
        this.m_endTime = p_endTime;
    };
    Controller.prototype.endSimulation = function () {
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