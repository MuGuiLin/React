import React from 'react';
import { Table, Tabs, Icon, Button } from 'antd';


const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}

export default class AllInspection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: '模板ID',
                    dataIndex: 'id',
                },
                {
                    title: '模板名称',
                    dataIndex: 'name'
                },
                {
                    title: '模板描述',
                    dataIndex: 'bewrite'
                },
                {
                    title: '负责人',
                    dataIndex: 'principal'
                },
                {
                    title: '最后更新时间',
                    dataIndex: 'update',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.update - b.update
                },
                {
                    title: '操作',
                    dataIndex: 'operate',
                    render: (text, record) => (
                        <Button type="primary" size="small" shape="round" icon="file-add" onClick={this.add.bind(this, record)} >生成</Button>
                    ),
                }
            ],
            data: [
                {
                    id: 'XJF0260601',
                    name: '周检_1楼裙楼制作机房 ',
                    bewrite: '',
                    principal: '沐枫',
                    update: '2020-02-12 10:23:16',
                    
                },
                {
                    id: 'XJF0260601',
                    name: '周检_1楼裙楼制作机房 ',
                    bewrite: '',
                    principal: '沐枫',
                    update: '2020-02-12 10:23:16',
                    
                },
                {
                    id: 'XJF0260601',
                    name: '周检_1楼裙楼制作机房 ',
                    bewrite: '',
                    principal: '沐枫',
                    update: '2020-02-12 10:23:16',
                    
                },
                {
                    id: 'XJF0260601',
                    name: '周检_1楼裙楼制作机房 ',
                    bewrite: '',
                    principal: '沐枫',
                    update: '2020-02-12 10:23:16',
                    
                },
                {
                    id: 'XJF0260601',
                    name: '周检_1楼裙楼制作机房 ',
                    bewrite: '',
                    principal: '沐枫',
                    update: '2020-02-12 10:23:16',
                    
                },
                {
                    id: 'XJF0260601',
                    name: '周检_1楼裙楼制作机房 ',
                    bewrite: '',
                    principal: '沐枫',
                    update: '2020-02-12 10:23:16',
                    
                },
                {
                    id: 'XJF0260601',
                    name: '周检_1楼裙楼制作机房 ',
                    bewrite: '',
                    principal: '沐枫',
                    update: '2020-02-12 10:23:16',
                    
                },
                {
                    id: 'XJF0260601',
                    name: '周检_1楼裙楼制作机房 ',
                    bewrite: '',
                    principal: '沐枫',
                    update: '2020-02-12 10:23:16',
                    
                }
            ]
        }
    };

    add(o, e){
        console.log(o.id, e)
    }

    render() {
        return (
            <React.Fragment>
                <Tabs defaultActiveKey="1" onChange={callback} size="default">
                    <TabPane tab={<span><Icon type="dropbox" />公共</span>} key="1">
                        <Table columns={this.state.columns} dataSource={this.state.data} bordered></Table>
                    </TabPane>
                    <TabPane tab={<span><Icon type="dropbox" />广播技术科</span>} key="2">
                        <Table columns={this.state.columns} dataSource={this.state.data} bordered></Table>
                    </TabPane>

                    <TabPane tab={<span><Icon type="dropbox" />广播播出科</span>} key="3">
                        <Table columns={this.state.columns} dataSource={this.state.data} bordered></Table>
                    </TabPane>

                    <TabPane tab={<span><Icon type="dropbox" />广播制作科</span>} key="4">
                        <Table columns={this.state.columns} dataSource={this.state.data} bordered></Table>
                    </TabPane>
                </Tabs>
            </React.Fragment>
        )
    }
};