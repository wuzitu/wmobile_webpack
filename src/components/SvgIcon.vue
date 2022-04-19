<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-bind="$attrs" />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { computed } from "vue"
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const isExternal = computed(() => {
      return /^(https?:|mailto:|tel:)/.test(props.iconClass)
    })

    const iconName = computed(() => {
      return `#icon-${props.iconClass}`
    })

    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`
      }
      return "svg-icon"
    })

    const styleExternalIcon = computed(() => {
      return {
        mask: `url(${props.iconClass}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${props.iconClass}) no-repeat 50% 50%`
      }
    })

    return {
      isExternal,
      iconName,
      svgClass,
      styleExternalIcon
    }
  }
}
</script>

<style scoped>
.svg-icon {
  fill: currentColor;
  /* height: 36px; */
  overflow: hidden;
  vertical-align: center;
  /* width: 36px; */
}

.svg-external-icon {
  background-color: currentColor;
  display: inline-block;
  mask-size: cover !important;
}
</style>
