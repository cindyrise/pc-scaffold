import React from 'react'

import echarts from './index'
import 'echarts/lib/chart/pie'
import {fromJS} from 'immutable'

export default class PieChart extends React.Component {
  
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
    let { height="200px",width="100%"} = this.props.config||{};
    return <div ref={id => this.id = id} style={{width, height}}></div>
  }
}


