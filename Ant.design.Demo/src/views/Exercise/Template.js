import React from 'react';
import { Form, Select, Table, Tabs, Icon, Row, Col, Input, Upload, Button, Popconfirm, message, DatePicker, Modal } from 'antd';
import { UploadOutlined, ToTopOutlined } from '@ant-design/icons';
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
      loading: false,
      api: "http://anboguanli-dev.smgtech.net",
      visible: false,
      activeIndex: null,
      tabIndex: '1',
      department: "",
      exeType: "",
      year: 1,
      status: "",
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      columns: [
        {
          title: '序号',
          dataIndex: 'id'
        },
        {
          title: '状态',
          dataIndex: 'statusName'
        },
        {
          title: '科室',
          dataIndex: 'department'
        },
        {
          title: '应急演练项目',
          dataIndex: 'drill_name'
        },
        {
          title: '演练日期',
          dataIndex: 'drill_date'
        },
        {
          title: '演练地点',
          dataIndex: 'drill_address'
        },
        {
          title: '演练形式',
          dataIndex: 'drill_type'
        },
        {
          title: '涉及岗位(人员名单)',
          dataIndex: 'peoples'
        },
        {
          title: '演练内容',
          dataIndex: 'drill_content'
        },
        {
          title: '应达效果',
          dataIndex: 'should_achieve'
        }
      ],
      isAdd: true,
      topOneList: [],
      botOneList: [],
      oneList: [],
      monthList: [],
      role_list: [],
      DrilltypeList: [],
      modalStatus: '',
      id: 0,
      depart_id: "",//科室编号 
      file_id: "", //文件编号
      drill_name: "",//演练科目
      drill_date: undefined,//演练时间
      drill_address: "",//演练地点
      drill_type: "",//	演练形式名称
      peoples: "",//应参与人员
      actual_peoples: "",//实际参与人员
      reserve_plan: "", //参考应急预案
      drill_content: "",//演练内容
      should_achieve: "",//应达效果
      execution: "",//演练评估结果
      stop_reason: "",//终止原因
      delay_reason: "",//延期原因
      file: [], //上传附件
      fileList: [],//上传附件列表
      up_time: undefined,//提交时间
      submit_time: undefined,//更新时间
      selectId: null
    }
  };

  tabChange = (e) => {
    let _this = this
    if (e == "3") {
      this.setState({
        tabIndex: '1',
        year: _this.state.year + 1
      }, () => {
        this.getBotList()
      })
    } else if (e == "4") {
      this.setState({
        tabIndex: '1',
        year: _this.state.year - 1
      }, () => {
        this.getTopList()
      })
    } else {
      this.setState({
        tabIndex: e
      }, () => {
        this.getList()
      })
    }
  };

  // componentDidUpdate(){
  //   this.tableList() 
  // }

  tabClickRow = (r, i) => {
    this.setState({
      activeIndex: r.id,
      selectId: r.id
    })
  };

  tabOndblclick = (r, i) => {
    this.setState({
      activeIndex: r.id,
      selectId: r.id
    }, () => {
      this.editTemplet()
    })
  };

  tabSetClassName = (r, i) => {
    return r.id === this.state.activeIndex ? 'table-row-active' : '';
  };

  tableChange = () => {
    this.setState({
      activeIndex: null
    })
  };

  newEditTemplet = (e) => {
    this.setState({
      selectId: null,
      activeIndex: '',
      depart_id: "",//科室编号 
      modalStatus: 0
    }, () => {
      this.show();
    })
  };

  editTemplet = (e) => {
    this.setState({
      isAdd: false
    })
    var that = this;
    var id = this.state.selectId;
    if (id != null) {
      this.state.oneList.forEach(function (el, index) {
        el.list.forEach(function (item) {
          if (item.id == id) {
            that.setState({
              modalStatus: item.id
            })
          }
        })
      })
      this.getAbnormalDetail(id)

    } else {
      message.warn('请先选择应急');
    }
  }

  getAbnormalDetail = (id) => {
    var that = this;
    React.Axios({
      method: 'GET',
      url: React.Api.exercise.detail,
      params: {
        smgid: that.state.smgid,
        id: id
      },
      responseType: 'josn'
    }).then((res) => {
      let o = res.data.result;
      if (o.code === 100) {
        localStorage.setItem("drill_date", o.data.drill_date)
        this.props.form.setFieldsValue({
          depart_id: o.data.depart_id,//科室编号 
          drill_name: o.data.drill_name,//演练科目
          drill_date: moment(o.data.drill_date),//演练时间
          drill_address: o.data.drill_address,//演练地点
          drill_type: o.data.drill_type,//	演练形式名称
          peoples: o.data.peoples,//应参与人员
          drill_content: o.data.drill_content,//演练内容
        })
        that.setState({
          id: id,
          visible: true,
          depart_id: o.data.depart_id,//科室编号 
          drill_name: o.data.drill_name,//演练科目
          drill_date: moment(o.data.drill_date),//演练时间
          drill_address: o.data.drill_address,//演练地点
          drill_type: o.data.drill_type,//	演练形式名称
          peoples: o.data.peoples,//应参与人员
          drill_content: o.data.drill_content,//演练内容
          should_achieve: o.data.should_achieve,//应达效果
          actual_peoples: o.data.actual_peoples,//实际参与人员
          reserve_plan: o.data.reserve_plan,//参考应急预案
          file_id: o.data.file_id, //文件编号
          execution: o.data.execution,//演练评估结果
          stop_reason: o.data.stop_reason,//终止原因
          file: o.data.file, //上传附件
          delay_reason: o.data.delay_reason,//延期原因
          up_time: moment(o.data.up_time),//提交时间
          submit_time: moment(o.data.submit_time),//更新时间
        })
      }
    })
  }

  delTemplet = (e) => {
    var that = this;
    var id = this.state.selectId;
    if (id != null) {
      React.Axios({
        method: 'GET',
        url: React.Api.exercise.delurgent,
        params: {
          smgid: that.state.smgid,
          id: id
        },
        responseType: 'josn'
      }).then((res) => {
        let o = res.data.result;
        if (o.code === 100) {
          message.success('删除成功！');
          that.setState({
            activeIndex: null,
            selectId: null
          })
          that.getList();
        }
      })
    } else {
      message.warn('请先选择异态');
    }
  };

  modalDepartmentChange = e => {
    this.setState({
      depart_id: e
    })
  }

  drillTypeChange = e => {
    this.setState({
      drill_type: e.target.value
    })
  }

  drillAddressonChange = e => {
    this.setState({
      drill_address: e.target.value
    })
  }

  drillNameonChange = e => {
    this.setState({
      drill_name: e.target.value
    })
  }

  reservePlanChange = e => {
    this.setState({
      reserve_plan: e.target.value
    })
  }

  actualPeoplesonChange = e => {
    this.setState({
      actual_peoples: e.target.value
    })
  }

  peoplesonChange = e => {
    this.setState({
      peoples: e.target.value
    })
  }

  drillContentonChange = e => {
    this.setState({
      drill_content: e.target.value
    })
  }

  shouldAchieveonChange = e => {
    this.setState({
      should_achieve: e.target.value
    })
  }

  executiononChange = e => {
    this.setState({
      execution: e.target.value
    })
  }

  stopReasononChange = e => {
    this.setState({
      stop_reason: e.target.value
    })
  }

  delayReasononChange = e => {
    this.setState({
      delay_reason: e.target.value
    })
  }

  getDrilltype() {
    React.Axios({
      method: 'GET',
      url: React.Api.exercise.drilltype,
      params: {
        smgid: this.state.smgid,
      },
      responseType: 'josn'
    })
      .then((res) => {
        var o = res.data.result
        if (o.code == 100) {
          this.setState({
            DrilltypeList: o.data
          })
        }
      });
  }

  show = () => {
    this.getDrilltype()
    this.setState({
      visible: true
    })
  };

  hide = () => {
    this.props.form.setFieldsValue({
      depart_id: "",//科室编号 
      drill_name: "",//演练科目
      drill_date: undefined,//演练时间
      drill_address: "",//演练地点
      drill_type: "",//	演练形式名称
      peoples: "",//应参与人员
      drill_content: "",//演练内容
    })
  };

  hides = () => {
    localStorage.removeItem("drill_date")
    this.hide()
    this.setState({
      visible: false,
      isAdd: true,
      id: 0,
      depart_id: "",//科室编号 
      drill_name: "",//演练科目
      drill_date: undefined,//演练时间
      drill_address: "",//演练地点
      drill_type: "",//	演练形式名称
      peoples: "",//应参与人员
      actual_peoples: "",//实际参与人员
      reserve_plan: "", //参考应急预案
      file_id: "", //文件编号
      file: "", //文件附件
      drill_content: "",//演练内容
      should_achieve: "",//应达效果
      execution: "",//演练评估结果
      stop_reason: "",//终止原因
      delay_reason: "",//延期原因
      up_time: undefined,//提交时间
      submit_time: undefined,//更新时间
    })
  }

  componentWillMount() {
    this.setState({
      smgid: localStorage.getItem('smgid'),
      role_list: stores.getState().users.role_list,
    })
  };

  getTopList() {
    React.Axios({
      method: 'GET',
      url: React.Api.exercise.index,
      params: {
        smgid: this.state.smgid,
        type: this.state.tabIndex,
        year: this.state.year
      },
      responseType: 'josn'
    })
      .then((res) => {
        const { data } = res.data.result
        if (this.state.tabIndex == 1) {
          this.setState({
            topOneList: data.list,
            year: Number(data.year)
          })
        }
      });
  }


  getList() {
    React.Axios({
      method: 'GET',
      url: React.Api.exercise.index,
      params: {
        smgid: this.state.smgid,
        type: this.state.tabIndex
      },
      responseType: 'josn'
    })
      .then((res) => {
        const { data } = res.data.result
        if (this.state.tabIndex == 1) {
          var unNormalList = data.list;
          unNormalList.forEach(function (el) {
            el.list.forEach(function (item) {
              switch (item.status) {
                case '1':
                  item.statusName = '正常 '
                  break;
                case '2':
                  item.statusName = '已延期'
                  break;
                case '3':
                  item.statusName = '逾期'
                  break;
                case '4':
                  item.statusName = '已中止'
                  break;
              }
            })
          })
          this.setState({
            oneList: data.list,
            year: Number(data.year)
          })
        } else if (this.state.tabIndex == 2) {
          var unNormalList = data.list;
          unNormalList.forEach(function (el) {
            switch (el.status) {
              case '1':
                el.statusName = '正常 '
                break;
              case '2':
                el.statusName = '已延期'
                break;
              case '3':
                el.statusName = '逾期'
                break;
              case '4':
                el.statusName = '已中止'
                break;
            }
          })
          this.setState({
            monthList: data.list
          })
        }
      });
  }

  getBotList() {
    React.Axios({
      method: 'GET',
      url: React.Api.exercise.index,
      params: {
        smgid: this.state.smgid,
        type: this.state.tabIndex,
        year: this.state.year
      },
      responseType: 'josn'
    })
      .then((res) => {
        const { data } = res.data.result
        if (this.state.tabIndex == 1) {
          this.setState({
            botOneList: data.list,
            year: Number(data.year)
          })
        }
      });
  }

  componentDidMount() {
    const action = {
      type: 'change_menu_value',
      value: '3',
    };
    stores.dispatch(action);

    this.getList()
  }

  dateChange = (date, dateString) => {
    this.setState({
      drill_date: dateString == '' ? undefined : dateString,
    })
  };

  getFile = () => {
    React.Axios({
      method: 'GET',
      url: React.Api.exercise.downfile,
      params: {
        smgid: this.state.smgid,
        file_id: this.state.file_id,
      },
      responseType: 'josn'
    })
      .then((res) => {
        message.success('下载成功！');
        // let o = res.data.result;
        // if(o.code !== '100'){
        //   message.error('下载失败！');
        // }
      });
  }

  // 提交保存模板
  submitTemplate = (e) => {
    var that = this;
    this.props.form.validateFields((err, val) => {
      if (!err) {
        let a = true
        if (this.state.submit_time !== '' && this.state.execution == '') {
          a = false
          message.Warning('演练评估结果不能为空');
        }
        if (a) {
          const drillDate = localStorage.getItem("drill_date")
          if (drillDate) {
            that.state.drill_date = drillDate
          }
          React.Axios({
            method: 'POST',
            url: React.Api.exercise.addurgent,
            params: {
              smgid: that.state.smgid,
              id: that.state.id,
              depart_id: val.depart_id,
              drill_name: val.drill_name,
              drill_date: that.state.drill_date,
              drill_address: that.state.drill_address,
              drill_type: val.drill_type,
              peoples: val.peoples,
              drill_content: val.drill_content,
              actual_peoples: that.state.actual_peoples,//实际参与人员
              reserve_plan: that.state.reserve_plan, //参考应急预案
              file_id: that.state.file_id,  //文件编号
              should_achieve: that.state.should_achieve,
              file: that.state.file || '',
              execution: that.state.execution,
              stop_reason: that.state.Jstop_reason,
              delay_reason: that.state.delay_reason,
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
                  localStorage.removeItem("drill_date")
                  this.hide()
                }
                that.hides();
                that.getList();
              };
            });
        }
      }
    });
  };

  //上一年度数据
  yearTopList() {
    return this.state.topOneList.map((item, index) => <Table key={index} style={{ margin: '20px 0' }} title={() => item.month} columns={this.state.columns} loading={this.state.loading} dataSource={item.list.map(items => items)} rowKey={record => record.id} bordered rowClassName={this.tabSetClassName} onChange={this.tableChange} onRow={(record, index) => { return { onClick: this.tabClickRow.bind(this, record, index), onDoubleClick: this.tabOndblclick.bind(this, record, index) }; }} pagination={false}></Table>
    )
  }

  //年度数据
  yearTableList() {
    return this.state.oneList.map((item, index) => <Table key={index} style={{ margin: '20px 0' }} title={() => item.month} columns={this.state.columns} loading={this.state.loading} dataSource={item.list.map(items => items)} rowKey={record => record.id} bordered rowClassName={this.tabSetClassName} onChange={this.tableChange} onRow={(record, index) => { return { onClick: this.tabClickRow.bind(this, record, index), onDoubleClick: this.tabOndblclick.bind(this, record, index) }; }} pagination={false}></Table>
    )
  }

  //下一年度数据
  yearBotList() {
    return this.state.botOneList.map((item, index) => <Table key={index} style={{ margin: '20px 0' }} title={() => item.month} columns={this.state.columns} loading={this.state.loading} dataSource={item.list.map(items => items)} rowKey={record => record.id} bordered rowClassName={this.tabSetClassName} onChange={this.tableChange} onRow={(record, index) => { return { onClick: this.tabClickRow.bind(this, record, index), onDoubleClick: this.tabOndblclick.bind(this, record, index) }; }} pagination={false}></Table>
    )
  }

  monthTableList() {
    if (this.state.monthList === []) {
      return null
    }
    return <Table style={{ margin: '10px 0' }} columns={this.state.columns} loading={this.state.loading} dataSource={this.state.monthList} rowKey={(record, index) => index} bordered rowClassName={this.tabSetClassName} onChange={this.tableChange} onRow={(record, index) => { return { onClick: this.tabClickRow.bind(this, record, index), onDoubleClick: this.tabOndblclick.bind(this, record, index) }; }} pagination={false}></Table>
  }

  render() {
    let _this = this
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const props = {
      name: 'file',
      showUploadList: true,
      action: this.state.api + React.Api.exercise.upload + "&smgid=" + _this.state.smgid,
      onChange(info) {
        if (info.file.status === 'done') {
          const { file_id } = info.file.response.result.data
          _this.setState({
            file: info.file,
            file_id: file_id
          }, () => {
            message.success('上传成功!');
          })
        } else if (info.file.status === 'error') {
          message.error('上传失败!');
        }
      },
      onRemove() {
        _this.setState({
          file: [],
          fileList: [],
          uploadPath: ''
        })
      },
      beforeUpload(file) {
        if (file.size / 1024 > 5120) {
          message.error('文件上传过大,最大为5MB')
          return false;
        } else {
          var fileArr = [];
          //获取新的上传列表
          fileArr.push(file);
          //进行赋值保存
          _this.setState({
            fileList: fileArr,
            uploadPath: ''
          })
        }
      },
      fileList: _this.state.fileList || "",
      defaultFileList: _this.state.fileList || "",
    };
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
            <Button type="primary" onClick={this.editTemplet.bind(this)}>
              <ToTopOutlined />导出
                    </Button>
          </Popconfirm>
        </Button.Group>

        <Tabs defaultActiveKey={this.state.tabIndex} onChange={this.tabChange} onTabClick={this.tabChange}>
          <TabPane tab="上一年" key="4">
            {this.yearTopList()}
          </TabPane>
          <TabPane tab="本年" key="1">
            {this.yearTableList()}
          </TabPane>
          <TabPane tab="下一年" key="3">
            {this.yearBotList()}
          </TabPane>
          <TabPane tab="本月" key="2">
            {this.monthTableList()}
          </TabPane>
        </Tabs>

        <Modal width="50%" title={null} onCancel={this.hides} footer={[<Button form="submitTemplate" onClick={this.submitTemplate}>确定</Button>, <Button onClick={this.hides}>取消</Button>]} visible={this.state.visible}>
          <Form layout="inline" className="exercise-container" onSubmit={(event) => { this.submitTemplate(event) }} labelAlign='left'>
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
                <Form.Item label="计划演练时间">
                  {getFieldDecorator(`drill_date`, {
                    initialValue: this.state.drill_date,
                    rules: [{ required: true, message: '请输入计划演练时间!' },],
                  })(<MonthPicker disabled={this.state.modalStatus != 0} style={{ width: '182px', minWidth: '182px' }} onChange={this.dateChange} placeholder="计划演练时间" />)}
                </Form.Item>

              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="演练形式">
                  {getFieldDecorator(`drill_type`, {
                    initialValue: this.state.drill_type,
                    rules: [{ required: true, message: '请输入演练地点!' },],
                  })(<Select onChange={this.modalDepartmentChange} style={{ width: '188px' }}>
                    {
                      (this.state.DrilltypeList).map((el) =>
                        <Option key={el.id} value={el.type}>{el.type}</Option>
                      )
                    }
                  </Select>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="实际演练时间">
                  <DatePicker disabled={true} value={this.state.submit_time} style={{ width: '182px', minWidth: '182px' }} format={this.state.dateFormat} showTime placeholder="实际演练时间" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="演练地点">
                  {getFieldDecorator(`drill_address`, {
                    initialValue: this.state.drill_address,
                    rules: [{ required: true, message: '请输入演练地点!' },],
                  })(<Input type="text" onChange={this.drillAddressonChange} placeholder="演练地点" allowClear />)}
                  {/* <Input type="text" value={this.state.drill_address} onChange={this.drillAddressonChange} placeholder="演练地点" allowClear /> */}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="更新时间">
                  <DatePicker value={this.state.up_time} disabled={true} format={this.state.dateFormat} showTime style={{ width: '182px', minWidth: '182px' }} placeholder="更新日期" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.Item label="参考应急预案">
                <Input value={this.state.reserve_plan} onChange={this.reservePlanChange} />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="演练科目">
                {getFieldDecorator(`drill_name`, {
                  initialValue: this.state.drill_name,
                  rules: [{ required: true, message: '请输入演练科目!' },],
                })(<Input type="text" onChange={this.drillNameonChange} placeholder="演练科目" allowClear />)}
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="应计划参与岗位">
                {getFieldDecorator(`peoples`, {
                  initialValue: this.state.peoples,
                  rules: [{ required: true, message: '请输入应计划参与岗位!' },],
                })(<TextArea rows={4} onChange={this.peoplesonChange} style={{ width: '488px' }} />)}
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="实际参与人员">
                <TextArea value={this.state.actual_peoples} rows={4} onChange={this.actualPeoplesonChange} style={{ width: '488px' }} />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="演练内容">
                {getFieldDecorator(`drill_content`, {
                  initialValue: this.state.drill_content,
                  rules: [{ required: true, message: '请输入演练内容!' },],
                })(<TextArea rows={4} onChange={this.drillContentonChange} style={{ width: '488px' }} />)}
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="应达效果">
                <TextArea value={this.state.should_achieve} onChange={this.shouldAchieveonChange} rows={4} style={{ width: '488px' }} />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="演练评估结果">
                <TextArea value={this.state.execution} disabled={this.state.modalStatus != 0} onChange={this.executiononChange} rows={4} style={{ width: '488px' }} />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="终止原因">
                <Input value={this.state.stop_reason} onChange={this.stopReasononChange} />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="延期原因">
                <Input value={this.state.delay_reason} onChange={this.delayReasononChange} />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="上传附件">
                {
                  this.state.isAdd ? <Upload {...props}>
                    <Button>
                      <UploadOutlined /> 上传附件
                    </Button>
                  </Upload> : <a href={this.state.api + React.Api.exercise.downfile + '&smgid=' + this.state.smgid + '&file_id=' + this.state.file_id} onClick={this.getFile}>下载附件</a>
                }
              </Form.Item>
            </Row>
          </Form>
        </Modal>
      </React.Fragment>
    )
  }

}

export default Form.create()(Template);