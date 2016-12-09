var StartScreenEventHandler = (function () {
    function StartScreenEventHandler(p_controller, p_startScreen) {
        var _this = this;
        this.radioChange = function (p_evt) {
            var t = _this;
            var t2 = _this.m_controller.getScenario();
            if (p_evt.data.scenario === 1)
                _this.m_controller.getScenario().loadScenario('Controller/scenarios/scn1.json', _this.m_startScreen.updateInfo);
            if (p_evt.data.scenario === 2)
                _this.m_controller.getScenario().loadScenario('Controller/scenarios/scn2.json', _this.m_startScreen.updateInfo);
            if (p_evt.data.scenario === 3)
                _this.m_controller.getScenario().loadScenario('Controller/scenarios/scn3.json', _this.m_startScreen.updateInfo);
        };
        this.close = function () {
            $("#startScreen").dialog("close");
        };
        this.beforeClose = function (e) {
            _this.m_controller.setModel(new Model());
            _this.m_controller.getMainView().updateMainView(_this.m_controller.getModel());
            _this.m_controller.getMainView().getMapMenu().updateMsy(_this.m_controller.getModel());
        };
        this.m_controller = p_controller;
        this.m_startScreen = p_startScreen;
        //this.m_scenario = Scenario.getInstance();
        var handler = this;
        $("#startScreen").dialog({
            buttons: {
                Ok: handler.close
            },
            close: handler.close,
            beforeClose: handler.beforeClose
        });
        this.m_controller.getScenario().loadScenario('Controller/scenarios/scn1.json', this.m_startScreen.updateInfo);
    }
    StartScreenEventHandler.prototype.initialize = function () {
        $("#scenario1").on("change", { scenario: 1 }, this.radioChange);
        $("#scenario2").on("change", { scenario: 2 }, this.radioChange);
        $("#scenario3").on("change", { scenario: 3 }, this.radioChange);
    };
    return StartScreenEventHandler;
}());
//# sourceMappingURL=StartScreenEventHandler.js.map