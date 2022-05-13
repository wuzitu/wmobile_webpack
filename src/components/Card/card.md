card组件使用方式

引入方式
import Cards from "@/componets/Card/ShowCard.vue"
import cardItemVue from "@/componets/Card/CardItem.vue"
import CardLine from "@/componets/Card/CardLine.vue"

使用方式

<Cards
    :title="card.company"
    :online="true"
    :type="card.isOnline == 'true' ?'online':''"
    :device="card.decice"
    rightIcon="ic_edit">
    <CardLine>
        <cardItemVue label="型号：">{{card.model}}</cardItemVue>
    </CardLine>
    <CardLine :ellipsis="true">
        <cardItemVue label="时间：">2022-03-15 16:00:00:00</cardItemVue>
        <cardItemVue label="事件：">online</cardItemVue>
    </CardLine>
</Cards>

对应的属性 API


#### Cards #####

|  参数                 |   说明               |        类型     | 默认值  | 可传入值
| --------------------- | ------------------- | -------------- |---------|
| title                 | 头部标题             |  string        |     -   |
| online                | 是否显示在线状态      | Boolean        |   false |
|     type              | 在线状态             | Boolean        |   false |
|     device            | 在线状态的内容文字    | String         |   false |
|   rightIcon           | 右侧Icon             | String         |   -     |
|   rightIconPosition   | 右侧Icon位置         | String          |    top  |top/middle/bottom
|   cardData            | 点击事件回调参数      | Object         |    -  |



#### Cards events #####

handleCard         点击卡片时触发        返回cardData
IconRightClick     点击右侧Icon时触发    返回cardData
cardEditTitle     编辑标题之后的确定事件  返回 cardData 和 新名称
#### Cards 自定义顶部内容 #####

<Cards rightIcon="ic_edit">
    <template #title>
        <svg-icon icon-class="ic_time" class="iconleft"></svg-icon>
        <span class="flow-time">时间：带回家萨克好哒</span>
    </template>
    <CardLine>
        <cardItemVue label="型号：">{{card.model}}</cardItemVue>
    </CardLine>
</Cards>

#### Cards 右侧图标自定义内容 #####

<Cards rightIcon="ic_edit">
    <template #title>
        <svg-icon icon-class="ic_time" class="iconleft"></svg-icon>
        <span class="flow-time">时间：带回家萨克好哒</span>
    </template>
    <CardLine>
        <cardItemVue label="型号：">{{card.model}}</cardItemVue>
    </CardLine>
    <template #rightIcon>
        <svg-icon icon-class="ic_time" class="iconleft"></svg-icon>
    </template>
</Cards>