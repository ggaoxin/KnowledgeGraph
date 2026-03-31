import React from 'react';
import { Row, Col, Card, Descriptions, Tag, Space, Button, Alert, Divider, Table, Statistic } from 'antd';
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  StarOutlined,
  FileTextOutlined,
  TeamOutlined,
  LineChartOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import GraphVisualization from './GraphVisualization';
import StatisticsChart from './StatisticsChart';
import IndustryChainMap from './IndustryChainMap';
import ExpertNetworkAnalysis from './ExpertNetworkAnalysis';
import DataFlowVisualization from './DataFlowVisualization';

const ModuleDetailPage = ({ module, onBack }) => {
  // 根据不同的模块类型返回不同的内容
  const renderModuleContent = () => {
    switch(module?.id) {
      case 'direct-relation':
        return (
          <div>
            <Alert
              message="直接关系识别"
              description="系统通过多源数据融合技术，识别专家之间的直接关系，包括论文合作、专利合作、项目合作等多种关系类型"
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={16}>
                <Card title="关系网络可视化">
                  <GraphVisualization title="专家直接关系网络" type="complex" />
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card title="关系类型统计">
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Statistic title="总关系数" value={892.6} suffix="万" prefix={<TeamOutlined />} />
                    <div>
                      <div style={{ marginBottom: 8 }}>
                        <Tag color="blue">论文合作</Tag>
                        <span style={{ marginLeft: 8 }}>45.2万</span>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <Tag color="green">专利合作</Tag>
                        <span style={{ marginLeft: 8 }}>28.6万</span>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <Tag color="orange">项目合作</Tag>
                        <span style={{ marginLeft: 8 }}>12.8万</span>
                      </div>
                      <div>
                        <Tag color="purple">其他合作</Tag>
                        <span style={{ marginLeft: 8 }}>2.6万</span>
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        );

      case 'indirect-relation':
        return (
          <div>
            <Alert
              message="间接关系挖掘"
              description="通过关系路径分析，发现专家之间的间接关联，支持多跳查询和传递推理"
              type="success"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Card title="间接关联网络">
                  <GraphVisualization title="专家间接关系网络" type="complex" />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="关系路径分析">
                  <Table
                    columns={[
                      { title: '专家A', dataIndex: 'expertA', key: 'expertA' },
                      { title: '专家B', dataIndex: 'expertB', key: 'expertB' },
                      { title: '路径长度', dataIndex: 'pathLength', key: 'pathLength' },
                      { title: '置信度', dataIndex: 'confidence', key: 'confidence', render: (val) => <Tag color="blue">{val}%</Tag> }
                    ]}
                    dataSource={[
                      { key: 1, expertA: '张明', expertB: '李华', pathLength: 2, confidence: 92 },
                      { key: 2, expertA: '王芳', expertB: '刘强', pathLength: 3, confidence: 88 },
                      { key: 3, expertA: '陈静', expertB: '赵伟', pathLength: 2, confidence: 95 },
                      { key: 4, expertA: '孙丽', expertB: '周军', pathLength: 4, confidence: 82 }
                    ]}
                    pagination={false}
                    size="small"
                  />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="关联强度分布">
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>强关联</span>
                        <Tag color="red">25%</Tag>
                      </div>
                      <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4 }}>
                        <div style={{ height: '100%', width: '25%', background: '#f5222d', borderRadius: 4 }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>中关联</span>
                        <Tag color="orange">45%</Tag>
                      </div>
                      <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4 }}>
                        <div style={{ height: '100%', width: '45%', background: '#faad14', borderRadius: 4 }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>弱关联</span>
                        <Tag color="green">30%</Tag>
                      </div>
                      <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4 }}>
                        <div style={{ height: '100%', width: '30%', background: '#52c41a', borderRadius: 4 }}></div>
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        );

      case 'collaboration-achievements':
        return (
          <div>
            <Alert
              message="合作成果分析"
              description="深度分析两位专家之间的合作成果，包括论文、专利、项目等多维数据"
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <StatisticsChart />
          </div>
        );

      case 'colleague-relation':
      case 'alumni-relation':
        return (
          <div>
            <Alert
              message="社会关系分析"
              description="基于工作经历和教育经历，构建专家的社会关系网络，分析同事和校友关联"
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <ExpertNetworkAnalysis />
          </div>
        );

      case 'paper-collaboration':
        return (
          <div>
            <Alert
              message="论文合作网络"
              description="专门针对论文合作关系的深度分析，包括作者消歧、合作网络构建、影响力评估"
              type="success"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Card title="论文合作网络">
                  <GraphVisualization title="论文作者合作网络" type="complex" />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="合作论文统计">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="总合作论文数">35,280篇</Descriptions.Item>
                    <Descriptions.Item label="平均每位作者合作论文">42.5篇</Descriptions.Item>
                    <Descriptions.Item label="合作跨度时间">1985-2024年</Descriptions.Item>
                    <Descriptions.Item label="高被引论文">2,850篇</Descriptions.Item>
                    <Descriptions.Item label="顶级期刊发表">1,280篇</Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="合作影响力">
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Statistic
                      title="总引用次数"
                      value={856.2}
                      suffix="万"
                      prefix={<ThunderboltOutlined />}
                      valueStyle={{ color: '#1890ff' }}
                    />
                    <Statistic
                      title="合作h指数"
                      value={85}
                      prefix={<FileTextOutlined />}
                      valueStyle={{ color: '#52c41a' }}
                    />
                    <Statistic
                      title="影响因子总和"
                      value={125.8}
                      prefix={<LineChartOutlined />}
                      valueStyle={{ color: '#faad14' }}
                    />
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        );

      case 'enterprise-relation':
        return (
          <div>
            <Alert
              message="企业关系分析"
              description="分析专家与重点科技企业之间的关联，包括任职、顾问、研发合作等多种关系类型"
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Card title="专家-企业关系网络">
                  <GraphVisualization title="专家与企业关系网络" type="complex" />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="重点企业TOP10">
                  <Table
                    columns={[
                      { title: '排名', dataIndex: 'rank', key: 'rank' },
                      { title: '企业名称', dataIndex: 'name', key: 'name' },
                      { title: '关联专家数', dataIndex: 'experts', key: 'experts' },
                      { title: '专利数量', dataIndex: 'patents', key: 'patents' }
                    ]}
                    dataSource={[
                      { key: 1, rank: 1, name: '华为技术有限公司', experts: 285, patents: 15280 },
                      { key: 2, rank: 2, name: '腾讯科技有限公司', experts: 258, patents: 12850 },
                      { key: 3, rank: 3, name: '阿里巴巴集团', experts: 235, patents: 11520 },
                      { key: 4, rank: 4, name: '百度公司', experts: 215, patents: 10250 },
                      { key: 5, rank: 5, name: '小米科技', experts: 198, patents: 9580 }
                    ]}
                    pagination={false}
                    size="small"
                  />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="关系类型分布">
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                      <Tag color="blue">任职</Tag>
                      <span style={{ marginLeft: 8, fontSize: 16, fontWeight: 600 }}>8,520人</span>
                    </div>
                    <div>
                      <Tag color="green">顾问</Tag>
                      <span style={{ marginLeft: 8, fontSize: 16, fontWeight: 600 }}>2,350人</span>
                    </div>
                    <div>
                      <Tag color="orange">研发合作</Tag>
                      <span style={{ marginLeft: 8, fontSize: 16, fontWeight: 600 }}>1,820人</span>
                    </div>
                    <div>
                      <Tag color="purple">技术投资</Tag>
                      <span style={{ marginLeft: 8, fontSize: 16, fontWeight: 600 }}>680人</span>
                    </div>
                    <div>
                      <Tag color="red">专利转让</Tag>
                      <span style={{ marginLeft: 8, fontSize: 16, fontWeight: 600 }}>450人</span>
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        );

      case 'top-events':
      case 'industry-panorama':
        return (
          <div>
            <Alert
              message="产业链全景图"
              description="构建完整的产业链知识图谱，呈现上中下游环节、关键节点和价值流向"
              type="success"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <IndustryChainMap />
          </div>
        );

      case 'data-support':
        return (
          <div>
            <Alert
              message="数据支撑与动态演化"
              description="系统底座能力，支撑多源异构数据整合、标准化处理和图谱动态更新"
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <DataFlowVisualization />
          </div>
        );

      default:
        return <div>模块详情加载中...</div>;
    }
  };

  return (
    <div className="module-detail-page">
      <Card>
        {/* 页面头部 */}
        <div className="detail-header" style={{ marginBottom: 24 }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={onBack}
                style={{ marginBottom: 16 }}
              >
                返回概览
              </Button>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 12,
                      background: module?.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {React.cloneElement(module?.icon, {
                      className: 'detail-icon',
                      style: { fontSize: 28, color: '#fff' }
                    })}
                  </div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{module?.title}</h2>
                    <p style={{ margin: '4px 0 0 0', color: '#8c8c8c' }}>{module?.description}</p>
                  </div>
                </Space>
                <Space>
                  <Button icon={<StarOutlined />}>收藏</Button>
                  <Button icon={<ShareAltOutlined />}>分享</Button>
                  <Button type="primary" icon={<DownloadOutlined />}>导出报告</Button>
                </Space>
              </div>
            </div>

            {/* 功能特性 */}
            <div>
              <h4 style={{ marginBottom: 12 }}>核心功能特性</h4>
              <Space wrap>
                {module?.features?.map((feature, index) => (
                  <Tag key={index} color="blue" style={{ fontSize: 14, padding: '6px 12px' }}>
                    {feature}
                  </Tag>
                ))}
              </Space>
            </div>

            {/* 统计数据 */}
            <div>
              <h4 style={{ marginBottom: 12 }}>统计数据</h4>
              <Row gutter={[16, 16]}>
                {module?.stats && Object.entries(module.stats).map(([key, value]) => (
                  <Col xs={12} md={6} key={key}>
                    <Card size="small" style={{ textAlign: 'center' }}>
                      <div style={{ color: '#8c8c8c', fontSize: 13, marginBottom: 4 }}>{key}</div>
                      <div style={{ fontSize: 20, fontWeight: 600, color: '#1890ff' }}>{value}</div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Space>
        </div>

        <Divider />

        {/* 模块特定内容 */}
        {renderModuleContent()}
      </Card>
    </div>
  );
};

export default ModuleDetailPage;