class MapMenu {
    constructor(p_ShipOwners: ShipOwner[], p_landingSites: LandingSite[], p_taxingRate: number) {
        console.log("construct MapMenu");
        var menuDiv: HTMLElement = document.createElement("div");
        menuDiv.id = "menuDiv";
        menuDiv.style.cssFloat = "left";
        menuDiv.style.width = "25%";
        menuDiv.style.height = "70%";
        menuDiv.classList.add("ui-widget-content");
        document.getElementById("mainDiv").appendChild(menuDiv);

        //Create score view
        var scoreLegend: HTMLLegendElement = document.createElement("legend");
        var scoreLabel: HTMLDivElement = document.createElement("div");
        scoreLabel.classList.add("legend-header");
        scoreLabel.innerHTML = "Score:";
        scoreLegend.appendChild(scoreLabel);
        menuDiv.appendChild(scoreLegend);
        scoreLegend.classList.add("menu-legend");
        var scoreTable: HTMLTableElement = document.createElement("table");
        scoreTable.classList.add("menu-text");
        scoreLegend.appendChild(scoreTable);

        var financialRow: HTMLTableRowElement = scoreTable.insertRow();
        var labelCell: HTMLTableCellElement = financialRow.insertCell();
        var finacialScoreLabel: HTMLDivElement = document.createElement("div");
        finacialScoreLabel.innerHTML = "Financial Score:";
        
        labelCell.appendChild(finacialScoreLabel);
        var scoreCell: HTMLTableCellElement = financialRow.insertCell();
        var score: HTMLDivElement = document.createElement("div");
        score.id = "financialScore";
        score.innerHTML = "0";
        score.classList.add("score");
        scoreCell.appendChild(score);

        var envRow: HTMLTableRowElement = scoreTable.insertRow();
        var labelCell: HTMLTableCellElement = envRow.insertCell();
        var ecoScoreLabel: HTMLDivElement = document.createElement("div");
        ecoScoreLabel.innerHTML = "Environmental Score:";
        labelCell.appendChild(ecoScoreLabel);
        var scoreCell: HTMLTableCellElement = envRow.insertCell();
        var score: HTMLDivElement = document.createElement("div");
        score.id = "environmentalScore";
        score.innerHTML = "0";
        score.classList.add("score");
        scoreCell.appendChild(score);

        var socialRow: HTMLTableRowElement = scoreTable.insertRow();
        var labelCell: HTMLTableCellElement = socialRow.insertCell();
        var socialScoreLabel: HTMLDivElement = document.createElement("div");
        socialScoreLabel.innerHTML = "Social Score:";
        labelCell.appendChild(socialScoreLabel);
        var scoreCell: HTMLTableCellElement = socialRow.insertCell();
        var score: HTMLDivElement = document.createElement("div");
        score.innerHTML = "0";
        score.id = "socialScore";
        score.classList.add("score");
        scoreCell.appendChild(score);

        //Create tax slider
       

        var legend: HTMLElement = document.createElement("legend");
        legend.classList.add("menu-legend");
        var label: HTMLElement = document.createElement("div");
        label.innerHTML = "Taxing rate";
        label.className = "legend-header";
        legend.appendChild(label);
        menuDiv.appendChild(legend);

        var table: any = document.createElement("TABLE");
        table.classList.add("menu-text");
        legend.appendChild(table);
        var row: HTMLTableRowElement = table.insertRow();

        var cell: HTMLTableCellElement = row.insertCell();
        var valueDiv: HTMLDivElement = document.createElement("div");
        cell.appendChild(valueDiv);
        valueDiv.innerHTML = p_taxingRate*100+ "%";
        cell.className = "slider-value-cell";
        valueDiv.id = "taxValue";

        var cell = row.insertCell();
        var slider: HTMLElement = document.createElement("div");
        slider.id = "taxSlider";
        slider.style.width = "70%";
        slider.style.cssFloat = "right";
        slider.style.margin = "10px";
        cell.className = "slider-cell";
        cell.appendChild(slider);
        $("#taxSlider").slider();
        $("#taxSlider").slider("option", "min", 0);
        $("#taxSlider").slider("option", "max", 100);
        $("#taxSlider").slider("value",p_taxingRate*100);

        //Create quote sliders
        var quoteLegend: HTMLElement = document.createElement("legend");
        quoteLegend.classList.add("menu-legend");
        var quoteLabel: HTMLElement = document.createElement("div");
        quoteLabel.innerHTML = "Quotes";
        quoteLabel.className = "legend-header";
        quoteLegend.appendChild(quoteLabel);
        menuDiv.appendChild(quoteLegend);
        var quoteTable: any = document.createElement("TABLE");
        quoteTable.classList.add("menu-text");
        quoteLegend.appendChild(quoteTable);

        for (var i = 0; i < p_ShipOwners.length; i++) {
            var row: HTMLTableRowElement = quoteTable.insertRow();
            var cell: HTMLTableCellElement = row.insertCell();
            var quoteLabel: HTMLElement = document.createElement("div");
            quoteLabel.innerHTML = p_ShipOwners[i].getID() + ":";
            quoteLabel.style.cssFloat = "left";
            cell.appendChild(quoteLabel);

            cell = row.insertCell();
            cell.className = "slider-value-cell";
            var sliderValue: HTMLDivElement = document.createElement("div");
            sliderValue.id = "quoteValue" + p_ShipOwners[i].getID();
            cell.appendChild(sliderValue);

            cell = row.insertCell();
            cell.className = "slider-cell";
            var quoteSlider: HTMLElement = document.createElement("div");
            quoteSlider.id = "quoteSlider" + p_ShipOwners[i].getID();
            quoteSlider.style.width = "70%";
            quoteSlider.style.cssFloat = "right";
            quoteSlider.style.margin = "10px";
            cell.appendChild(quoteSlider);
            $("#quoteSlider" + p_ShipOwners[i].getID()).slider();
            $("#quoteSlider" + p_ShipOwners[i].getID()).slider("option", "min", 0);
            $("#quoteSlider" + p_ShipOwners[i].getID()).slider("option", "max", 100);
            sliderValue.innerHTML = $("#quoteSlider" + p_ShipOwners[i].getID()).slider("option", "value");
        }

        //Create effort limit sliders
        var effortLegend: HTMLElement = document.createElement("legend");
        effortLegend.classList.add("menu-legend");
        var effortLabel: HTMLElement = document.createElement("div");
        effortLabel.innerHTML = "Effort Limits";
        effortLabel.className = "legend-header";
        effortLegend.appendChild(effortLabel);
        menuDiv.appendChild(effortLegend);
        var effortTable: any = document.createElement("TABLE");
        effortTable.classList.add("menu-text");
        effortLegend.appendChild(effortTable);

        for (var i = 0; i < p_ShipOwners.length; i++) {
            var row: HTMLTableRowElement = effortTable.insertRow();
            var cell: HTMLTableCellElement = row.insertCell();
            var effortLabel: HTMLElement = document.createElement("div");
            effortLabel.innerHTML = p_ShipOwners[i].getID() + ":";
            effortLabel.style.cssFloat = "left";
            cell.appendChild(effortLabel);

            cell = row.insertCell();
            cell.className = "slider-value-cell";
            var sliderValue: HTMLDivElement = document.createElement("div");
            sliderValue.id = "effortValue" + p_ShipOwners[i].getID();
            cell.appendChild(sliderValue);

            cell = row.insertCell();
            cell.className = "slider-cell";
            var slider: HTMLElement = document.createElement("div");
            slider.id = "effortSlider" + p_ShipOwners[i].getID();
            slider.style.width = "70%";
            slider.style.cssFloat = "right";
            slider.style.margin = "10px";
            cell.appendChild(slider);
            $("#effortSlider" + p_ShipOwners[i].getID()).slider();
            $("#effortSlider" + p_ShipOwners[i].getID()).slider("option", "min", 0);
            $("#effortSlider" + p_ShipOwners[i].getID()).slider("option", "max", 100);
            sliderValue.innerHTML = $("#effortSlider" + p_ShipOwners[i].getID()).slider("option", "value");
        }
        //Create landing distrubution sliders
        var landingLegend: HTMLElement = document.createElement("legend");
        landingLegend.classList.add("menu-legend");
        var landingLabel: HTMLElement = document.createElement("div");
        landingLabel.innerHTML = "Landing Distrubution";
        landingLabel.className = "legend-header";
        landingLegend.appendChild(landingLabel);
        menuDiv.appendChild(landingLegend);
        var landingTable: any = document.createElement("TABLE");
        landingTable.classList.add("menu-text");
        landingLegend.appendChild(landingTable);

        for (var i = 0; i < p_landingSites.length; i++) {
            var row: HTMLTableRowElement = landingTable.insertRow();
            var cell: HTMLTableCellElement = row.insertCell();
            var label: HTMLElement = document.createElement("div");
            label.innerHTML = p_landingSites[i].getID() + ":";
            label.style.cssFloat = "left";
            cell.appendChild(label);

            cell = row.insertCell();
            cell.className = "slider-value-cell";
            var sliderValue: HTMLDivElement = document.createElement("div");
            sliderValue.id = "landingValue" + p_landingSites[i].getID();
            cell.appendChild(sliderValue);

            cell = row.insertCell();
            cell.className = "slider-cell";
            var slider: HTMLElement = document.createElement("div");
            slider.id = "landingSlider" + p_landingSites[i].getID();
            slider.style.width = "70%";
            slider.style.cssFloat = "right";
            slider.style.margin = "10px";
            cell.appendChild(slider);
            $("#landingSlider" + p_landingSites[i].getID()).slider();
            $("#landingSlider" + p_landingSites[i].getID()).slider("option", "min", 0);
            $("#landingSlider" + p_landingSites[i].getID()).slider("option", "max", 100);
            sliderValue.innerHTML = $("#landingSlider" + p_landingSites[i].getID()).slider("option", "value");
        }

        //Create maximum number of ships slider
        var legend: HTMLElement = document.createElement("legend");
        legend.classList.add("menu-legend");
        var label: HTMLElement = document.createElement("div");
        label.innerHTML = "Maximum number of ships";
        label.className = "legend-header";
        legend.appendChild(label);
        menuDiv.appendChild(legend);

        var table: any = document.createElement("TABLE");
        table.classList.add("menu-text");
        legend.appendChild(table);
        var row: HTMLTableRowElement = table.insertRow();

        var cell: HTMLTableCellElement = row.insertCell();
        var valueDiv: HTMLDivElement = document.createElement("div");
        cell.appendChild(valueDiv);
        valueDiv.innerHTML = "1";
        cell.className = "slider-value-cell";
        valueDiv.id = "maxNoShips";

        var cell = row.insertCell();
        var slider: HTMLElement = document.createElement("div");
        slider.id = "noOfShipsSlider";
        slider.style.width = "70%";
        slider.style.cssFloat = "right";
        slider.style.margin = "10px";
        cell.className = "slider-cell";
        cell.appendChild(slider);
        $("#noOfShipsSlider").slider();
        $("#noOfShipsSlider").slider("option", "min", 0);
        $("#noOfShipsSlider").slider("option", "max", 50);
        $("#noOfShipsSlider").slider("value", 1);
        
        //Create buttons
        var buttonsDiv: HTMLElement = document.createElement("legend");
        buttonsDiv.classList.add("menu-legend");
        var labelDiv: HTMLElement = document.createElement("div");
        labelDiv.className = "legend-header";
        labelDiv.innerHTML = "Simulation control";
        buttonsDiv.appendChild(labelDiv);
        menuDiv.appendChild(buttonsDiv);

        var startButton: HTMLDivElement = document.createElement("div");
        startButton.id = "startButton";
        startButton.style.margin = "10px";
        startButton.classList.add("ui-button");
        startButton.classList.add("fa");
        startButton.classList.add("fa-play");
        buttonsDiv.appendChild(startButton);

        var pauseButton: HTMLDivElement = document.createElement("div");
        pauseButton.id = "pauseButton";
        pauseButton.style.margin = "10px";
        pauseButton.classList.add("fa");
        pauseButton.classList.add("fa-pause");
        pauseButton.classList.add("ui-button");
        pauseButton.classList.add("marked");
        buttonsDiv.appendChild(pauseButton);

        var fastForwardButton: HTMLDivElement = document.createElement("div");
        fastForwardButton.id = "fastForwardButton";
        fastForwardButton.style.margin = "10px";
        fastForwardButton.classList.add("fa");
        fastForwardButton.classList.add("fa-fast-forward");
        fastForwardButton.classList.add("ui-button");
        buttonsDiv.appendChild(fastForwardButton); 
    }
    
    public updateScore(p_government: Government): void {
        $("#financialScore").text(Math.round(p_government.getScore().getFinancialScore()));
        $("#socailScore").text(Math.round(p_government.getScore().getSocialScore()));
        $("#environmentalScore").text(Math.round(p_government.getScore().getEnvironmentalScore()));
    }
}