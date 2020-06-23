import React from 'react';
import { Typography, Card, Row, Col, Form, Input, Radio, Select, Tabs, Table, Icon, Button, Modal } from 'antd';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Title } = Typography;

export default class Templet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'private',
            visible: false,

            columns: [
                {
                    title: '名称',
                    dataIndex: 'name',
                },
                {
                    title: '类型',
                    dataIndex: 'type'
                },
                {
                    title: '指标',
                    dataIndex: 'norm',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.norm - b.norm
                },
                {
                    title: '操作',
                    dataIndex: 'operate',
                    render: (text, record) => (
                        <React.Fragment>
                            <Icon type="edit" title="编辑" onClick={this.edit.bind(this, record)} />
                            <Icon type="delete" title="删除" />
                        </React.Fragment>
                    ),
                }
            ],
            data: [
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                },
                {
                    name: '服务器',
                    type: '业务系统 ',
                    norm: '>=80%'
                }
            ]

        }
    };

    onSelect = v => {
        console.log('Select', v);
    };

    onChange = e => {
        console.log('Radio', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    edit(o, e) {
        console.log(o.id, e);
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <section className="templet-box">
                <Card title="基础信息">
                    <Form layout="horizontal">
                        <Row>
                            <Col span={8}>
                                <Form.Item label="模板名称：">
                                    <Input placeholder="模板名称" allowClear />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="模板ID：">
                                    <Input placeholder="模板ID" allowClear />
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
                                <Form.Item label="是否公开：">
                                    <Radio.Group value={this.state.value} onChange={this.onChange}>
                                        <Radio value={'public'}>公有 </Radio>
                                        <Radio value={'private'}>私有 </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="科室：">
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
                                    <Select defaultValue="日检" onChange={this.onSelect}>
                                        <Option value="日检">日检</Option>
                                        <Option value="周检">周检</Option>
                                        <Option value="月检">月检</Option>
                                        <Option value="季检">季检</Option>
                                        <Option value="年检">年检</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8}>
                                <Form.Item label="模板类型：">
                                    <Select defaultValue="中心系统维护" onChange={this.onSelect}>
                                        <Option value="中心系统维护">中心系统维护</Option>
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

                <Card title="生成信息" style={{ marginTop: '20px' }}>
                    <Form layout="horizontal">
                        <Row>
                            <Col span={8} className="">
                                <Tabs tabPosition="left">
                                    <TabPane tab="IT基础架构" key="1">
                                        <Title level={4}>IT基础架构</Title>
                                        <Row>
                                            <Col span={24}>
                                                <Form.Item label="巡检对象：">
                                                    <Input placeholder="巡检对象" allowClear />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item label="巡检类型：">
                                                    <Select defaultValue="服务器" onChange={this.onSelect}>
                                                        <Option value="网络">网络</Option>
                                                        <Option value="服务器">服务器</Option>
                                                        <Option value="存储">存储</Option>
                                                        <Option value="数据库">数据库</Option>
                                                        <Option value="机房保障">机房保障</Option>
                                                        <Option value="安全设备">安全设备</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item label="IP地址：">
                                                    <Input placeholder="如：127.0.0.1:80" allowClear />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item label="物理位置：">
                                                    <Input placeholder="物理位置" allowClear />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24} offset={8}>
                                                <Button type="primary" onClick={this.showModal} icon="plus-circle">确认添加</Button>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="业务系统" key="2">
                                        <Title level={4}>业务系统</Title>
                                    </TabPane>
                                    <TabPane tab="电视演播室" key="3">
                                        <Title level={4}>电视演播室</Title>
                                    </TabPane>
                                    <TabPane tab="技术辅助" key="4">
                                        <Title level={4}>技术辅助</Title>
                                    </TabPane>
                                    <TabPane tab="动力保障" key="5">
                                        <Title level={4}>动力保障</Title>
                                    </TabPane>
                                    <TabPane tab="其他" key="6">
                                        <Title level={4}>其他</Title>
                                    </TabPane>
                                </Tabs>
                            </Col>
                            <Col span={16}>
                                <Table className="table" columns={this.state.columns} dataSource={this.state.data} bordered></Table>
                            </Col>
                        </Row>
                    </Form>
                </Card>

                <Modal title="修改指标" visible={this.state.visible} onOk={this.handleOk} okText="确认提交" onCancel={this.handleCancel} >
                    <p></p>
                    <p></p>
                    <p></p>
                </Modal>
            </section>
        )
    }
};