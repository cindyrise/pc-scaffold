import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { Link } from "react-router";
import { Layout, Menu, Breadcrumb,Table } from "antd";
import * as list  from "./aciton"; 
import { isEmpty } from "lodash";
import moment from "moment";
moment.locale("zh-cn");
import {usercln} from './columns'
import assign from "object-assign";
import "./style.scss";


const { Header, Content, Footer } = Layout;
@connect(
  state => ({ ...state.userList }),
  dispatch => bindActionCreators({ ...list}, dispatch)
)
export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList:[],
      isLoad:true
    };
  }
  componentDidMount() {
    console.log(this.props,1213,"ppioe");
    this.props.getUserList({});
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps,2123123);
    if(nextProps.userList.reload){
      this.setState({userList:nextProps.userList.data,isLoad:false});
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', 
        name: record.name,
      }),
    };
   const{userList,isLoad}=this.state;
    return (
      <Layout className="layout">
          <div  style={{
              marginTop: "20px",
              background:"#fff",
              padding:"10px"
            }}
          >
           <Table rowSelection={rowSelection} bordered  rowKey="id"    loading={isLoad} columns={usercln} dataSource={userList} />
          </div>
      </Layout>
    );
  }
}
