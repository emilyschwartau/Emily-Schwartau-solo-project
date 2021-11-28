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
  function pointClick() {
      history.push(`/details/${id}`);
  }


    const getScatterData = () => {
        
        return listItems.map(item => {
          return {
            
            type: 'scatter',
            label: item.task,
            data: [{x: item.xValue, y: item.yValue}],
            backgroundColor: 'black',

           
          };
        });
      };

      console.log(listItems);
      let itemIndex = -1;
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
                    onClick: function(evt, element) {
                        if (element.length > 0) {
                            
                        listItems.map(item => {
                            itemIndex += 1;
                            if (itemIndex === element[0].datasetIndex) {
                                history.push(`/details/${item.id}`)
                                return (
                                    console.log(item.task)
                                )
                                
                            }

                        })
                        }
                        // if (element.length > 0)  {
                        //     console.log('clicked point', element[0].datasetIndex);
                        //     console.log(listItems[]);
                        // }
                    },
                    scales: {
                        y: {
                            max: 14,
                            min: 0, 
                            ticks: {
                                stepSize: 1,
                                display: false
                            },
                            grid: {
                                display: false
                             
                            },
                            title: {
                                text: "urgency → ",
                                display: true,
                                font: {
                                    size: 20
                                }
                            }
                        },
                        x: {
                            max: 14,
                            min: 0,
                            ticks: {
                                stepSize: 1,
                                display: false
                            },
                            grid: {
                                display: false
                            },
                            title: {
                                text: "importance → ",
                                display: true,
                                font: {
                                    size: 20
                                }
                            }
                        }
                    },
               
                    aspectRatio: 1,
                    plugins: {
                        chartAreaBorder: {
                            borderColor: 'black',
                            borderWidth: 10,
                               
                        },
                    
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
                                    backgroundColor: 'rgba(248, 20, 20, 0.3)'
                                },
                                box2: {
                                    type: 'box',
                                    xMin: 7,
                                    xMax: 14,
                                    yMin: 7,
                                    yMax: 14,
                                    backgroundColor: 'rgba(0, 194, 4, 0.3)'
                                },
                                box3: {
                                    type: 'box',
                                    xMin: 0,
                                    xMax: 7,
                                    yMin: 7,
                                    yMax: 14,
                                    backgroundColor: 'rgba(9, 22, 199, 0.3)'
                                },
                                box4: {
                                    type: 'box',
                                    xMin: 7,
                                    xMax: 14,
                                    yMin: 0,
                                    yMax: 7,
                                    backgroundColor: 'rgba(225, 121, 34, 0.3)'
                                }
                            }
                        }

                    },
                    elements: {
                        point: {
                            hoverRadius: 7,
                         
                            
                        }
                    },
                
                }}
      
           
            />
        </div>
    </>
    )
    
}

export default GraphPage;

