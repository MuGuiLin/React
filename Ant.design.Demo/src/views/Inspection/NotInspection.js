import React from 'react';
import { Table } from 'antd';

export default class NotInspection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: '巡检单ID',
                    dataIndex: 'id',
                    // render: text => <a>{text}</a>,
                },
                {
                    title: '巡检单名称',
                    dataIndex: 'name',
                    className: 'column-money'
                },
                {
                    title: '巡检单描述',
                    dataIndex: 'bewrite',
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                },
                {
                    title: '执行人',
                    dataIndex: 'enforce',
                },
                {
                    title: '生成巡检单时间',
                    dataIndex: 'generate',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.update - b.update
                },
                {
                    title: '最后更新时间',
                    dataIndex: 'update'
                },
            ],
            data: [
                {
                    id: 'XJF0260601',
                    name: '季检_广播播出系统_广播播出科（播控区）',
                    bewrite: '52周维护 播出通路指标测量、电平校准（2020年第一轮）',
                    status: '进行中',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: '季检_广播播出系统_广播播出科（播控区）',
                    bewrite: '52周维护 播出通路指标测量、电平校准（2020年第一轮）',
                    status: '进行中',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: '季检_广播播出系统_广播播出科（播控区）',
                    bewrite: '52周维护 播出通路指标测量、电平校准（2020年第一轮）',
                    status: '进行中',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: '季检_广播播出系统_广播播出科（播控区）',
                    bewrite: '52周维护 播出通路指标测量、电平校准（2020年第一轮）',
                    status: '进行中',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: '季检_广播播出系统_广播播出科（播控区）',
                    bewrite: '52周维护 播出通路指标测量、电平校准（2020年第一轮）',
                    status: '进行中',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: '季检_广播播出系统_广播播出科（播控区）',
                    bewrite: '52周维护 播出通路指标测量、电平校准（2020年第一轮）',
                    status: '进行中',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: '季检_广播播出系统_广播播出科（播控区）',
                    bewrite: '52周维护 播出通路指标测量、电平校准（2020年第一轮）',
                    status: '进行中',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: '季检_广播播出系统_广播播出科（播控区）',
                    bewrite: '52周维护 播出通路指标测量、电平校准（2020年第一轮）',
                    status: '进行中',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: '季检_广播播出系统_广播播出科（播控区）',
                    bewrite: '52周维护 播出通路指标测量、电平校准（2020年第一轮）',
                    status: '进行中',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: '季检_广播播出系统_广播播出科（播控区）',
                    bewrite: '52周维护 播出通路指标测量、电平校准（2020年第一轮）',
                    status: '进行中',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                }
            ]
        }
    };

    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.state.data} bordered
            // title={() => 'Header'} footer={() => 'Footer'}
            ></Table>
        )
    }
};