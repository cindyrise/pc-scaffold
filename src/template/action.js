
import {smallCamelType} from './constant';
import { message } from 'antd';
import http from '../../utils/http'
import apiUrl from '../../constants/apis';
import { browserHistory } from 'react-router';
const camelData = (data) => ({
  type: smallCamelType.GET_TYPE_DATA,
  payload: data
})
export const smallCamelData = (params) => async (dispatch, getState) => {
  try {
      let response = await http.get(apiUrl.getUserData, params);
      if (response.success) {
          await dispatch(camelData(response.data));
      } else {
          //返回失败
      }
  } catch (error) {
      console.log('error: ', error)
  }
}
