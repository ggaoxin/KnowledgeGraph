import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, Row, Col, Tabs, Tag, Progress, Space } from 'antd';
import {
  ThunderboltOutlined,
  RocketOutlined,
  GlobalOutlined,
  LineChartOutlined
} from '@ant-design/icons';

const IndustryChainMap = () => {
  // 产业链全景图配置
  const chainMapOption = useMemo(() => {
    const nodes = [
      // 上游
      { id: 1, name: '原材料', symbol: 'circle', symbolSize: 40, category: 0, x: 100, y: 300 },
      { id: 2, name: '基础零部件', symbol: 'circle', symbolSize: 40, category: 0, x: 250, y: 200 },
      { id: 3, name: '核心器件', symbol: 'circle', symbolSize: 40, category: 0, x: 250, y: 400 },

      // 中游
      { id: 4, name: '技术研发', symbol: 'rect', symbolSize: 50, category: 1, x: 400, y: 150 },
      { id: 5, name: '产品设计', symbol: 'rect', symbolSize: 50, category: 1, x: 400, y: 300 },
      { id: 6, name: '制造加工', symbol: 'rect', symbolSize: 50, category: 1, x: 400, y: 450 },

      // 下游
      { id: 7, name: '终端产品', symbol: 'diamond', symbolSize: 40, category: 2, x: 550, y: 200 },
      { id: 8, name: '解决方案', symbol: 'diamond', symbolSize: 40, category: 2, x: 550, y: 400 },

      // 应用
      { id: 9, name: '消费应用', symbol: 'triangle', symbolSize: 35, category: 3, x: 700, y: 250 },
      { id: 10, name: '工业应用', symbol: 'triangle', symbolSize: 35, category: 3, x: 700, y: 350 },

      // 核心节点
      { id: 11, name: '创新中心', symbol: 'pin', symbolSize: 60, category: 4, x: 400, y: 300 },
    ];

    const links = [
      // 产业链流程
      { source: 1, target: 2 },
      { source: 1, target: 3 },
      { source: 2, target: 4 },
      { source: 3, target: 5 },
      { source: 4, target: 5 },
      { source: 5, target: 6 },
      { source: 6, target: 7 },
      { source: 5, target: 8 },
      { source: 7, target: 9 },
      { source: 8, target: 10 },

      // 创新中心连接
      { source: 4, target: 11 },
      { source: 5, target: 11 },
      { source: 6, target: 11 },
      { source: 11, target: 7 },
      { source: 11, target: 8 },
    ];

    const categories = [
      { name: '上游', color: '#52c41a' },
      { name: '中游', color: '#1890ff' },
      { name: '下游', color: '#faad14' },
      { name: '应用', color: '#f5222d' },
      { name: '创新中心', color: '#722ed1' }
    ];

    return {
      title: {
        text: '科技产业链全景图',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          if (params.dataType === 'edge') {
            return `${params.data.source} → ${params.data.target}`;
          }
          return `${params.data.name}<br/>类型: ${categories[params.data.category].name}`;
        }
      },
      legend: {
        data: categories.map(c => c.name),
        top: 'bottom'
      },
      series: [
        {
          type: 'graph',
          layout: 'none',
          symbolSize: 50,
          roam: true,
          label: {
            show: true,
            fontSize: 10
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            fontSize: 10
          },
          data: nodes.map(node => ({
            ...node,
            itemStyle: {
              color: categories[node.category].color
            }
          })),
          links: links,
          categories: categories,
          lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0.1
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 4
            }
          }
        }
      ]
    };
  }, []);

  // 产业链统计
  const chainStats = [
    { name: '企业数量', value: 8500, unit: '家', trend: 12.5 },
    { name: '技术创新', value: 2580, unit: '项', trend: 18.2 },
    { name: '专利产出', value: 8926, unit: '件', trend: 15.8 },
    { name: '市场规模', value: 12850, unit: '亿', trend: 22.3 }
  ];

  return (
    <div className="industry-chain-container">
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={6}>
          <Card className="stat-card-mini">
            <Space direction="vertical" size="small">
              <div className="stat-label">企业数量</div>
              <div className="stat-value">8,500</div>
              <div className="stat-trend positive">
                <ArrowUpOutlined /> 12.5%
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card className="stat-card-mini">
            <Space direction="vertical" size="small">
              <div className="stat-label">技术创新</div>
              <div className="stat-value">2,580</div>
              <div className="stat-trend positive">
                <ArrowUpOutlined /> 18.2%
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card className="stat-card-mini">
            <Space direction="vertical" size="small">
              <div className="stat-label">专利产出</div>
              <div className="stat-value">8,926</div>
              <div className="stat-trend positive">
                <ArrowUpOutlined /> 15.8%
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card className="stat-card-mini">
            <Space direction="vertical" size="small">
              <div className="stat-label">市场规模</div>
              <div className="stat-value">12,850亿</div>
              <div className="stat-trend positive">
                <ArrowUpOutlined /> 22.3%
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" items={[
        {
          key: '1',
          label: (
            <span>
              <GlobalOutlined />
              产业链全景图
            </span>
          ),
          children: (
            <Card>
              <ReactECharts
                option={chainMapOption}
                style={{ height: '500px', width: '100%' }}
                notMerge={true}
                lazyUpdate={true}
              />
            </Card>
          )
        },
        {
          key: '2',
          label: (
            <span>
              <LineChartOutlined />
              技术路线
            </span>
          ),
          children: (
            <Card>
              <div style={{ padding: '20px' }}>
                <h4>核心技术路线分析</h4>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>人工智能技术</span>
                      <Tag color="blue">成熟度: 85%</Tag>
                    </div>
                    <Progress percent={85} strokeColor="#1890ff" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>量子计算技术</span>
                      <Tag color="purple">成熟度: 45%</Tag>
                    </div>
                    <Progress percent={45} strokeColor="#722ed1" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>生物基因技术</span>
                      <Tag color="green">成熟度: 72%</Tag>
                    </div>
                    <Progress percent={72} strokeColor="#52c41a" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>新能源技术</span>
                      <Tag color="orange">成熟度: 68%</Tag>
                    </div>
                    <Progress percent={68} strokeColor="#faad14" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>新材料技术</span>
                      <Tag color="red">成熟度: 62%</Tag>
                    </div>
                    <Progress percent={62} strokeColor="#f5222d" />
                  </div>
                </Space>
              </div>
            </Card>
          )
        },
        {
          key: '3',
          label: (
            <span>
              <RocketOutlined />
              关键事件
            </span>
          ),
          children: (
            <Card>
              <div style={{ padding: '20px' }}>
                <h4>TOP-10 高影响力技术事件</h4>
                <div style={{ marginTop: 20 }}>
                  {[
                    { rank: 1, event: 'AlphaFold3蛋白质结构预测', impact: 98, time: '2024-05' },
                    { rank: 2, event: 'ChatGPT-4多模态模型发布', impact: 95, time: '2024-03' },
                    { rank: 3, event: '新型高温超导材料发现', impact: 92, time: '2024-02' },
                    { rank: 4, event: '量子纠错技术突破', impact: 88, time: '2024-01' },
                    { rank: 5, event: '固态电池商业化进展', impact: 85, time: '2023-12' }
                  ].map(item => (
                    <div key={item.rank} style={{
                      padding: '12px',
                      background: '#f5f5f5',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: item.rank <= 3 ? '#f5222d' : '#1890ff',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold'
                        }}>
                          {item.rank}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.event}</div>
                          <div style={{ fontSize: 12, color: '#8c8c8c' }}>时间: {item.time}</div>
                        </div>
                      </div>
                      <Tag color={item.impact >= 90 ? 'red' : 'blue'}>影响指数: {item.impact}</Tag>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )
        }
      ]} />
    </div>
  );
};

export default IndustryChainMap;