import React from 'react';
import { Form, Select, Table, Tabs, Icon, Row, Col, Input, Checkbox, Button, Popconfirm, message, DatePicker, Modal, Radio } from 'antd';
import moment from 'moment';
import stores from '../../store';

const { TabPane } = Tabs;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { TextArea } = Input;


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Template extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      activeIndex: null,
      smgid: '',
      status: '',

      searchdepartId: '',
      typeName: "",
      typeId: '',
      searchName: '',
      startTime: undefined,
      endTime: undefined,

      id: 0,
      depart_id: "",
      name: '',
      sel_time: "",
      content: '',
      happen_time: undefined,
      up_time: undefined,//提交时间
      submit_time: undefined,//更新时间

      date: ['', ''],
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      isSearch: false,
      columns: [
        {
          title: '序号',
          dataIndex: 'id'
          // render: (text,record,index) => `${index+1}`
        },
        {
          title: '科室',
          dataIndex: 'department'
        },
        {
          title: '发生时间',
          dataIndex: 'happen_time'
        },
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '类型',
          dataIndex: 'type_name'
        },
        {
          title: '提交时间',
          dataIndex: 'submit_time'
        },
        {
          title: '最后更新时间',
          dataIndex: 'up_time'
        },
        {
          title: '提交人',
          dataIndex: 'submit_admin'
        }
      ],
      unNormalList: [],
      role_list: [],
      typeNameList: [],
      modalStatus: '',
      selectId: null
    }
  };

  searchType = () => {
    this.setState({
      isSearch: true
    })
  };

  resetType = () => {
    this.setState({
      isSearch: false
    })
  }

  submit = e => {
    e.preventDefault();
    if (this.state.isSearch) {
      this.searchOverview();
    } else {
      this.setState({
        searchdepartId: '',
        sel_time: '',
        searchName: '',
        startTime: undefined,
        endTime: undefined,
      })

      this.getOverview()
    }
  };

  typeNameChange = e => {
    this.setState({
      typeName: e
    })
  };

  typeIdChange = e => {
    this.setState({
      typeId: e
    })
  };

  departmentChange = e => {
    this.setState({
      circle_id: e
    })
  };

  modalDepartmentChange = e => {
    this.setState({
      modalDepartment: e
    })
  }


  timeChange = e => {
    this.setState({
      sel_time: e
    })
  };

  dateChange = (date, dateString) => {
    this.setState({
      startTime: dateString[0] == '' ? undefined : dateString[0],
      endTime: dateString[1] == '' ? undefined : dateString[1]
    })
  };

  happen_timeChange = (date, dateString) => {
    this.setState({
      happen_time: dateString == '' ? undefined : dateString,
    })
  };

  tabClickRow = (r, i) => {
    this.setState({
      selectId: r.id,
      activeIndex: i
    })
  };

  tabOndblclick = (r, i) => {
    this.setState({
      activeIndex: i,
      selectId: r.id
    }, () => {
      this.editTemplet()
    })
  };

  tabSetClassName = (r, i) => {
    return i === this.state.activeIndex ? 'table-row-active' : '';
  };

  getOverview = () => {
    var that = this;
    React.Axios({
      method: 'GET',
      url: React.Api.overview.index,
      params: {
        smgid: that.state.smgid
      },
      responseType: 'josn'
    }).then((res) => {
      let o = res.data.result;
      if (o.code == '100') {
        that.setState({
          unNormalList: o.data
        })
      }
    })
  };

  getOverviewDetail = (id) => {
    var that = this;
    React.Axios({
      method: 'GET',
      url: React.Api.overview.detail,
      params: {
        smgid: that.state.smgid,
        id: id
      },
      responseType: 'josn'
    }).then((res) => {
      let o = res.data.result;
      if (o.code == '100') {
        localStorage.setItem("happen_time", o.data.happen_time)
        this.props.form.setFieldsValue({
          depart_id: o.data.depart_id,
          name: o.data.name,
          happen_time: moment(o.data.happen_time),
          content: o.data.content,
        })
        that.setState({
          id: id,
          visible: true,
          typeId: o.data.type_id,
          submit_time: o.data.submit_time,
          up_time: o.data.up_time
        })
      }
    })
  }

  searchOverview = () => {
    var that = this;

    React.Axios({
      method: 'GET',
      url: React.Api.overview.index,
      params: {
        smgid: that.state.smgid,
        start_time: that.state.startTime,
        end_time: that.state.endTime,
        name: that.state.searchName,
        depart_id: that.state.searchdepartId,
        type_name: that.state.typeName,
        sel_time: that.state.sel_time
      },
      responseType: 'josn'
    }).then((res) => {
      let o = res.data.result;
      if (o.code == '100') {
        that.setState({
          unNormalList: o.data
        })
      }
    })
  };

  // 提交保存模板
  submitTemplate = (e) => {
    var that = this;
    this.props.form.validateFields((err, val) => {
      if (!err) {
        const happen_time = localStorage.getItem("happen_time")
        if (happen_time) {
          that.state.happen_time = happen_time
        }
        React.Axios({
          method: 'POST',
          url: React.Api.overview.addsummary,
          params: {
            smgid: that.state.smgid,
            id: that.state.id,
            depart_id: val.depart_id,
            name: val.name,
            type_id: that.state.typeId,
            happen_time: that.state.happen_time,
            content: val.content,
          },
          responseType: 'josn'
        })
          .then((res) => {
            let o = res.data.result;
            if (o.code == '100') {
              if (that.state.id === 0) {
                message.success('新增成功！');
              } else {
                message.success('编辑成功！');
                localStorage.removeItem("happen_time")
                this.hide()
              }
              that.hides();
              that.getOverview();
            };
          });
      }
    });
  };

  newEditTemplet = (e) => {
    this.hide()
    this.setState({
      selectId: null,
      activeIndex: '',
      modalStatus: 0,
      depart_id: "",//科室编号 
    }, () => {
      this.show();
    })
  };

  editTemplet = (e) => {
    var that = this;
    var id = this.state.selectId;
    if (id != null) {
      this.state.unNormalList.forEach(function (el, index) {
        if (el.id == id) {
          that.setState({
            modalStatus: el.id
          })
        }
      })
      this.getOverviewDetail(id)
    } else {
      message.warn('请先选择异态');
    }
  };

  delTemplet = (e) => {
    var that = this;
    var id = this.state.selectId;
    if (id != null) {
      React.Axios({
        method: 'GET',
        url: React.Api.overview.delsummary,
        params: {
          smgid: that.state.smgid,
          id: id
        },
        responseType: 'josn'
      }).then((res) => {
        let o = res.data.result;
        if (o.code == '100') {
          message.success('删除成功！');
          that.setState({
            activeIndex: null,
            selectId: null
          })
          that.getOverview();
        }
      })
    } else {
      message.warn('请先选择异态');
    }
  };

  show = () => {
    this.setState({
      visible: true
    })
  }

  tableChange = () => {
    this.setState({
      selectId: null,
      activeIndex: null
    })
  }

  nameChange = (e) => {
    this.setState({
      searchName: e.target.value
    })
  }

  nameOnChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  contentOnChange = (e) => {
    this.setState({
      conten: e.target.value
    })
  }

  hide = () => {
    this.props.form.setFieldsValue({
      depart_id: "",//科室编号 
      name: "",//名称
      happen_time: undefined,//时间
      content: "", //内容
    })
  };

  hides = () => {
    this.setState({
      visible: false,
      id: 0,
      depart_id: "",//科室编号 
      name: "",//名称
      happen_time: undefined,//时间
      up_time: undefined,//提交时间
      submit_time: undefined,//更新时间
    }, () => { this.hide() })
  }

  componentDidMount() {
    this.getOverview();
    this.getTypeNameList()
  }

  getTypeNameList = () => {
    React.Axios({
      method: 'GET',
      url: React.Api.overview.typelist,
      params: {
        smgid: this.state.smgid,
      },
      responseType: 'josn'
    }).then((res) => {
      let o = res.data.result;
      if (o.code == '100') {
        this.setState({
          typeNameList: o.data
        })
      }
    })
  }

  componentWillMount() {
    const action = {
      type: 'change_menu_value',
      value: '4',
    };
    stores.dispatch(action);
    var smgid = localStorage.getItem('smgid');
    this.setState({
      smgid: smgid,
      role_list: stores.getState().users.role_list,
    })
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    return (
      <React.Fragment>
        <Button.Group className='unNormalBtn-container'>
          <Button type="primary" onClick={this.newEditTemplet}>
            <Icon type="plus" /> 新增
                    </Button>
          <Button type="primary" onClick={this.editTemplet.bind(this)}>
            <Icon type="edit" /> 编辑
                    </Button>
          <Popconfirm title="是否确定删除？" cancelText="取消" okText="确定" onConfirm={this.delTemplet.bind(this)}>
            <Button type="primary">
              <Icon type="delete" /> 删除
                        </Button>
          </Popconfirm>
        </Button.Group>

        <Form layout="inline" onSubmit={this.submit}>
          <Form.Item label="科室">
            <Select value={this.state.searchdepartId} onChange={this.departmentChange} style={{ width: '188px' }}>
              <Option key="" value="">全部</Option>
              {
                (this.state.role_list).map((el) =>
                  <Option key={el.depart_id} value={el.depart_id}>{el.department}</Option>
                )
              }
            </Select>
          </Form.Item>
          <Form.Item label="名称">
            <Input value={this.state.searchName} placeholder="名称" onChange={this.nameChange} allowClear />
          </Form.Item>
          <Form.Item label="类型">
            <Select value={this.state.typeName} onChange={this.typeNameChange} style={{ width: '188px' }}>
              <Option key="" value="">全部</Option>
              {
                (this.state.typeNameList).map((el) =>
                  <Option key={el.id} value={el.name}>{el.name}</Option>
                )
              }
            </Select>
          </Form.Item>
          <Form.Item label="选择时间">
            <Select value={this.state.sel_time} onChange={this.timeChange} style={{ width: '188px' }}>
              <Option value="">全部</Option>
              <Option value="submit_time">提交时间</Option>
              <Option value="up_time">最后更新时间</Option>
              <Option value="happen_time">发生时间</Option>
            </Select>
          </Form.Item>
          {/* <Form.Item label="选择类型">
            <Select value={this.state.sel_time} onChange={this.timeChange} style={{ width: '188px' }}>
              <Option value="">全部</Option>
              <Option value="submit_time">提交时间</Option>
              <Option value="up_time">最后更新时间</Option>
              <Option value="happen_time">发生时间</Option>
            </Select>
          </Form.Item> */}
          <Form.Item label="日期">
            <RangePicker showTime={{ format: 'HH:mm:ss' }} placeholder={['开始日期', '结束日期']} value={this.state.startTime === undefined || this.state.endTime === undefined ? null : [moment(this.state.startTime, this.state.dateFormat), moment(this.state.endTime, this.state.dateFormat)]} format={this.state.dateFormat} onChange={this.dateChange} />
          </Form.Item>
          <Form.Item>
            <Button onClick={this.searchType} type="primary" htmlType="submit" icon="search">查询</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={this.resetType} type="primary" htmlType="submit" icon="delete">清空</Button>
          </Form.Item>
        </Form>

        <Table style={{ margin: '10px 0' }} columns={this.state.columns} loading={this.state.loading} dataSource={this.state.unNormalList} rowKey={(record, index) => index} bordered rowClassName={this.tabSetClassName} onChange={this.tableChange} onRow={(record, index) => { return { onClick: this.tabClickRow.bind(this, record, index), onDoubleClick: this.tabOndblclick.bind(this, record, index) }; }}></Table>

        <Modal width="50%" title={null} onCancel={this.hides} footer={[<Button form="submitTemplate" onClick={this.submitTemplate}>确定</Button>, <Button onClick={this.hides}>取消</Button>]} visible={this.state.visible}>
          <Form layout="inline" className="exercise-container" onSubmit={(event) => { this.submitTemplate(event) }} >
            <Row>
              <Col span={12}>
                <Form.Item label="科室">
                  {getFieldDecorator(`depart_id`, {
                    initialValue: this.state.depart_id,
                    rules: [{ required: true, message: '请选择科室!' },],
                  })(<Select disabled={this.state.modalStatus != 0} onChange={this.modalDepartmentChange} style={{ width: '188px' }}>
                    {
                      (this.state.role_list).map((el) =>
                        <Option key={el.depart_id} value={el.depart_id}>{el.department}</Option>
                      )
                    }
                  </Select>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="发生时间">
                  {getFieldDecorator(`happen_time`, {
                    initialValue: moment(this.state.happen_time),
                    rules: [{ required: true, message: '请输入发生时间!' },],
                  })(<DatePicker disabled={this.state.modalStatus != 0} style={{ width: '182px', minWidth: '182px' }} onChange={this.happen_timeChange} showTime placeholder="发生时间" />)}
                </Form.Item>

              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="提交时间">
                  <DatePicker disabled={true} value={moment(this.state.submit_time)} style={{ width: '182px', minWidth: '182px' }} format={this.state.dateFormat} placeholder="提交日期" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="更新时间">
                  <DatePicker value={moment(this.state.up_time)} disabled={true} format={this.state.dateFormat} style={{ width: '182px', minWidth: '182px' }} placeholder="更新日期" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="类型">
                  <Select value={this.state.typeId} onChange={this.typeIdChange} style={{ width: '188px' }}>
                    <Option key="" value="">全部</Option>
                    {
                      (this.state.typeNameList).map((el) =>
                        <Option key={el.id} value={el.id}>{el.name}</Option>
                      )
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.Item label="名称">
                {getFieldDecorator(`name`, {
                  initialValue: this.state.name,
                  rules: [{ required: true, message: '请输入名称!' },],
                })(<Input type="text" onChange={this.nameOnChange} placeholder="名称" allowClear />)}
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="内容">
                {getFieldDecorator(`content`, {
                  initialValue: this.state.content,
                  rules: [{ required: true, message: '请输入内容!' },],
                })(<TextArea rows={4} onChange={this.contentOnChange} style={{ width: '488px' }} />)}
              </Form.Item>
            </Row>
          </Form>
        </Modal>
      </React.Fragment>
    )
  }

}

export default Form.create()(Template);