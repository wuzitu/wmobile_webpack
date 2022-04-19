import { createRouter, createWebHashHistory } from "vue-router"
import { pendingRequest } from "../frame/utils/http"
import DashBoard from "@/pages/Dashboard/Index.vue"

const routes = [
    {
        path: "/",
        name: "DashBoard",
        component: DashBoard
    },
    // 网络模块
    {
        path: "/LAN",
        name: "LAN",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../pages/LAN/Index")
    },
    {
        path: "/Online",
        name: "Online",
        component: () => import("../pages/Online/Index")
    },
    {
        path: "/WiFi",
        name: "WiFi",
        component: () => import("../pages/WiFi/Index")
    },
    {
        path: "/AddWiFi",
        name: "AddWiFi",
        component: () => import("../pages/WiFi/AddWiFi")
    },
    {
        path: "/WiFiDetails",
        name: "WiFiDetails",
        component: () => import("../pages/WiFi/WiFiDetails")
    },
    {
        path: "/EditWiFi",
        name: "EditWiFi",
        component: () => import("../pages/WiFi/EditWiFi")
    },
    {
        path: "/Vlan",
        name: "Vlan",
        component: () => import("../pages/Vlan/Index")
    },
    // 设备模块
    {
        path: "/AP",
        name: "AP",
        component: () => import(/* webpackChunkName: "about" */ "../pages/AP/Index")
    },
    {
        path: "/DevInfo/:devType/:devName",
        name: "DevInfo",
        component: () => import("../pages/DevInfo/Index"),
        props: true,
        children: [
            {
                path: "",
                component: () => import("../pages/DevInfo/ApdashboardCard.vue")
            },
            {
                path: "APDashboardCard",
                name: "APDashboardCard",
                component: () => import("../pages/DevInfo/ApdashboardCard"),
                props: true
            },
            {
                path: "RadioCard",
                name: "RadioCard",
                component: () => import("../pages/DevInfo/RadioCard"),
                props: true
            },
            {
                path: "ClientCard",
                name: "ClientCard",
                component: () => import("../pages/DevInfo/ClientCard"),
                props: true
            },
            {
                path: "PortCard",
                name: "PortCard",
                component: () => import("../pages/DevInfo/PortCard"),
                props: true
            },
            {
                path: "DevDashCard",
                name: "DevDashCard",
                component: () => import("../pages/DevInfo/DevdashCard"),
                props: true
            },
            {
                path: "PoeCard",
                name: "PoeCard",
                component: () => import("../pages/DevInfo/PoeCard"),
                props: true
            },
            {
                path: "WANCard",
                name: "WANCard",
                component: () => import("../pages/DevInfo/WanCard"),
                props: true
            },
            {
                path: "LANCard",
                name: "LANCard",
                component: () => import("../pages/DevInfo/LanCard"),
                props: true
            },
            {
                path: "VLANCard",
                name: "VLANCard",
                component: () => import("../pages/DevInfo/VlanCard"),
                props: true
            }
        ]
    },
    {
        path: "/RRM",
        name: "RRM",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../pages/RRM/Index")
    },
    {
        path: "/Gateway",
        name: "Gateway",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../pages/Gateway/Index")
    },
    {
        path: "/Switch",
        name: "Switch",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../pages/Switch/Index")
    },
    {
        path: "/System",
        name: "System",
        component: () => import("../pages/System/Index")
    },
    {
        path: "/SysSet",
        name: "SysSet",
        component: () => import("../pages/System/SysSet")
    },
    {
        path: "/SysDevice",
        name: "SysDevice",
        component: () => import("../pages/System/SysDevice")
    },
    {
        path: "/InitWlan",
        name: "InitWlan",
        component: () => import("../pages/InitWlan/Index")
    },
    {
        path: "/Login",
        name: "Login",
        component: () => import("../pages/Login/Index")
    },
    {
        path: "/Terminal",
        name: "Terminal",
        component: () => import("../pages/Terminal/index")
    },
    {
        path: "/Terminal/terminalDetail",
        name: "terminalDetail",
        component: () => import("../pages/Terminal/terminalDetail")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    // 把上个页面还没结束的请求取消掉
    pendingRequest.forEach((item) => {
        item.routeChangeCancel && item.cancel()
    })
    // ... 其他处理
    next()
})

export default router
