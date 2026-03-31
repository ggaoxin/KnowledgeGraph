import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  TrophyOutlined,
  TeamOutlined
} from '@ant-design/icons';

const StatisticsChart = () => {
  // 合作趋势图
  const collaborationTrendOption = useMemo(() => ({
    title: {
      text: '科技专家合作趋势分析',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        let result = params[0].axisValue + '<br/>';
        params.forEach(item => {
          result += `${item.seriesName}: ${item.value.toLocaleString()}<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: ['直接合作', '间接关联', '论文合作'],
      top: 'bottom'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
    },
    yAxis: {
      type: 'value',
      name: '合作数量',
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: [
      {
        name: '直接合作',
        type: 'line',
        data: [45, 52, 61, 78, 92, 110, 135, 162, 198, 245],
        smooth: true,
        areaStyle: {
          opacity: 0.3,
          color: '#1890ff'
        },
        itemStyle: {
          color: '#1890ff'
        }
      },
      {
        name: '间接关联',
        type: 'line',
        data: [120, 156, 198, 245, 298, 352, 425, 512, 625, 758],
        smooth: true,
        areaStyle: {
          opacity: 0.3,
          color: '#52c41a'
        },
        itemStyle: {
          color: '#52c41a'
        }
      },
      {
        name: '论文合作',
        type: 'line',
        data: [78, 95, 112, 135, 158, 182, 215, 258, 312, 375],
        smooth: true,
        areaStyle: {
          opacity: 0.3,
          color: '#faad14'
        },
        itemStyle: {
          color: '#faad14'
        }
      }
    ]
  }), []);

  // 领域分布饼图
  const fieldDistributionOption = useMemo(() => ({
    title: {
      text: '科技专家研究领域分布',
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
        name: '研究领域',
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
          { value: 358, name: '人工智能', itemStyle: { color: '#1890ff' } },
          { value: 285, name: '生物技术', itemStyle: { color: '#52c41a' } },
          { value: 225, name: '新材料', itemStyle: { color: '#faad14' } },
          { value: 198, name: '新能源', itemStyle: { color: '#f5222d' } },
          { value: 175, name: '量子科技', itemStyle: { color: '#722ed1' } },
          { value: 152, name: '集成电路', itemStyle: { color: '#13c2c2' } },
          { value: 125, name: '航空航天', itemStyle: { color: '#eb2f96' } }
        ]
      }
    ]
  }), []);

  // 合作网络影响力
  const influenceOption = useMemo(() => ({
    title: {
      text: '合作网络影响力TOP10',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params) => {
        return `${params[0].name}<br/>影响力指数: ${params[0].value}`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: '影响力指数'
    },
    yAxis: {
      type: 'category',
      data: ['专家10', '专家9', '专家8', '专家7', '专家6', '专家5', '专家4', '专家3', '专家2', '专家1']
    },
    series: [
      {
        name: '影响力指数',
        type: 'bar',
        data: [45, 52, 58, 65, 72, 78, 85, 92, 95, 98],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#1890ff' },
            { offset: 1, color: '#40a9ff' }
          ]),
          borderRadius: [0, 4, 4, 0]
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}'
        }
      }
    ]
  }), []);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={12}>
        <Card title="合作趋势分析" className="chart-card">
          <ReactECharts
            option={collaborationTrendOption}
            style={{ height: '400px', width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
          />
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card title="领域分布" className="chart-card">
          <ReactECharts
            option={fieldDistributionOption}
            style={{ height: '400px', width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
          />
        </Card>
      </Col>
      <Col xs={24}>
        <Card title="网络影响力排行" className="chart-card">
          <ReactECharts
            option={influenceOption}
            style={{ height: '350px', width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticsChart;