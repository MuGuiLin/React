import React from 'react';
import { Table } from 'antd';

export default class MyInspection extends React.Component {
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
                },
                {
                    title: '最后更新时间',
                    dataIndex: 'update',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.update - b.update,
                },
            ],
            data: [
                {
                    id: 'XJF0260601',
                    name: 'SMG广播制播网播出核心系统日巡检',
                    bewrite: '维护工程师每日执行',
                    status: '已完成',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: 'SMG广播制播网播出核心系统日巡检',
                    bewrite: '维护工程师每日执行',
                    status: '已完成',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: 'SMG广播制播网播出核心系统日巡检',
                    bewrite: '维护工程师每日执行',
                    status: '已完成',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: 'SMG广播制播网播出核心系统日巡检',
                    bewrite: '维护工程师每日执行',
                    status: '已完成',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: 'SMG广播制播网播出核心系统日巡检',
                    bewrite: '维护工程师每日执行',
                    status: '已完成',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: 'SMG广播制播网播出核心系统日巡检',
                    bewrite: '维护工程师每日执行',
                    status: '已完成',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: 'SMG广播制播网播出核心系统日巡检',
                    bewrite: '维护工程师每日执行',
                    status: '已完成',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: 'SMG广播制播网播出核心系统日巡检',
                    bewrite: '维护工程师每日执行',
                    status: '已完成',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: 'SMG广播制播网播出核心系统日巡检',
                    bewrite: '维护工程师每日执行',
                    status: '已完成',
                    enforce: '沐枫',
                    generate: '2020-01-12 13:31:22',
                    update: '2020-01-12 13:31:28'
                },
                {
                    id: 'XJF0260601',
                    name: 'SMG广播制播网播出核心系统日巡检',
                    bewrite: '维护工程师每日执行',
                    status: '已完成',
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