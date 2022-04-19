const MODULE_NAME = "wmobile.NC"
const PageInfo = {
    NC: {
        Vsds: {
            nodes: ["WIPS", "Vsds"],
            row: "Vsd",
            index: ["VsdName"],
            column: ["ClassificationPolicyName", "CountermeasurePolicyName", "DetectPolicyName", "SignaturePolicyName"],
            menus: ["M_Wmobile"]
        },
        RadioRunningCfg: {
            nodes: ["AP", "RadioRunningCfg"],
            row: "Radio",
            index: ["ApName", "RadioID"],
            column: ["Mode", "SupportDot11B", "SupportDot11A", "SupportDot11G", "SupportDot11GN", "SupportDot11AN", "SupportDot11AC", "SupportDot11GAC", "Bandwidth", "Spectrum", "Status", "RateMulticast", "RateMandatory", "RateSupported", "RateDisabled", "Preamble", "BeaconInterval", "PowerLock", "Distance", "MaxRxDuration", "FragmentThreshold", "LongRetryThreshold", "ProtectionThreshold", "ShortRetryThreshold", "CfgChannel", "CfgMaxPower"],
            menus: ["M_Wmobile"]
        },
        AllAPFast: {
            nodes: ["AP", "AllAPFast"],
            row: "AP",
            index: ["Name"],
            column: ["Model", "Type", "SID", "Mac", "GN", "Sta", "SUM", "OnT", "UpT", "SV", "Ipv4", "Desp", "RegT", "AuFlg", "InFlg", "Radio.ID", "Radio.Mode", "Radio.Retry", "Radio.CB"],
            menus: ["M_APSettings", "M_AccessPoints", "M_MonAPs", "M_APGroups", "M_AddAp", "M_Radio", "M_APReports", "M_Dashboard", "M_MonAPGroups", "M_APDetail"]
        },
        APSummary: {
            nodes: ["AP", "APSummary"],
            row: "",
            index: [],
            column: ["ManualApNum", "RunApNum", "UnAuthApNum", "OfflineApNum", "UnhealthyApNum", "ApGroupNum", "LocationNum", "NorthIfOutPkt", "NorthIfOutByte", "NorthIfInPkt", "NorthIfInByte", "RunSPMNum", "OfflineSPMNum"],
            menus: ["M_APSettings", "M_AccessPoints", "M_MonAPs", "M_APGroups", "M_AddAp"]
        },
        AllAP: {
            nodes: ["AP", "AllAP"],
            row: "AP",
            index: ["Name", "LocationName"],
            column: ["Status", "Type", "GroupName", "Model"],
            menus: ["M_APSettings", "M_AccessPoints", "M_MonAPs", "M_APGroups", "M_AddAp", "M_Radio", "M_APReports", "M_Dashboard", "M_MonAPGroups", "M_APDetail"]
        },
        WebUI: {
            nodes: ["Fundamentals", "WebUI"],
            row: "",
            index: [],
            column: ["SessionAgingTime"],
            menus: ["M_Wmobile"]
        }
    }
}

export default PageInfo.NC
