import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

const GraphVisualization = ({ title, type = 'default' }) => {
  const chartRef = useRef(null);

  // 生成示例数据
  const generateData = () => {
    const nodes = [];
    const links = [];
    const nodeCount = type === 'complex' ? 50 : 20;

    // 中心节点
    nodes.push({
      id: 0,
      name: '核心专家',
      symbolSize: 50,
      itemStyle: { color: '#1890ff' },
      category: 0
    });

    // 生成周围节点
    const categories = [
      { name: '合作专家', color: '#52c41a' },
      { name: '论文', color: '#faad14' },
      { name: '专利', color: '#f5222d' },
      { name: '项目', color: '#722ed1' },
      { name: '机构', color: '#13c2c2' }
    ];

    for (let i = 1; i < nodeCount; i++) {
      const categoryIndex = Math.floor(Math.random() * categories.length);
      nodes.push({
        id: i,
        name: `${categories[categoryIndex].name}-${i}`,
        symbolSize: 15 + Math.random() * 20,
        itemStyle: { color: categories[categoryIndex].color },
        category: categoryIndex,
        x: Math.random() * 800,
        y: Math.random() * 600
      });
    }

    // 生成关系
    for (let i = 1; i < nodeCount; i++) {
      links.push({
        source: 0,
        target: i,
        value: Math.random() > 0.5 ? '直接合作' : '间接关联',
        lineStyle: {
          width: 1 + Math.random() * 2,
          opacity: 0.6
        }
      });

      // 添加一些节点间的关系
      if (Math.random() > 0.7 && i < nodeCount - 1) {
        links.push({
          source: i,
          target: i + 1,
          value: '合作',
          lineStyle: {
            width: 0.5,
            opacity: 0.3,
            type: 'dashed'
          }
        });
      }
    }

    return { nodes, links, categories };
  };

  const getOption = () => {
    const data = generateData();

    return {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
          color: '#262626'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          if (params.dataType === 'edge') {
            return `${params.data.source} → ${params.data.target}<br/>关系: ${params.data.value}`;
          }
          return `${params.data.name}<br/>类型: ${params.data.category}`;
        }
      },
      legend: {
        data: data.categories.map(c => c.name),
        top: 'bottom'
      },
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          name: '知识图谱',
          type: 'graph',
          layout: 'force',
          data: data.nodes,
          links: data.links,
          categories: data.categories,
          roam: true,
          draggable: true,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            fontSize: 10
          },
          labelLayout: {
            hideOverlap: true
          },
          scaleLimit: {
            min: 0.4,
            max: 2
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 4
            }
          },
          force: {
            repulsion: 300,
            edgeLength: [10, 50],
            gravity: 0.1
          }
        }
      ]
    };
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ReactECharts
        ref={chartRef}
        option={getOption()}
        style={{ height: '100%', width: '100%' }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};

export default GraphVisualization;