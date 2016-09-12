var EventHandler = (function () {
    function EventHandler(p_controller) {
        var _this = this;
        this.restart = function () {
            if (confirm("Are you sure you want to restart the simulation?")) {
                _this.m_controller.restart();
            }
        };
        this.setTax = function (p_n) {
            _this.updateTaxValue(p_n);
            _this.m_controller.getModel().getGovernment().setTaxingRate(p_n / 100);
        };
        this.updateTaxValue = function (p_n) {
            $("#taxValue").text($("#taxSlider").slider("option", "value") + "%");
        };
        this.setQuote = function (owner, p_n) {
            _this.m_controller.getModel().getGovernment().getRestrictions().setQuote(owner, p_n);
            _this.updateQuoteValue(owner, p_n);
        };
        this.updateQuoteValue = function (owner, p_n) {
            $("#quoteValue" + owner).text($("#quoteSlider" + owner).slider("option", "value"));
        };
        this.setEffortLimit = function (owner, p_n) {
            _this.m_controller.getModel().getGovernment().getRestrictions().setEffortLimit(owner, p_n);
            _this.updateEffortLimitValue(owner, p_n);
        };
        this.updateEffortLimitValue = function (owner, p_n) {
            $("#effortValue" + owner).text($("#effortSlider" + owner).slider("option", "value"));
        };
        this.setLandingDistrubution = function (p_site, p_n) {
            _this.m_controller.getModel().getGovernment().getRestrictions().setLandingDistrubution(p_site, p_n);
            _this.updateLandingValue(p_site, p_n);
        };
        this.updateLandingValue = function (site, p_n) {
            $("#landingValue" + site).text($("#landingSlider" + site).slider("option", "value"));
        };
        this.setMaxNoShips = function (p_n) {
            _this.m_controller.getModel().getGovernment().getRestrictions().setMaxShips(p_n);
            _this.updateMaxNoShipsValue(p_n);
        };
        this.start = function () {
            $("#fastForwardButton").removeClass("marked");
            $("#pauseButton").removeClass("marked");
            $("#startButton").addClass("marked");
            _this.unBindFunctions();
            _this.m_controller.runSimulation();
        };
        this.pause = function () {
            $("#startButton").removeClass("marked");
            $("#fastForwardButton").removeClass("marked");
            $("#pauseButton").addClass("marked");
            _this.bindFunctions();
            _this.m_controller.pause();
        };
        this.fastForward = function () {
            $("#pauseButton").removeClass("marked");
            $("#startButton").removeClass("marked");
            $("#fastForwardButton").addClass("marked");
            _this.unBindFunctions();
            _this.m_controller.fastForward();
        };
        this.restrictArea = function (p_tile) {
            if (_this.m_controller.getModel().getGovernment().getRestrictions().isRestricted(p_tile)) {
                _this.m_controller.getModel().getGovernment().getRestrictions().unRestrictArea(p_tile);
            }
            else {
                _this.m_controller.getModel().getGovernment().getRestrictions().restrictArea(p_tile);
            }
        };
        this.m_controller = p_controller;
        $("#startButton").on("click", this.start);
        $("#pauseButton").on("click", this.pause);
        $("#fastForwardButton").on("click", this.fastForward);
        $("#restart").on("click", this.restart);
        this.bindFunctions();
    }
    EventHandler.prototype.bindFunctions = function (p_all) {
        var handler = this;
        $("#taxSlider").off("slide");
        $("#taxSlider").on("slide", function (event, ui) { handler.updateTaxValue(ui.value); });
        $("#taxSlider").on("slidechange", function (event, ui) { handler.setTax(ui.value); });
        this.m_controller.getModel().getShipOwners().forEach(function (so) {
            $("#quoteSlider" + so.getID()).off("slide");
            $("#quoteSlider" + so.getID()).on("slide", function (event, ui) {
                handler.updateQuoteValue(so.getID(), ui.value);
            });
            $("#quoteSlider" + so.getID()).on("slidechange", function (event, ui) {
                handler.setQuote(so.getID(), ui.value);
            });
            $("#effortSlider" + so.getID()).off("slide");
            $("#effortSlider" + so.getID()).on("slide", function (event, ui) {
                handler.updateEffortLimitValue(so.getID(), ui.value);
            });
            $("#effortSlider" + so.getID()).on("slidechange", function (event, ui) {
                handler.setEffortLimit(so.getID(), ui.value);
            });
        });
        this.m_controller.getModel().getMap().getLandingSites().forEach(function (ls) {
            $("#landingSlider" + ls.getID()).off("slide");
            $("#landingSlider" + ls.getID()).on("slide", function (event, ui) {
                handler.updateLandingValue(ls.getID(), ui.value);
            });
            $("#landingSlider" + ls.getID()).on("slidechange", function (event, ui) {
                handler.setLandingDistrubution(ls.getID(), ui.value);
            });
        });
        $("#noOfShipsSlider").off("slide");
        $("#noOfShipsSlider").on("slide", function (event, ui) { handler.updateMaxNoShipsValue(ui.value); });
        $("#noOfShipsSlider").on("slidechange", function (event, ui) { handler.setMaxNoShips(ui.value); });
        if (p_all) {
            $("#startButton").on("click", this.start);
            $("#pauseButton").on("click", this.pause);
            $("#fastForwardButton").on("click", this.fastForward);
        }
    };
    EventHandler.prototype.unBindFunctions = function (p_all) {
        var handler = this;
        $("#taxSlider").off("slide");
        $("#taxSlider").on("slide", function (event, ui) { return false; });
        this.m_controller.getModel().getShipOwners().forEach(function (so) {
            $("#quoteSlider" + so.getID()).off("slide");
            $("#quoteSlider" + so.getID()).on("slide", function (event, ui) { return false; });
            $("#effortSlider" + so.getID()).off("slide");
            $("#effortSlider" + so.getID()).on("slide", function (event, ui) { return false; });
        });
        this.m_controller.getModel().getMap().getLandingSites().forEach(function (ls) {
            $("#landingSlider" + ls.getID()).off("slide");
            $("#landingSlider" + ls.getID()).on("slide", function (event, ui) { return false; });
        });
        $("#noOfShipsSlider").off("slide");
        $("#noOfShipsSlider").on("slide", function (event, ui) { return false; });
        if (p_all) {
            $("#startButton").off("click");
            $("#pauseButton").off("click");
            $("#fastForwardButton").off("click");
        }
    };
    EventHandler.prototype.updateMaxNoShipsValue = function (p_n) {
        $("#maxNoShips").text($("#noOfShipsSlider").slider("option", "value"));
    };
    return EventHandler;
}());
//# sourceMappingURL=EventHandler.js.map