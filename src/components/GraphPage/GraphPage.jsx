import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Scatter } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart } from 'react-chartjs-2';
import { Grid, List, PlusCircle, Tool, AlertCircle, CheckCircle } from 'react-feather';


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


  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
  
  // To set two dates to two variables
  //date1 is today's date, date2 is due date
  let currentDate = new Date(date);
  console.log(currentDate);
  let today = currentDate.getTime();
  console.log("today", today);

  let overDueArray = [];
console.log("overdue", overDueArray);

function overdueFilter() {
    listItems.map( item => {
        let dueDate = new Date(item.due_date);
        let dueDateNumber = dueDate.getTime();
        if (dueDateNumber < currentDate && item.completion_status === false) {
           overDueArray.push(item); 
        }
        return (
            console.log("overDueArray", overDueArray)
        )
    })
}

overdueFilter();

let overdueCount = overDueArray.length;
console.log(overdueCount);

let filteredArray = [];
console.log("filteredArray", filteredArray);

function filter() {
    listItems.map( item => {
        let dueDate = new Date(item.due_date);
        let dueDateNumber = dueDate.getTime();
        if (dueDateNumber > currentDate && item.completion_status === false) {
           filteredArray.push(item); 
        }
        return (
            console.log("filteredArray", filteredArray)
        )
    })
}

filter();


    const getScatterData = () => {
        
        return filteredArray.map(item => {
          return {
            
            type: 'scatter',
            label: item.task,
            data: [{x: item.xValue, y: item.yValue}],
            backgroundColor: 'black',
            

           
          };
        });
      };

      console.log(filteredArray);
      let itemIndex = -1;

    function clickCompleted() {
        history.push('/completed-tasks');
    }

    function clickOverdue() {
        history.push('/overdue-tasks');
    }

    return(
        <>
        {/* <div className="HeaderFooterSpace"></div> */}

        <div id="graph">
        <div className="HeaderFooterSpaceGraph"></div>
            <div id="toolIconDiv">
            <span id="ToolIcon" >
                <Tool color='black' size="30" /> 
            </span>
            click on graph point to view task details
            </div>
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
                            
                        filteredArray.map(item => {
                            itemIndex += 1;
                            if (itemIndex === element[0].datasetIndex) {
                                history.push(`/details/${item.id}`)
                                return (
                                    console.log(item.task)
                                )
                                
                            }

                        })
                        }

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
                            pointRadius: 6
                         
                            
                        }
                    },
                
                }}
      
           
            />
        </div>

        <div id="completedTasksAlert" onClick={() => clickCompleted()}>
        <span id="completedIcon" >
                <CheckCircle color='black' size="30" /> 
        </span> 
        click to view completed task archive
        </div>
        <div id="overdueTasksAlert" onClick={() => clickOverdue()}>
  
            {(() => {
             if (overdueCount === 1) {
                return (
                    <div>
                    <span id="alertIcon" >
                            <AlertCircle color='black' size="30" /> 
                    </span>
                    click to view {overdueCount} overdue Task!
                    </div> 
                    
                )
            } else if (overdueCount > 0) {
                return (
                    <div>
                    <span id="alertIcon" >
                            <AlertCircle color='black' size="30" /> 
                    </span>
                    click to view {overdueCount} overdue Tasks!
                    </div> 
                    
                )
            }
            })()}
        </div>
    </>
    )
    
}

export default GraphPage;

