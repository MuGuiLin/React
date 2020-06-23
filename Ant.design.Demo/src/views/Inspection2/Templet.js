import React from 'react';
import { Form, Select, Table, Radio, Tabs, Icon, Input, Button, Popconfirm, message, Modal } from 'antd';
import stores from '../../store';

const { TabPane } = Tabs;
const { Option } = Select;
const { confirm } = Modal;


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Templet extends React.Component {
  // export default class AllInspection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      circle_id: 'all',
      depart_id: '1',
      activeIndex: null,
      template_id: '',
      userbydepList: [],
      userbydeps: "",
      smgid: '',
      visible: false,
      circle_list: [],
      role_list: [],
      role_id: '',
      is_template: 1,
      is_xj: 1,
      publicCopy: true,
      add: true,
      columns: [
        {
          title: '模板ID',
          dataIndex: 'template_id',
        },
        {
          title: '模板名称',
          dataIndex: 'name'
        },
        {
          title: '模板描述',
          dataIndex: 'describe'
        },
        {
          title: '负责人',
          dataIndex: 'admin'
        },
        {
          title: '最后更新时间',
          dataIndex: 'up_time',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.up_time - b.up_time
        },
        // {
        //     title: '操作',
        //     dataIndex: 'operate',
        //     render: (text, record) => (
        //         <Button type="primary" size="small" shape="round" icon="file-add" onClick={this.add.bind(this, record)} >生成</Button>
        //     ),
        // }
      ],
      branch_list: [],
      public_list: []
    }
  };

  newEditTemplet = (e, n) => {
    if (e == 'true') {
      // this.props.history.push('/main/inspection/NewEditTemplet');
      localStorage.removeItem('is_template');
      sessionStorage.removeItem('template_id');
      var is_template = '1'
      this.props.history.push({ pathname: '/main/inspection/NewEditTemplet', state: { is_template: is_template } });
      return;
    } else if (e == 'copy') {
      if (this.state.template_id) {
        var is_template = '1'
        var copy = '1'
        this.props.history.push({ pathname: '/main/inspection/NewEditTemplet', state: { id: this.state.template_id, is_template: is_template, copy: copy } });
        return;
      } else {
        message.warning('请先选择模板！');
      }
    }

    if (this.state.template_id) {
      var is_template = '0'
      this.props.history.push({ pathname: '/main/inspection/NewEditTemplet', state: { id: this.state.template_id, is_template: is_template } });
    } else {
      message.warning('请先选择模板！');
    };
  };

  delTemplet = e => {
    if (this.state.template_id) {
      React.Axios({
        method: 'GET',
        url: React.Api.inspection.deltemp,
        params: {
          smgid: this.state.smgid,
          template_id: this.state.template_id
        },
        responseType: 'josn'
      })
        .then((res) => {
          let o = res.data.result;
          if (100 === o.code) {
            message.success('删除成功！');
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          };
        });
    } else {
      message.warning('请先选择模板！');
    };
  };

  createbills = (check_smgid) => {
    React.Axios({
      method: 'GET',
      url: React.Api.inspection.createbill,
      params: {
        smgid: this.state.smgid,
        template_id: this.state.template_id,
        check_smgid: check_smgid || ""
      },
      responseType: 'josn'
    })
      .then((res) => {
        let o = res.data.result;
        if (100 === o.code) {
          this.props.history.push('/main/inspection/myinspection');
        }
      });
  }

  userbydep = (e)=>{
    React.Axios({
      method: 'GET',
      url: React.Api.inspection.userbydep,
      params: {
        smgid: this.state.smgid,
        depart_id: e
      },
      responseType: 'josn'
    })
      .then((res) => {
        let o = res.data.result;
        if (100 === o.code) {
          this.setState({
            userbydepList: o.data
          })
        }
      });
  }

  createBill = e => {
    var that = this;
    if (this.state.template_id) {
      var is_warning = "0"
      var is_check = "0"
      var circle = "0"
      var branch_list = this.state.branch_list;
      branch_list.forEach(function (el) {
        if (el.template_id == that.state.template_id) {
          is_warning = el.is_warning;
          circle = el.circle
          is_check = el.is_check
        }
      })
      if (is_warning == "0") {
        if (is_check == "1") {
          this.userbydep(this.state.depart_id)
          this.setState({
            visible: true
          })
        } else {
          this.createbills()
        }
      } else {
        this.showConfirm(is_check, circle)
      }
    } else {
      message.warning('请先选择模板！');
    };
  };

  inquiryTemplet = (e, t) => {
    e.preventDefault();
    this.props.form.validateFields((err, val) => {
      if (!err) {
        React.Axios({
          method: 'GET',
          url: React.Api.inspection.searchbycircle,
          params: {
            smgid: this.state.smgid,
            name: val.name,
            depart_id: t,
            circle_id: this.state.circle_id,
            // template_id: val.template_id
          },
          responseType: 'josn'
        })
          .then((res) => {
            let o = res.data.result;
            if (100 === o.code) {
              switch (t) {
                case 'public':
                  this.setState({
                    public_list: o.data.temp_list,
                    loading: false
                  });
                  break;

                default:
                  this.setState({
                    branch_list: o.data.temp_list,
                    loading: false
                  });
                  break;
              }

            };
          });
      }
    });
  };

  getTableList = (t) => {
    if ('public' == t) {
      React.Axios({
        method: 'GET',
        url: React.Api.inspection.index,
        params: {
          smgid: this.state.smgid
        },
        responseType: 'josn'
      })
        .then((res) => {
          let o = res.data.result;
          if (100 === o.code) {
            this.setState({
              loading: false,
              circle_list: o.data.circle_list,
              public_list: o.data.temp_list
            });
          };
        });
    } else {
      React.Axios({
        method: 'GET',
        url: React.Api.inspection.list,
        params: {
          smgid: this.state.smgid,
          depart_id: t
        }
      })
        .then((res) => {
          let o = res.data.result;
          if (100 === o.code) {
            this.setState({
              loading: false,
              circle_list: o.data.circle_list,
              branch_list: o.data.temp_list
            });
          };
        });
    }
  };

  tabSwitch = (index) => {
    var that = this
    var is_template = '1';
    var is_xj = '1';
    var role_list = this.state.role_list;
    role_list.forEach(function (el) {
      if (el.depart_id == index) {
        that.setState({
          depart_id: el.depart_id
        })
        is_template = el.is_template;
        is_xj = el.is_xj;
      }
    })
    this.setState({
      loading: true,
      add: true,
      publicCopy: true,
      template_id: '',
      activeIndex: null,
      is_template: is_template,
      is_xj: is_xj
    });

    if (index == "public") {
      this.setState({
        is_xj: 0,
        add: false,
      })
    }
    this.getTableList(index);
  };

  selectChange = (lv, type) => {
    this.setState({
      circle_id: lv.key
    });
  };

  tabClickRow = (r, i) => {
    this.setState({
      activeIndex: i,
      template_id: r.template_id
    })
  };

  tabOndblclick = (r, i) => {
    this.setState({
      activeIndex: i,
      template_id: r.template_id
    }, () => {
      this.newEditTemplet()
    })
  };

  tabSetClassName = (r, i) => {
    return i === this.state.activeIndex ? 'table-row-active' : '';
  };

  showConfirm(is_check, circle) {
    var that = this;
    if (circle == "1") {
      confirm({
        title: '提示',
        content: '该巡检今日已生成，是否要重复生成？',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          if (is_check == "1") {
            that.userbydep(that.state.depart_id)
            that.setState({
              visible: true
            })
          } else {
            that.createbills()
          }
        },
        onCancel() { },
      });
    }else{
      message.error('该巡检本周期内已存在，不能重复生成!')
    }
  }

  componentDidMount() {
    if (this.state.role_id == '') {
      //this.getTableList('public');
    } else {
      //this.getTableList(this.state.role_id);
    }

    const action = {
      type: 'change_type_value',
      value: '1',
    };

    const action1 = {
      type: 'change_menu_value',
      value: '1',
    };

    stores.dispatch(action);

    stores.dispatch(action1);
  };

  componentWillMount() {
    var smgid = localStorage.getItem('smgid');
    var users = stores.getState();
    var role_list = users.users.role_list
    var role_id = '';
    var is_template = '1';
    var is_xj = '1';
    if (role_list && role_list.length > 0) {
      role_id = role_list[0].depart_id;
      is_template = role_list[0].is_template;
      is_xj = role_list[0].is_xj;
    }
    this.setState({
      smgid: smgid,
      role_list: role_list,
      role_id: role_id,
      is_template: is_template,
      is_xj: is_xj
    })
  };

  hides = () => {
    this.setState({
      visible: false,
      userbydeps: ""
    })
  }

  submitTemplate = (e) => {
    if(this.state.userbydeps == ''){
      message.warning('请选择复核人!')
      return
    }
    this.createbills(this.state.userbydeps)
  }

  userbydeps = (e) => {
    this.setState({
      userbydeps: e.target.value
    })
  }

  render() {

    const { getFieldDecorator, getFieldsError, } = this.props.form;

    return (
      <React.Fragment>

        <Button.Group className="templet-btn-group" >
          {this.state.add ?
            <Button type="primary" onClick={this.newEditTemplet.bind(this, 'true')}>
              <Icon type="plus" /> 新增
                        </Button> : null
          }
          {this.state.publicCopy ?
            <Button type="primary" onClick={this.newEditTemplet.bind(this, 'copy')}>
              <Icon type="copy" /> 复制
                        </Button> : null
          }
          <Button type="primary" onClick={this.newEditTemplet.bind(this)}>
            <Icon type="edit" /> 编辑
                    </Button>
          <Popconfirm title="是否确定删除？" cancelText="取消" okText="确定" onConfirm={this.delTemplet.bind(this)}>
            <Button type="primary">
              <Icon type="delete" /> 删除
                        </Button>
          </Popconfirm>
          {
            this.state.is_xj == 1 ?
              <Button type="primary" onClick={this.createBill.bind(this)}>
                <Icon type="security-scan" /> 巡检
                        </Button> : null
          }
        </Button.Group>

        <Tabs defaultActiveKey={this.state.depart_id} onChange={this.tabSwitch} size="default">
          {
            (this.state.role_list).map((el, index) =>
              <TabPane tab={<span><Icon type="dropbox" />{el.department}</span>} key={el.depart_id}>
                <Form layout="inline" onSubmit={(event) => { this.inquiryTemplet(event, el.depart_id) }}>
                  {/* <Form.Item label="ID：">
                                    {getFieldDecorator(`template_id`, {
                                        rules: [{ required: false, message: '请输入模板ID!' },],
                                    })(<Input type="text" placeholder="模板ID" allowClear />)}
                                </Form.Item> */}
                  <Form.Item label="名称：">
                    {getFieldDecorator(`name`, {
                      rules: [{ required: false, message: '请输入模板名称!' },],
                    })(<Input type="text" placeholder="模板名称" allowClear />)}
                  </Form.Item>
                  <Form.Item label="周期：" >
                    <Select defaultValue={{ key: "all" }} style={{ width: '188px' }} labelInValue onChange={(lv) => this.selectChange(lv, el.depart_id)}>
                      {this.state.circle_list.map((item, index) => <Option key={item.id} value={item.id}>{item.circle}</Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" icon="search">查 询</Button>
                  </Form.Item>
                </Form>
                <Table columns={this.state.columns} loading={this.state.loading} dataSource={this.state.branch_list} rowKey={(record, index) => record.template_id} bordered rowClassName={this.tabSetClassName} onRow={(record, index) => { return { onClick: this.tabClickRow.bind(this, record, index), onDoubleClick: this.tabOndblclick.bind(this, record, index) }; }}></Table>
              </TabPane>
            )
          }

          <TabPane tab={<span><Icon type="dropbox" />公共</span>} key="public">
            <Form layout="inline" onSubmit={(event) => { this.inquiryTemplet(event, 'public') }}>
              {/* <Form.Item label="ID：">
                                {getFieldDecorator(`template_id`, {
                                    rules: [{ required: false, message: '请输入模板ID!' },],
                                })(<Input type="text" placeholder="模板ID" allowClear />)}
                            </Form.Item> */}
              <Form.Item label="名称：">
                {getFieldDecorator(`name`, {
                  rules: [{ required: false, message: '请输入模板名称!' },],
                })(<Input type="text" placeholder="模板名称" allowClear />)}
              </Form.Item>
              <Form.Item label="周期：" >
                <Select defaultValue={{ key: "all" }} style={{ width: '188px' }} labelInValue onChange={(lv) => this.selectChange(lv, 'public')}>
                  {this.state.circle_list.map((item, index) => <Option key={item.id} value={item.id}>{item.circle}</Option>)}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon="search">查 询</Button>
              </Form.Item>
            </Form>
            <Table columns={this.state.columns} loading={this.state.loading} dataSource={this.state.public_list} rowKey={(record, index) => record.template_id} bordered rowClassName={this.tabSetClassName} onRow={(record, index) => { return { onClick: this.tabClickRow.bind(this, record, index),  onDoubleClick: this.tabOndblclick.bind(this, record, index) } }}></Table>
          </TabPane>
        </Tabs>


        <Modal width="50%" title="选择复核人" onCancel={this.hides} footer={[<Button onClick={this.submitTemplate}>确定</Button>, <Button onClick={this.hides}>取消</Button>]} visible={this.state.visible}>
          <Form layout="inline" className="exercise-container" onSubmit={(event) => { this.submitTemplate(event) }} >
            <Form.Item>
              <Radio.Group value={this.state.userbydeps} onChange={this.userbydeps} buttonStyle="solid">
                {
                  (this.state.userbydepList).map((el) =>
                    <Radio.Button key={el.smgid} value={el.smgid}>{el.realname}</Radio.Button>
                  )
                }
              </Radio.Group>
            </Form.Item>
            </Form>
          </Modal>
      </React.Fragment>
    )
  }
};

export default Form.create()(Templet);