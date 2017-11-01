import React from "react";
import Tableau from "tableau-api";
import { VictoryLabel, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';

class TableauTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = { victoryData: {}, viz: {}, label: "12 month home value forecast" };
    }

    initTableau() {
        const vizUrl = "https://tableau.coenterprise.com/t/DemoSite/authoring/PoCemailcampaign/RegionalEmailCampaign#1";

        const options = {
            hideTabs: true,
            width: "1300px",
            height: "1300px",
            onFirstInteractive: () => {
                const sheet = viz.getWorkbook().getActiveSheet().getWorksheets().get("Table");
                const options = {
                    ignoreAliases: false,
                    ignoreSelection: false,
                    includeAllColumns: false
                };
                sheet.getUnderlyingDataAsync(options).then((t) => {
                    const tableauData = t.getData();
                    let data = [];
                    const pointCount = tableauData.length;
                    for (let a = 0; a < pointCount; a++) {
                        data = data.concat({
                            x: tableauData[a][0].value,
                            y: Math.round(tableauData[a][3].value, 2)
                        })
                    };
                    this.setState({
                        victoryData: data
                    });
                })
            }
        };

        let viz = new tableau.Viz(this.container, vizUrl, options);
        this.setState({
            viz: viz
        })
    }

    render() {

        return <div ref={c => (this.container = c)}

            //this will adjust where the component actually goes
        
 />;
    }

    componentDidMount() {
        this.initTableau();
    }
}

export default TableauTest;