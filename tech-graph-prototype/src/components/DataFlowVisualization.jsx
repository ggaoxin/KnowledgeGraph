import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, Row, Col, Statistic, Progress, Space, Tag, Timeline, Alert } from 'antd';
import {
  DatabaseOutlined,
  CloudUploadOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LineChartOutlined,
  CloudDownloadOutlined,
  SecurityScanOutlined
} from '@ant-design/icons';

const DataFlowVisualization = () => {
  // 数据处理流程图
  const dataFlowOption = useMemo(() => ({
    title: {
      text: '数据处理流程',
      left: 'center'
    },
    tooltip: {
      formatter: (params) => {
        if (params.dataType === 'edge') {
          return `${params.data.source} → ${params.data.target}<br/>处理量: ${params.data.value}`;
        }
        return `${params.data.name}<br/>状态: ${params.data.status}<br/>效率: ${params.data.efficiency}%`;
      }
    },
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 60,
        roam: true,
        label: {
          show: true,
          fontSize: 11
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 10
        },
        data: [
          { name: '数据采集', x: 100, y: 250, status: '正常', efficiency: 98, itemStyle: { color: '#52c41a' } },
          { name: '数据清洗', x: 300, y: 250, status: '正常', efficiency: 95, itemStyle: { color: '#1890ff' } },
          { name: '关系抽取', x: 500, y: 250, status: '正常', efficiency: 92, itemStyle: { color: '#722ed1' } },
          { name: '图谱构建', x: 700, y: 250, status: '正常', efficiency: 90, itemStyle: { color: '#faad14' } },
          { name: '索引优化', x: 900, y: 250, status: '正常', efficiency: 88, itemStyle: { color: '#13c2c2' } },
          { name: '质量检测', x: 500, y: 400, status: '运行中', efficiency: 85, itemStyle: { color: '#f5222d' } }
        ],
        links: [
          { source: '数据采集', target: '数据清洗', value: '850GB/天' },
          { source: '数据清洗', target: '关系抽取', value: '750GB/天' },
          { source: '关系抽取', target: '图谱构建', value: '680GB/天' },
          { source: '图谱构建', target: '索引优化', value: '650GB/天' },
          { source: '关系抽取', target: '质量检测', value: '实时' }
        ],
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0.1
        }
      }
    ]
  }), []);

  // 数据源分布
  const dataSourceOption = useMemo(() => ({
    title: {
      text: '多源数据分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [
      {
        name: '数据源',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 3.2, name: '学术论文', itemStyle: { color: '#1890ff' } },
          { value: 2.8, name: '专利文献', itemStyle: { color: '#52c41a' } },
          { value: 2.1, name: '科研项目', itemStyle: { color: '#faad14' } },
          { value: 1.8, name: '科技报告', itemStyle: { color: '#f5222d' } },
          { value: 1.5, name: '标准文献', itemStyle: { color: '#722ed1' } },
          { value: 1.4, name: '会议论文', itemStyle: { color: '#13c2c2' } },
          { value: 0.6, name: '其他', itemStyle: { color: '#eb2f96' } }
        ]
      }
    ]
  }), []);

  // 数据质量指标
  const dataQualityMetrics = [
    { name: '数据完整性', value: 98.5, target: 99 },
    { name: '数据准确性', value: 97.8, target: 98 },
    { name: '数据一致性', value: 96.5, target: 97 },
    { name: '数据时效性', value: 95.2, target: 96 },
    { name: '数据可访问性', value: 99.1, target: 99.5 }
  ];

  // 数据更新日志
  const updateLogs = [
    {
      time: '2024-03-31 14:30',
      action: '数据采集',
      status: 'success',
      detail: '成功采集论文数据 15,280 篇',
      source: 'Web of Science'
    },
    {
      time: '2024-03-31 14:15',
      action: '图谱更新',
      status: 'success',
      detail: '更新专家节点 8,520 个，关系 45,280 条',
      source: '图谱引擎'
    },
    {
      time: '2024-03-31 13:45',
      action: '质量检测',
      status: 'processing',
      detail: '正在执行数据质量检测...',
      source: '质检系统'
    },
    {
      time: '2024-03-31 13:30',
      action: '索引构建',
      status: 'success',
      detail: 'Elasticsearch 索引构建完成',
      source: '索引服务'
    },
    {
      time: '2024-03-31 12:15',
      action: '数据同步',
      status: 'warning',
      detail: '部分数据源同步延迟',
      source: '同步服务'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'success';
      case 'processing': return 'processing';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'success': return <CheckCircleOutlined />;
      case 'processing': return <SyncOutlined spin />;
      case 'warning': return <ClockCircleOutlined />;
      case 'error': return null;
      default: return null;
    }
  };

  return (
    <div className="data-flow-visualization">
      <Alert
        message="数据实时监控中"
        description="系统正在持续采集和处理多源异构数据，确保知识图谱的实时性和准确性"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      <Row gutter={[16, 16]}>
        {/* 统计卡片 */}
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="日处理数据量"
              value={850}
              suffix="GB"
              prefix={<CloudUploadOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="数据节点总数"
              value={1.2}
              precision={1}
              suffix="亿"
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="关系边总数"
              value={8.9}
              precision={1}
              suffix="亿"
              prefix={<LineChartOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="数据更新频率"
              value={15}
              suffix="分钟/次"
              prefix={<SyncOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card title="数据处理流程">
            <ReactECharts
              option={dataFlowOption}
              style={{ height: '400px', width: '100%' }}
              notMerge={true}
              lazyUpdate={true}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="数据源分布">
            <ReactECharts
              option={dataSourceOption}
              style={{ height: '400px', width: '100%' }}
              notMerge={true}
              lazyUpdate={true}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="数据质量指标">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {dataQualityMetrics.map((metric, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 500 }}>{metric.name}</span>
                    <Space>
                      <span style={{ color: metric.value >= metric.target ? '#52c41a' : '#faad14' }}>
                        {metric.value}%
                      </span>
                      <Tag color={metric.value >= metric.target ? 'green' : 'orange'}>
                        目标: {metric.target}%
                      </Tag>
                    </Space>
                  </div>
                  <Progress
                    percent={metric.value}
                    strokeColor={metric.value >= metric.target ? '#52c41a' : '#faad14'}
                    format={(percent) => `${percent}%`}
                  />
                </div>
              ))}
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <CloudDownloadOutlined />
                实时更新日志
              </Space>
            }
            extra={<Tag color="blue" icon={<SyncOutlined />}>实时</Tag>}
          >
            <Timeline
              items={updateLogs.map((log, index) => ({
                color: getStatusColor(log.status),
                dot: getStatusIcon(log.status),
                children: (
                  <div key={index}>
                    <div style={{ fontWeight: 500, marginBottom: 4 }}>
                      {log.action}
                      <Tag
                        color={getStatusColor(log.status)}
                        style={{ marginLeft: 8 }}
                      >
                        {log.status}
                      </Tag>
                    </div>
                    <div style={{ fontSize: 13, color: '#595959', marginBottom: 4 }}>
                      {log.detail}
                    </div>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                      {log.time} · {log.source}
                    </div>
                  </div>
                )
              }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataFlowVisualization;