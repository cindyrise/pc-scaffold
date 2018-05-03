import React from 'react'

import echarts from './index'
import 'echarts/lib/chart/line'
import {fromJS} from 'immutable'
import ReactResizeDetector from 'react-resize-detector';

export default class Line extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  initChart=()=> {
    const { option={},config={handle:''}} = this.props;
    const{ chart }=this.state;
    chart.showLoading();
    chart.off('click');
    if(typeof config.handle=='function' ){
      chart.on('click',config.handle.bind(this));
    }
    chart.setOption(option);
    chart.hideLoading();
    window.addEventListener('resize',this.chartResize.bind(this));
  }
  shouldComponentUpdate(nextProps,nextState){
    if(fromJS(nextProps)==fromJS(this.props)){
      return false
    }else{
      return true;
    }
  }
  componentDidMount(){
    let chart=echarts.init(this.id,'walden',{renderer: 'canvas'});
    this.setState({chart},()=>{
      this.initChart();
    });
  }
  componentDidUpdate() {
    this.initChart()
  }
  componentWillUnmount(){
    const{ chart }=this.state;
    window.removeEventListener('resize',this.chartResize.bind(this));
    chart.dispose();
  }
  chartResize=()=>{
    const { chart } = this.state;
    if(chart) chart.resize();
  }
  render() {
    let { height="200px",width="100%"} = this.props.config;
    return <div>
    <div ref={id => (this.id = id)}style={{width, height}} />
    <ReactResizeDetector  handleWidth handleHeight onResize={this.chartResize.bind(this)}/>
   </div>
  }
}


