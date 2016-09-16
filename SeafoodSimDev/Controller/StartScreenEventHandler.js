var StartScreenEventHandler = (function () {
    function StartScreenEventHandler(p_controller) {
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
            _this.m_controller.setEndTime($("#endTime").val());
        };
        this.updateInfo = function () {
            var scenario = _this.m_controller.getScenario();
            $("#information").text("hello");
            $("#name").text(scenario.getName());
            $("#des").text(scenario.getDescription());
        };
        this.m_controller = p_controller;
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
            close: handler.close
        });
    }
    return StartScreenEventHandler;
}());
//# sourceMappingURL=StartScreenEventHandler.js.map