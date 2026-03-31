import React, { useState } from 'react';
import { Layout, Menu, Typography, Space, Tag, Button, Breadcrumb, message, Card } from 'antd';
import {
  TeamOutlined,
  NodeIndexOutlined,
  FileSearchOutlined,
  UserSwitchOutlined,
  ReadOutlined,
  ExperimentOutlined,
  BankOutlined,
  ThunderboltOutlined,
  ClusterOutlined,
  DatabaseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BarChartOutlined,
  HomeOutlined,
  RightOutlined
} from '@ant-design/icons';
import './App.css';
import ModuleDetailPage from './components/ModuleDetailPage';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

// 十大核心功能模块
const modules = [
  {
    id: 'direct-relation',
    title: '科技专家/人才直接关系',
    icon: <TeamOutlined />,
    description: '识别和构建专家之间的直接关系，包括论文合作、专利合作、项目共同承担',
    color: '#1890ff',
    features: ['直接关系识别与构建', '关系类型精准分类', '关系上下文信息记录'],
    stats: { relations: '892.6万', types: 15, accuracy: '97.3%' }
  },
  {
    id: 'indirect-relation',
    title: '科技单节点间接关系',
    icon: <NodeIndexOutlined />,
    description: '挖掘单个科技人物节点的间接关联网络，通过推理发现潜在关联',
    color: '#52c41a',
    features: ['间接关系挖掘', '关系路径分析与传递推理', '关联强度计算与关系标注'],
    stats: { relations: '1.2亿', paths: 5, confidence: '92.8%' }
  },
  {
    id: 'collaboration-achievements',
    title: '科技两点合作成果',
    icon: <FileSearchOutlined />,
    description: '聚焦两个指定专家之间的合作成果，多维统计与分析合作价值',
    color: '#faad14',
    features: ['合作成果提取与汇总', '成果多维统计与分析', '合作贡献与模式分析'],
    stats: { achievements: '356.8万', analysis: '18维', timeSpan: '30年' }
  },
  {
    id: 'colleague-relation',
    title: '科技专家同事关系',
    icon: <UserSwitchOutlined />,
    description: '从工作经历出发，构建专家之间的同事关系网络',
    color: '#f5222d',
    features: ['同事关系推理构建', '关系时段与背景判定', '同事期间协作关联'],
    stats: { colleagues: '428.5万', institutions: 12580, timeRange: '1978-2025' }
  },
  {
    id: 'alumni-relation',
    title: '科技专家校友关系',
    icon: <ReadOutlined />,
    description: '基于教育经历识别校友网络，细分同校、同院系、同教育阶段',
    color: '#722ed1',
    features: ['校友关系识别构建', '关系细分与维度记录', '校友互动关联'],
    stats: { alumni: '892.3万', schools: 4520, levels: 4 }
  },
  {
    id: 'paper-collaboration',
    title: '科技专家论文合作关系',
    icon: <ExperimentOutlined />,
    description: '专门针对论文合作网络，作者消歧、合作网络搭建与影响力分析',
    color: '#13c2c2',
    features: ['论文合作关系构建', '合作数据量化统计', '合作网络与影响力分析'],
    stats: { papers: '1.8亿', authors: 685, avgPartners: 12 }
  },
  {
    id: 'enterprise-relation',
    title: '重点关注科技企业关系',
    icon: <BankOutlined />,
    description: '围绕专家和重点科技企业之间的关联，分析企业技术竞争力',
    color: '#eb2f96',
    features: ['专家—企业关系构建', '角色与合作详情标注', '企业背景关联分析'],
    stats: { enterprises: 8500, relations: '128.5万', patents: '892.6万' }
  },
  {
    id: 'top-events',
    title: '科技产业链TOP-N事件关系',
    icon: <ThunderboltOutlined />,
    description: '聚焦产业链中的高影响力关键事件，分析影响与发展趋势',
    color: '#fa8c16',
    features: ['高影响力事件筛选', '事件—专家关系构建', '事件影响与发展趋势分析'],
    stats: { events: 152000, participants: '89.6万', impact: '3层' }
  },
  {
    id: 'industry-panorama',
    title: '科技产业链全景图',
    icon: <ClusterOutlined />,
    description: '面向整个产业链的知识图谱建模与展示，呈现全要素关联',
    color: '#a0d911',
    features: ['产业链结构化建模', '全景可视化展示', '交互与动态更新'],
    stats: { nodes: '1.2亿', edges: '8.9亿', depth: 6 }
  },
  {
    id: 'data-support',
    title: '多源数据支撑与图谱动态演化',
    icon: <DatabaseOutlined />,
    description: '底座能力，支撑多源异构数据整合与图谱长期运转',
    color: '#597ef7',
    features: ['多源数据整合', '标准化处理', '动态更新与回溯管理'],
    stats: { sources: 12, dailyUpdate: '850GB', version: 128 }
  }
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');

  const handleModuleClick = (module) => {
    setSelectedModule(module);
    setActivePage(module.id);
    message.info(`正在加载${module.title}详情...`);
  };

  const handleBackToDashboard = () => {
    setSelectedModule(null);
    setActivePage('dashboard');
  };

  return (
    <Layout className="app-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="sider"
        style={{ width: collapsed ? 80 : 280, overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
        theme="dark"
      >
        <div className="logo">
          <ClusterOutlined className="logo-icon" />
          <span className="logo-text">亿级科技知识图谱引擎</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activePage]}
          onClick={({ key }) => {
            if (key === 'dashboard') {
              handleBackToDashboard();
            }
          }}
        >
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            系统概览
          </Menu.Item>
          {modules.map(module => (
            <Menu.Item
              key={module.id}
              icon={module.icon}
              onClick={() => handleModuleClick(module)}
            >
              {collapsed ? '' : module.title}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout>
        <Header className="header">
          <div className="header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="collapse-btn"
            />
            <Space direction="vertical" size="small">
              <Title level={3} className="header-title">
                {selectedModule ? selectedModule.title : '系统概览'}
              </Title>
              {selectedModule && (
                <Breadcrumb>
                  <Breadcrumb.Item>系统概览</Breadcrumb.Item>
                  <Breadcrumb.Item>{selectedModule.title}</Breadcrumb.Item>
                </Breadcrumb>
              )}
            </Space>
          </div>
          <Space>
            <Tag color="blue">版本: 2.8.6</Tag>
            <Tag color="green">状态: 正常运行</Tag>
            <Tag color="orange">用户: 开发者</Tag>
          </Space>
        </Header>

        <Content className="content">
          <div className="dashboard-container">
            {selectedModule ? (
              <ModuleDetailPage module={selectedModule} onBack={handleBackToDashboard} />
            ) : (
              <>
                {/* 系统统计卡片 */}
                <div className="stats-row">
                  <Card className="stat-card">
                    <div className="stat-card-content">
                      <TeamOutlined className="stat-icon" style={{ color: '#1890ff' }} />
                      <div className="stat-info">
                        <div className="stat-label">专家总数</div>
                        <div className="stat-value" style={{ color: '#1890ff' }}>1285.6万</div>
                        <div className="stat-trend positive">
                          <RightOutlined /> 较上月增长 12.5%
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="stat-card">
                    <div className="stat-card-content">
                      <NodeIndexOutlined className="stat-icon" style={{ color: '#52c41a' }} />
                      <div className="stat-info">
                        <div className="stat-label">关系总数</div>
                        <div className="stat-value" style={{ color: '#52c41a' }}>8.9亿</div>
                        <div className="stat-trend positive">
                          <RightOutlined /> 较上月增长 8.3%
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="stat-card">
                    <div className="stat-card-content">
                      <ExperimentOutlined className="stat-icon" style={{ color: '#faad14' }} />
                      <div className="stat-info">
                        <div className="stat-label">论文数量</div>
                        <div className="stat-value" style={{ color: '#faad14' }}>1.8亿</div>
                        <div className="stat-trend positive">
                          <RightOutlined /> 较上月增长 15.2%
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="stat-card">
                    <div className="stat-card-content">
                      <FileSearchOutlined className="stat-icon" style={{ color: '#722ed1' }} />
                      <div className="stat-info">
                        <div className="stat-label">专利数量</div>
                        <div className="stat-value" style={{ color: '#722ed1' }}>892.6万</div>
                        <div className="stat-trend positive">
                          <RightOutlined /> 较上月增长 18.6%
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* 功能模块网格 */}
                <div className="modules-section">
                  <div className="section-header">
                    <Title level={4}>核心功能模块</Title>
                    <Text type="secondary">共 10 个功能模块，支持亿级数据图谱构建与查询</Text>
                  </div>

                  <div className="modules-grid">
                    {modules.map((module, index) => (
                      <div
                        key={module.id}
                        className="module-card"
                        onClick={() => handleModuleClick(module)}
                      >
                        <div className="module-header">
                          <div className="module-icon" style={{ backgroundColor: module.color }}>
                            {React.cloneElement(module.icon, { className: 'module-icon-content' })}
                          </div>
                          <div className="module-index">{String(index + 1).padStart(2, '0')}</div>
                        </div>
                        <Title level={5} className="module-title">{module.title}</Title>
                        <Text className="module-description">{module.description}</Text>
                        <div className="module-features">
                          {module.features.map((feature, i) => (
                            <Tag key={i} color="blue" className="feature-tag">{feature}</Tag>
                          ))}
                        </div>
                        <div className="module-stats">
                          {Object.entries(module.stats).map(([key, value]) => (
                            <div key={key} className="stat-item">
                              <Text type="secondary">{key}: </Text>
                              <Text strong>{value}</Text>
                            </div>
                          ))}
                        </div>
                        <div className="module-footer">
                          <Button type="primary" size="small" icon={<RightOutlined />}>
                            查看详情
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 系统能力概览 */}
                <Card className="capability-card">
                  <Title level={4} style={{ marginBottom: 24 }}>系统能力概览</Title>
                  <div className="capability-grid">
                    <div className="capability-item">
                      <Text strong>数据规模</Text>
                      <div className="capability-progress">
                        <div className="progress-bar" style={{ width: '95.6%', backgroundColor: '#1890ff' }}></div>
                      </div>
                      <Text type="secondary">总数据量: 12.8亿条记录</Text>
                    </div>
                    <div className="capability-item">
                      <Text strong>查询性能</Text>
                      <div className="capability-progress">
                        <div className="progress-bar" style={{ width: '98.2%', backgroundColor: '#52c41a' }}></div>
                      </div>
                      <Text type="secondary">平均响应时间: 0.3秒</Text>
                    </div>
                    <div className="capability-item">
                      <Text strong>图谱覆盖率</Text>
                      <div className="capability-progress">
                        <div className="progress-bar" style={{ width: '92.8%', backgroundColor: '#722ed1' }}></div>
                      </div>
                      <Text type="secondary">覆盖全球科技领域</Text>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;