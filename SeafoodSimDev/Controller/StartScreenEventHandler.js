var StartScreenEventHandler = (function () {
    function StartScreenEventHandler(p_controller, p_config) {
        var _this = this;
        this.radioChange = function (p_evt) {
            var t = _this;
            var t2 = _this.m_controller.getScenario();
            if (p_evt.data.scenario === 1)
                _this.m_controller.getScenario().loadScenario('Controller/scenarios/scn1.json', _this.updateInfo);
            if (p_evt.data.scenario === 2)
                _this.m_controller.getScenario().loadScenario('Controller/scenarios/scn2.json', _this.updateInfo);
            if (p_evt.data.scenario === 3)
                _this.m_controller.getScenario().loadScenario('Controller/scenarios/scn3.json', _this.updateInfo);
            //$("#information").text(this.m_controller.getScenario().getName());
            //$("#information").text("Here is some information about scenario " + p_evt.data.scenario +". What is "+
            //    "the purpose of this scenario and how to win in this scenario.");
        };
        this.close = function () {
            $("#startScreen").dialog("close");
        };
        this.beforeClose = function (e) {
            var tm3 = e;
            //$("#startScreen").dialog("close");
            var scenario = _this.m_controller.getScenario();
            _this.m_controller.setEndTime($("#endTime").val());
            _this.m_controller.setTicksPerMove($("#movesPerTick").val());
            var tm = _this.m_controller.getModel().getMap();
            //this.m_controller.getModel().setMap(new Map(scenario.getMapType(), scenario.getMapSize(), scenario.getNumberOfSchools(), this.m_controller.getModel().getGovernment().getRestrictions(), this.m_config));
            _this.m_controller.getModel().getMap().setScenario(scenario);
            var tm2 = _this.m_controller.getModel().getMap();
            //new MainView(this.m_model.getMap(), this.m_model.getShipOwners(), this.m_model.getGovernment().getTaxingRate());
            //this.m_controller.setMainView(new MainView(this.m_controller.getModel().getMap(), this.m_controller.getModel().getShipOwners(), this.m_controller.getModel().getGovernment().getTaxingRate()));
            //this.m_controller.getMainView().updateMainView(this.m_controller.getModel());
            _this.m_controller.getMainView().changeMap(_this.m_controller.getModel().getMap());
            _this.m_controller.getMainView().updateMainView(_this.m_controller.getModel());
        };
        this.updateInfo = function () {
            var scenario = _this.m_controller.getScenario();
            var t = scenario.getName();
            var t2 = scenario.getDescription();
            $("#name").html(scenario.getName());
            $("#des").text(scenario.getDescription());
            $("#link").html("<a target='_blank' href='" + scenario.getLink() + "'>" + scenario.getLink() + "</a>");
            $("#goal").html("<p>Financial score goal: <span style='float:right'>" + scenario.getfinGoal()
                + "</span><br/>Environmental score goal: <span style='float:right'>" + scenario.getEcoGoal()
                + "</span><br/>Social score goal: <span style='float:right'>" + scenario.getSocGoal() + "</span></p>");
        };
        this.m_controller = p_controller;
        this.m_config = p_config;
        $("#scenario1").on("change", { scenario: 1 }, this.radioChange);
        $("#scenario2").on("change", { scenario: 2 }, this.radioChange);
        $("#scenario3").on("change", { scenario: 3 }, this.radioChange);
        $('[name="radio"][value="false"]').attr("checked", 'true');
        $('#chooseScenario').buttonset();
        var handler = this;
        $("#startScreen").dialog({
            buttons: {
                Ok: handler.close
            },
            close: handler.close,
            beforeClose: handler.beforeClose
        });
    }
    return StartScreenEventHandler;
}());
//# sourceMappingURL=StartScreenEventHandler.js.map