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
			pass_date: null,
			dataFormat: "YYYY-MM-DD",

			searchdepartId: '',
			searchsysName: '',
			searchtypeId: "",

			id: 0,

			depart_id: "",
			sys_name: '',
			type_id: '',

			billtypelist: [],
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
					title: '系统名称',
					dataIndex: 'sys_name'
				},
				{
					title: '类型',
					dataIndex: 'type'
				},
			],
			unNormalList: [],
			role_list: [],
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
			this.searchCheckList();
		} else {
			this.setState({
				searchdepartId: '',
				searchsysName: '',
				searchtypeId: "",
			})

			this.getCheckList()
		}
	};

	departmentChange = e => {
		this.setState({
			searchdepartId: e
		})
	};

	typeIdChange = e => {
		this.setState({
			searchtypeId: e
		})
	};

	depart_idChange = e => {
		this.setState({
			depart_id: e
		})
	};

	sys_nameChange = e => {
		this.setState({
			sys_name: e
		})
	}


	type_idChange = e => {
		this.setState({
			type_id: e
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

	getCheckList = () => {
		var that = this;
		React.Axios({
			method: 'GET',
			url: React.Api.checklist.index,
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

	getCheckListDetail = (id) => {
		var that = this;
		React.Axios({
			method: 'GET',
			url: React.Api.checklist.detail,
			params: {
				smgid: that.state.smgid,
				id: id
			},
			responseType: 'josn'
		}).then((res) => {
			let o = res.data.result;
			if (o.code == '100') {
				this.props.form.setFieldsValue({
					depart_id: o.data.depart_id,
					sys_name: o.data.sys_name,
					type_id: o.data.type_id,
					pass_date: o.data.pass_date
				})
				that.setState({
					id: id,
					visible: true,
				})
			}
		})
	}

	searchCheckList = () => {
		var that = this;

		React.Axios({
			method: 'GET',
			url: React.Api.checklist.index,
			params: {
				smgid: that.state.smgid,
				sys_name: that.state.searchsysName,
				depart_id: that.state.searchdepartId,
				type_id: that.state.searchtypeId
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
				React.Axios({
					method: 'POST',
					url: React.Api.checklist.addsystem,
					params: {
						smgid: that.state.smgid,
						id: that.state.id,
						depart_id: val.depart_id,
						sys_name: val.sys_name,
						type_id: val.type_id,
						type: val.type_id,
						pass_date: that.state.pass_date
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
							that.getCheckList();
						};
					});
			}
		});
	};

	newEditTemplet = (e) => {
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
			this.getCheckListDetail(id)
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
				url: React.Api.checklist.delsystem,
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
					that.getCheckList();
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

	sysNameChange = (e) => {
		this.setState({
			searchsysName: e.target.value
		})
	}

	hide = () => {
		this.props.form.setFieldsValue({
			depart_id: "",
			sys_name: '',
			type_id: '',
		})
	};

	hides = () => {
		this.setState({
			visible: false,
			id: 0,
		}, () => { this.hide() })
	}

	dataChange = (date, dateString) => {
		console.log(1,dateString)
    this.setState({
      pass_date: dateString == "" ? undefined : dateString,
    })
  };

	getBilltypelist = (e) => {
		React.Axios({
			method: 'GET',
			url: React.Api.checklist.billtypelist,
			params: {
				smgid: this.state.smgid,
			},
			responseType: 'josn'
		}).then((res) => {
			let o = res.data.result;
			if (o.code == '100') {
				this.setState({
					billtypelist: o.data
				})
			}
		})
	};

	componentDidMount() {
		this.getBilltypelist()
		this.getCheckList();
	}

	componentWillMount() {
		const action = {
			type: 'change_menu_value',
			value: '5',
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
					<Form.Item label="类型">
						<Select value={this.state.searchtypeId} onChange={this.typeIdChange} style={{ width: '188px' }}>
							<Option key="" value="">全部</Option>
							{
								(this.state.billtypelist).map((el) =>
									<Option key={el.id} value={el.id}>{el.type}</Option>
								)
							}
						</Select>
					</Form.Item>
					<Form.Item label="系统名称">
						<Input value={this.state.searchsysName} placeholder="名称" onChange={this.sysNameChange} allowClear />
					</Form.Item>
					<Form.Item>
						<Button onClick={this.searchType} type="primary" htmlType="submit" icon="search">查询</Button>
					</Form.Item>
					<Form.Item>
						<Button onClick={this.resetType} type="primary" htmlType="submit" icon="delete">清空</Button>
					</Form.Item>
				</Form>

				<Table style={{ margin: '10px 0' }} columns={this.state.columns} loading={this.state.loading} dataSource={this.state.unNormalList} rowKey={(record, index) => index} bordered rowClassName={this.tabSetClassName} onChange={this.tableChange} onRow={(record, index) => { return { onClick: this.tabClickRow.bind(this, record, index), onDoubleClick: this.tabOndblclick.bind(this, record, index) }; }}></Table>

				<Modal width="30%" title={null} onCancel={this.hides} footer={[<Button form="submitTemplate" onClick={this.submitTemplate}>确定</Button>, <Button onClick={this.hides}>取消</Button>]} visible={this.state.visible}>
					<Form layout="inline" className="exercise-container" onSubmit={(event) => { this.submitTemplate(event) }} >
						<Row>
							<Col span={24}>
								<Form.Item label="科室">
									{getFieldDecorator(`depart_id`, {
										initialValue: this.state.depart_id,
										rules: [{ required: true, message: '请选择科室!' },],
									})(<Select disabled={this.state.modalStatus != 0} onChange={this.depart_idChange} style={{ width: '188px' }}>
										{
											(this.state.role_list).map((el) =>
												<Option key={el.depart_id} value={el.depart_id}>{el.department}</Option>
											)
										}
									</Select>)}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={24}>
								<Form.Item label="类型">
									{getFieldDecorator(`type_id`, {
										initialValue: this.state.type_id,
										rules: [{ required: true, message: '请输入类型!' },],
									})(<Select onChange={this.type_idChange} style={{ width: '188px' }}>
										{
											(this.state.billtypelist).map((el) =>
												<Option key={el.id} value={el.id}>{el.type}</Option>
											)
										}
									</Select>)}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={24}>
								<Form.Item label="系统名称">
									{getFieldDecorator(`sys_name`, {
										initialValue: this.state.sys_name,
										rules: [{ required: true, message: '请输入系统名称!' },],
									})(<Input type="text" onChange={this.sys_nameChange} placeholder="名称" allowClear />)}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={24}>
								<Form.Item label="年检通过时间">
									{this.state.pass_date == null ?
									<DatePicker onChange={this.dataChange} value={null} format={this.state.dateFormat} placeholder="年检通过时间" />
									:
									<DatePicker onChange={this.dataChange} value={moment(this.state.pass_date, this.state.dateFormat)} format={this.state.dateFormat} placeholder="年检通过时间" />}
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Modal>
			</React.Fragment>
		)
	}

}

export default Form.create()(Template);