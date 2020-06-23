import React from 'react';
import { Popconfirm, Card, Row, Col, Form, Input, Radio, Select, Table, Icon, Button, Drawer, Modal, message } from 'antd';
import stores from '../../store';
const { TextArea } = Input;
const { Option } = Select;

class Templet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role_list: [],
      is_new: 'add',
      is_template: 0,
      loading: true,
      tempinfo: {},
      circle_arr: [],
      type_arr: [],
      catgory_arr: [],
      smgid: '',
      modalTwoId: '',
      newTypeName: '123',
      newTypeCal: 'IT基础架构',
      newSubclass: '服务器',
      newSubclassArr: [],
      subNumList: [
        {
          val: ''
        }
      ],
      xj_type: '',
      editDrawerVisible: false,
      quotaTitle: '新增',
      quotaName: '',
      quotaType: '1',
      quotaValue: '正常; 不正常;',
      quotaDownValue: '',
      quotaUpValue: '',
      quotaVisible: false,
      quotaTypeTwo: false,
      
      in_num: '', //内编号
      out_num: '', //外编号

      tabHead: [
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
          dataIndex: 'index',
          ellipsis: true
        },
        {
          title: '操作',
          dataIndex: 'operate',
          render: (text, record, index) => (
            <React.Fragment>
              <Icon type="edit" title="编辑" onClick={this.editDrawer.bind(this, true, record, index)} />
              <Popconfirm title="是否确定删除？" cancelText="取消" okText="确定" onConfirm={this.delTabData.bind(this, record)}>
                {/* <Popconfirm title="删除不可恢复，是否确定删除？" cancelText="取消" okText="确定" onConfirm={() => this.delTabData(record)}> */}
                <Icon type="delete" title="删除" />
              </Popconfirm>
            </React.Fragment>

          ),
        }
      ],
      tabData: [
        // {
        //     key: -1,
        //     name: '巡检对象1',
        //     type: 'IT基础架构-服务器',
        //     index: '指标1; 指标2',
        //     index_id: '1; 2'
        // }
      ],
      tabCount: 0,

      quotaHead: [
        {
          title: '名称',
          dataIndex: 'name',
          ellipsis: true
        },
        {
          title: '指标',
          ellipsis: true,
          dataIndex: 'value'
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
          title: '操作',
          dataIndex: 'operate',
          render: (text, record) => (
            <React.Fragment>
              <Icon type="edit" title="编辑" onClick={this.editNewQuota.bind(this, true, '编辑', record)} />
              <Popconfirm title="是否确定删除？" cancelText="取消" okText="确定" onConfirm={this.delQuotaData.bind(this, record)}>
                <Icon type="delete" title="删除" />
              </Popconfirm>
            </React.Fragment>
          ),
        }
      ],
      quotaData: [],
      quotaCount: 0,
      quotaIndex: null,
      quotaRowArr: [],
      quotaDirArr: [],
      subMenuName: ''
    }
  };

  // 删除巡检列表
  delTabData = e => {
    const tabData = [...this.state.tabData];
    this.setState({ tabData: tabData.filter(item => item.key !== e.key) });
  };


  getSubcat = (id = 1000) => {
    React.Axios({
      method: 'GET',
      url: React.Api.inspection.subcat,
      params: {
        smgid: this.state.smgid,
        category_id: id
      },
      responseType: 'josn'
    })
      .then((res) => {
        let o = res.data.result;
        if (100 === o.code) {
          this.setState({
            newSubclassArr: o.data
          });
          if (o.data && 0 < o.data.length) {
            this.setState({
              newSubclass: o.data[0].category_name
            });
          } else {
            this.setState({
              newSubclass: ''
            });
          };
        };
      });
  };

  getQuota = (type) => {
    this.setState({
      loading: true,
      xj_type: type
    });
    React.Axios({
      method: 'GET',
      url: React.Api.inspection.indexlist,
      params: {
        smgid: this.state.smgid,
        xj_type: type
      },
      responseType: 'josn'
    })
      .then((res) => {
        let o = res.data.result;
        if (100 === o.code) {
          this.setState({
            quotaData: o.data,
            quotaCount: o.data.length + 1
          });
        };
        this.setState({
          loading: false
        });
      });
  };

  selectChange = (lv, type) => {
    console.log(lv, type)
    switch (type) {
      case "newQuotaType":
        if (2 == lv.key) {
          this.setState({
            quotaTypeTwo: true,
            quotaType: lv.key
          });
        } else {
          this.setState({
            quotaTypeTwo: false,
            quotaType: lv.key
          });
        }
        break;
      case "newTypeCal":
        this.getSubcat(lv.key);
        this.setState({
          newTypeCal: lv.label,
        });
        break;

      case "newSubclass":
        this.setState({
          newSubclass: lv.label,
        });
        break;

      default:
        break;
    }
  };

  // 显示指标弹窗
  editDrawer = (p, r, i, e) => {
    if (p) this.getQuota(r.type);
    let { tabData, quotaRowArr } = this.state;
    let tabArr = tabData[i];
    this.setState({
      quotaRowArr: [],
      quotaDirArr: []
    });
    if (tabArr && tabArr.index) {
      let orwArr = [], dirArr = [];
      tabArr.index.split(';').forEach((name, index) => {
        if (name) {
          orwArr.push({ id: tabArr.index_id.split(';')[index], name: name })
          dirArr.push(tabArr.index_id.split(';')[index])
        }
      });
      this.setState({
        quotaRowArr: orwArr,
        quotaDirArr: dirArr
      });
    };
    this.setState({
      quotaIndex: i,
      editDrawerVisible: p
    });
  };

  // 编辑或新增指标
  editNewQuota = (p, a, e, o) => {
    console.log(this.state.xj_type,123)
    console.log('p', p)
    console.log('a', a)
    console.log('e', e)
    console.log('d', o,123)

    if (a === '编辑' && !p) {
      var arr = [];
      this.state.subNumList.forEach(function (el) {
        if (el.val != '') {
          arr.push(el.val);
        }
      })
      if (this.state.quotaType == '1' && arr.length == 0) {
        message.warning('单选框指标阈值不能为空!')
        return false;
      } else if (this.state.quotaType == '1' && arr.length == 1) {
        message.warning('单选框指标阈值不能小于2个!')
        return false;
      } else if (this.state.quotaType == '1' && arr.length > 2) {
        message.warning('单选框指标阈值不能大于2个!')
        return false;
      }
    }

    if (a === '新增' && !p) {
      var arr = [];
      this.state.subNumList.forEach(function (el) {
        if (el.val != '') {
          arr.push(el.val);
        }
      })
      if (this.state.quotaType == '1' && arr.length == 0) {
        message.warning('单选框指标阈值不能为空!')
        return false;
      } else if (this.state.quotaType == '1' && arr.length == 1) {
        message.warning('单选框指标阈值不能小于2个!')
        return false;
      } else if (this.state.quotaType == '1' && arr.length > 2) {
        message.warning('单选框指标阈值不能大于2个!')
        return false;
      }
    }

    this.setState({
      quotaVisible: p,
      quotaTypeTwo: false
    });
    if ('新增' === a) {
      const { quotaCount, quotaData } = this.state;
      var subNumList = [{
        val: ''
      }];
      this.setState({
        subNumList: subNumList
      })
      if (!p) {
        var arr = [];
        var subNumList = this.state.subNumList;
        subNumList.forEach(function (el) {
          arr.push(el.val)
        })
        arr = arr.join(';');
        if (this.state.quotaName) {
          console.log()
          let newData = {
            // id: quotaCount,
            smgid: this.state.smgid,
            name: this.state.quotaName,
            type: this.state.quotaType,
            value: arr,
            up_value: this.state.quotaUpValue,
            down_value: this.state.quotaDownValue,
            xj_type: this.state.xj_type
          };
          React.Axios({
            method: 'GET',
            url: React.Api.inspection.addindex,
            params: newData,
            responseType: 'josn'
          })
            .then((res) => {
              let o = res.data.result;
              if (100 === o.code) {
                this.setState({
                  quotaVisible: false,
                  // quotaData: [...quotaData, newData],
                  quotaData: res.data.result.data,
                  quotaCount: quotaCount + 1
                });
              };
            });
        } else {
          message.warning('请输入指标名称！');
          this.setState({
            quotaVisible: true,
            quotaTypeTwo: false
          });
        }
      }
    };
    if ('编辑' === a) {
      console.log(e)
      if (p) {
        this.setState({
          modalTwoId: e.id
        })
      }

      var subNumList = [];
      if (e.value == undefined) {

      } else {
        var arr = e.value.split(';');
        arr.forEach(function (val) {
          subNumList.push({
            val: val
          });
        })
      }

      // return false;
      this.setState({
        quotaTitle: '编辑',
        quotaName: e.name,
        quotaType: e.type,
        quotaValue: e.value,
        quotaDownValue: e.down_value,
        quotaUpValue: e.up_value,
        subNumList: subNumList
      });

      if (2 == e.type) {
        this.setState({
          quotaTypeTwo: true
        });
      } else {
        this.setState({
          quotaTypeTwo: false
        });
      };

      if (!p) {
        var that = this;
        var quotaData = this.state.quotaData;
        var arr = [];
        this.state.subNumList.forEach(function (el) {
          arr.push(el.val)
        })
        arr = arr.join(';');
        quotaData.forEach(function (el, index) {
          if (el.id == that.state.modalTwoId) {
            el.name = that.state.quotaName;
            el.type = that.state.quotaType.toString();
            if (that.state.quotaType.toString() == 1) {
              el.value = arr;
            } else if (that.state.quotaType.toString() == 2) {
              el.up_value = that.state.quotaUpValue;
              el.down_value = that.state.quotaDownValue;
            } else if (that.state.quotaType.toString() == 3) {
              el.value = arr;
            }
          }
        })

        this.setState({
          quotaData: quotaData
        })

        let newData = {
          index_id: this.state.modalTwoId,
          smgid: this.state.smgid,
          name: this.state.quotaName,
          type: this.state.quotaType,
          value: arr,
          up_value: this.state.quotaUpValue,
          down_value: this.state.quotaDownValue,
          xj_type: this.state.xj_type
        };

        // return false;

        React.Axios({
          method: 'GET',
          url: React.Api.inspection.editindex,
          params: newData,
          responseType: 'josn'
        })
          .then((res) => {
            let o = res.data.result;
            if (100 === o.code) {
              // this.setState({
              //     quotaVisible: false,
              //     // quotaData: [...quotaData, newData],
              //     quotaData: res.data.result.data,
              //     quotaCount: quotaCount + 1
              // });
              var subNumList = [{
                val: ''
              }]
              this.setState({
                subNumList: subNumList
              })
            };
          });
      }
    } else {
      this.setState({
        quotaTitle: '新增',
        quotaName: '',
        quotaType: '1',
        // quotaValue: '',
        quotaDownValue: '',
        quotaUpValue: ''
      });
    };
  };

  // 删除指标
  delQuotaData = (r, e) => {
    const quotaData = [...this.state.quotaData];
    this.setState({ quotaData: quotaData.filter(item => item.id !== r.id) });
    React.Axios({
      method: 'GET',
      url: React.Api.inspection.delindex,
      params: {
        smgid: this.state.smgid,
        index_id: r.id
      },
      responseType: 'josn'
    })
      .then((res) => {
        let o = res.data.result;
        if (100 === o.code) {
          message.success('指标删除成功！');
        };
      });
  };

  // 选择指标
  quotaChange = (a, o) => {
    this.setState({
      quotaRowArr: [...o],
      quotaDirArr: a
    });
  };

  // 保存指标
  saveNewQuota = (e) => {
    let { tabData, quotaRowArr } = this.state;
    let name = '', id = '';
    quotaRowArr.forEach(item => {
      id += item.id + ';';
      name += item.name + '; ';
    });
    tabData[this.state.quotaIndex].index = name.substring(0, name.length - 1);
    tabData[this.state.quotaIndex].index_id = id.substring(0, id.length - 1);
    this.setState({
      editDrawerVisible: false
    });
  };

  // 获取科组名称
  getDepartment = (e) => {
    switch (Number(e)) {
      case 900000023:
        return '广播播出科';

      case 900000024:
        return '广播制作科';

      default:
        return '广播技术科';
    };
  };

  // 提交保存模板
  submitTemplate = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, val) => {
      if (!err) {
        console.log(this.state.tabData);
        // return false;
        React.Axios({
          method: 'POST',
          url: React.Api.inspection.addtemp,
          params: {
            smgid: this.state.smgid,
            is_new: this.state.is_new,
            template_id: this.state.tempinfo.template_id,
            name: val.name,
            describe: val.describe,
            depart_id: val.depart_id || 1,
            department: this.getDepartment(val.depart_id),
            admin: val.admin || '',
            is_public: val.is_public || 0,
            is_check: val.is_check || 0,
            type_id: val.type_id || 1,
            circle_id: val.circle_id || 1,
            list: JSON.stringify(this.state.tabData),
            in_num:  this.state.in_num || '',
            out_num:  this.state.out_num || '',
          },
          responseType: 'josn'
        })
          .then((res) => {
            let o = res.data.result;
            if (o && 100 === o.code) {
              console.log(123)
              message.success('add' == this.state.is_new ? '模板新增成功！' : '模板编辑成功！');
              this.props.history.goBack();
            }
          });
      }
    });
  };

  componentDidMount() {

    this.getSubcat();

    this.getQuota();

    var template_id = sessionStorage.getItem('template_id');

    React.Axios({
      method: 'GET',
      url: React.Api.inspection.tempinfo,
      params: {
        smgid: this.state.smgid
      },
      responseType: 'josn'
    })
      .then((res) => {
        let o = res.data.result;
        if (100 === o.code) {
          this.setState({
            tempinfo: o.data,
            circle_arr: o.data.circle,
            type_arr: o.data.type,
            catgory_arr: o.data.catgory
          });

          if (this.props.location.state && this.props.location.state.id) {
            React.Axios({
              method: 'GET',
              url: React.Api.inspection.tempdetail,
              params: {
                smgid: this.state.smgid,
                template_id: this.props.location.state.id
              },
              responseType: 'josn'
            })
              .then((res) => {
                let o = res.data.result;
                if (100 === o.code) {
                  this.setState({
                    is_new: 'edit' || 'add',
                    tempinfo: o.data,
                    tabData: o.data.list,
                    subMenuName: o.data.name,
                    in_num: o.data.in_num,
                    out_num: o.data.out_num,
                  });
                  if (this.props.location.state && this.props.location.state.copy == '1') {
                    this.getTemplateId()
                  }
                };
              });
          } else if (template_id != null && template_id != undefined && template_id != '') {
            React.Axios({
              method: 'GET',
              url: React.Api.inspection.tempdetail,
              params: {
                smgid: this.state.smgid,
                template_id: template_id
                // template_id: this.state.tempinfo.template_id
              },
              responseType: 'josn'
            })
              .then((res) => {
                let o = res.data.result;
                if (100 === o.code) {
                  this.setState({
                    is_new: 'edit' || 'add',
                    tempinfo: o.data,
                    tabData: o.data.list,
                    subMenuName: o.data.name,
                    in_num: o.data.in_num,
                    out_num: o.data.out_num,
                  });
                  if (this.props.location.state && this.props.location.state.copy == '1') {
                    this.getTemplateId()
                  }
                };
              });
          }
        };
      });
  };

  getTemplateId() {
    React.Axios({
      method: 'GET',
      url: React.Api.inspection.tempinfo,
      params: {
        smgid: this.state.smgid
      },
      responseType: 'josn'
    })
      .then((res) => {
        let o = res.data.result;
        if (100 === o.code) {
          var tempinfo = this.state.tempinfo;
          tempinfo.template_id = o.data.template_id;
          this.setState({
            tempinfo: tempinfo,
            is_new: 'add'
          })
          // this.setState({
          //     tempinfo: o.data,
          //     circle_arr: o.data.circle,
          //     type_arr: o.data.type,
          //     catgory_arr: o.data.catgory
          // });
        };
      });
  };

  plus() {
    var subNumList = this.state.subNumList;
    subNumList.push({
      val: ''
    })
    this.setState({
      subNumList: subNumList
    })
  };

  del(index) {
    var subNumList = this.state.subNumList;
    subNumList.splice(index, 1);
    this.setState({
      subNumList: subNumList
    })
  };

  componentWillMount() {
    if (this.props.location.state && this.props.location.state.is_template != undefined) {
      localStorage.setItem('is_template', this.props.location.state.is_template)
      this.setState({
        is_template: this.props.location.state.is_template
      })
    } else {
      var is_template = localStorage.getItem('is_template');
      this.setState({
        is_template: is_template
      })
    }

    if (this.props.location.state && this.props.location.state.id != undefined) {
      sessionStorage.setItem('template_id', this.props.location.state.id)
    }

    this.setState({
      smgid: localStorage.getItem('smgid'),
      role_list: stores.getState().users.role_list
    })

  };

  InspectionForm = () => {
    const CreateForm = Form.create()(props => {
      const joinTabData = e => {
        e.preventDefault();
        props.form.validateFields((err, val) => {
          if (!err) {
            const { tabCount, tabData } = this.state;
            let newData = {
              key: tabCount,
              name: val.name,
              type: this.state.newTypeCal + '-' + this.state.newSubclass,
              index_id: '',
              index: ''
            };
            this.setState({
              tabData: [...tabData, newData],
              tabCount: tabCount + 1
            });
            props.form.setFieldsValue({
              name: ''
            });
          }
        })
      };
      return (
        <Form layout="horizontal">
          <Row>
            <Col span={8}>
              <Row>
                <Col span={24}>
                  <Form.Item label="巡检对象：">
                    {/* {props.form.getFieldDecorator(`name`, {
                                            initialValue: '',
                                            rules: [{ required: true, message: '请输入巡检对象!' },],
                                        })(<Input type="text" placeholder="巡检单名称" allowClear />)} */}
                    {props.form.getFieldDecorator(`name`, {
                      initialValue: this.state.subMenuName,
                      rules: [{ required: true, message: '请输入巡检对象!' },],
                    })(<Input type="text" placeholder="巡检单名称" onBlur={(e) => {
                      console.log(e.target.value)
                      this.setState({
                        subMenuName: e.target.value
                      })
                    }} allowClear />)}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="巡检类别：">
                    <Select defaultValue={{ key: this.state.newTypeCal }} labelInValue onChange={(lv) => this.selectChange(lv, 'newTypeCal')}>
                      {(this.state.catgory_arr).map((item, index) => <Option key={item.category_id} value={item.category_id}>{item.category_name}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="巡检子类：">
                    {props.form.getFieldDecorator(`newSubclass`, { initialValue: this.state.newSubclass || '' })(<Select>
                      {(this.state.newSubclassArr).map((item, index) => <Option key={item.category_id} value={item.category_id}>{item.category_name}</Option>)}
                    </Select>)}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="内编号: ">
                    <Input placeholder="内编号" value={this.state.in_num} onInput={(e) => { this.setState({ in_num: e.target.value }) }} allowClear />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="外编号：">
                    <Input placeholder="外编号" value={this.state.out_num} onInput={(e) => { this.setState({ out_num: e.target.value }) }} allowClear />
                  </Form.Item>
                </Col>
                <Col span={24} offset={8} style={{ paddingTop: 30 }}>
                  <Button type="primary" onClick={joinTabData} icon="plus-circle">加入巡检</Button>
                </Col>
              </Row>
            </Col>
            <Col span={16}>
              <Table size="small" className="table" loading={this.state.loading} style={{ marginBottom: 30, minHeight: 300 }} columns={this.state.tabHead} dataSource={this.state.tabData} bordered rowKey={(record, index) => record.key} pagination={false} scroll={{ y: 260 }}></Table>
            </Col>
          </Row>
        </Form>
      );
    });
    return <CreateForm />;
  };

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const { quotaDirArr } = this.state;
    const rowSelection = {
      selectedRowKeys: quotaDirArr,
      onChange: this.quotaChange,
      // getCheckboxProps: record => ({ 
      //     defaultChecked: quotaDirArr.includes(`${record.id}`),
      // })
    };
    return (
      <section className="templet-box">
        <Card title="模版属性">
          <Form layout="horizontal" id="submitTemplate" onSubmit={(event) => { this.submitTemplate(event) }} >
            <Row>
              <Col span={8}>
                <Form.Item label="模板名称：">
                  {getFieldDecorator(`name`, {
                    initialValue: this.state.tempinfo.name,
                    rules: [{ required: true, message: '请输入模板名称!' },],
                  })(<Input type="text" placeholder="模板名称" allowClear />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="模板ID：">
                  <Input placeholder="模板ID" value={this.state.tempinfo.template_id} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="负责人：">
                  {getFieldDecorator(`admin`, {
                    initialValue: this.state.tempinfo.admin,
                    rules: [{ required: false, message: '请输入负责人!' },],
                  })(<Input type="text" placeholder="负责人" allowClear />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="模板共享：">
                  {getFieldDecorator(`is_public`, { initialValue: this.state.tempinfo.is_public || '0' })(
                    <Radio.Group>
                      <Radio value="1">公有 </Radio>
                      <Radio value="0">私有 </Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="科组：">
                  {getFieldDecorator(`depart_id`, { initialValue: this.state.tempinfo.depart_id || '1' })(
                    <Select disabled={this.state.is_template == 0 ? true : false}>
                      {
                        (this.state.role_list).map((item) => <Option value={item.depart_id}>{item.department}</Option>)
                      }
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="检测周期：">
                  {getFieldDecorator(`circle_id`, { initialValue: this.state.tempinfo.circle_id || '1' })(
                    <Select disabled={this.state.is_template == 0 ? true : false}>
                      {(this.state.circle_arr).map((item, index) => <Option key={item.id} value={item.id}>{item.circle}</Option>)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="模板类型：">
                  {getFieldDecorator(`type_id`, { initialValue: this.state.tempinfo.type_id || '1' })(
                    <Select>
                      {(this.state.type_arr).map(item => <Option key={item.id} value={item.id}>{item.type}</Option>)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="模板描述：">
                  {getFieldDecorator(`describe`, {
                    initialValue: this.state.tempinfo.describe,
                    rules: [{ required: false, message: '请输入模板描述!' },],
                  })(<TextArea placeholder="模板描述" allowClear />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="是否需要复核：">
                  {getFieldDecorator(`is_check`, { initialValue: this.state.tempinfo.is_check || '0' })(
                    <Radio.Group>
                      <Radio value="1">是 </Radio>
                      <Radio value="0">否 </Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card title="巡检属性" style={{ marginTop: 20 }}>
          {this.InspectionForm()}
        </Card>

        <Row style={{ marginTop: 20, textAlign: 'center' }}>
          <Col span={24}>
            <Button type="primary" form="submitTemplate" block size="large" htmlType="submit" icon="cloud-upload">提交保存</Button>
          </Col>
        </Row>

        <Drawer title="编辑指标" width={860} className="templet-box" placement="right" visible={this.state.editDrawerVisible} onClose={this.editDrawer.bind(this, false)}>
          <Card title="已选指标">
            <ul style={{ paddingLeft: 28 }}>
              {(this.state.quotaRowArr).map((item, index) => <li key={item.id}>{item.name}</li>)}
            </ul>
          </Card>
          <br />
          <Table size="small" className="table" loading={this.state.loading} rowSelection={rowSelection} columns={this.state.quotaHead} dataSource={this.state.quotaData} bordered rowKey={(record, index) => record.id} pagination={false} ></Table>
          <Row style={{ marginTop: 20, textAlign: 'center' }}>
            <Button type="primary" onClick={this.saveNewQuota} icon="save">保存编辑</Button>
            <Button type="primary" onClick={this.editNewQuota.bind(this, true)} icon="plus-circle" style={{ marginLeft: 30 }}>新增指标</Button>
          </Row>
        </Drawer>

        <Modal title={this.state.quotaTitle + '指标'} visible={this.state.quotaVisible} onOk={this.editNewQuota.bind(this, false, this.state.quotaTitle)} cancelText="取消" okText={this.state.quotaTitle} onCancel={this.editNewQuota.bind(this, false)} >
          <Form layout="inline">
            <Row>
              <Col span={24}>
                <Form.Item label="指标名称：">
                  <Input placeholder="指标名称" value={this.state.quotaName} onInput={(e) => { this.setState({ quotaName: e.target.value }) }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="表单类型：">
                  <Select value={{ key: (this.state.quotaType.toString() || "1") }} style={{ width: 173 }} labelInValue onChange={(lv) => this.selectChange(lv, 'newQuotaType')}>
                    <Option value="1">单选按扭</Option>
                    <Option value="2">输入框</Option>
                    <Option value="3">下拉列表</Option>
                  </Select>
                </Form.Item>
              </Col>
              {this.state.quotaTypeTwo
                ? <React.Fragment>
                  <Col span={24}>
                    <Form.Item label="阈值(下限)：">
                      <Input placeholder="指标阈值(下限)" value={this.state.quotaDownValue} onInput={(e) => { this.setState({ quotaDownValue: e.target.value }) }} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="阈值(上限)：">
                      <Input placeholder="指标阈值(上限)" value={this.state.quotaUpValue} onInput={(e) => { this.setState({ quotaUpValue: e.target.value }) }} />
                    </Form.Item>
                  </Col>
                </React.Fragment>
                : <Col span={24}>
                  <Form.Item label="指标阈值：">
                    {
                      (this.state.subNumList).map((item, index) => <div className="subNum-container">
                        <Input placeholder="指标阈值" value={item.val} onInput={(e) => {
                          var subNumList = this.state.subNumList;
                          subNumList[index].val = e.target.value;
                          this.setState({
                            subNumList: subNumList
                          })
                        }} />
                        {
                          index == this.state.subNumList.length - 1 ? <Icon onClick={this.plus.bind(this)} type="plus" /> : null
                        }
                        {
                          this.state.subNumList.length > 1 && index != this.state.subNumList.length - 1 ? <Icon onClick={this.del.bind(this, index)} type="delete" /> : null
                        }
                      </div>)
                    }
                  </Form.Item>
                </Col>
              }
            </Row>
          </Form>
        </Modal>
      </section>
    )
  }
};

export default Form.create()(Templet);