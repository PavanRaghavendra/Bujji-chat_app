import React from 'react';
import {getLast7Days} from '../../lib/features'
import {Line,Doughnut} from 'react-chartjs-2';
import { ArcElement, 
    CategoryScale, 
    Chart as ChartJs, 
    Filler, 
    Legend, 
    LineElement, 
    LinearScale, 
    PointElement, 
    Tooltip, 
    plugins,
    scales} from 'chart.js';
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    ArcElement,
    Legend,
    Tooltip
);
const lineChartOptions={
    responsive:true,
    plugins:{
        legend:
        {
            display:false,
        },
        title:
        {
            display:false,
        },
    },
    scales:
    {
        x:
        {
            grid:{
                display:false,
            }
          //  display:false,
        },
        y:
        {
            beginAtZero:true,
            grid:
            {
                display:false,
            }
           // display:false,
        }
    }
};
const getlabel=getLast7Days();
const Charts = ({value}) => {
    const data={
        labels:getlabel,
        datasets:[{
            data:value,
            label:"Messages",
            fill:true,
            backgroundColor:"rgba(75,192,192,0.2)",
            borderColor:"rgba(75,192,192,1)"
        }
    ]
    };
  return (
    <div>
        <Line data={data} options={lineChartOptions}/>
    </div>
  )
}
const doughnutChartOptions={
    responsive:true,
    plugins:{
        legend:
        {
            display:false,
        },
        title:
        {
            display:false,
        },
    },
};
const PillaMessage=({value,labels})=>
    {
        const data={
            labels,
            datasets:[
                {
                    data:value,
                    fill:true,
                    backgroundColor:["rgba(75,12,192,0.2)","rgba(75,192,192,0.2)"],
                     borderColor:["rgba(75,12,192,1)","rgba(75,192,192,0.2)"]
                }
            ]
        }
        return (
            <div>
                <Doughnut data={data} options={doughnutChartOptions}/>
            </div>
        )
    }

export { Charts,PillaMessage}