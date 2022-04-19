let response = {
    Device: {
        ExtPhysicalEntities: [{ PhysicalIndex: "97", CpuUsage: "1", MemUsage: "59" }]
    },

    AP: {
        ManualAP: [
            { Name: "11", Model: "WAP622", CfgSerialID: "", CfgMacAddress: "22-22-22-22-22-22", RadioNum: "2", Status: "2", GroupName: "default-group", RegionCode: "156", RegionLock: "false", Priority: "4", Preempt: "false", EchoInterval: "10", EchoCount: "3", RetransInterval: "5", RetransCount: "3", StatisInterval: "50", FirmwareUpgrade: "true", BackupACIPv4: "0.0.0.0", BackupACIPv6: "::", LocationName: "default-location", Description: "", TunnelEncryption: "false", ProvisionAutoUpgrade: "false", ProvisionAutoRecover: "true", ModelType: "1", LedMode: "0", MapConfiguration: "" },
            { Name: "00be-d5d3-cf0e", Model: "WAP622H", CfgSerialID: "219801A27W9206Q000SM", CfgMacAddress: "00-00-00-00-00-00", RadioNum: "2", Status: "2", GroupName: "default-group", RegionCode: "156", RegionLock: "false", Priority: "4", Preempt: "false", EchoInterval: "10", EchoCount: "3", RetransInterval: "5", RetransCount: "3", StatisInterval: "50", FirmwareUpgrade: "true", BackupACIPv4: "0.0.0.0", BackupACIPv6: "::", LocationName: "default-location", Description: "", TunnelEncryption: "false", ProvisionAutoUpgrade: "false", ProvisionAutoRecover: "true", ModelType: "1", LedMode: "0", MapConfiguration: "" }
        ],
        RadioOfManualAP: [
            { ApName: "11", RadioID: "1", Mode: "7", SupportDot11B: "false", SupportDot11A: "true", SupportDot11G: "false", SupportDot11GN: "false", SupportDot11AN: "true", SupportDot11AC: "true", Bandwidth: "3", Spectrum: "1", Status: "1", CfgChannel: "52", CfgMaxPower: "20" },
            { ApName: "11", RadioID: "2", Mode: "4", SupportDot11B: "true", SupportDot11A: "false", SupportDot11G: "true", SupportDot11GN: "true", SupportDot11AN: "false", SupportDot11AC: "false", Bandwidth: "1", Spectrum: "3", Status: "1", CfgChannel: "6", CfgMaxPower: "20" },
            { ApName: "00be-d5d3-cf0e", RadioID: "1", Mode: "7", SupportDot11B: "false", SupportDot11A: "true", SupportDot11G: "false", SupportDot11GN: "false", SupportDot11AN: "true", SupportDot11AC: "true", Bandwidth: "3", Spectrum: "1", Status: "1", CfgChannel: "149", CfgMaxPower: "16" },
            { ApName: "00be-d5d3-cf0e", RadioID: "2", Mode: "4", SupportDot11B: "true", SupportDot11A: "false", SupportDot11G: "true", SupportDot11GN: "true", SupportDot11AN: "false", SupportDot11AC: "false", Bandwidth: "1", Spectrum: "3", Status: "1", CfgChannel: "11", CfgMaxPower: "15" }
        ],
        AllAP: [
            { Name: "11", LocationName: "default-location", Model: "WAP622", Status: "2", Type: "2", GroupName: "default-group" },
            { Name: "00be-d5d3-cf0e", LocationName: "default-location", Model: "WAP622H", Status: "2", Type: "2", GroupName: "default-group" }
        ]
    }
}

export default response
