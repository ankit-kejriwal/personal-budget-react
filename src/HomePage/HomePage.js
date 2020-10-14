import React, { useEffect, useState } from 'react';
import Doughnut from '../Doughnut/Doughnut';
import PieChart from '../PieChart/PieChart';
import axios from 'axios';

function HomePage() {

    const [dataState, setDataState] = useState({
        data: [],
        labels: []
    });

    useEffect(() => {
        const apiUrl = `http://localhost:3001/budget`;
        var newData = [];
        var newLabels = [];
        axios.get(apiUrl)
        .then(res => {
            for(var i  = 0;i<res.data.myBudget.length;i++){
                newData[i] = res.data.myBudget[i].budget;
                newLabels[i] = res.data.myBudget[i].title;
            }
            setDataState({
                data: newData,
                labels: newLabels
            })
        })
      }, []);
  return (
    <main id="main" aria-label="Main" className="container center">
        <section 
         className="page-area">

            <article   className="text-box">
                <h2>Stay on track</h2>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article  className="text-box">
                <h2>Alerts</h2>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article  className="text-box">
                <h2>Results</h2>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article   className="text-box">
                <h2>Free</h2>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>
    
            <article  className="text-box">
                <h2>Stay on track</h2>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article  className="text-box">
                <h2>Alerts</h2>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article  className="text-box">
                <h2>D3 Chart</h2>
                <PieChart dataPoint={dataState.data}
                    labels={dataState.labels}></PieChart>
            </article>
    
            <article  className="text-box">
                <h2>Chart</h2>
                <p>
                    <Doughnut data={dataState.data}
                    labels={dataState.labels} />
                </p>
            </article>

        </section>

    </main>
  );
}

export default HomePage;
