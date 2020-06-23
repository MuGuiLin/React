import React from 'react';
import { DatePicker, Form, Table, Input, Button, message, Tabs, Icon, Select } from 'antd';
import stores from '../../store';

const { TabPane } = Tabs;
const { Option } = Select;

class MyInspection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      xj_task_id: '',
      activeIndex: null,
      smgid: '',
      role_list: [],
      circlelists: [],
      circle_id: "",
      role_id: '',
      columns: [
        {
          title: '巡检单ID',
          dataIndex: 'xj_task_id',
        },
        {
          title: '巡检单名称',
          dataIndex: 'name',
          className: 'column-money'
        },
        {
          title: '巡检单描述',
          dataIndex: 'describe',
        },
        {
          title: '状态',
          dataIndex: 'statusName',
        },
        {
          title: '执行人',
          dataIndex: 'admin',
        },
        {
          title: '生成巡检单时间',
          dataIndex: 'create_time',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.create_time - b.create_time,
        },
        {
          title: '最后更新时间',
          dataIndex: 'up_time',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.up_time - b.up_time,
        },
      ],
      data: [
        // {
        //     xj_task_id: 'XJF0260601',
        //     name: 'SMG广播制播网播出核心系统日巡检',
        //     describe: '维护工程师每日执行',
        //     status: '已完成',
        //     admin: '沐枫',
        //     create_time: '2020-01-12 13:31:22',
        //     up_time: '2020-01-12 13:31:28'
        // }
      ]
    }
  };

  change = (date, dateString) => {
    this.setState({
      date: dateString
    });
  };

  submit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, val) => {
      if (!err) {
        this.setState({
          data: [],
          loading: true
        })
        React.Axios({
          method: 'GET',
          url: React.Api.inspection.searchbill,
          params: {
            smgid: this.state.smgid,
            xj_task_id: val.xj_task_id || '',
            name: val.name || '',
            date: this.state.date,
            search_type: '3',
            depart_id: this.state.role_id
          },
          responseType: 'josn'
        })
          .then((res) => {
            let o = res.data.result;
            if (100 === o.code) {
              o.data.forEach(function (el) {
                switch (el.status) {
                  case '1':
                    el.statusName = '进行中'
                    break;
                  case "2":
                    el.statusName = '待复核'
                    break;
                  case '3':
                    el.statusName = '已完成'
                    break;
                }
              })
              this.setState({
                data: o.data,
                loading: false
              });
            };
          });
      }
    });
  };

  editTemplet = e => {
    if (this.state.xj_task_id) {
      this.props.history.push({ pathname: '/main/inspection/editInspection', state: { id: this.state.xj_task_id } });
    } else {
      message.warning('请先选择巡检单！')
    };
  };

  tabClickRow = (r, i) => {
    this.setState({
      activeIndex: i,
      xj_task_id: r.xj_task_id
    })
  };

  tabOndblclick = (r, i) => {
    console.log(1)
    this.setState({
      activeIndex: i,
      xj_task_id: r.xj_task_id
    }, () => {
      this.editTemplet()
    })
  };

  tabSetClassName = (r, i) => {
    return i === this.state.activeIndex ? 'table-row-active' : '';
  };

  tabSwitch = (index) => {
    var role_list = this.state.role_list;
    var role_id = role_list[index].depart_id;
    this.setState({
      data: [],
      loading: true,
      role_id: role_id
    })
    this.getallxjbill(role_id);
  };

  getallxjbill(depart_id) {
    React.Axios({
      method: 'GET',
      url: React.Api.inspection.allxjbill,
      params: {
        smgid: this.state.smgid,
        depart_id: depart_id
      },
      responseType: 'josn'
    })
      .then((res) => {
        let o = res.data.result;
        if (100 === o.code) {
          o.data.forEach(function (el) {
            switch (el.status) {
              case '1':
                el.statusName = '进行中'
                break;
              case "2":
                el.statusName = '待复核'
                break;
              case '3':
                el.statusName = '已完成'
                break;
            }
          })
          this.setState({
            data: o.data,
            loading: false,
          });
        };
      });
  };

  departmentChange = e => {
    this.setState({
      circle_id: e
    })
  };

  circlelist = () =>{
    React.Axios({
      method: 'GET',
      url: React.Api.inspection.circlelist,
      params: {
        smgid: this.state.smgid
      },
      responseType: 'josn'
    })
      .then((res) => {
        let o = res.data.result;
        if( 100 === o.code){
          this.setState({
            circlelists: o.data
          })
        }
      })
  }

  componentDidMount() {
    this.circlelist()
    const action = {
      type: 'change_type_value',
      value: '4',
    };

    stores.dispatch(action);

    React.Axios({
      method: 'GET',
      url: React.Api.inspection.allxjbill,
      params: {
        smgid: this.state.smgid,
        depart_id: this.state.role_id
      },
      responseType: 'josn'
    })
      .then((res) => {
        let o = res.data.result;
        if (100 === o.code) {
          o.data.forEach(function (el) {
            switch (el.status) {
              case '1':
                el.statusName = '进行中'
                break;
              case "2":
                el.statusName = '待复核'
                break;
              case '3':
                el.statusName = '已完成'
                break;
            }
          })
          this.setState({
            data: o.data,
            loading: false,
          });
        };
      });
  };

  componentWillMount() {
    var length = stores.getState().users.role_list.length;

    var role_id = '';

    if (length > 0) {
      role_id = stores.getState().users.role_list[0].depart_id;
    } else {
      role_id = '';
    }

    this.setState({
      smgid: localStorage.getItem('smgid'),
      role_list: stores.getState().users.role_list,
      role_id: role_id
    })

  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Tabs defaultActiveKey="0" onChange={this.tabSwitch} >
          {
            (this.state.role_list).map((val, index) => <TabPane tab={<span><Icon type="dropbox" />{val.department}</span>} key={index.toString()}>
              <Form layout="inline" onSubmit={this.submit}>
              <Form.Item label="周期：">
                  {getFieldDecorator(`circle_id`, {
                    rules: [{ required: false, message: '请输入巡检单周期!' },],
                  })(<Select onChange={this.departmentChange} style={{ width: '188px' }}>
                      <Option key="" value="">全部</Option>
                      {
                        (this.state.circlelists).map((el) =>
                          <Option key={el.id} value={el.id}>{el.circle}</Option>
                        )
                      }
                </Select>)}
                </Form.Item>
                <Form.Item label="文本：">
                  {getFieldDecorator(`name`, {
                    rules: [{ required: false, message: '请输入巡检单文本!' },],
                  })(<Input type="text" placeholder="巡检单文本" allowClear />)}
                </Form.Item>
                <Form.Item label="日期：" >
                  <DatePicker onChange={this.change} placeholder="更新时间" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" icon="search">查 询</Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" icon="edit" onClick={this.editTemplet.bind(this)}>编辑</Button>
                </Form.Item>
              </Form>
              <Table columns={this.state.columns} dataSource={this.state.data} loading={this.state.loading} bordered rowKey={(record, index) => record.xj_task_id} bordered rowClassName={this.tabSetClassName} onRow={(record, index) => { return { onClick: this.tabClickRow.bind(this, record, index), onDoubleClick: this.tabOndblclick.bind(this, record, index) }; }}></Table>
            </TabPane>)
          }
        </Tabs>
      </React.Fragment>
    )
  }
};

export default Form.create()(MyInspection);