var MODULE_NAME = "wmobile.NC";
var PageInfo = {
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
            menus: ["M_Radio", "M_MonRadio"]
        },

    }
}

export default PageInfo.NC