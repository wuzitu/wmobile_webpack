import { createRouter, createWebHashHistory } from "vue-router"
import { pendingRequest } from "../frame/utils/http"
import DashBoard from "@/pages/Dashboard/Index.vue"

const routes = [
    {
        path: "/Welcome",
        name: "Welcome",
        component: () => import("../pages/Welcome/Index")
    },
    {
        path: "/",
        name: "DashBoard",
        component: DashBoard
    },
    {
        path: "/TopoChartDetail",
        name: "TopoChartDetail",
        component: () => import("../pages/Dashboard/TopoChartDetail")
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
        component: () => import("../pages/WiFi/Index"),
        props: true
    },
    {
        path: "/AddWiFi",
        name: "AddWiFi",
        component: () => import("../pages/WiFi/AddWiFi"),
        props: true
    },
    {
        path: "/WiFiDetails",
        name: "WiFiDetails",
        component: () => import("../pages/WiFi/WiFiDetails"),
        props: true
    },
    {
        path: "/EditWiFi",
        name: "EditWiFi",
        component: () => import("../pages/WiFi/EditWiFi"),
        props: true
    },
    {
        path: "/Vlan",
        name: "Vlan",
        component: () => import("../pages/Vlan/Index")
    },
    {
        path: "/AddVlan",
        name: "AddVlan",
        component: () => import("../pages/Vlan/AddVlan")
    },
    {
        path: "/VlanDetails",
        name: "VlanDetails",
        component: () => import("../pages/Vlan/VlanDetails")
    },
    // 设备模块
    {
        path: "/AP",
        name: "AP",
        component: () => import("../pages/AP/Index")
    },
    {
        path: "/DevInfo",
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
        path: "/RRM/Index2",
        name: "RRM/Index2",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../pages/RRM/Index2")
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
        redirect:"/System/SysMenu",
        component: () => import("../pages/System/Index"),
        children:[
            {
                path: "SysMenu",
                name: "SysMenu",
                component: () => import("../pages/System/SysMenu")
            },
            {
                path: "SysSet",
                name: "SysSet",
                component: () => import("../pages/System/SysSet")
            },
            {
                path: "SysDevice",
                name: "SysDevice",
                component: () => import("../pages/System/SysDevice")
            }
        ]
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
        path: "/GuideDownload",
        name: "GuideDownload",
        component: () => import("../pages/Login/GuideDownload")
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
    },
    {
        path: "/History",
        name: "History",
        component: () => import("../pages/History/Index"),
        params: true
    },
    {
        path:"/connectCloudNet",
        name: "connectCloudNet",
        redirect:"/connectCloudNet/cloudLogin",
        component: () => import("../pages/ConnectCloudNet/Index"),
        children:[
            {
                path: "cloudLogin",
                component: () => import("../pages/ConnectCloudNet/CloudLogin")
            },
            {
                path: "cloudRegister",
                component: () => import("../pages/ConnectCloudNet/CloudRegister")
            // },
            // {
            //     path: "cloudConfirm",
            //     component: () => import("../pages/ConnectCloudNet/CloudConfirm")
            }
        ]
    },
    {
        path:"/chat",
        name:"chat",
        component: () => import("../pages/System/chatsss")
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
