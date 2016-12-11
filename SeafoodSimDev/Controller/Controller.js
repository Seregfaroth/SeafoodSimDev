/// <reference path = "../Model/EndScreenStats.ts"/>
var simState;
(function (simState) {
    simState[simState["starting"] = 0] = "starting";
    simState[simState["running"] = 1] = "running";
    simState[simState["paused"] = 2] = "paused";
    simState[simState["ending"] = 3] = "ending";
    simState[simState["fast"] = 4] = "fast";
    simState[simState["changeSettings"] = 5] = "changeSettings";
})(simState || (simState = {}));
var Controller = (function () {
    //private m_sce: Scenario;
    function Controller(p_mca) {
        var _this = this;
        this.m_newSim = true;
        //public getScenario(): number {
        //    return this.m_scenario;
        //}
        //public setScenario(p_scenario: number): void {
        //    this.m_scenario = p_scenario;
        //}
        this.initMCA = function () {
            _this.setModelMCA(new Model());
            _this.m_model.runMCA(_this.m_scenario.getDefaultNoDays());
        };
        this.restart = function () {
            $("#endDialogDiv").dialog("close");
            $("#startScreen").dialog({
                minWidth: 1100,
                minHeight: 700,
                modal: true
            });
            _this.m_eventHandler.bindFunctions(true);
            _this.m_simState = simState.changeSettings;
            clearInterval(_this.m_timer);
            $("#startButton").removeClass("marked");
            $("#fastForwardButton").removeClass("marked");
            $("#pauseButton").addClass("marked");
            document.getElementById("scenario1").blur(); //This is to prevent scenario 1 from being checked by default (neccesary when restarting after running another scenario)
            _this.m_newSim = true;
        };
        this.simulationTick = function () {
            //console.log("Controller running simulationtick");
            var thisPlaceholder = _this;
            if (_this.m_model.getTime() >= _this.m_scenario.getDefaultNoDays()) {
                _this.m_simState = simState.ending;
                //this.m_model.updateStats();
                if (_this.m_newSim) {
                    _this.m_endScreen.addSimulation(_this.m_model.getStats(), _this.m_model);
                    _this.m_newSim = false;
                }
                //this.m_endScreen.updateMsy(this.m_model, true);
                _this.m_endScreen.drawCharts(_this.m_model, _this.m_model.getStats());
                console.log("Simulation ended" + _this.m_model.getStats());
                clearInterval(_this.m_timer);
                _this.m_eventHandler.unBindFunctions(true);
                _this.m_endScreen.updateDesc(_this.m_model.getTime());
                //Assign function to restart click
                $("#endDialogDiv").dialog({
                    title: 'End Screen',
                    buttons: {
                        "Restart": function () {
                            thisPlaceholder.restart();
                        },
                    },
                    close: function () {
                        thisPlaceholder.restart();
                    }
                });
                //this.m_endScreen.addSimulation(this.m_model.getStats(), this.m_model);
                _this.m_endScreen.show();
            }
            else if (!((_this.m_model.getTime() + 1) % _this.m_scenario.getStatFreq()) && _this.m_model.getTime() < _this.m_scenario.getDefaultNoDays() - 1) {
                //The reason for running model once more is that otherwise time would not change
                //and we would get in here in next iteration as well
                _this.m_model.run(_this.m_ticksPerMove);
                _this.m_simState = simState.changeSettings;
                clearInterval(_this.m_timer);
                _this.m_eventHandler.bindFunctions(false);
                //this.m_model.updateStats();
                if (_this.m_newSim) {
                    _this.m_endScreen.addSimulation(_this.m_model.getStats(), _this.m_model);
                    _this.m_newSim = false;
                }
                //this.m_intervalStats = new IntervalStats(this.m_model.getStats(), this.m_model);
                $("#startSim").text("Continue Simulation");
                $("#startSim").css("display", "initial");
                $(".fa").css("display", "none");
                //this.getMainView().getIntervalStats().update(this.m_model.getTime());
                //this.m_intervalStats.update(this.m_model.getTime());
                //this.m_endScreen.updateMsy(this.m_model);
                _this.m_endScreen.drawCharts(_this.m_model, _this.m_model.getStats());
                _this.m_endScreen.updateDesc(_this.m_model.getTime());
                _this.m_endScreen.show();
                //$("#intervalStats").dialog({
                //    buttons: {
                //        Ok: function () {
                //            $(this).dialog("close"); //closing on Ok click
                //        }
                //    },
                //    modal: true,
                //    width: 1111,
                //    height: 777
                //});
                _this.m_view.getMapMenu().updateMsy(_this.m_model);
            }
            else {
                _this.m_model.run(_this.m_ticksPerMove);
            }
            _this.m_view.updateMainView(_this.m_model);
        };
        this.closeEndScreen = function () {
            //$("#endDialogDiv").empty().remove();
            //console.log("closing endscreen");
            _this.restart();
        };
        this.runSimulation = function (p_ticks) {
            if (_this.m_simState == simState.paused || _this.m_simState == simState.fast || _this.m_simState == simState.changeSettings) {
                /*if (this.m_simState == simState.changeSettings) {//If new interval has begun
                    this.m_view.updateMap(this.m_model.getMap());
                }*/
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
        this.resizeWindow = function () {
            _this.m_view.resizeWindow();
        };
        console.log("Controller loading");
        this.m_endScreen = new EndScreen();
        this.m_endScreen.hide();
        this.m_scenario = Scenario.getInstance();
        if (p_mca === true) {
            this.m_scenario.loadScenario('Controller/scenarios/scn2.json', this.initMCA);
        }
        else {
            this.m_simState = simState.changeSettings;
            this.m_delayPerTick = 500;
            this.m_fastDelayPerTick = 1;
            //this.m_statFreq = 30;
            //this.m_model = new Model(this.m_scenario);
            //this.m_view = new MainView(this.m_model.getMap(), this.m_model.getShipOwners(), this.m_model.getGovernment().getTaxingRate());
            this.m_startScreenEventHandler = new StartScreenEventHandler(this, new StartScreen());
            this.m_startScreenEventHandler.initialize();
        }
    }
    Controller.prototype.getTicksPerMove = function () {
        return this.m_ticksPerMove;
    };
    Controller.prototype.setTicksPerMove = function (p_tpm) {
        this.m_ticksPerMove = p_tpm;
    };
    Controller.prototype.getScenario = function () {
        return this.m_scenario;
    };
    Controller.prototype.setScenario = function (p_scenario) {
        this.m_scenario = p_scenario;
    };
    Controller.prototype.getModel = function () {
        return this.m_model;
    };
    Controller.prototype.setModelMCA = function (p_model) {
        this.m_model = p_model;
    };
    Controller.prototype.setModel = function (p_model) {
        this.m_model = p_model;
        this.m_view = new MainView(this.m_model.getMap(), this.m_model.getShipOwners(), this.m_model.getGovernment().getTaxingRate(), this.m_scenario);
        this.m_eventHandler = new EventHandler(this);
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
    Controller.prototype.setMainView = function (p_view) {
        this.m_view = p_view;
    };
    Controller.prototype.setEndTime = function (p_endTime) {
        this.m_endTime = p_endTime;
    };
    Controller.prototype.getEndtime = function () {
        return this.m_endTime;
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