

import React from 'react';
import { Popconfirm, message, Card, Row, Col, Form, Input, Table, Icon, Button, Radio, Select } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, CheckOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

class EditInspection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showElem: false,
      loading: true,
      name: '',
      describe: '',
      smgid: '',
      is_edit: true,
      detail_info: {},
      columns: [
        {
          title: '对象',
          dataIndex: 'name',
        },
        {
          title: '类别',
          dataIndex: 'type',
          ellipsis: true,
        },
        {
          title: '指标',
          dataIndex: 'index_name',
          ellipsis: true,
        },
        {
          title: '检测值',
          dataIndex: 'value',
          render: (text, record) => {
            return this.state.detail_info.status == 0 ? (
              null
            ) : record.index_type == 1 ? (
              <Radio.Group onChange={e => {
                this.handleChange({ result_value: e.target.value }, record)
              }} value={record.result_value}>
                {(record.arr).map((item, index) => <Radio key={index} value={item}>{item}</Radio>)}
              </Radio.Group>
            ) : record.index_type == 2 ? (
              <Input defaultValue={record.result_value} onChange={e => {
                this.handleChange({ result_value: e.target.value }, record)
              }} />
            ) : record.index_type == 3 ? (
              <Select defaultValue={record.result_value} style={{ width: '100%' }} onChange={e => {
                this.handleChange({ result_value: e }, record)
              }}>
                {(record.arr).map((item, index) => <Option key={index} value={item}>{item}</Option>)}
              </Select>
            ) : (
                      null
                    );
          },
        },
        {
          title: '备注',
          dataIndex: 'remark',
          render: (text, record) => (
            <Input placeholder="备注信息" defaultValue={text} onChange={e => {
              this.handleChange({ remark: e.target.value }, record)
            }} />
          ),
        },
        {
          title: '阈值(下限)',
          dataIndex: 'down_value'
        },
        {
          title: '阈值(上限)',
          dataIndex: 'up_value'
        },
        {
          title: '对象说明',
          dataIndex: 'desc',
          ellipsis: true,
        }
      ],
      columnsComplete: [
        {
          title: '对象',
          dataIndex: 'name',
        },
        {
          title: '类别',
          dataIndex: 'type',
          ellipsis: true,
        },
        {
          title: '指标',
          dataIndex: 'index_name',
          ellipsis: true,
        },
        {
          title: '检测值',
          dataIndex: 'result_value',
          ellipsis: true,
        },
        {
          title: '备注',
          dataIndex: 'remark'
        },
        {
          title: '阈值(下限)',
          dataIndex: 'down_value'
        },
        {
          title: '阈值(上限)',
          dataIndex: 'up_value'
        },
        {
          title: '对象说明',
          dataIndex: 'desc',
          ellipsis: true,
        }
      ],
      detail_list: []
    }
  };

  check = () => {
    React.Axios({
      method: 'GET',
      url: React.Api.inspection.check,
      params: {
        smgid: this.state.smgid,
        xj_task_id: this.props.location.state.id,
      },
      responseType: 'josn'
    })
      .then((res) => {
        let o = res.data.result;
        if (100 === o.code) {
          message.success('复核成功！');
          setTimeout(() => {
            this.props.history.goBack();
          }, 3000);
        }else{
          message.error(o.msg);
        }
      });
  }

  delInspection = () => {
    React.Axios({
      method: 'GET',
      url: React.Api.inspection.delbill,
      params: {
        smgid: this.state.smgid,
        xj_task_id: this.props.location.state.id,
      },
      responseType: 'josn'
    })
      .then((res) => {
        let o = res.data.result;
        if (100 === o.code) {
          message.success('删除成功！');
          setTimeout(() => {
            this.props.history.goBack();
          }, 3000);
        };
      });
  };


  handleChange = (value, record) => {
    for (var i in value) {
      record[i] = value[i];//这一句是必须的，不然状态无法更改
      this.setState({
        detail_list: this.state.detail_list.map((item, key) => item.id == record.id ? { ...item, [i]: value[i] } : item)
      })
    }
  }

  saveInspection = (val) => {
    console.log(this.state.detail_list)
    React.Axios({
      method: 'POST',
      url: React.Api.inspection.addbill,
      params: {
        smgid: this.state.smgid,
        xj_task_id: this.props.location.state.id,
        name: val.name,
        describe: val.describe,
        list: JSON.stringify(this.state.detail_list)
      },
      responseType: 'josn'
    })
      .then((res) => {
        let o = res.data.result;
        if (100 === o.code) {
          message.success('保存成功！');
          setTimeout(() => {
            this.props.history.goBack();
          }, 3000);
        };
      });
  };

  submitInspection = (val) => {
    React.Axios({
      method: 'GET',
      url: React.Api.inspection.submitbill,
      params: {
        smgid: this.state.smgid,
        xj_task_id: this.props.location.state.id,
        name: val.name,
        describe: val.describe,
        list: this.state.detail_list
      },
      responseType: 'josn'
    })
      .then((res) => {
        let o = res.data.result;
        if (100 === o.code) {
          message.success('提交成功！');
          setTimeout(() => {
            this.props.history.goBack();
          }, 3000);
        };
      });
  };

  saveInspectionBtn = () => {
    this.setState({
      is_edit: true
    });
  };

  submitInspectionBtn = () => {
    this.setState({
      is_edit: false
    });
  };

  InspectionForm = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, val) => {
      if (!err) {
        if (this.state.is_edit) {
          this.saveInspection(val);
        } else {
          this.submitInspection(val);
        }
      }
    })
  };

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.id) {
      React.Axios({
        method: 'GET',
        url: React.Api.inspection.xjbilldetail,
        params: {
          smgid: this.state.smgid,
          xj_task_id: this.props.location.state.id,
        },
        responseType: 'josn'
      })
        .then((res) => {
          let o = res.data.result;
          if (100 === o.code) {
            console.log(o.data.detail_list)
            o.data.detail_list.forEach(function (val, index) {
              if ((val.index_type == 1 || val.index_type == 3) && val.value != '') {
                val.arr = val.value.split(';')
                val.arr = val.arr.filter(function (s) {
                  s.replace(/(^\s*)|(\s*$)/g, "");
                  return s && s.trim();
                });
              }
            })

            this.setState({
              loading: false,
              name: o.data.detail.name,
              describe: o.data.detail.describe,
              detail_info: o.data.detail,
              detail_list: o.data.detail_list,
            });
          };
        });
    } else {
      this.props.history.goBack();
    };
  };

  componentWillMount() {

    this.setState({
      smgid: localStorage.getItem('smgid')
    })

  };

  CaretDownOutlined = (e) => {
    this.setState({
      showElem: true
    })
  }

  CaretUpOutlined = (e) => {
    console.log(111)
    this.setState({
      showElem: false
    })
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;

    return (
      <section className="templet-box">
        <Card title="巡检单信息">
          <Form layout="horizontal" id="inspection" onSubmit={(event) => { this.InspectionForm(event) }}>
            <Row>
              <Col span={8}>
                <Form.Item label="巡检单名称：" wrapperCol={{ span: 24, offset: 0 }}>
                  {getFieldDecorator(`name`, {
                    initialValue: this.state.name,
                    rules: [{ required: true, message: '请输入巡检单名称!' },],
                  })(<Input disabled type="text" placeholder="巡检单名称" allowClear />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="执行人：">
                  <Input placeholder="执行人" value={this.state.detail_info.admin} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="巡检状态：">
                  <Input placeholder="巡检状态" value={2 == this.state.detail_info.status ? '已完成' : '进行中'} />
                </Form.Item>
              </Col>
            </Row>
            {
              this.state.showElem ? (
                <div>
                  <Row style={{ 'width': '100%' }}>
                    <CaretUpOutlined onClick={this.CaretUpOutlined} style={{ 'fontSize': 30 }} />
                  </Row>
                  <Row>
                    <Col span={8}>
                      <Form.Item label="创建模板时间：">
                        <Input placeholder="创建模板时间" value={this.state.detail_info.temp_time} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="巡检单生成时间：">
                        <Input placeholder="巡检单生成时间" value={this.state.detail_info.xj_time} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="最后更新时间：">
                        <Input placeholder="最后更新时间" value={this.state.detail_info.up_time} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <Form.Item label="巡检单ID：">
                        <Input placeholder="巡检单ID" value={this.state.detail_info.xj_task_id} />
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item label="巡检单描述：">
                        {/* {getFieldDecorator(`describe`, {
                                            initialValue: this.state.describe,
                                            rules: [{ required: true, message: '请输入巡检单描述!' },],
                                        })(<TextArea placeholder="巡检单描述" allowClear />)} */}
                        <TextArea disabled value={this.state.describe} placeholder="巡检单描述" allowClear />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ) : (
                  <Row style={{ 'width': '100%' }}>
                    <CaretDownOutlined onClick={this.CaretDownOutlined} style={{ 'fontSize': 30 }} />
                  </Row>)
            }
          </Form>
        </Card>

        <div style={{ 'textAlign': 'right' }}>
          <Button.Group style={{ 'marginTop': 20 }}>
            <Popconfirm title={2 == this.state.detail_info.status ? "这是一个已完成的巡检，是否确认删除？" : "是否确定删除？"} cancelText="取消" okText="确定" onConfirm={this.delInspection.bind(this)}>
              <Button type="primary">
                <Icon type="delete" /> 删除
                            </Button>
            </Popconfirm>
            {
              "1" == this.state.detail_info.show_check_btn  ? 
              <Button type="primary"  onClick={this.check}>
                <CheckOutlined /> 复核
              </Button> : null
            }
            {1 == this.state.detail_info.status
              ? <React.Fragment>
                <Button type="primary" htmlType="submit" form="inspection" onClick={this.saveInspectionBtn}>
                  <Icon type="save" /> 保存
                </Button>
                <Button type="primary" htmlType="submit" form="inspection" onClick={this.submitInspectionBtn}>
                  <Icon type="cloud-upload" /> 提交
                                </Button>
              </React.Fragment>
              : null
            }
          </Button.Group>
        </div>

        <Card title="待巡检对象" style={{ marginTop: '20px' }}>
          <Table loading={this.state.loading} style={{ marginBottom: 30, minHeight: 300 }} columns={this.state.detail_info.status == 1 ? this.state.columns : this.state.columnsComplete} dataSource={this.state.detail_list} rowKey={(record, index) => index} bordered pagination={false} scroll={{ y: 260 }}></Table>
        </Card>
      </section>
    )
  }
};

export default Form.create()(EditInspection);