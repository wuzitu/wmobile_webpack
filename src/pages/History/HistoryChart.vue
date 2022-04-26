<template>
    <div class="chart-box">
        <v-chart class="chart" :option="option" />
    </div>
</template>

<script setup>
import { use } from 'echarts/core'
import { GridComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { ref, defineComponent } from "vue"
import VChart, { THEME_KEY } from "vue-echarts"
use([GridComponent, LineChart, CanvasRenderer, UniversalTransition])

const option = ref({
    xAxis: {
        type: 'category',
        data: ['0:00', '06:00', '12:00', '18:00', '24:00'],
        boundaryGap: false,
        axisTick: { //决定是否显示坐标刻度
            alignWithLabel: true,
            show: false,
            lineStyle: 'dotted'
        },
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
    },
    yAxis: {
        type: 'value',
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        min: 0,
        max: 100
    },
    grid: {
        x: 40,
        y: 19,
        x2: 15,
        y2: 30
    },
    series: [
        {
            data: [5, 38, 47, 75, 59],
            type: 'line',
            // 阴影
            areaStyle: {
                color: '#617CF0',
                opacity: 0.25
            },
            symbol: "none",
            smooth: true,
            lineStyle: {
                normal: {
                    color: '#617CF0',
                    width: '1'
                }
            },
        }
    ]
})
</script>

<style>
.chart-box {
    width: 100%;
    height: 134px;
    background-color: #FFFFFF;;
}
</style>