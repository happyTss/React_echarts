import TopEcharts from '../components/TopEcharts'
import BottomEcharts from '../components/BottomEcharts'
import React, {
	useEffect,
	useState
} from 'react';



const Echarts = () => {
  const [flag,setFlag] = useState(true)
  const items = [{
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



  return (
    <div style={{position:'relative',background:'#000'}}>
      <BottomEcharts items = {items} flag= {flag}/>
      <TopEcharts items = {items} setFlag={setFlag}/>
    </div>
  )
}


export default  Echarts