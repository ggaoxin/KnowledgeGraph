import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, Row, Col, Table, Tag, Space, Avatar, Button, Badge } from 'antd';
import {
  SearchOutlined,
  TeamOutlined,
  FileTextOutlined,
  TrophyOutlined,
  StarOutlined,
  EyeOutlined
} from '@ant-design/icons';

const ExpertNetworkAnalysis = () => {
  // 专家网络拓扑图
  const networkTopologyOption = useMemo(() => {
    const experts = [
      { id: 0, name: '张明', hIndex: 85, citations: 15230, papers: 428, category: 0 },
      { id: 1, name: '李华', hIndex: 78, citations: 12350, papers: 385, category: 1 },
      { id: 2, name: '王芳', hIndex: 92, citations: 18560, papers: 452, category: 0 },
      { id: 3, name: '刘强', hIndex: 65, citations: 8920, papers: 298, category: 2 },
      { id: 4, name: '陈静', hIndex: 72, citations: 10280, papers: 325, category: 1 },
      { id: 5, name: '赵伟', hIndex: 88, citations: 16540, papers: 415, category: 0 },
      { id: 6, name: '孙丽', hIndex: 58, citations: 6580, papers: 235, category: 2 },
      { id: 7, name: '周军', hIndex: 82, citations: 14320, papers: 398, category: 1 },
    ];

    const collaborations = [
      { source: 0, target: 1, papers: 45, weight: 0.8 },
      { source: 0, target: 2, papers: 32, weight: 0.6 },
      { source: 1, target: 3, papers: 28, weight: 0.5 },
      { source: 2, target: 4, papers: 38, weight: 0.7 },
      { source: 3, target: 5, papers: 22, weight: 0.4 },
      { source: 4, target: 6, papers: 18, weight: 0.3 },
      { source: 5, target: 7, papers: 35, weight: 0.6 },
      { source: 6, target: 0, papers: 15, weight: 0.2 },
      { source: 7, target: 1, papers: 42, weight: 0.75 },
      { source: 2, target: 5, papers: 29, weight: 0.55 },
    ];

    return {
      title: {
        text: '专家合作网络',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          if (params.dataType === 'edge') {
            return `合作论文数: ${params.data.papers}`;
          }
          const expert = experts.find(e => e.id === params.data.id);
          return `${expert.name}<br/>
                 H指数: ${expert.hIndex}<br/>
                 引用数: ${expert.citations.toLocaleString()}<br/>
                 论文数: ${expert.papers}`;
        }
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          data: experts.map(expert => ({
            id: expert.id,
            name: expert.name,
            symbolSize: expert.hIndex / 2,
            itemStyle: {
              color: ['#1890ff', '#52c41a', '#faad14'][expert.category]
            },
            label: {
              show: true,
              fontSize: 12
            }
          })),
          links: collaborations.map(link => ({
            source: link.source,
            target: link.target,
            papers: link.papers,
            lineStyle: {
              width: link.weight * 3,
              opacity: link.weight,
              color: 'source'
            }
          })),
          roam: true,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}'
          },
          force: {
            repulsion: 200,
            edgeLength: [30, 100]
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

  // 专家影响力分析表格
  const expertInfluenceColumns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      render: (text) => (
        <Badge
          count={text}
          style={{
            backgroundColor: text <= 3 ? '#f5222d' : '#1890ff'
          }}
        />
      )
    },
    {
      title: '专家信息',
      key: 'expert',
      render: (_, record) => (
        <Space>
          <Avatar style={{ backgroundColor: record.rank <= 3 ? '#f5222d' : '#1890ff' }}>
            {record.name.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{record.name}</div>
            <div style={{ fontSize: 12, color: '#8c8c8c' }}>{record.institution}</div>
          </div>
        </Space>
      )
    },
    {
      title: 'H指数',
      dataIndex: 'hIndex',
      key: 'hIndex',
      sorter: (a, b) => a.hIndex - b.hIndex,
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: '论文数',
      dataIndex: 'papers',
      key: 'papers',
      sorter: (a, b) => a.papers - b.papers
    },
    {
      title: '引用数',
      dataIndex: 'citations',
      key: 'citations',
      sorter: (a, b) => a.citations - b.citations,
      render: (text) => text.toLocaleString()
    },
    {
      title: '合作网络',
      dataIndex: 'collaborators',
      key: 'collaborators',
      render: (text) => (
        <Tag color="green">{text}人</Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" size="small" icon={<EyeOutlined />}>
            查看
          </Button>
          <Button type="link" size="small" icon={<SearchOutlined />}>
            分析
          </Button>
        </Space>
      )
    }
  ];

  const expertInfluenceData = [
    {
      key: 1,
      rank: 1,
      name: '王芳',
      institution: '清华大学',
      hIndex: 92,
      papers: 452,
      citations: 18560,
      collaborators: 85
    },
    {
      key: 2,
      rank: 2,
      name: '赵伟',
      institution: '北京大学',
      hIndex: 88,
      papers: 415,
      citations: 16540,
      collaborators: 78
    },
    {
      key: 3,
      rank: 3,
      name: '张明',
      institution: '浙江大学',
      hIndex: 85,
      papers: 428,
      citations: 15230,
      collaborators: 72
    },
    {
      key: 4,
      rank: 4,
      name: '周军',
      institution: '上海交通大学',
      hIndex: 82,
      papers: 398,
      citations: 14320,
      collaborators: 68
    },
    {
      key: 5,
      rank: 5,
      name: '李华',
      institution: '复旦大学',
      hIndex: 78,
      papers: 385,
      citations: 12350,
      collaborators: 65
    }
  ];

  // 领域热度分析
  const fieldHeatmapOption = useMemo(() => ({
    title: {
      text: '研究领域热度分析',
      left: 'center'
    },
    tooltip: {
      position: 'top',
      formatter: (params) => {
        return `${params.data[0]}<br/>影响力: ${params.data[2]}<br/>论文数: ${params.data[1]}`;
      }
    },
    grid: {
      height: '70%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: ['2019', '2020', '2021', '2022', '2023', '2024'],
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      data: ['人工智能', '生物技术', '新材料', '量子科技', '新能源'],
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      inRange: {
        color: ['#e6f7ff', '#1890ff']
      }
    },
    series: [
      {
        type: 'heatmap',
        data: [
          // 人工智能
          ['人工智能', '2019', 75], ['人工智能', '2020', 82], ['人工智能', '2021', 88],
          ['人工智能', '2022', 92], ['人工智能', '2023', 95], ['人工智能', '2024', 98],
          // 生物技术
          ['生物技术', '2019', 65], ['生物技术', '2020', 70], ['生物技术', '2021', 75],
          ['生物技术', '2022', 78], ['生物技术', '2023', 82], ['生物技术', '2024', 85],
          // 新材料
          ['新材料', '2019', 55], ['新材料', '2020', 60], ['新材料', '2021', 65],
          ['新材料', '2022', 68], ['新材料', '2023', 72], ['新材料', '2024', 75],
          // 量子科技
          ['量子科技', '2019', 45], ['量子科技', '2020', 50], ['量子科技', '2021', 58],
          ['量子科技', '2022', 65], ['量子科技', '2023', 70], ['量子科技', '2024', 75],
          // 新能源
          ['新能源', '2019', 60], ['新能源', '2020', 65], ['新能源', '2021', 70],
          ['新能源', '2022', 75], ['新能源', '2023', 78], ['新能源', '2024', 82]
        ],
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }), []);

  return (
    <div className="expert-network-analysis">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <Space>
                <TeamOutlined />
                专家合作网络
              </Space>
            }
            extra={<Button type="primary" size="small" icon={<StarOutlined />}>关注</Button>}
          >
            <ReactECharts
              option={networkTopologyOption}
              style={{ height: '450px', width: '100%' }}
              notMerge={true}
              lazyUpdate={true}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title={
              <Space>
                <TrophyOutlined />
                领域热度分析
              </Space>
            }
          >
            <ReactECharts
              option={fieldHeatmapOption}
              style={{ height: '450px', width: '100%' }}
              notMerge={true}
              lazyUpdate={true}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24}>
          <Card
            title={
              <Space>
                <FileTextOutlined />
                专家影响力排行
              </Space>
            }
            extra={<Button type="primary" size="small" icon={<SearchOutlined />}>搜索</Button>}
          >
            <Table
              columns={expertInfluenceColumns}
              dataSource={expertInfluenceData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`
              }}
              size="middle"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ExpertNetworkAnalysis;