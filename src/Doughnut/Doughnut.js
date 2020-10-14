import React, {Component} from 'react';
import Chart from "chart.js";

export default class Doughnut extends Component {

    componentDidUpdate() {
        this.buildChart();
    }
    componentDidMount(){
        this.buildChart();
    }

    buildChart = () => {
        const { data, labels } = this.props;
        var ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, {
            type: "doughnut",
            data: {
                //Bring in data
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        "#3e95cd",
                        "#8e5ea2",
                        "#3cba9f",
                        "#e8c3b9",
                        "#c45850",
                        "rgba(255,221,50,0.2)",
                        "rgba(60,186,159,0.2)",
                        "rgba(0,0,0,0.2)",
                        "rgba(193,46,12,0.2)"
                    ],
                }]
            },
            options: {
                responsive: false,
        
            }
        });
    }


    render() {
        return (
            <>
                <canvas id="myChart" width="400" height="400"></canvas>
            </>
          );
    }
  
}

