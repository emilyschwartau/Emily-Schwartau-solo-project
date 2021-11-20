import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Scatter } from 'react-chartjs-2';

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
            label: 'Scatter Dataset',
            data: [{x: item.xValue, y: item.yValue}],
            backgroundColor: 'rgb(255, 99, 132)'
           
          };
        });
      };

    return(
        <>
        <h1>Graph goes here!</h1>
        <div>
            <Scatter
                const data = {{
                    datasets: [...getScatterData()],
                }}
            />
        </div>
    </>
    )
    
}

export default GraphPage;

