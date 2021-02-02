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
  const {item,flag} = props
  let items = Object.assign([],item)
  let [dataArrs, allArrs, erArrs, sanArrs,circleLinesArrs,orientationsArrs] = [[],[],[],[],[],[]];
    // 点
    items.forEach((el, index) => {
    if (el.pointType === "cloud") {
      // 云
      // el.symbol = cloud
      // el.symbolSize = [30, 30];
      erArrs.push(el);
      // console.log('erArrs', erArrs)
    } else if (el.pointType === "point") {
      // 球
      // el.symbol = point
      // el.symbolSize = [30, 30];
      if (el.belong && !items.some((iteP) => el.belong === iteP.name)) {
        items.splice(index, 1);
      } else {
        sanArrs.push(el);
      }
      // console.log('sanArrs', sanArrs)
    }
    if (!el.belong) {
      el.children = [];
      items.forEach((es) => {
        if (es.belong === el.name) {
          el.children.push(es);
        }
      });
      allArrs.push(el);
    }
  });

  // 圆形分区
  function groups(arr, r) {
    const newArray = [];
    const { length: arLen} = arr;
    // console.log('arr :>> ', arr);
    // console.log('arLen :>> ', arLen);
    arr.forEach((e, index) => {
      // console.log('e', e)
      // console.log('index', index)
      // 按角度均匀分布
      let ang = 180 - (180 / (arLen-1)).toFixed(4) * (index);
      // console.log('ang :>> ', ang);
      const x = (Math.cos(ang * Math.PI / 180)).toFixed(4) * r;
      const y = (Math.sin(ang * Math.PI / 180)).toFixed(4) * r;
      e.value = [x.toFixed(4), y.toFixed(4)];
      if (e.belong) {
        let rotate = '';
        const angle = (180 / arr.length).toFixed(4);
        // console.log('angle :>> ', angle);
        
        if (x > 0 && y >= 0) {
          rotate = (r - angle * (index-1)).toFixed(4);
          // rotate = (90 - 360 / arr.length * (index + 1)).toFixed(4);
        } else if (x <= 0 && y > 0) {
          rotate = (-r + angle * (arr.length - index + 1)).toFixed(4);
        } else if (x < 0 && y <= 0) {
          rotate = (r - angle * (index - arr.length * 0.5)).toFixed(4);
        } else if (x >= 0 && y < 0) {
          rotate = (-8 + angle * (arr.length * 0.25 - index -1)).toFixed(4);
        }
        e.label = {
          // show: true,
          width: 200,
          color: {
            lineColor: {
              color: "rgb(24,163,239)",
            },
          },
          rotate,
          align: x > 0 ? 'left' : 'right',
          padding: x > 0 ? [0, 0, 0, 16] : [0, 16, 0, 0],
        };
      }
      newArray.push(e);
    });
    // console.log('newArray', newArray)
    return newArray;
  }
  // 线配置
  function linesConfigs(arr) {
    const [dataArrs, targetCoord] = [ [], [0, 0] ];
    arr.forEach((el) => {
      // console.log('el', el)
      if (!el.belong) {
        dataArrs.push([{
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
            dataArrs.push([{
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
    // console.log('dataArrs=====', dataArrs)
    return dataArrs;
  }
  //环形线绘制
  function circleLines(erArrs,sanArrs) {
    let arr = []
    erArrs.map((i,v) => {
      if (v<erArrs.length-1) {
        circleLinesArrs.push({source:i.name,target:erArrs[v+1].name})
      }else{
        // circleLinesArrs.push({source:erArrs[v].name,target:erArrs[0].name})
      }
    })
    sanArrs.map((i,v) => {
      if (v<sanArrs.length-1) {
        circleLinesArrs.push({source:i.name,target:sanArrs[v+1].name})
      }else{
        // circleLinesArrs.push({source:sanArrs[v].name,target:sanArrs[0].name})
      }
    })
    return circleLinesArrs
  }
  //关系指向
  function  orientations(allArrs) {
    // console.log('allArrs', allArrs)
    allArrs.map((i,v) => {
      allArrs.map((o,p) => {
        if (i.belong === o.name) {
          orientationsArrs.push({source:o.name,target:i.name})
        }
      })
    })
    // console.log('orientationsArrs', orientationsArrs)
    return orientationsArrs
  }
  // 点分布
  erArrs = groups(erArrs, 35);
  // console.log('erArrs', erArrs)
  sanArrs = groups(sanArrs, 70);
  allArrs = [...erArrs, ...sanArrs];
  // 线坐标和配置
  dataArrs = linesConfigs(allArrs);
  circleLinesArrs = circleLines(erArrs,sanArrs)
  orientationsArrs = orientations(allArrs)
	useEffect(() => {
		const myChart = echarts.init(document.getElementById('lines'));
		const option = {
			backgroundColor: 'rgba(0,0,0,1)',
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
				name: "",
				type: "lines",
				coordinateSystem: "cartesian2d",
				polyline: true,
				z: 1,
				lineStyle: {
					width: 2,
					color: '#99CCCC',
					curveness: 0,
				},
				effect: {
					show: true,
					smooth: false,
					trailLength: 0, // 拖尾的长度
					symbol: 'pin', // 动画的类型
				},
				data: dataArrs,
      },
      {
        type: "graph",
        // hoverAnimation: true,
        coordinateSystem: "cartesian2d",
        // legendHoverLink : true,
        // roam: true,
        // focusNodeAdjacency: true,
        layout : 'circular',
				z: 3,
				itemStyle: {
					normal: {
						shadowColor: "none",
					},
				},
        data: allArrs,
        edges: circleLinesArrs
			},
			],
    }
    myChart.on('mousemove', function (h) {
      // console.log('BottomEcharts', h)
      // setFlag(false)
      // setbgColor('rgba(0,0,0,1)')
  });
    myChart.setOption(option);
		window.addEventListener('resize', function () {
			myChart.resize();
		})

  }, [])
  return(
    <div style={{position:'absolute',top:'0',left:'0',height: '1000px',overflow:'hidden',zIndex:'2',display: flag ?'block':'none'}}>
      <div id="lines" style={{	width: '1800px',height: '1800px',display: flag ?'block':'none'}} ></div>
    </div>
  )
}

export default BottomEcharts