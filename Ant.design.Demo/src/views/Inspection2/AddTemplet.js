import React from 'react';
import { Typography, Popconfirm, Card, Row, Col, Form, Input, Radio, Select, Tabs, Table, Icon, Button, Drawer, Modal } from 'antd';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Title } = Typography;

export default class Templet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tempinfo: {},
            value: 'private',
            smgid: '',
            newObject: '',
            newTypeCal: 'IT基础架构',
            newSubclass: '服务器',

            editDrawerVisible: false,
            quotaTitle: '新增',
            quotaName: '',
            quotaType: '1',
            quotaValue: '',
            quotaDownValue: '',
            quotaUpValue: '',
            quotaVisible: false,
            quotaTypeTwo: false,


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
                    ellipsis: true,
                    dataIndex: 'norm',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.norm - b.norm
                },
                {
                    title: '操作',
                    dataIndex: 'operate',
                    render: (text, record) => (
                        <React.Fragment>
                            <Icon type="edit" title="编辑" onClick={this.editDrawer.bind(this, true, record)} />
                            <Popconfirm title="是否确定删除？" cancelText="取消" okText="确定" onConfirm={this.delTabData.bind(this, record)}>
                                {/* <Popconfirm title="删除不可恢复，是否确定删除？" cancelText="取消" okText="确定" onConfirm={() => this.delTabData(record)}> */}
                                <Icon type="delete" title="删除" />
                            </Popconfirm>
                        </React.Fragment>

                    ),
                }
            ],
            tabData: [
                {
                    key: -1,
                    name: '服务器1',
                    type: '业务系统',
                    norm: '>=80%',
                }
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
                            <Icon type="edit" title="编辑" onClick={this.editNewQuota.bind(this, true, 'edit', record)} />
                            <Popconfirm title="是否确定删除？" cancelText="取消" okText="确定" onConfirm={this.delQuotaData.bind(this, record)}>
                                <Icon type="delete" title="删除" />
                            </Popconfirm>
                        </React.Fragment>
                    ),
                }
            ],
            quotaData: [],
            quotaCount: 0,

            quotaRow: []

        }
    };

    onSelect = (e, v) => {
        console.log(this);
        console.log(v);
    };

    onChange = e => {
        console.log('Radio', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    joinTabData = e => {
        const { tabCount, tabData } = this.state;
        let newData = {
            key: tabCount,
            name: this.state.newObject,
            type: this.state.newTypeCal,
            norm: this.state.newSubclass
        };
        this.setState({
            tabData: [...tabData, newData],
            tabCount: tabCount + 1,
            newObject: ''
        });

    };

    delTabData = e => {
        const tabData = [...this.state.tabData];
        this.setState({ tabData: tabData.filter(item => item.key !== e.key) });
    };

    joinQuotaData = e => {
        const { quotaCount, quotaData } = this.state;
        let newData = {
            id: quotaCount,
            name: `指标${quotaCount}`,
            value: '正常;不正常',
            up_value: `20`,
            down_value: `56`
        };
        this.setState({
            quotaData: [...quotaData, newData],
            quotaCount: quotaCount + 1
        });
    };

    delQuotaData = e => {
        const quotaData = [...this.state.quotaData];
        this.setState({ quotaData: quotaData.filter(item => item.id !== e.id) });
    };

    editDrawer = (p, r, e) => {
        this.setState({
            editDrawerVisible: p
        });
    };

    // 编辑或新增指标
    editNewQuota = (p, a, e, o) => {
        console.log('p', p)
        console.log('a', a)
        console.log('e', e)
        console.log('d', o)
        this.setState({
            quotaVisible: p
        });
        if ('add' === a) {
            this.joinQuotaData();
        };
        if ('edit' === a) {
            this.setState({
                quotaTitle: '编辑',
                quotaName: e.name,
                quotaType: e.type,
                quotaValue: e.value,
                quotaDownValue: e.down_value,
                quotaUpValue: e.up_value
            });
            console.log(e.type)
        } else {
            this.setState({
                quotaTitle: '新增',
                quotaName: '',
                quotaType: '1',
                quotaValue: '',
                quotaDownValue: '',
                quotaUpValue: ''
            });
        };
        
    };

    onSelectChange = quotaRow => {
        console.log('已选指标: ', quotaRow);
        this.setState({ quotaRow });
    };

    selectChange = (lv, type) => {
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
                this.setState({
                    newTypeCal: lv.key,
                });
                break;

            case "newSubclass":
                this.setState({
                    newSubclass: lv.key,
                });
                break;

            default:
                break;
        }
        console.log('表单类型: ', lv);
        console.log('表单类型: ', type);
    };

    componentDidMount() {
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
                        tempinfo: o.data
                    });
                };
            });

        React.Axios({
            method: 'GET',
            url: React.Api.inspection.indexlist,
            params: {
                smgid: this.state.smgid
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
            });
    };

    componentWillMount() {

        this.setState({
            smgid: localStorage.getItem('smgid')
        })

    };

    render() {
        const rowSelection = {
            quotaRow: this.state.quotaRow,
            onChange: this.onSelectChange
        };
        return (
            <section className="templet-box">
                <Card title="模版属性">
                    <Form layout="horizontal">
                        <Row>
                            <Col span={8}>
                                <Form.Item label="模板名称：">
                                    <Input placeholder="模板名称" allowClear />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="模板ID：">
                                    <Input placeholder="模板ID" value={this.state.tempinfo.template_id} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="负责人：">
                                    <Input placeholder="模板ID" allowClear />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8}>
                                <Form.Item label="模板共享：">
                                    <Radio.Group value={this.state.value} onChange={this.onChange}>
                                        <Radio value={'public'}>公有 </Radio>
                                        <Radio value={'private'}>私有 </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="科组：">
                                    <Select defaultValue="900000024" onChange={this.onSelect}>
                                        <Option value="900000022">广播技术科</Option>
                                        <Option value="900000023">广播播出科</Option>
                                        <Option value="900000024">广播制作科</Option>
                                        {/* <Option value="900000025" disabled> </Option> */}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="检测周期：">
                                    <Select defaultValue="1" onChange={this.onSelect}>
                                        {(this.state.tempinfo.circle || []).map((item, index) => <Option key={item.id} value={item.id}>{item.circle}</Option>)}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8}>
                                <Form.Item label="模板类型：">
                                    <Select defaultValue="1" onChange={this.onSelect}>
                                        {(this.state.tempinfo.type || []).map(item => <Option key={item.id} value={item.id}>{item.type}</Option>)}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* <Col span={8}>
                            <Form.Item label="创建时间：">
                                <Input placeholder="模板ID" allowClear />
                            </Form.Item>
                        </Col> */}
                            <Col span={16}>
                                <Form.Item label="模板描述：">
                                    <TextArea placeholder="模板描述" allowClear />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>

                <Card title="巡检属性" style={{ marginTop: '20px' }}>
                    <Form layout="horizontal">
                        <Row>
                            <Col span={8} className="">
                                <Row>
                                    <Col span={24}>
                                        <Form.Item label="* 巡检对象：">
                                            <Input placeholder="巡检对象" value={this.state.newObject} onInput={(e) => {this.setState({newObject:e.target.value })}} allowClear />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="* 巡检类别：">
                                            <Select defaultValue={{ key: (this.state.newTypeCal || "IT基础架构") }} labelInValue onChange={(lv) => this.selectChange(lv, 'newTypeCal')}>
                                                <Option value="IT基础架构">IT基础架构</Option>
                                                <Option value="业务系统">业务系统</Option>
                                                <Option value="电视演播室">电视演播室</Option>
                                                <Option value="技术辅助">技术辅助</Option>
                                                <Option value="动力保障">动力保障</Option>
                                                <Option value="其他">其他</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="巡检子类：">
                                            <Select defaultValue={{ key: (this.state.newSubclass || "服务器") }} labelInValue onChange={(lv) => this.selectChange(lv, 'newSubclass')}>
                                                <Option value="服务器">服务器</Option>
                                                <Option value="数据库">数据库</Option>
                                                <Option value="网络">网络</Option>
                                                <Option value="存储">存储</Option>
                                                <Option value="机房保障">机房保障</Option>
                                                <Option value="安全设备">安全设备</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                    <Form.Item label="内编号: ">
                      <Input placeholder="内编号" value={this.state.newObject} onInput={(e) => { this.setState({ newObject: e.target.value }) }} allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="外编号：">
                      <Input placeholder="外编号" value={this.state.newObject} onInput={(e) => { this.setState({ newObject: e.target.value }) }} allowClear />
                    </Form.Item>
                  </Col>
                                    <Col span={24} offset={8} style={{ paddingTop: 30 }}>
                                        <Button type="primary" ghost onClick={this.joinTabData} icon="plus-circle">加入巡检</Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={16}>
                                <Table size="small" className="table" style={{ marginBottom: 30, minHeight: 300 }} columns={this.state.tabHead} dataSource={this.state.tabData} bordered pagination={false} scroll={{ y: 260 }}></Table>
                            </Col>
                        </Row>
                    </Form>
                </Card>

                <Row style={{ marginTop: 20, textAlign: 'center' }}>
                    <Col span={24}>
                        <Button type="primary" block size="large" onClick={this.saveTabData} icon="cloud-upload">提交保存</Button>
                    </Col>
                </Row>

                <Drawer width={860} title="编辑指标" placement="right" visible={this.state.editDrawerVisible} onClose={this.editDrawer.bind(this, false)}>
                    <Table size="small" className="table" rowSelection={rowSelection} columns={this.state.quotaHead} dataSource={this.state.quotaData} bordered pagination={false} ></Table>
                    <Row style={{ marginTop: 20, textAlign: 'center' }}>
                        <Button type="primary" onClick={this.joinTabData} icon="save">保存编辑</Button>
                        <Button type="primary" onClick={this.editNewQuota.bind(this, true)} icon="plus-circle" style={{ marginLeft: 30 }}>新增指标</Button>
                    </Row>
                </Drawer>

                <Modal title={this.state.quotaTitle + '指标'} visible={this.state.quotaVisible} onOk={this.editNewQuota.bind(this, false, 'add')} cancelText="取消" okText={this.state.quotaTitle} onCancel={this.editNewQuota.bind(this, false)} >
                    <Form layout="inline">
                        <Row>
                            <Col span={24}>
                                <Form.Item label="指标名称：">
                                    <Input placeholder="指标名称" value={this.state.quotaName} allowClear />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="表单类型：">
                                    <Select defaultValue={{ key: (this.state.quotaType || "1") }} style={{ width: '193px' }} labelInValue onChange={(lv) => this.selectChange(lv, 'newQuotaType')}>
                                        <Option value="1">单选按扭</Option>
                                        <Option value="2">输入框</Option>
                                        <Option value="3">下拉列表</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            {this.state.quotaTypeTwo
                                ? <React.Fragment >
                                    <Col span={24}>
                                        <Form.Item label="阈值(下限)：">
                                            <Input placeholder="指标阈值(下限)" value={this.state.quotaDownValue} allowClear />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="阈值(上限)：">
                                            <Input placeholder="指标阈值(上限)" value={this.state.quotaUpValue} allowClear />
                                        </Form.Item>
                                    </Col>
                                </React.Fragment>
                                : <Col span={24}>
                                    <Form.Item label="指标阈值：">
                                        <Input placeholder="指标阈值" value={this.state.quotaValue} allowClear />
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