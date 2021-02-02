import React, {
	useEffect,
	useState
} from 'react';
import {cloud,point} from './base'

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/lines';
import 'echarts/lib/chart/graph';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const  BottomEcharts = (props) => {
  const [bgColor,setbgColor] = useState('rgba(0,0,0,0)')
  const {items,setFlag} = props

  let [dataArr, allArr, erArr, sanArr,circleLineArr,orientationArr] = [[],[],[],[],[],[]];
    // 点
    items.forEach((el, index) => {
    if (el.pointType === "cloud") {
      // 云
      el.symbol = cloud
      el.symbolSize = [30, 30];
      el.label = {
        normal: {
          show: true,
          position: "bottom",
          borderWidth: 1,
          borderRadius: 12,
          padding: [4, 8, 4, 8],
          distance: 4,
          color: "rgb(89,197,238)",
          borderColor: "rgb(89,197,238)",
        },
      };
      erArr.push(el);
      // console.log('erArr', erArr)
    } else if (el.pointType === "point") {
      // 球
      el.symbol = point
      el.symbolSize = [25, 25];
      // el.label = {
      //   normal: {
      //     show: true,
      //     position: "bottom",
      //     borderWidth: 1,
      //     borderRadius: 12,
      //     padding: [4, 8, 4, 8],
      //     distance: 4,
      //     color: "rgb(89,197,238)",
      //     borderColor: "rgb(89,197,238)",
      //   },
      // };
      el.itemStyle = {
        borderColor: el.pointColor ? el.pointColor : 'rgba(4, 242, 28, 1)',
        borderWidth: 3,
        color: "#0ceffd",
      };
      if (el.belong && !items.some((iteP) => el.belong === iteP.name)) {
        items.splice(index, 1);
      } else {
        sanArr.push(el);
      }
      // console.log('sanArr', sanArr)
    }
    if (!el.belong) {
      el.children = [];
      items.forEach((es) => {
        if (es.belong === el.name) {
          el.children.push(es);
        }
      });
      allArr.push(el);
    }
  });

  // 圆形分区
  function group(arr, r) {
    const newArray = [];
    const { length: arLen} = arr;
    arr.forEach((e, index) => {
      // 按角度均匀分布
      let ang = 180 - (180 / (arLen-1)).toFixed(4) * (index);
      const x = (Math.cos(ang * Math.PI / 180)).toFixed(4) * r;
      const y = (Math.sin(ang * Math.PI / 180)).toFixed(4) * r;
      e.value = [x.toFixed(4), y.toFixed(4)];
      if (e.belong) {
        // :TODO:角度需要重新计算
        let rotate = '0';
        const angle = (180 / arr.length).toFixed(4);
        if (x==0) {
          console.log('ang======', ang)
          console.log('arr[index]', arr[index])
        }
        if (x > 0 ) {
          rotate = (r - angle * (index-1)).toFixed(4);
          // rotate = (90 - 360 / arr.length * (index + 1)).toFixed(4);
        } else if (x <= 0 ) {
          rotate = (-r + angle * (arr.length - index + 1)).toFixed(4);
        } 
        console.log('rotate :>> ', rotate);
        e.label = {
            normal: {
            show: true,
            position: "bottom",
            // borderWidth: 1,
            // borderRadius: 12,
            // padding: [4, 8, 4, 8],
            distance: 2,
            color: "rgb(89,197,238)",
            borderColor: "rgb(89,197,238)",
            // rotate: rotate*0.1,
            rotate:x > 0 ? ang : -(180 - ang ),
            align: x > 0 ? 'left' : 'right',
            padding: x > 0 ? [-15, 13,0, 30] : [-15, 30, 10, 0],//
          },
          // show: true,
          // width: 200,
          // color: {
          //   lineColor: {
          //     color: "rgb(24,163,239)",
          //   },
          // },
          // rotate:rotate*0.1,
          // align: x > 0 ? 'left' : 'right',
          // padding: x > 0 ? [-20, 20, 0, 20] : [-40, 16, 0, 0],
        };
      }
      newArray.push(e);
    });
    console.log('newArray :>> ', newArray);
    return newArray;
  }
  // 线配置
  function linesConfig(arr) {
    const [dataArr, targetCoord] = [ [], [0, 0] ];
    arr.forEach((el) => {
      // console.log('el', el)
      if (!el.belong) {
        dataArr.push([{
          coord: targetCoord
        },
        {
          coord: el.value,
          // lineStyle: el.lineStyle,
          effect: {
            symbolSize: [4, 16], // 动画的大小
            period: 6, // 时间快慢
            delay: 2, // 延时计算
            ...el.effect,
          },
        },
        ]);
        arr.forEach((element) => {
          if (element.belong === el.name) {
            dataArr.push([{
              coord: el.value
            },
            {
              coord: element.value,
              lineStyle: element.lineStyle,
              effect: {
                symbolSize: [4, 8], // 动画的大小
                period: 6, // 时间快慢
                delay: 2, // 延时计算
                ...element.effect,
              },
            }
            ]);
          }
        });
      }
    });
    return dataArr;
  }
  //环形线绘制
  function circleLine(erArr,sanArr) {
    let arr = []
    erArr.map((i,v) => {
      if (v<erArr.length-1) {
        circleLineArr.push({source:i.name,target:erArr[v+1].name})
      }else{
        // circleLineArr.push({source:erArr[v].name,target:erArr[0].name})
      }
    })
    sanArr.map((i,v) => {
      if (v<sanArr.length-1) {
        circleLineArr.push({source:i.name,target:sanArr[v+1].name})
      }else{
        // circleLineArr.push({source:sanArr[v].name,target:sanArr[0].name})
      }
    })
    return circleLineArr
  }
  //关系指向
  function  orientation(allArr) {
    // console.log('allArr', allArr)
    allArr.map((i,v) => {
      allArr.map((o,p) => {
        if (i.belong === o.name) {
          orientationArr.push({source:o.name,target:i.name})
        }
      })
    })
    // console.log('orientationArr', orientationArr)
    return orientationArr
  }
  // 点分布
  erArr = group(erArr, 35);
  sanArr = group(sanArr, 70);
  allArr = [...erArr, ...sanArr];
  // 线坐标和配置
  dataArr = linesConfig(allArr);
  circleLineArr = circleLine(erArr,sanArr)
  orientationArr = orientation(allArr)
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('graph'));

		const option = {
			xAxis: {
				show: false,
				type: "value",
				max: 75,
				min: -75,
			},
			grid: {
				top: 50,
				bottom: 50,
				left: 50,
				right: 50,
			},
			yAxis: {
				show: false,
				type: "value",
				max: 75,
				min: -75,
			},
			series: [
        {
        type: "graph",
        hoverAnimation: true,
        coordinateSystem: "cartesian2d",
        legendHoverLink : true,
        roam: true,
        focusNodeAdjacency: true,
        layout : 'circular',
				z: 3,
				itemStyle: {
					normal: {
						shadowColor: "none",
					},
				},
        data: allArr,
        edges: orientationArr
			},

			],
		}
    myChart.setOption(option);
    myChart.on('click', function (e) {
      // console.log('e', e)
  });
    myChart.on('mousemove', function (h) {
      setFlag(false)
      setbgColor('rgba(0,0,0,1)')
  });
    myChart.on('mouseout', function (h) {
      setFlag(true)
      setbgColor('rgba(0,0,0,0)')
  });
		window.addEventListener('resize', function () {
			myChart.resize();
		})
  }, [])
  return(
    <div style={{position:'absolute',top:'0',left:'0',height: '1000px',overflow:'hidden',zIndex:'9'}}>
      <div id="graph" style={{	width: '1800px',height: '1800px',background:bgColor}} ></div>
    </div>
  )
}

export default BottomEcharts