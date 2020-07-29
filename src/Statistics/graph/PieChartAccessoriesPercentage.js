import React from 'react';
import { VictoryBar, VictoryLine, VictoryPie, VictoryGroup, VictoryScatter, VictoryChart, VictoryLabel, VictoryTheme, VictoryAxis, VictoryZoomContainer } from "victory-native";
import * as utils from '../statisticsUtils';
import { acc } from 'react-native-reanimated';

export default function PieChartAccessoriesPercentage({ wardrobe }) {


    // 실제 data 

    /*  

     const clothing = wardrobe.clothing;
     const shoes = wardrobe.shoes;
     const accessories = wardrobe.accessories;
     const clothes = clothing.concat(shoes).concat(accessories); 
     
     */

    //  dummy data 

    const accessories = utils.accessories;

    // 서버, dummy 공통적용
    const accessoriesPrice = utils.getPrice(accessories);

    const bagList = utils.getTypeList(accessories, 'bag');
    const headList = utils.getTypeList(accessories, 'head');
    const otherList = utils.getTypeList(accessories, 'other');

    var data = [
        { type: 'bag', percentage: Math.floor(utils.getPrice(bagList) / accessoriesPrice * 100) },
        { type: 'head', percentage: Math.floor(utils.getPrice(headList) / accessoriesPrice * 100) },
        { type: 'other', percentage: Math.floor(utils.getPrice(otherList) / accessoriesPrice * 100) },
    ]


    function transformPieLabels({ datum }) {
        let label = `${datum.type}\n\n${datum.percentage}%`
        return (label);

    }
    return (
        <>
            <VictoryPie
                animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 },
                    easing: "bounce"
                }}
                standalone={true}
                width={400} height={400}
                style={{ labels: { fill: "black", fontWeight: '700' } }}
                theme={VictoryTheme.material}
                data={data} x={'type'} y={'percentage'}
                innerRadius={50}
                labelRadius={72}
                labels={transformPieLabels}
            />
        </>
    )

}
