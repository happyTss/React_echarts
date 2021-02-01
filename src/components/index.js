import React, {
	useEffect,
	useState
} from 'react';
import {cloud,point} from './base'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/lines';
import 'echarts/lib/chart/graph';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default function Echarts(props) {
  const [flag,setFlag] = useState(true)
  const [bgColor,setbgColor] = useState('rgba(0,0,0,0)')
  let [dataArr, allArr, erArr, sanArr,circleLineArr,orientationArr] = [[],[],[],[],[],[]];
  // 行为标注 show first row
  let items = [{
    symbol: "",
    name: "市监狱局",
    pointType: "point",
    belong: "南开区",
    pointColor: 'rgba(217, 0, 27, 1)', // 球颜色
    lineStyle: {
      color: 'red', // 线颜色
    },
    effect: {
      period: 2, // 箭头快慢
      symbolSize: [6, 20], // 箭头大小
    },
  },
  {
    symbol: "",
    name: "南开区政府",
    pointType: "point",
    belong: "南开区",
  },
  {
    symbol: "",
    name: "市税务局",
    pointType: "point",
    belong: "河北区",
  },
  {
    symbol: "",
    name: "河北区政府",
    pointType: "point",
    belong: "河北区",
  },
  {
    symbol: "",
    name: "市公安局",
    pointType: "point",
    belong: "西青区",
  },
  {
    symbol: "",
    name: "西青区政府",
    pointType: "point",
    belong: "西青区",
  },
  {
    symbol: "",
    name: "市税务局数据中心",
    pointType: "point",
    belong: "空港IDC",
  },
  {
    symbol: "",
    name: "空港数据中心",
    pointType: "point",
    belong: "空港IDC",
  },
  {
    symbol: "",
    name: "武清区政府",
    pointType: "point",
    belong: "武清区",
  },
  {
    symbol: "",
    name: "市应急局",
    pointType: "point",
    belong: "市电子政务中心",
    label: {
      show: true,
      offset: [15, 15],
    },
  },
  {
    symbol: "",
    name: "市气象局",
    pointType: "point",
    belong: "市电子政务中心",
    label: {
      show: true,
      offset: [15, 20],
    },
  },
  {
    symbol: "",
    name: "市合作交流办",
    pointType: "point",
    belong: "市电子政务中心",
    label: {
      show: true,
      offset: [15, -15],
    },
  },
  {
    symbol: "",
    name: "市交通运输委",
    pointType: "point",
    belong: "市电子政务中心",
    label: {
      show: true,
      offset: [12, -10],
    },
  },
  {
    symbol: "",
    name: "市司法局",
    pointType: "point",
    belong: "市电子政务中心",
    label: {
      show: true,
      offset: [12, -8],
    },
  },
  {
    symbol: "",
    name: "市高法",
    pointType: "point",
    belong: "市电子政务中心",
    label: {
      show: true,
      offset: [10, -5],
    },
  },
  {
    symbol: "",
    name: "东丽区政府",
    pointType: "point",
    belong: "东丽区",
  },
  {
    symbol: "",
    name: "宝坻区政府",
    pointType: "point",
    belong: "宝坻区",
    label: {
      show: true,
      offset: [10, -5],
    },
  },
  {
    symbol: "",
    name: "市科技局",
    pointType: "point",
    belong: "和平区",
  },
  {
    symbol: "",
    name: "市统计局",
    pointType: "point",
    belong: "和平区",
  },
  {
    symbol: "",
    name: "和平区政府",
    pointType: "point",
    belong: "和平区",
  },
  {
    symbol: "",
    name: "蓟州区政府",
    pointType: "point",
    belong: "蓟州区",
  },
  {
    symbol: "",
    name: "河东区政府",
    pointType: "point",
    belong: "河东区",
  },
  {
    symbol: "",
    name: "市人防办",
    pointType: "point",
    belong: "河东区",
  },
  {
    symbol: "",
    name: "市粮食和物资储备局",
    pointType: "point",
    belong: "河东区",
  },
  {
    symbol: "",
    name: "市场监管委",
    pointType: "point",
    belong: "河东区",
  },
  {
    symbol: "",
    name: "河西区政府",
    pointType: "point",
    belong: "河西区",
  },
  {
    symbol: "",
    name: "市戒毒局",
    pointType: "point",
    belong: "河西区",
  },
  {
    symbol: "",
    name: "市安全局",
    pointType: "point",
    belong: "河西区",
  },
  {
    symbol: "",
    name: "市农委",
    pointType: "point",
    belong: "河西区",
  },
  {
    symbol: "",
    name: "市文旅局",
    pointType: "point",
    belong: "河西区",
  },
  {
    symbol: "",
    name: "市纪检委",
    pointType: "point",
    belong: "河西区",
  },
  {
    symbol: "",
    name: "静海区政府",
    pointType: "point",
    belong: "静海区",
  },
  {
    symbol: "",
    name: "北辰区政府",
    pointType: "point",
    belong: "北辰区",
  },
  {
    symbol: "",
    name: "红桥区政府",
    pointType: "point",
    belong: "红桥区",
  },
  {
    symbol: "",
    name: "滨海新区政府",
    pointType: "point",
    belong: "滨海新区",
  },
  {
    symbol: "",
    name: "宁河区政府",
    pointType: "point",
    belong: "宁河区",
  },
  {
    symbol: "",
    name: "市医保局",
    pointType: "point",
    belong: "烟台道联通机房",
  },
  {
    symbol: "",
    name: "市信访办",
    pointType: "point",
    belong: "烟台道联通机房",
  },
  {
    symbol: "",
    name: "市住建局",
    pointType: "point",
    belong: "烟台道联通机房",
  },
  {
    symbol: "",
    name: "市商务局",
    pointType: "point",
    belong: "烟台道联通机房",
  },
  {
    symbol: "",
    name: "市编办",
    pointType: "point",
    belong: "市政府",
  },
  {
    symbol: "",
    name: "市机要局",
    pointType: "point",
    belong: "市政府",
  },
  {
    symbol: "",
    name: "市政府办公厅",
    pointType: "point",
    belong: "市政府",
  },
  {
    symbol: "",
    name: "市委网信办",
    pointType: "point",
    belong: "市政府",
  },
  {
    symbol: "",
    name: "市委办公厅",
    pointType: "point",
    belong: "市政府",
  },
  {
    symbol: "",
    name: "市财政局数据中心",
    pointType: "point",
    belong: "市人大",
  },
  {
    symbol: "",
    name: "市政协办公厅",
    pointType: "point",
    belong: "市政协",
  },
  {
    symbol: "",
    name: "津南区政府",
    pointType: "point",
    belong: "津南区",
  },
  {
    symbol: "",
    name: "市人大办公厅",
    pointType: "point",
    belong: "津南区",
  },
  {
    symbol: "",
    name: "华苑数据中心",
    pointType: "point",
    belong: "华苑IDC",
  },
  {
    symbol: "",
    name: "市民政局",
    pointType: "point",
    belong: "华苑IDC",
  },
  {
    symbol: "",
    name: "市审计局",
    pointType: "point",
    belong: "科技信息所",
    effect: {
      period: 4,
    },
  },
  {
    symbol: "",
    name: "市国资委",
    pointType: "point",
    belong: "科技信息所",
  },
  {
    symbol: "",
    name: "南开区",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "河北区",
    pointType: "cloud",
    lineStyle: {
      color: 'red', // 线颜色
    },
  },
  {
    symbol: "",
    name: "西青区",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "空港IDC",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "武清区",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "市电子政务中心",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "东丽区",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "宝坻区",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "和平区",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "蓟州区",
    pointType: "cloud",
  },
  {
    level: 4,
    symbol: "",
    name: "河东区",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "河西区",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "静海区",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "北辰区",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "红桥区",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "滨海新区",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "宁河区",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "烟台道联通机房",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "市政府",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "市人大",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "市政协",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "津南区",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "华苑IDC",
    pointType: "cloud",
  },
  {
    symbol: "",
    name: "科技信息所",
    pointType: "cloud",
    effect: {
      period: 2,
      // symbolSize: [8, 24],
    },
  },
  ]
  // 点
  items.forEach((el, ind) => {
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
          distance: 10,
          // color: "rgb(255,255,255)",
          borderColor: "rgb(89,197,238)",
        },
      };
      erArr.push(el);
      console.log('erArr', erArr)
    } else if (el.pointType === "point") {
      // 球
      // el.symbol = point
      // el.symbolSize = [30, 30];
      el.label = {
        normal: {
          show: true,
          position: "bottom",
          borderWidth: 1,
          borderRadius: 12,
          padding: [4, 8, 4, 8],
          distance: 10,
          // color: "rgb(255,255,255)",
          borderColor: "rgb(89,197,238)",
        },
      };
      el.itemStyle = {
        borderColor: el.pointColor ? el.pointColor : 'rgba(4, 242, 28, 1)',
        borderWidth: 3,
        color: "#0ceffd",
      };
      // 清除没有父节点的值
      // sanArr.push(el);
      if (el.belong && !items.some((iteP) => el.belong === iteP.name)) {
        items.splice(ind, 1);
      } else {
        sanArr.push(el);
      }
      console.log('sanArr', sanArr)
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
    const {
      length: arLen
    } = arr;
    arr.forEach((e, ind) => {
      // console.log('e', e)
      // console.log('ind', ind)
      // 按角度均匀分布
      const ang = 90 - (360 / arLen).toFixed(2) * (ind + 1);
      const x = (Math.cos(ang * Math.PI / 180)).toFixed(2) * r;
      const y = (Math.sin(ang * Math.PI / 180)).toFixed(2) * r;
      e.value = [x.toFixed(2), y.toFixed(2)];
      if (e.belong) {
        let rotate = '';
        const angle = (160 / arr.length).toFixed(2);
        if (x > 0 && y >= 0) {
          rotate = (r - angle * (ind)).toFixed(2);
          // rotate = (90 - 360 / arr.length * (ind + 1)).toFixed(2);
        } else if (x <= 0 && y > 0) {
          rotate = (-r + angle * (arr.length - ind)).toFixed(2);
        } else if (x < 0 && y <= 0) {
          rotate = (r - angle * (ind - arr.length * 0.5)).toFixed(2);
        } else if (x >= 0 && y < 0) {
          rotate = (-8 + angle * (arr.length * 0.25 - ind)).toFixed(2);
        }
        e.label = {
          show: true,
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
    console.log('newArray', newArray)
    return newArray;
  }
  // 线配置
  function linesConfig(arr) {
    const [dataArr, targetCoord] = [
      [],
      [0, 0]
    ];
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
    console.log('dataArr=====', dataArr)
    return dataArr;
  }
  //环形线绘制
  function circleLine(erArr,sanArr) {
    let arr = []
    erArr.map((i,v) => {
      if (v<erArr.length-1) {
        circleLineArr.push({source:i.name,target:erArr[v+1].name})
      }else{
        circleLineArr.push({source:erArr[v].name,target:erArr[0].name})
      }
    })
    sanArr.map((i,v) => {
      if (v<sanArr.length-1) {
        circleLineArr.push({source:i.name,target:sanArr[v+1].name})
      }else{
        circleLineArr.push({source:sanArr[v].name,target:sanArr[0].name})
      }
    })
    return circleLineArr
  }
  //关系指向
  function  orientation(allArr) {
    console.log('allArr', allArr)
    allArr.map((i,v) => {
      allArr.map((o,p) => {

        if (i.belong === o.name) {
          orientationArr.push({source:o.name,target:i.name})
        }
      })
    })
    console.log('orientationArr', orientationArr)
    return orientationArr
  }
  // 点分布
  erArr = group(erArr, 36);
  console.log('erArr', erArr)
  sanArr = group(sanArr, 50);
  allArr = [...erArr, ...sanArr];
  // 线坐标和配置
  dataArr = linesConfig(allArr);
  circleLineArr = circleLine(erArr,sanArr)
  orientationArr = orientation(allArr)
	useEffect(() => {
		const myChart = echarts.init(document.getElementById('lines'));
		const option = {
			backgroundColor: 'rgba(0,0,0,1)',
			xAxis: {
				show: false,
				type: "value",
				max: 50,
				min: -50,
			},
			grid: {
				top: 100,
				bottom: 100,
				left: 100,
				right: 100,
			},
			yAxis: {
				show: false,
				type: "value",
				max: 50,
				min: -50,
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
				data: dataArr,
      },
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
        edges: circleLineArr
        
			},
			],
		}
    myChart.setOption(option);
		window.addEventListener('resize', function () {
			myChart.resize();
		})

  }, [])
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('graph'));

		const option = {
			backgroundColor: bgColor,
			xAxis: {
				show: false,
				type: "value",
				max: 50,
				min: -50,
			},
			grid: {
				top: 100,
				bottom: 100,
				left: 100,
				right: 100,
			},
			yAxis: {
				show: false,
				type: "value",
				max: 50,
				min: -50,
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
        edges: orientationArr,
        circular: {
            rotateLabel: true
        }
    
			},

			],
		}
    myChart.setOption(option);
    myChart.on('click', function (e) {
      console.log('e', e)
  });
    myChart.on('mousemove', function (h) {
      console.log('h', h)
      setFlag(false)
      setbgColor('rgba(0,0,0,1)')
  });
    myChart.on('mouseout', function (h) {
      console.log('h', h)
      setFlag(true)
      setbgColor('rgba(0,0,0,0)')
  });
		window.addEventListener('resize', function () {
			myChart.resize();
		})
  }, [])
	// 基于准备好的dom，初始化echarts实例

	return (
    <div style={{position:'relative'}}>
      <div id="lines" style={{	width: '900px',height: '900px',position:'absolute',top:'0',left:'0',display: flag ?'block':'none'}} ></div>
      <div id="graph" style={{	width: '900px',height: '900px',position:'absolute',top:'0',left:'0',background:bgColor}} ></div>
    </div>
    );
}
