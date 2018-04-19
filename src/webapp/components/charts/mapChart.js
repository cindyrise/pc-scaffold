import React from 'react'

import echarts from './index'
import 'echarts/lib/component/geo'
import 'echarts/lib/chart/map' //引入地图
import 'echarts/lib/chart/lines'
import 'echarts/map/js/china' // 引入中国地图
import {fromJS} from 'immutable'

export default class MapChart extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  initChart=()=> {
    const { option={},config={handle:''}} = this.props;
    let chart = echarts.init(this.id,'walden',{renderer: 'svg'});
    chart.showLoading();
    chart.off('click');
    if(typeof config.handle=='function' ){
      chart.on('click',config.handle.bind(this));
    }
    chart.setOption(option);
    chart.hideLoading();
    window.addEventListener('resize',()=>{chart.resize()});
  }
  shouldComponentUpdate(nextProps,nextState){
    if(fromJS(nextProps)==fromJS(this.props)){
      return false
    }else{
      return true;
    }
  }
  componentDidMount(){
    this.initChart();
  }
  componentDidUpdate() {
    this.initChart()
  }
  render() {
    let { height="300px",width="100%"} = this.props.config||{};
    return <div ref={id => this.id = id} style={{width, height}}></div>
  }
}

