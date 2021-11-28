import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Scatter } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart } from 'react-chartjs-2';


Chart.register(annotationPlugin);

function GraphPage() {

    //firing off actions to get data from DB
    useEffect(() => {
        dispatch({ type: 'FETCH_LIST_ITEMS' });
    }, []);

    const dispatch = useDispatch();
    const history = useHistory();

    const listItems = useSelector(store => store.listItemsReducer);
    const user = useSelector((store) => store.user);

    console.log('listItems', listItems);

    // const prioritizedData= [].concat(listItems)
    // .sort((a,b) => a.priorityValue < b.priorityValue ? 1 : -1);

    // console.log('prioritized data', prioritizedData);

    const getScatterData = () => {
        return listItems.map(item => {
          return {
            type: 'scatter',
            label: item.id,
            data: [{x: item.xValue, y: item.yValue}],
            backgroundColor: 'rgb(255, 99, 132)'
           
          };
        });
      };

    // const getLineData = () => {
    //     return {
            
           
    //          type: 'line',
    //          data: [7, 7, 7, 7],
    //          backgroundColor: 'rgb(255, 99, 132)'
            
    //     }
    // }

    // let lineGraph = 
    // <Line
    // const data = {{
    //     datasets: [{
    //         data: [7, 7, 7, 7]
    //     }]
    // }}
    
    
    
    ///>

    return(
        <>
        {/* <div className="HeaderFooterSpace"></div> */}
        <div id="graph">
        <div className="HeaderFooterSpaceGraph"></div>
            <Scatter id="canvas"
                const data = {{
                    datasets: [...getScatterData()
                    // {
                    //     label: 'Dataset 1',
                    //     data: [{x: 4, y: 10}],
                    //     borderColor: 'red',
                    //     backgroundColor: 'red',
                    // }
                    ],
                }}
                const options = {{
                    scales: {
                        y: {
                            max: 14,
                            min: 0, 
                            ticks: {
                                stepSize: 1
                            },
                            grid: {
                                display: false
                             
                            }
                        },
                        x: {
                            max: 14,
                            min: 0,
                            ticks: {
                                stepSize: 1
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    aspectRatio: 1,
                    plugins: {
                        legend: {
                            display: false
                        },
                        annotation: {
                            annotations: {
                                box1: {
                                    type: 'box',
                                    xMin: 0,
                                    xMax: 7,
                                    yMin: 0,
                                    yMax: 7,
                                    backgroundColor: 'rgba(248, 20, 20, 0.79)'
                                },
                                box2: {
                                    type: 'box',
                                    xMin: 7,
                                    xMax: 14,
                                    yMin: 7,
                                    yMax: 14,
                                    backgroundColor: 'rgba(0, 194, 4, 0.85)'
                                },
                                box3: {
                                    type: 'box',
                                    xMin: 0,
                                    xMax: 7,
                                    yMin: 7,
                                    yMax: 14,
                                    backgroundColor: 'rgba(9, 22, 199, 0.71)'
                                },
                                box4: {
                                    type: 'box',
                                    xMin: 7,
                                    xMax: 14,
                                    yMin: 0,
                                    yMax: 7,
                                    backgroundColor: 'rgba(225, 121, 34, 0.69)'
                                }
                            }
                        }

                    },
                    elements: {
                        point: {
                            hoverRadius: 7
                        }
                    },
                
                }}
                // const quadrants = {{
                //     id: 'quadrants',
                //     beforeDraw(chart, args, options) {
                //       const {ctx, chartArea: {left, top, right, bottom}, scales: {x, y}} = chart;
                //       const midX = x.getPixelForValue(0);
                //       const midY = y.getPixelForValue(0);
                //       ctx.save();
                //       ctx.fillStyle = options.topLeft;
                //       ctx.fillRect(left, top, midX - left, midY - top);
                //       ctx.fillStyle = options.topRight;
                //       ctx.fillRect(midX, top, right - midX, midY - top);
                //       ctx.fillStyle = options.bottomRight;
                //       ctx.fillRect(midX, midY, right - midX, bottom - midY);
                //       ctx.fillStyle = options.bottomLeft;
                //       ctx.fillRect(left, midY, midX - left, bottom - midY);
                //       ctx.restore();
                //     }
                // }}
                // const config = {{
                //     type: 'scatter',
                //     data: data,
                //     options: {
                //       plugins: {
                //         quadrants: {
                //           topLeft: 'orange',
                //           topRight: 'blue',
                //           bottomRight: 'green',
                //           bottomLeft: 'yellow',
                //         }
                //       }
                //     },
                //     plugins: [quadrants]
                // }}
            />
        </div>
    </>
    )
    
}

export default GraphPage;

