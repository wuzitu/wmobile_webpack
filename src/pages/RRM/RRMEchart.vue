<template>
    <!-- this is a echart Name:
    {{ chartName }} -->
    <div class="echarts-box">
        <v-chart class="chart" :option="option" :autoresize="true" />
    </div>
</template>

<script>
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { PieChart } from "echarts/charts"
import { LineChart } from "echarts/charts"
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, DatasetComponent, TransformComponent, ToolboxComponent } from "echarts/components"
import VChart, { THEME_KEY } from "vue-echarts"
import { ref, defineComponent, defineProps } from "vue"
import { useI18n } from "vue-i18n"
use([CanvasRenderer, PieChart, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, DatasetComponent, TransformComponent, ToolboxComponent])

export default defineComponent({
    name: "HelloWorld",
    components: {
        VChart
    },
    provide: {
        [THEME_KEY]: "dark"
    },
    props: {
        chartName: String,
        alegendData: Array,
        aTimesX: Array,
        rrmechartAjustData: Array,
        selects: Object
    },
    setup: (props) => {
        const { t } = useI18n()
        const before = t("RRM.before")
        const after = t("RRM.after")

        const option = ref({
            width: "90%",
            // height: 200,
            backgroundColor: "#fff",
            tooltip: {
                trigger: "axis",
                formatter: function (oData) {
                    var sTempt = ""
                    for (let ii = 0; ii < oData.length; ii++) {
                        if (ii == 0) {
                            sTempt += oData[ii].name + "<br/>"
                        }
                        if (ii % 2 == 0) {
                            sTempt += oData[ii].seriesName + "(" + before + "):" + oData[ii].value + "%" + "<br/>"
                        } else {
                            sTempt += oData[ii].seriesName + "(" + after + "):" + oData[ii].value + "%" + "<br/>"
                        }
                    }
                    return sTempt
                }
            },
            color: ["#4472C5", "#ED7C30", "#80FF80", "#FF8096", "#800080"],
            legend: {
                top: 5,
                icon: "rect",
                show: false,
                data: props.alegendData,
                selected: props.selects
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: 10,
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: props.aTimesX
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value} %"
                }
            },

            series: [
                {
                    name: props.alegendData[0],
                    type: "line",
                    symbol: "none",
                    data: props.rrmechartAjustData[0]
                },

                {
                    name: props.alegendData[0],
                    type: "line",
                    symbol: "none",
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 2,
                                type: "dotted" //'dotted'虚线 'solid'实线
                            }
                        }
                    },
                    data: props.rrmechartAjustData[1]
                },

                {
                    name: props.alegendData[1],
                    type: "line",
                    symbol: "none",
                    data: props.rrmechartAjustData[2]
                },
                {
                    name: props.alegendData[1],
                    type: "line",
                    symbol: "none",
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 2,
                                type: "dotted" //'dotted'虚线 'solid'实线
                            }
                        }
                    },
                    data: props.rrmechartAjustData[3]
                },
                {
                    name: props.alegendData[2],
                    type: "line",
                    symbol: "none",
                    data: props.rrmechartAjustData[4]
                },
                {
                    name: props.alegendData[2],
                    type: "line",
                    symbol: "none",
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 2,
                                type: "dotted" //'dotted'虚线 'solid'实线
                            }
                        }
                    },
                    data: props.rrmechartAjustData[5]
                },
                {
                    name: props.alegendData[3],
                    type: "line",
                    symbol: "none",
                    data: props.rrmechartAjustData[6]
                },
                {
                    name: props.alegendData[3],
                    type: "line",
                    symbol: "none",
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 2,
                                type: "dotted" //'dotted'虚线 'solid'实线
                            }
                        }
                    },
                    data: props.rrmechartAjustData[7]
                },
                {
                    name: props.alegendData[4],
                    type: "line",
                    symbol: "none",
                    data: props.rrmechartAjustData[8]
                },
                {
                    name: props.alegendData[4],
                    type: "line",
                    symbol: "none",
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 2,
                                type: "dotted" //'dotted'虚线 'solid'实线
                            }
                        }
                    },
                    data: props.rrmechartAjustData[9]
                }
            ]
        })

        return { option }
    }
})
</script>

<style scoped>
.echarts-box {
    width: 100%;
    height: 100%;
    /* background: #073055; */
    box-sizing: border-box;
    padding: 0.5rem 0.425rem 0.4rem 0.425rem;
    display: inline-block;
    /* .echart {
    width: 100%;
    height: 100%;
  } */
}

.chart {
    width: 100%;
    height: 250px;
}
</style>
