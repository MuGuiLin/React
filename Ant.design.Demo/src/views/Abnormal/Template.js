import React from 'react';
import { Form, Select, Table, Tabs, Icon, Row, Col, Input, Upload, Button, Popconfirm, message, DatePicker, Modal, Radio } from 'antd';
import moment from 'moment';
import { UploadOutlined,CloseOutlined } from '@ant-design/icons';
import stores from '../../store';
import { PlusOutlined } from '@ant-design/icons';

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
      api: "http://anboguanli-dev.smgtech.net",
      activeIndex: null,
      capaIndex: null,
      isadd: false,
      smgid: '',
      department: '',
      status: '',
      name: '',
      tag: '',
      time: '',
      file_id: "", //文件编号
      file: [], //上传附件
      fileList:[],//上传附件列表
      // tags

      startTime: undefined,
      endTime: undefined,
      date: ['', ''],
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      isSearch: false,
      assets_number:"",
      fault_number:"",
      subNumList: [""],
      YTcolumnsList: [],
      YTcolumns: [
        {
          title: '整改措施',
          dataIndex: 'capa',
        },
        {
          title: '整改实施情况',
          dataIndex: 'effect',
          render: (text, record) => (
            <Input placeholder="请填写整改实施情况" defaultValue={null} value={record.effect} onChange={this.handleChange} />
          ),
        }
      ],
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
          title: '名称',
          dataIndex: 'report_name'
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
          title: '状态',
          dataIndex: 'statusName'
        },
        {
          title: '提交人',
          dataIndex: 'submit_admin'
        }
      ],
      unNormalList: [],
      reportName: '',
      reportDetail: '',
      reportDuration: '',
      reportReason: '',
      errorDate: null,
      errorTime: undefined,
      errorReflect: '',
      errorChange: '',
      errorChangeDetail: [],
      errorType: '1',
      role_list: [],
      errorReport: '',
      modalType: '1',
      modalStatus: '',
      is_devops: '0',
      errorDate1: null,
      selectId: null,
      typelist:[],
      typelistId: '',
      system_id: "",
      sysNameList: [],
      system_name: '',
      eq_type: '',
      class: "",
      classlist: [],
      yiTaiLable: [],   // 异态标签
      yitaiInput: '',
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

  handleChange = (e) => {
    console.log(e.target.value)
    let _this = this
    let capaList = []
    this.state.YTcolumnsList.map((item,index) => {
      if(index == _this.state.capaIndex){
        item.effect = e.target.value
      }
    })
    this.state.YTcolumnsList.map((item,index) => {
      capaList.push(item.effect)
    })
    this.setState({
      errorChangeDetail: capaList
    })
  }

  submit = e => {
    e.preventDefault();
    var that = this;
    this.props.form.validateFields((err, val) => {
      if (!err) {
        if (this.state.isSearch) {
          that.searchAbnormal();
        } else {
          this.setState({
            department: '',
            status: '',
            name: '',
            time: '',
            startTime: undefined,
            endTime: undefined,
            tag: ''
          })

          this.getAbnormal()
        }
      }
    });
  };

  departmentChange = e => {
    this.setState({
      department: e
    })
  };

  modalDepartmentChange = e => {
    this.setState({
      modalDepartment: e
    },() => {
      this.billListByReport(e)
    })
  }

  classChange = (e) => {
    this.setState({
      class: e
    })
  }
  
  incoClick = (index) => {
    var b = this.state.yiTaiLable
    b.splice(index,1)
    this.setState({
      yiTaiLable: b
    })
  }

  yiTaiLableListChange = (e) => {
    this.setState({
      yitaiInput: e.target.value
    })
  }

  yiTaiLableList = (e) => {
    let b = this.state.yiTaiLable
    b.push({
      id: 0,
      name: e.target.value
    })
    this.setState({
      yiTaiLable: b,
      yitaiInput: ''
    })
  }

  typelistChange = (e) => {
    this.setState({
      typelistId: e
    })
  }

  eqTypeChange = (e) => {
    this.setState({
      eq_type: e.target.value
    })
  }

  sysNameChange = (e) => {
    this.setState({
      system_id: e
    })
    this.state.sysNameList.map((item) => {
      if(e == item.id){
        this.setState({
          system_name: item.system_name
        })
      }
    })
  }

  statusChange = e => {
    this.setState({
      status: e
    })
  };

  reportDetailChange = e => {
    this.setState({
      reportDetail: e.target.value
    })
  };

  reportNameChange = e => {
    this.setState({
      reportName: e.target.value
    })
  };

  assetsNumbereChange = e => {
    this.setState({
      assets_number: e.target.value
    })
  }

  faultNumberChange = e => {
    this.setState({
      fault_number: e.target.value
    })
  }

  reportDurationChange = e => {
    this.setState({
      reportDuration: e.target.value
    })
  };

  reportReasonChange = e => {
    this.setState({
      reportReason: e.target.value
    })
  };

  errorReflectChange = e => {
    this.setState({
      errorReflect: e.target.value
    })
  };

  // errorChangeChange = e => {
  //   this.setState({
  //     errorChange: e.target.value
  //   })
  // };

  // errorChangeDetailChange = e => {
  //   this.setState({
  //     errorChangeDetail: e.target.value
  //   })
  // };

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

  timeChange = e => {
    this.setState({
      time: e
    })
  };

  dateChange = (date, dateString) => {
    this.setState({
      startTime: dateString[0] == '' ? undefined : dateString[0],
      endTime: dateString[1] == '' ? undefined : dateString[1]
    })
  };

  dateChange1 = (date, dateString) => {
    var time = new Date(date)
    var year = time.getFullYear();
    var mon = time.getMonth() + 1;
    if (mon < 10) {
      mon = '0' + mon;
    }
    var day = time.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    var hour = time.getHours();
    if (hour < 10) {
      hour = '0' + hour;
    }
    var min = time.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }
    var sec = time.getSeconds();
    if (sec < 10) {
      sec = '0' + sec;
    }
    this.setState({
      errorDate: year + '-' + mon + '-' + day + ' ' + hour + ':' + min + ':' + sec
    })
  }

  dateChange2 = (date, dateString) => {
    var time = new Date(date)
    var year = time.getFullYear();
    var mon = time.getMonth() + 1;
    if (mon < 10) {
      mon = '0' + mon;
    }
    var day = time.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    var hour = time.getHours();
    if (hour < 10) {
      hour = '0' + hour;
    }
    var min = time.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }
    var sec = time.getSeconds();
    if (sec < 10) {
      sec = '0' + sec;
    }
    this.setState({
      errorDate: year + '-' + mon + '-' + day + ' ' + hour + ':' + min + ':' + sec
    })
  }

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

  tabCapaClickRow = (i) => {
    this.setState({
      capaIndex: i
    })
  }

  tabSetClassName = (r, i) => {
    return i === this.state.activeIndex ? 'table-row-active' : '';
  };

  modalSubmit = () => {
    var id = this.state.selectId;
    if (id != undefined && id != null && id != '') {
      this.modalSubmitAbnormal(id, '2')
    } else {
      this.modalSubmitAbnormal('', '2')
    }
  };

  modalSave = () => {
    var id = this.state.selectId;
    if (id != undefined && id != null && id != '') {
      this.modalSubmitAbnormal(id, '1')
    } else {
      this.modalSubmitAbnormal('', '1')
    }
  };

  modalSubmitAbnormal = (id, modalStatus) => {
    var that = this;
    React.Axios({
      method: 'GET',
      url: React.Api.abnormal.createreport,
      params: {
        depart_id: that.state.modalDepartment,
        id: id,
        smgid: that.state.smgid,
        report_name: that.state.reportName,
        file_id: that.state.file_id,  //文件编号
        type: that.state.typelistId,
        system_id: that.state.system_id,
        system_name: that.state.system_name,
        eq_type: that.state.eq_type,
        class: that.state.class,
        status: modalStatus,
        assets_number: this.state.assets_number,
        fault_number: this.state.fault_number
      },
      responseType: 'josn'
    }).then((res) => {
      let o = res.data.result;
      if (o.code == '100') {
        that.hide();
        that.getAbnormal();
      }
    })
  }

  closedLoop = () => {
    var id = this.state.selectId;
    if (id != undefined && id != null && id != '') {
      this.submitAbnormal(id, '','1')
    } else {
      this.submitAbnormal('', '','1')
    }
  };

  comfirmSubmit = () => {
    var id = this.state.selectId;
    if (id != undefined && id != null && id != '') {
      this.submitAbnormal(id, '1','')
    } else {
      this.submitAbnormal('', '1','')
    }
  };

  devopsModalSave = () => {
    var id = this.state.selectId;
    if (id != undefined && id != null && id != '') {
      this.submitAbnormal(id, '','')
    } else {
      this.submitAbnormal('', '','')
    }
  };

  submitAbnormal = (id, modalStatus,closedLoop) => {
    var that = this;
    React.Axios({
      method: 'GET',
      url: React.Api.abnormal.savesp,
      params: {
        id: id,
        smgid: that.state.smgid,
        short_desc: that.state.reportDetail,
        situation_after: that.state.reportDuration,
        causal_analysis: that.state.reportReason,
        unexpected_capa: that.state.subNumList,
        is_comfirm: modalStatus,
        is_close_loop: closedLoop,
        tags: that.state.yiTaiLable
      },
      responseType: 'josn'
    }).then((res) => {
      let o = res.data.result;
      if (o.code == '100') {
        that.hide();
        that.getAbnormal();
      }
    })
  }

  devopsConfirmClose = () => {
    var id = this.state.selectId;
    if (id != undefined && id != null && id != '') {
      this.confirmCloseAbnormal(id)
    } else {
      this.confirmCloseAbnormal('')
    }
  };

  confirmCloseAbnormal = (id) => {
    var that = this;
    React.Axios({
      method: 'GET',
      url: React.Api.abnormal.loop,
      params: {
        id: id,
        smgid: that.state.smgid,
        unexpected_effect: that.state.errorChangeDetail,
        // unexpected_capa: that.state.subNumList,
      },
      responseType: 'josn'
    }).then((res) => {
      let o = res.data.result;
      if (o.code == '100') {
        that.hide();
        that.getAbnormal();
      }
    })
  }

  ThreeModalSubmit = () => {
    var id = this.state.selectId;
    if (id != undefined && id != null && id != '') {
      this.ThreeAbnormal(id,'1')
    } else {
      this.ThreeAbnormal('','1')
    }
  };

  ThreeModalSave = () => {
    var id = this.state.selectId;
    if (id != undefined && id != null && id != '') {
      this.ThreeAbnormal(id,'')
    } else {
      this.ThreeAbnormal('','')
    }
  };

  ThreeAbnormal = (id,modalStatus) => {
    var that = this;
    React.Axios({
      method: 'GET',
      url: React.Api.abnormal.applyloop,
      params: {
        id: id,
        smgid: that.state.smgid,
        unexpected_time: that.state.errorDate,
        unexpected_emergency: that.state.errorReflect,
        unexpected_effect: that.state.errorChangeDetail,
        is_comfirm: modalStatus,
      },
      responseType: 'josn'
    }).then((res) => {
      let o = res.data.result;
      if (o.code == '100') {
        that.hide();
        that.getAbnormal();
      }
    })
  }

  getAbnormal = () => {
    var that = this;
    React.Axios({
      method: 'GET',
      url: React.Api.abnormal.index,
      params: {
        smgid: that.state.smgid
      },
      responseType: 'josn'
    }).then((res) => {
      let o = res.data.result;
      if (o.code == '100') {
        var unNormalList = o.data;
        unNormalList.forEach(function (el) {
          switch (el.status) {
            case '1':
              el.statusName = '已保存未提交'
              break;
            case '2':
              el.statusName = '已提交'
              break;
            case '3':
              el.statusName = '待闭环'
              break;
            case '4':
              el.statusName = '待闭环审核'
              break;
            case '5':
              el.statusName = '已闭环'
              break;
          }
        })
        that.setState({
          unNormalList: unNormalList
        })
      }
    })
  };

  getAbnormalDetail = (id) => {
    var that = this;

    React.Axios({
      method: 'GET',
      url: React.Api.abnormal.detail,
      params: {
        smgid: that.state.smgid,
        id: id
      },
      responseType: 'josn'
    }).then((res) => {
      let o = res.data.result;
      if (o.code == '100') {
        console.log(o.data)
        var modalType = '1';
        if (this.state.modalStatus == '3' || this.state.modalStatus == '4' || this.state.modalStatus == '5') {
          modalType = '2'
        }
        that.setState({
          modalType: modalType,
          modalDepartment: o.data.depart_id,
          system_id: Number(o.data.system_id),
          class: Number(o.data.class),
          eq_type: o.data.eq_type,
          reportName: o.data.report_name,
          reportDetail: o.data.short_desc,
          reportDuration: o.data.situation_after,
          reportReason: o.data.causal_analysis,
          typelistId: Number(o.data.type),
          file_id: o.data.file_id, //文件编号
          file: o.data.file, //上传附件
          subNumList: o.data.capa || [""],
          errorDate: o.data.unexpected_time,
          errorReflect: o.data.short_desc,
          YTcolumnsList: o.data.capa_table,
          errorChangeDetail: o.data.unexpected_effect,
          assets_number: o.data.assets_number,
          fault_number: o.data.fault_number,
          yiTaiLable: o.data.tag_list
        })
      }
    })
  }

  searchAbnormal = () => {
    var that = this;

    React.Axios({
      method: 'GET',
      url: React.Api.abnormal.searchreport,
      params: {
        smgid: that.state.smgid,
        start_date: that.state.startTime,
        end_date: that.state.endTime,
        sel_time: that.state.time,
        tag: that.state.tag,
        report_name: that.state.name,
        depart_id: that.state.department,
        status: that.state.status
      },
      responseType: 'josn'
    }).then((res) => {
      let o = res.data.result;
      if (o.code == '100') {
        var unNormalList = o.data;
        if (unNormalList.length > 0) {
          unNormalList.forEach(function (el) {
            switch (el.status) {
              case '1':
                el.statusName = '已保存未提交'
                break;
              case '2':
                el.statusName = '已提交'
                break;
              case '3':
                el.statusName = '待闭环'
                break;
              case '4':
                el.statusName = '待闭环审核'
                break;
              case '5':
                el.statusName = '已闭环'
                break;
            }
          })
        }
        that.setState({
          unNormalList: unNormalList
        })
      }
    })
  };

  newEditTemplet = (e) => {
    this.hide()
    this.setState({
      selectId: null,
      activeIndex: ''
    })
    this.show();
  };

  editTemplet = (e) => {
    var that = this;
    var id = this.state.selectId;
    if (id != null) {
      this.state.unNormalList.forEach(function (el, index) {
        if (el.id == id) {
          that.setState({
            isadd: true,
            modalStatus: el.status
          })
        }
      })
      this.show();
      this.getAbnormalDetail(id)
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
        url: React.Api.abnormal.delreport,
        params: {
          smgid: that.state.smgid,
          id: id
        },
        responseType: 'josn'
      }).then((res) => {
        let o = res.data.result;
        if (o.code == '100') {
          that.setState({
            activeIndex: null,
            selectId: null
          })
          that.getAbnormal();
        }
      })
    } else {
      message.warn('请先选择异态');
    }
  };

  errorTypeChange = (e) => {
    this.setState({
      errorType: e.target.value
    })
  };

  typelist = () => {
    React.Axios({
      method: 'GET',
      url: React.Api.abnormal.typelist,
      params: {
        smgid: this.state.smgid,
      },
      responseType: 'josn'
    }).then((res) => {
      const o = res.data.result
      if('100' == o.code){
        this.setState({
          typelist: o.data
        })
      }
    })
  }

  classlist = () => {
    React.Axios({
      method: 'GET',
      url: React.Api.abnormal.classlist,
      params: {
        smgid: this.state.smgid,
      },
      responseType: 'josn'
    }).then((res) => {
      const o = res.data.result
      if('100' == o.code){
        this.setState({
          classlist: o.data
        })
      }
    })
  }

  show = () => {
    this.typelist()
    this.classlist()
    this.setState({
      visible: true
    })
  }

  hide = () => {
    this.setState({
      visible: false,
      errorDate: null,
      errorTime: undefined,
      file_id: "", //文件编号
      file: "", //文件附件
      modalType: '1',
      modalDepartment: '',
      typelistId:'',
      typelist:[],
      assets_number: '',
      fault_number:"",
      reportName: '',
      reportDetail: '',
      reportDuration: '',
      reportReason: '',
      subNumList: [""],
      YTcolumnsList: [],
      errorType: '1',
      errorReflect: '',
      errorChange: '',
      errorChangeDetail: [],
      isadd: false,
      modalStatus: '',
      selectId: null,
      activeIndex: null,
      capaIndex: null,
      system_id: "",
      sysNameList: [],
      system_name: '',
      eq_type: '',
      class: "",
      classlist: [],
      yiTaiLable: [],
      yiTaiLable: [],   // 异态标签
      yitaiInput: '',
    })
  }

  tabSwitch = (e) => {
    this.setState({
      modalType: e
    })
  }

  tableChange = () => {
    this.setState({
      selectId: null,
      activeIndex: null
    })
  }

  tagChange = (e) => {
    this.setState({
      tag: e.target.value
    })
  }
  
  nameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  componentDidMount() {
    this.getAbnormal();
  }

  componentWillMount() {
    const action = {
      type: 'change_menu_value',
      value: '2',
    };
    stores.dispatch(action);
    var smgid = localStorage.getItem('smgid');
    this.setState({
      smgid: smgid,
      role_list: stores.getState().users.role_list,
      is_devops: stores.getState().users.is_devops
    })
    
  }

  billListByReport (e){
    React.Axios({
      method: 'GET',
      url: React.Api.abnormal.billListByReport,
      params: {
        smgid: this.state.smgid,
        depart_id: e
      },
      responseType: 'josn'
    }).then((res) => {
      const o = res.data.result
      if('100' == o.code){
        this.setState({
          sysNameList: o.data
        })
      }
    })
  }

  plus() {
    var subNumList = this.state.subNumList;
    subNumList.push("")
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

  render() {
    let _this = this
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const props = {
      name: 'file',
      showUploadList: true,
      accept: "application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf,application/msword,application/vnd.ms-powerpoint",
      action: this.state.api + React.Api.exercise.upload + "&smgid=" + _this.state.smgid,
      onChange(info) {
        if (info.file.status === 'done') {
          const {file_id} = info.file.response.result.data
          _this.setState({
            file: info.file,
            file_id: file_id
          },()=>{
            message.success('上传成功!');
          })
        } else if (info.file.status === 'error') {
          message.error('上传失败!');
        }
      },
      onRemove(){
        _this.setState({
          file: [],
          fileList: [],
          uploadPath:''
        })
      },
      beforeUpload(file){
        console.log(file.type)
        if(file.size/1024 > 10240){
          message.error('文件上传过大,最大为10MB')
          return false;
        }else{
          var fileArr = [];
          //获取新的上传列表
          fileArr.push(file);
          //进行赋值保存
          _this.setState({
            fileList: fileArr,
            uploadPath:''
          })
        }
      },
      fileList: _this.state.fileList || "",
      defaultFileList: _this.state.fileList || "",
    };
    return (
      <React.Fragment>
        <Button.Group className='unNormalBtn-container'>
          {
            this.state.is_devops == 0 ? <Button type="primary" onClick={this.newEditTemplet}>
            <Icon type="plus" /> 新增
                    </Button> : null
          }
          {/* <Button type="primary" onClick={this.newEditTemplet}>
            <Icon type="plus" /> 新增
                    </Button> */}
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
            <Select value={this.state.department} onChange={this.departmentChange} style={{ width: '188px' }}>
              <Option key="" value="">全部</Option>
              {
                (this.state.role_list).map((el) =>
                  <Option key={el.depart_id} value={el.depart_id}>{el.department}</Option>
                )
              }
            </Select>
          </Form.Item>
          <Form.Item label="状态">
            <Select value={this.state.status} onChange={this.statusChange} style={{ width: '188px' }}>
              <Option value="">全部</Option>
              <Option value="1">已保存未提交</Option>
              <Option value="2">已提交</Option>
              <Option value="3">待闭环</Option>
              <Option value="4">待闭环审核</Option>
              <Option value="5">已闭环</Option>
            </Select>
          </Form.Item>
          <Form.Item label="名称">
            <Input value={this.state.name} placeholder="名称" onChange={this.nameChange} allowClear />
          </Form.Item>
          <Form.Item label="标签">
            <Input value={this.state.tag} placeholder="标签" onChange={this.tagChange} allowClear />
          </Form.Item>
          <Form.Item label="选择时间">
            <Select value={this.state.time} onChange={this.timeChange} style={{ width: '188px' }}>
              <Option value="">全部</Option>
              <Option value="提交时间">提交时间</Option>
              <Option value="最后更新时间">最后更新时间</Option>
            </Select>
          </Form.Item>
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

        <Modal width="50%" title={null} onCancel={this.hide} footer={(this.state.modalType == 1 && this.state.is_devops == 0) ? [<Button onClick={this.modalSubmit}>提交</Button>, <Button onClick={this.modalSave}>保存</Button>, <Button onClick={this.hide}>取消</Button>] : (this.state.is_devops == 1 && this.state.modalType == 1) ? [<Button onClick={this.closedLoop}>直接闭环</Button>, <Button onClick={this.comfirmSubmit}>确认</Button>, <Button onClick={this.devopsModalSave}>保存</Button>, <Button onClick={this.hide}>取消</Button>] : (this.state.modalType == 2 && this.state.is_devops == 0) ? [this.state.isadd ? <a href={this.state.api + React.Api.abnormal.export + '&smgid=' + this.state.smgid + '&id=' + this.state.selectId} style={{"float" : "left"}}>导出异态报告</a> : [], <Button onClick={this.ThreeModalSubmit}>提交</Button>, <Button onClick={this.ThreeModalSave}>保存</Button>, <Button onClick={this.hide}>取消</Button>] : (this.state.is_devops == 1 && this.state.modalType == 2) ? [this.state.isadd ? <a href={this.state.api + React.Api.abnormal.export + '&smgid=' + this.state.smgid + '&id=' + this.state.selectId} style={{"float" : "left"}}>导出异态报告</a> : [], <Button onClick={this.devopsConfirmClose}>闭环</Button>, <Button onClick={this.confirmClose}>取消</Button>] : [this.state.isadd ? <a href={this.state.api + React.Api.abnormal.export + '&smgid=' + this.state.smgid + '&id=' + this.state.selectId}>导出异态报告</a> : [], ]} visible={this.state.visible}>
          <Tabs activeKey={this.state.modalType} onChange={this.tabSwitch}>
            <TabPane tab="异态报告" key="1">
              <Form layout="inline" className="unNormal-report">
                <Row>
                  <Col span={12}>
                    <Form.Item label="科室">
                      <Select disabled={this.state.is_devops == 1} value={this.state.modalDepartment} onChange={this.modalDepartmentChange} style={{ width: '188px' }}>
                        {
                          (this.state.role_list).map((el) =>
                            <Option key={el.depart_id} value={el.depart_id}>{el.department}</Option>
                          )
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="异态分类">
                      <Select disabled={this.state.is_devops == 1} value={this.state.class} onChange={this.classChange} style={{ width: '188px' }}>
                        {
                          (this.state.classlist).map((el) =>
                            <Option key={el.id} value={el.id}>{el.name}</Option>
                          )
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="异态种类">
                      <Select  disabled={this.state.is_devops == 1} value={this.state.typelistId} onChange={this.typelistChange} style={{ width: '188px' }}>
                        {
                          (this.state.typelist).map((el) =>
                            <Option key={el.id} value={el.id}>{el.name}</Option>
                          )
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="设备类型">
                      <Input disabled={this.state.is_devops == 1} value={this.state.eq_type} onInput={this.eqTypeChange} allowClear />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="报告名称">
                      <Input disabled={this.state.is_devops == 1} value={this.state.reportName} onInput={this.reportNameChange} allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="系统名称">
                        <Select disabled={this.state.is_devops == 1} value={this.state.system_id} onChange={this.sysNameChange} style={{ width: '188px' }}>
                          {
                            (this.state.sysNameList).map((el) =>
                              <Option key={el.id} value={el.id}>{el.sys_name}</Option>
                            )
                          }
                        </Select>
                      </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Form.Item label="故障单号">
                    <Input disabled={this.state.is_devops == 1} value={this.state.assets_number} onInput={this.assetsNumbereChange} style={{ width: '288px' }} allowClear />
                  </Form.Item>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="资产编号">
                      <Input disabled={this.state.is_devops == 1} value={this.state.fault_number} onInput={this.faultNumberChange} style={{ width: '288px' }} allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="上传附件">
                      {
                        this.state.is_devops == 0 ? <Upload {...props}>
                          <Button>
                            <UploadOutlined /> 上传附件
                          </Button>
                        </Upload> : <a href={this.state.api + React.Api.exercise.downfile + '&smgid=' + this.state.smgid + '&file_id=' + this.state.file_id} onClick={this.getFile}>下载附件</a>
                      }
                    </Form.Item>
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <Form.Item label="异态标签" style={{"marginTop" : "20px"}}>
                    <div style={{ minWidth: '288px'}}>
                      {
                        (this.state.yiTaiLable).map((el,index) =>
                          <div style={{display: 'inline',padding: '5px', marginLeft: '5px',backgroundColor: 'rgba(245, 245, 245)'}}><span key={el.id} value={el.id}>{el.name}</span><CloseOutlined style={{marginLeft: '5px'}} onClick={this.incoClick.bind(this, index)} /></div>
                        )
                      }
                      <Input  disabled={this.state.is_devops == 0} value={ this.state.yitaiInput} onPressEnter={this.yiTaiLableList} onChange={this.yiTaiLableListChange} style={{ width: '120px', marginLeft: '20px' }} allowClear />
                    </div>
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item label="报告概述">
                    <TextArea disabled={this.state.is_devops == 0} value={this.state.reportDetail} rows={4} onChange={this.reportDetailChange} />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item label="情况经过">
                    <TextArea disabled={this.state.is_devops == 0} value={this.state.reportDuration} rows={4} onChange={this.reportDurationChange} />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item label="原因分析">
                    <TextArea disabled={this.state.is_devops == 0} value={this.state.reportReason} rows={4} onChange={this.reportReasonChange} />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item label="整改措施：">
                    {
                      (this.state.subNumList).map((item, index) => <div className="subNum-container">
                        <TextArea  disabled={this.state.is_devops == 0} placeholder="整改措施" value={item} onInput={(e) => {
                          var subNumList = this.state.subNumList;
                          subNumList[index] = e.target.value;
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
                </Row>
              </Form>
            </TabPane>
            <TabPane tab="异态闭环" key="2">
              <Form layout="inline" className="unNormal-circle">
                <Row>
                  <Col style={{ width: '100%' }} span={12}>
                    {
                      this.state.errorDate ?
                        <Form.Item>
                          <label>异态日期:</label>
                          <DatePicker disabled={this.state.is_devops == 1} value={moment(this.state.errorDate, this.state.dateFormat)} onChange={this.dateChange1} onOk={this.dateChange1} format="YYYY-MM-DD HH:mm:ss" showTime style={{ width: '182px', minWidth: '182px', 'marginLeft': '20px'}} placeholder="异态日期" />
                        </Form.Item> :
                        <Form.Item>
                          <label>异态日期:</label>
                          <DatePicker disabled={this.state.is_devops == 1} value={null} onChange={this.dateChange2} onOk={this.dateChange2} format="YYYY-MM-DD HH:mm:ss" showTime style={{ width: '182px', minWidth: '182px', 'marginLeft': '20px' }} placeholder="异态日期" />
                        </Form.Item>
                    }
                  </Col>
                </Row>
                <Row>
                {/* short_desc */}
                  <Form.Item style={{'marginRight': 0}}>
                    <label>影响与应急:</label>
                    <TextArea disabled={this.state.is_devops == 1} value={this.state.errorReflect} rows={4} onChange={this.errorReflectChange} />
                  </Form.Item>
                  <Table loading={this.state.loading} style={{ marginTop: 40, minHeight: 300 }} columns={this.state.YTcolumns} onRow={(record, index) => { return { onClick: this.tabCapaClickRow.bind(this, index) }; }} dataSource={this.state.YTcolumnsList} bordered pagination={false} scroll={{ y: 260 }}></Table>
                  {/* <Form.Item label="整改措施">
                    <TextArea disabled={this.state.modalStatus == 6 || this.state.modalStatus == 7} value={this.state.errorChange} rows={4} onChange={this.errorChangeChange} />
                  </Form.Item>
                  <Form.Item label="整改实施情况">
                    <TextArea disabled={this.state.modalStatus == 6 || this.state.modalStatus == 7} value={this.state.errorChangeDetail} rows={4} onChange={this.errorChangeDetailChange} />
                  </Form.Item> */}
                </Row>
                <Row>
                  <Form.Item label="上传最终报告">
                    {
                      this.state.is_devops == 1 && this.state.modalType == 2 ? <Upload {...props}>
                        <Button>
                          <UploadOutlined /> 上传最终报告
                        </Button>
                      </Upload> : ''
                    }
                  </Form.Item>
                </Row>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </React.Fragment>
    )
  }

}

export default Form.create()(Template);