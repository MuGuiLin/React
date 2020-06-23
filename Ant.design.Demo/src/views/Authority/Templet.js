import React from 'react';
import { Form, Select, Table, Tabs, Icon, Row, Col, Input, Checkbox, Button, Popconfirm, message } from 'antd';
import stores from '../../store';

const { TabPane } = Tabs;
const { Option } = Select;


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Templet extends React.Component {
  // export default class AllInspection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authList: [],
      isAdmin: false,
      isSave: false,
      isDev: false,
      smgid: '',
      columns: [
        {
          title: '科组',
          dataIndex: 'department',
        },
        {
          title: '部门',
          dataIndex: 'remark'
        },
        {
          title: '模板制定',
          dataIndex: 'is_template',
          render: (text, record) => (
            <Checkbox checked={text == 1 ? true : false} onChange={e => {
              this.handleChange({ is_template: e.target.checked }, record)
            }} />
          ),
        },
        {
          title: '巡检生成',
          dataIndex: 'is_xj',
          render: (text, record) => (
            <Checkbox checked={text == 1 ? true : false} onChange={e => {
              this.handleChange({ is_xj: e.target.checked }, record)
            }} />
          ),
        },
        {
          title: '异态提交',
          dataIndex: 'is_unexpected',
          render: (text, record) => (
            <Checkbox checked={text == 1 ? true : false} onChange={e => {
              this.handleChange({ is_unexpected: e.target.checked }, record)
            }} />
          ),
        },
        {
          title: '邮件接收',
          dataIndex: 'is_email',
          render: (text, record) => (
            <Checkbox checked={text == 1 ? true : false} onChange={e => {
              this.handleChange({ is_email: e.target.checked }, record)
            }} />
          ),
        },
      ],
      quotaDirArr: [],
      quotaRowArr: []
    }
  };

  handleChange = (value, record) => {
    for (var i in value) {
      if (value[i]) {
        value[i] = 1;
      } else {
        value[i] = 0;
      }
      record[i] = value[i];//这一句是必须的，不然状态无法更改
      this.setState({
        authList: this.state.authList.map((item, key) => item.depart_id == record.depart_id ? { ...item, [i]: value[i] } : item)
      })
    }
  }

  getAuthList = () => {
    React.Axios({
      method: 'POST',
      url: React.Api.auth.departmentinfo,
      params: {
        smgid: this.state.smgid
      },
      responseType: 'josn'
    })
      .then((res) => {
        console.log(res)
        let o = res.data.result;
        if (100 === o.code) {
          o.data.forEach(function (el) {
            el.is_template = 0;
            el.is_xj = 0;
            el.is_unexpected = 0;
            el.is_email = 0;
          })
          this.setState({
            loading: false,
            authList: o.data
          })
        };
      });
  };

  searchInfo = (id) => {
    React.Axios({
      method: 'POST',
      url: React.Api.auth.roleinfo,
      params: {
        smgid: this.state.smgid,
        user_smgid: id
      },
      responseType: 'josn'
    })
      .then((res) => {
        console.log(res)
        let o = res.data.result;
        if (100 === o.code) {
          if (o.data != null && o.data != undefined && o.data != '' && JSON.stringify(o.data) != '{}') {
            var authList = this.state.authList;
            var quotaDirArr = [];
            var quotaRowArr = [];
            if (o.data.role_list.length > 0) {
              authList.forEach(function (val, index) {
                val.is_template = 0;
                val.is_xj = 0;
                val.is_unexpected = 0;
                val.is_email = 0;
              })
              o.data.role_list.forEach(function (el) {
                authList.forEach(function (val, index) {
                  if (el.depart_id == val.depart_id) {
                    val.is_template = el.is_template;
                    val.is_xj = el.is_xj;
                    val.is_unexpected = el.is_unexpected;
                    val.is_email = el.is_email;
                    quotaDirArr.push(index);
                    quotaRowArr.push(val);
                  }
                })
              })
            } else {
              authList.forEach(function (val, index) {
                val.is_template = 0;
                val.is_xj = 0;
                val.is_unexpected = 0;
                val.is_email = 0;
              })
            }
            this.setState({
              isAdmin: o.data.is_admin == 1 ? true : false,
              isDev: o.data.is_devops == 1 ? true : false,
              authList: authList,
              quotaDirArr: quotaDirArr,
              quotaRowArr: quotaRowArr
            })
          } else {
            var quotaDirArr = [];
            var quotaRowArr = [];
            var authList = this.state.authList;
            authList.forEach(function (val, index) {
              val.is_template = 0;
              val.is_xj = 0;
              val.is_unexpected = 0;
              val.is_email = 0;
            })
            this.setState({
              isAdmin: false,
              quotaDirArr: quotaDirArr,
              quotaRowArr: quotaRowArr,
              authList: authList
            })
          }
        };
      });
  }

  componentDidMount() {
    this.getAuthList();
  };

  componentWillMount() {

    this.setState({
      smgid: localStorage.getItem('smgid')
    })

  };

  submit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, val) => {
      if (!err) {
        if (this.state.isSave) {
          console.log(123)
          this.save(val.personId)
        } else {
          this.searchInfo(val.personId)
        }
      }
    });
  };

  save = (id) => {
    if (this.state.personId == '' || this.state.personId == null || this.state.personId == undefined) {
      message.warning('工号不能为空');
    } else {
      var arr = [];
      var authList = this.state.authList;
      if (this.state.quotaDirArr.length > 0) {
        arr = this.state.quotaDirArr.map(function (val, index) {
          return authList[val]
        })
      }
      React.Axios({
        method: 'POST',
        url: React.Api.auth.setrole,
        params: {
          smgid: this.state.smgid,
          user_smgid: this.state.personId,
          is_admin: this.state.isAdmin ? 1 : 0,
          is_devops: this.state.isDev ? 1 : 0,
          list: JSON.stringify(arr)
        },
        responseType: 'josn'
      })
        .then((res) => {
          console.log(res)
          let o = res.data.result;
          if (100 === o.code) {
            message.success(o.msg)
            console.log(stores.getState())
            var users = stores.getState();
            // users.users.role_list = o.data.role_list;
            users.users = o.data;
            const action = {
              // type 属性 必须有
              type: 'change_input_value',
              value: users.users,
            };

            stores.dispatch(action);
          };
        });
    }
  }

  quotaChange = (a, o) => {
    this.setState({
      quotaRowArr: [...o],
      quotaDirArr: a
    });
  };

  changeAdmin = e => {
    this.setState({
      isAdmin: e.target.checked
    })
  }

  changeDev = e => {
    this.setState({
      isDev: e.target.checked
    })
  }

  searchType = () => {
    this.setState({
      isSave: false
    })
  }

  saveType = () => {
    this.setState({
      isSave: true
    })
  }

  componentWillMount() {
    const action = {
      type: 'change_menu_value',
      value: '6',
    };

    stores.dispatch(action);
  }

  render() {

    const { getFieldDecorator, getFieldsError, } = this.props.form;

    const { quotaDirArr } = this.state;

    const rowSelection = {
      selectedRowKeys: quotaDirArr,
      onChange: this.quotaChange,
    };

    return (
      <React.Fragment>
        <Form layout="inline" onSubmit={this.submit}>
          <Row>
            <Col span={22}>
              <Form.Item label="工号：">
                {getFieldDecorator(`personId`, {
                  rules: [{ required: true, message: '请输入工号!' },],
                })(<Input type="text" onChange={e => {
                  this.setState({
                    personId: e.target.value
                  })
                }} placeholder="工号" allowClear />)}
              </Form.Item>
              <Form.Item>
                <Button onClick={this.searchType} type="primary" htmlType="submit" icon="search">查 询</Button>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item>
                <Button onClick={this.saveType} type="primary" htmlType="submit" icon="save">保存</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row>
          <Checkbox style={{ margin: '10px 0' }} checked={this.state.isAdmin} onChange={this.changeAdmin}>系统管理员</Checkbox>
          <Checkbox style={{ margin: '10px 0' }} checked={this.state.isDev} onChange={this.changeDev}>运维保障</Checkbox>
        </Row>
        <Table size="small" className="table" loading={this.state.loading} rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.authList} bordered rowKey={(record, index) => record.id} pagination={false} ></Table>
      </React.Fragment>
    )
  }
};

export default Form.create()(Templet);