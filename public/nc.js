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
            menus: ["M_Wmobile"]
        },
        APSummary: {
            nodes: ["AP", "APSummary"],
            row: "",
            index: [],
            column: ["ManualApNum", "RunApNum", "UnAuthApNum", "OfflineApNum", "UnhealthyApNum", "ApGroupNum", "LocationNum", "NorthIfOutPkt", "NorthIfOutByte", "NorthIfInPkt", "NorthIfInByte", "RunSPMNum", "OfflineSPMNum"],
            menus: ["M_Wmobile"]
        },
        AllAP: {
            nodes: ["AP", "AllAP"],
            row: "AP",
            index: ["Name", "LocationName"],
            column: ["Status", "Type", "GroupName", "Model", "Name", "GroupName", "SerialID", "MacAddress", "Ipv4Address", "Ipv6Address", "OnlineTime", "ModelType"],
            menus: ["M_Wmobile"]
        },
        ManualAP: {
            nodes: ["AP", "ManualAP"],
            row: "AP",
            index: ["Name"],
            column: ["Model", "CfgSerialID", "CfgMacAddress", "RegionCode", "RegionLock", "LedMode"],
            menus: ["M_Wmobile"]
        },
        RadioOfManualAP: {
            nodes: ["AP", "RadioOfManualAP"],
            row: "Radio",
            index: ["ApName", "RadioID"],
            column: ["Mode", "SupportDot11B", "SupportDot11A", "SupportDot11G", "SupportDot11GN", "SupportDot11AN", "SupportDot11AC", "SupportDot11GAC", "SupportDot11AX", "SupportDot11GAX", "Bandwidth", "Spectrum", "Status", "RateMulticast", "RateMandatory", "RateSupported", "RateDisabled", "Preamble", "BeaconInterval", "PowerLock", "Distance", "MaxRxDuration", "FragmentThreshold", "LongRetryThreshold", "ProtectionThreshold", "ShortRetryThreshold", "CfgChannel", "CfgMaxPowerPercent", "CfgMaxPower", "CfgAntennaType", "TimeRangeName"],
            menus: ["M_Wmobile"]
        },
        WebUI: {
            nodes: ["Fundamentals", "WebUI"],
            row: "",
            index: [],
            column: ["SessionAgingTime"],
            menus: ["M_Wmobile"]
        },
        HistoryList: {
            nodes: ["RRM", "History"],
            row: "RadioCount",
            index: ["ApName", "RadioID", "HistoryCnt"],
            column: ["ChangeTime", "ReasonBitMap", "ChlNumBef", "ChlNumAft", "PwrLvlBef", "PwrLvlAft", "BandwidthBef", "BandwidthAft"],
            menus: ["M_Wmobile"]
        },
        HistoryStatisticsInterfacesHour: {
            nodes: ["ModuleProxy", "HistoryStatistics", "InterfacesHour"],
            row: "Interface",
            index: ["IfIndex"],
            column: ["Name", "InPkts", "OutPkts", "InOctets", "OutOctets", "RecordTime"],
            menus: ["M_Wmobile"]
        },
        HistoryStatisticsAp: {
            nodes: ["ModuleProxy", "HistoryStatistics", "AP"],
            row: "AP",
            index: ["IfIndex"],
            column: ["Name", "InPkts", "OutPkts", "InOctets", "OutOctets", "RecordTime"],
            menus: ["M_Wmobile"]
        },
        Outbound: {
            nodes: ["NAT", "OutboundDynamicRules"],
            row: "Interface",
            index: ["IfIndex", "ACLNumber"],
            column: [],
            menus: ["M_Wmobile"]
        },
        ServiceTemplates : {
            nodes:["WLANClient","ServiceTemplates"],
            row:"Template",
            index:["Name"],
            column:["SSID","DefaultVlan","HideSsid","MaxClientCnt","Enable","Description","UserIsolation"],
            menus: ["M_Wmobile"]
        },
        ServiceSecurity : {
            nodes:["WLANClient","ServiceSecurity"],
            row:"Security",
            index:["Name"],
            column:["WpaIeSelected","RsnIeSelected","TkipSelected","CcmpSelected","Wep40Selected","Wep104Selected","Wep128Selected","AkmMode","PskInputMode","PskPassPhraseKey","PskRawKey","PtkLifeTime","GtkUpdateEnable","GtkUpdateMode","GtkUpdateTime","GtkPacketNumber","ClientOffUpdateGtk","TkipCmTime"],
            menus: ["M_Wmobile"]
        },
        Interfaces: {
            nodes: ["Ifmgr", "Interfaces"],
            row: "Interface",
            index: ["IfIndex"],
            column: ["Name", "AbbreviatedName", "PortIndex", "ifTypeExt", "ifType", "Description", "AdminStatus", "OperStatus", "ConfigSpeed", "ActualSpeed", "ConfigDuplex", "ActualDuplex", "LinkType", "PVID", "InetAddressIPV4", "InetAddressIPV4Mask", "PhysicalIndex", "MAC", "PortLayer", "ForwardingAttributes", "Loopback", "MDI", "ConfigMTU", "ActualMTU", "ConfigBandwidth", "ActualBandwidth", "SubPort", "ForceUP"],
            menus: ["M_Wmobile"]
        },
        IPFWTcpMss: {
            nodes: ["IPFW", "IPFWTcpMss"],
            row: "TcpMss",
            index: ["IfIndex"],
            column: ["Num"],
            menus: ["M_Wmobile"]
        },
        XBInterfaces: {
            nodes: ["XiaoBei", "Interfaces"],
            row: "Interface",
            index: ["IfIndex"],
            column: ["PortPanel"],
            menus: ["M_Wmobile"]
        },
        ServerOnInterfaces: {
            nodes: ["NAT", "ServerOnInterfaces"],
            row: "Interface",
            index: ["IfIndex", "ProtocolType", "GlobalInfo.GlobalVRF", "GlobalInfo.GlobalStartIpv4Address", "GlobalInfo.GlobalEndIpv4Address", "GlobalInfo.GlobalStartPortNumber", "GlobalInfo.GlobalEndPortNumber", "GlobalInfo.GlobalIfIndex"],
            column: ["LocalInfo.LocalVRF", "LocalInfo.LocalStartIpv4Address", "LocalInfo.LocalEndIpv4Address", "LocalInfo.LocalStartPortNumber", "LocalInfo.LocalEndPortNumber", "LocalInfo.LocalSrvGroupNumber", "ACLNumber"],
            menus: ["M_Wmobile"]
        },
        DDR: {
            nodes: ["DDR", "DDRIdle"],
            row: "Idle",
            index: ["IfIndex"],
            column: ["Time", "Direct"],
            menus: ["M_Wmobile"]
        },
        StaticRoute: {
            nodes: ["StaticRoute", "Ipv4StaticRouteConfigurations"],
            row: "RouteEntry",
            index: ["DestVrfIndex", "DestTopologyIndex", "Ipv4Address", "Ipv4PrefixLength", "NexthopVrfIndex", "NexthopIpv4Address", "IfIndex"],
            column: [],
            menus: ["M_Wmobile"]
        },
        PPPUserPap: {
            nodes: ["PPP", "PPPUserPap"],
            row: "UserPap",
            index: ["IfIndex"],
            column: ["UserName", "PassWord"],
            menus: ["M_Wmobile"]
        },
        PPPUserChap: {
            nodes: ["PPP", "PPPUserChap"],
            row: "UserChap",
            index: ["IfIndex"],
            column: ["UserName", "PassWord"],
            menus: ["M_Wmobile"]
        },
        PppoecClient: {
            nodes: ["PPPOEC", "PppoecClient"],
            row: "Client",
            index: ["IfIndex", "BundleNum"],
            column: ["Hostuniq"],
            menus: ["M_Wmobile"]
        },
        DHCPAlloc: {
            nodes: ["DHCPC", "DHCPAlloc"],
            row: "Alloc",
            index: ["IfIndex"],
            column: ["AllocEnable", "DHCPServerIpv4Address"],
            menus: ["M_Wmobile"]
        },
        Ipv4Addresses: {
            nodes: ["IPV4ADDRESS", "Ipv4Addresses"],
            row: "Ipv4Address",
            index: ["IfIndex", "Ipv4Address"],
            column: ["Ipv4Mask", "AddressOrigin"],
            menus: ["M_Wmobile"]
        },
        DHCPIfMode: {
            nodes: ["DHCP", "DHCPIfMode"],
            row: "IfMode",
            index: ["IfIndex"],
            column: ["Mode"],
            menus: ["M_Wmobile"]
        },
        SubChannel: {
            nodes: ["Ifmgr", "SubChannel"],
            row: "Interface",
            index: ["IfIndex", "CreateMode", "SubChannelIndex"],
            column: [],
            menus: ["M_Wmobile"]
        },
        MonitorPort: {
            nodes: ["MGROUP", "MonitorPort"],
            row: "Group",
            index: ["ID"],
            column: ["Port"],
            menus: ["M_Wmobile"]
        },
        Capabilities: {
            nodes: ["Ifmgr", "InterfaceCapabilities"],
            row: "Interface",
            index: ["IfIndex"],
            column: ["Configurable", "MinMTU", "MaxMTU", "Removable", "MaxCreateSubNum", "ContextAllocType"],
            menus: ["M_Wmobile"]
        },
        Statistics: {
            nodes: ["Ifmgr", "Statistics"],
            row: "Interface",
            index: ["IfIndex"],
            column: ["Name", "AbbreviatedName", "InOctets", "InUcastPkts", "InNUcastPkts", "InRate", "OutRate", "InPkts", "OutPkts"],
            menus: ["M_Wmobile"]
        },
        Ports: {
            nodes: ["Ifmgr", "Ports"],
            row: "Port",
            index: ["PortIndex"],
            column: ["Name", "IfIndex"],
            menus: ["M_Wmobile"]
        },
        PoEPorts: {
            nodes: ["PoE", "Ports"],
            row: "Port",
            index: ["PSEID", "IfIndex"],
            column: ["AdminEnable", "Pairs", "Priority", "PDDescription", "FaultDescription", "PowerLimit", "ProfileIndex", "ForcePower"],
            menus: ["M_Wmobile"]
        },
        PoEPSEs: {
            nodes: ["PoE", "PSEs"],
            row: "Port",
            index: ["PSEID"],
            column: ["PowerLimit", "IfIndex", "UsageThreshold", "Priority", "Legacy"],
            menus: ["M_Wmobile"]
        },
        PBRIF: {
            nodes: ["PBR", "PBRIfPolicy"],
            row: "IfPolicy",
            index: ["AddressType", "IfIndex"],
            column: ["PolicyName"],
            menus: ["M_Wmobile"]
        },
        PBRPolicyNode: {
            nodes: ["PBR", "PBRPolicyNode"],
            row: "PolicyNode",
            index: ["AddressType", "PolicyName", "NodeID"],
            column: ["Mode", "ACLNumber", "ApplyContinue"],
            menus: ["M_Wmobile"]
        },
        PBRApplyOutInterface: {
            nodes: ["PBR", "PBRApplyOutInterface"],
            row: "ApplyOutInterface",
            index: ["AddressType", "PolicyName", "NodeID"],
            column: ["Mode", "IfIndex"],
            menus: ["M_Wmobile"]
        },
        LBLinks: {
            nodes: ["LB", "Links"],
            row: "Link",
            index: ["Name"],
            column: ["Description", "RouterType", "RouterInterface", "RouterIpv4Address", "Weight", "Priority", "Cost", "LinkGroup", "Shutdown", "ProbeSuccessCriteria", "MaxConnectionLimit", "RateLimitConnection", "InRateLimitBandwidth", "OutRateLimitBandwidth", "BandwidthBusyRecoverRatio", "InBandwidthBusyRecoverRatio", "OutBandwidthBusyRecoverRatio", "MaxBandwidth", "InMaxBandwidth", "OutMaxBandwidth", "VRF", "InheritVPN"],
            menus: ["M_Wmobile"]
        },
        IPv4ApplyPolicies: {
            nodes: ["IPsec", "IPv4ApplyPolicies"],
            row: "ApplyPolicy",
            index: ["IfIndex"],
            column: ["Policy"],
            menus: ["M_Wmobile"]
        },
        IbBackup: {
            nodes: ["IB", "IbBackup"],
            row: "Backup",
            index: ["IfIndex", "BackupIfIndex"],
            column: ["Priority"],
            menus: ["M_Wmobile"]
        },
        StartProgress: {
            nodes: ["SmartMc", "StartProgress"],
            row: "",
            index: [""],
            column: ["Role", "Username", "Password"],
            menus: ["M_Wmobile"]
        },
        DHCPServerIpPool: {
            nodes: ["DHCP", "DHCPServerIpPool"],
            row: "IpPool",
            index: ["PoolIndex"],
            column: ["PoolName", "NetworkIpv4Address", "NetworkIpv4Mask", "GatewayIpv4Address", "DNSIpv4Address", "LeaseDay", "LeaseHour", "LeaseMinute", "LeaseSecond", "StartIpv4Network", "EndIpv4Network"],
            menus: ["M_Wmobile"]
        },
        VlanPool: {
            nodes: ["VLAN", "VLANs"],
            row: "VLANID",
            index: ["ID"],
            column: ["Ipv4.Ipv4Address", "Ipv4.Ipv4Mask"],
            menus: ["M_Wmobile"]
        },
        PoEPortsConfig: {
            nodes: ["PoE", "Ports"],
            row: "Port",
            index: ["PSEID", "IfIndex"],
            column: ["AdminEnable", "Pairs", "Priority", "PowerLimit", "ProfileIndex", "ForcePower"],
            menus: ["M_Wmobile"]
        },
        PoEPSEsConfig: {
            nodes: ["PoE", "Ports"],
            row: "Port",
            index: ["PSEID"],
            column: ["PowerLimit", "UsageThreshold", "Priority", "Legacy"],
            menus: ["M_Wmobile"]
        },
        PhysicalEntities: {
            nodes: ["Device", "PhysicalEntities"],
            row: "Entity",
            index: ["PhysicalIndex"],
            column: ["Chassis", "Slot", "SubSlot", "Description", "VendorType", "ContaunedIn", "Class", "ParentRelPos", "Name", "HardwareRev", "SoftwareRev", "SerialNumber", "MfgName", "Model"],
            menus: ["M_Wmobile"]
        },
        ExtPhysicalEntities: {
            nodes: ["Device", "ExtPhysicalEntities"],
            row: "Entity",
            index: ["PhysicalIndex"],
            column: ["CpuUsage", "MemUsage", "Uptime", "Temperature", "MAC", "ErrorStatus"],
            menus: ["M_Wmobile"]
        },
        UpDateDevVersion: {
            nodes: ["Cmtnlmgr", "UpDateDevVersion"],
            row: "",
            index: [],
            column: ["UpdateAction"],
            menus: ["M_Wmobile"]
        },
        DeviceList: {
            //lack of runtime/uptime
            nodes: ["SmartMC", "DeviceList"],
            row: "Device",
            index: ["Id"],
            column: ["MacAddress", "Hop", "Role", "Status", "HostName", "Model", "IpAddress", "SerialNumber", "SysVersion", "Type", "IrfCount", "IsSnapshot", "JoinTime", "OutTime", "StandTime"],
            menus: ["M_Wmobile"]
        },
        LinkRelation: {
            nodes: ["SmartMC", "LinkRelation"],
            row: "Relation",
            index: ["SrcId", "IfIndex"],
            column: ["SrcMAC", "DesId", "DesMAC", "STPStatus", "LinkStatus"],
            menus: ["M_Wmobile"]
        },
        RebootDev: {
            //lack of runtime/uptime
            nodes: ["Device", "RebootDev"],
            row: "",
            index: [""],
            column: ["Reboot"],
            menus: ["M_Wmobile"]
        },
        EditChannel: {
            //lack of runtime/uptime
            nodes: ["SmartMC", "EditChannel"],
            row: "",
            index: [""],
            column: ["TargetType", "TCId", "XmlRequest", "Save"],
            menus: ["M_Wmobile"]
        },
        GetChannel: {
            //lack of runtime/uptime
            nodes: ["SmartMC", "GetChannel"],
            row: "",
            index: [""],
            column: ["TCId", "XmlRequest"],
            menus: ["M_Wmobile"]
        },
        ResetAP: {
            nodes: ["AP", "ResetAP"],
            row: "AP",
            index: ["ApName"],
            column: [],
            menus: ["M_Wmobile"]
        },
        RunAP: {
            nodes: ["AP", "RunAP"],
            row: "AP",
            index: ["Name"],
            column: ["Model", "SerialID", "Type", "MacAddress", "RadioNum", "Status", "Ipv4Address", "Ipv6Address", "PortNumber", "GroupName", "OnlineTime", "HWVer", "SWVer", "BWVer", "TransCtrlPkt", "RecvCtrlPkt", "TransDataPkt", "RecvDataPkt", "EchoReqCnt", "EchoRespLossCnt", "DiscoveryType", "ConfigFailCnt", "LastFailReason", "LastRebootReason", "TunnelDownReason", "ConnectionType", "PeerACIPv4Address", "PeerACIPv6Address", "LocationName", "AuthenticatedFlag", "ControlACIPv4Address", "ControlACIPv6Address", "RegisterTime"],
            menus: ["M_Wmobile"]
        },
        IfTable: {
            nodes: ["Ifmgr", "Interfaces"],
            row: "Interface",
            index: ["IfIndex"],
            column: ["Name", "AbbreviatedName", "PortIndex", "ifTypeExt", "ifType", "Description", "AdminStatus", "OperStatus", "ConfigSpeed", "ActualSpeed", "ConfigDuplex", "LinkType", "PVID", "InetAddressIPV4", "InetAddressIPV4Mask", "ActualDuplex", "PhysicalIndex", "MAC", "PortLayer", "ForwardingAttributes", "Loopback", "MDI", "ConfigMTU", "ActualMTU", "ConfigBandwidth", "ActualBandwidth", "SubPort"],
            menus: ["M_Wmobile"]
        },
        VLAN: {
            nodes: ["VLAN", "Interfaces"],
            row: "Interface",
            index: ["IfIndex"],
            column: ["Name", "LinkType", "PVID", "UntaggedVlanList", "TaggedVlanList", "PermitVlanList"],
            menus: ["M_Wmobile"]
        },
        VLANAccess: {
            nodes: ["VLAN", "AccessInterfaces"],
            row: "Interface",
            index: ["IfIndex"],
            column: ["PVID"],
            menus: ["M_Wmobile"]
        },
        VLANTrunk: {
            nodes: ["VLAN", "TrunkInterfaces"],
            row: "Interface",
            index: ["IfIndex"],
            column: ["PermitVlanList", "PVID"],
            menus: ["M_Wmobile"]
        },
        VLANHybrid: {
            nodes: ["VLAN", "HybridInterfaces"],
            row: "Interface",
            index: ["IfIndex"],
            column: ["UntaggedVlanList", "TaggedVlanList", "PVID"],
            menus: ["M_Wmobile"]
        },
        EditGroups: {
            nodes: ["Ifmgr", "PortIsolation", "Interfaces"],
            row: "Interface",
            index: ["IfIndex"],
            column: ["IsolatedGroupID", "IfName"],
            menus: ["M_Wmobile"]
        },
        PortIsolationGroup: {
            nodes: ["Ifmgr", "PortIsolation", "Groups"],
            row: "Groups",
            index: ["IsolatedGroupID"],
            column: ["InterfaceList"],
            menus: ["M_Wmobile"]
        },
        PortIsolationCapabilities: {
            nodes: ["Ifmgr", "PortIsolation", "Capabilities"],
            row: "",
            index: [],
            column: ["MaxGroupNum"],
            menus: ["M_Wmobile"]
        },
        MergeIf: {
            nodes: ["Ifmgr", "Interfaces"],
            row: "Interface",
            index: ["IfIndex"],
            column: ["AdminStatus", "Description", "MAC", "ConfigSpeed", "ConfigDuplex", "PortLayer", "LinkType", "Loopback", "MDI", "ConfigMTU", "ConfigBandwidth"],
            menus: ["M_Wmobile"]
        },
        Stations: {
            nodes: ["WLANClient", "Stations"],
            row: "Station",
            index: ["MacAddress"],
            column: ["UserName", "Aid", "ApName", "RadioId", "Ssid", "VLAN", "PowerSaveMode", "TxRate", "RxRate", "UpTime", "SupportedRate", "Ipv4Address", "WirelessMode", "ClassifyDeviceType"],
            menus: ["M_Wmobile"]
        },
        StationWmmInformation: {
            nodes: ["WLANClient", "StationWmmInformation"],
            row: "Wmm",
            index: [],
            column: ["MacAddress", "UpCacBytes", "DownCacBytes"],
            menus: ["M_Wmobile"]
        },
        ServiceStatus: {
            nodes: ["WLANClient", "ServiceStatus"],
            row: "Status",
            index: ["ServiceTemplateName"],
            column: ["SSID", "ClientNumber", "ClientNumber2G", "ClientNumber5G", "RadioNumber2G", "RadioNumber5G"],
            menus: ["M_Wmobile"]
        },
        OnlineStations: {
            nodes: ["AutoNet", "OnlineStations"],
            row: "Station",
            index: [],
            column: ["MAC", "SSID", "IP", "ApName", "TCID", "ClassifyDeviceType", "WireLessMode", "CurrentUpTime", "OnlineMoment", "OnlineTime", "TotalOnlineCnt", "TotalOnlineTime"],
            menus: ["M_Wmobile"]
        },
        ResetClient: {
            nodes: ["WLANClient", "ResetClient"],
            row: "Client",
            index: [""],
            column: ["MacAddress"],
            menus: ["M_Wmobile"]
        },
        OnlineAPHistory: {
            nodes: ["AutoNet", "OnlineAPHistory"],
            row: "OnlineAP",
            index: [""],
            column: ["Time", "APCount", "StationCount"],
            menus: ["M_Wmobile"]
        },
        OnlineAPHistorys: {
            nodes: ["AutoNet", "OnlineAPHistory"],
            row: "OnlineAP",
            index: ["Time"],
            column: ["APCount", "StationCount"],
            menus: ["M_Wmobile"]
        },
        OnlineStationByAP: {
            nodes: ["AutoNet", "OnlineStationByAP"],
            row: "OnlineStation",
            index: ["Time"],
            column: ["Count"],
            menus: ["M_Wmobile"]
        },
        APAssociations: {
            nodes: ["WLANClient", "APAssociations"],
            row: "Association",
            index: ["Name"],
            column: ["Total", "Current", "Client2G", "Client5G", "Client11a", "Client11b", "Client11g", "Client11an", "Client11gn", "Client11gac", "Client11ac", "Client11gax", "Client11ax"],
            menus: ["M_Wmobile"]
        },
        GlobalCfg: {
            nodes: ["RRM", "GlobalCfg"],
            row: "",
            index: [],
            column: ["ChlClbMode", "PwrClbMode", "BandwidthClbMode"],
            menus: ["M_Wmobile"]
        },
        GlobalServiceTemplates: {
            nodes: ["Autonet", "GlobalServiceTemplates"],
            row: "Template",
            index: ["Name"],
            column: ["SSID", "DefaultVlan", "HideSsid", "Enable", "PskPassPhraseKey"],
            menus: ["M_Wmobile"]
        },
        GlobalVlan: {
            nodes: ["Autonet", "GlobalVlan"],
            row: "Vlan",
            index: ["VlanID"],
            column: ["Description"],
            menus: ["M_Wmobile"]
        },
        Base: {
            nodes: ["Device", "Base"],
            row: "",
            index: [],
            column: ["HostName", "Uptime", "DeviceType", "HardwareArchitecture", "HostDescription", "HostOid", "MinChassisNum", "MaxChassisNum", "MinSlotNum", "MaxSlotNum", "MinCPUIDNum", "MaxCPUIDNum", "LocalTime", "TimeZone.Zone", "TimeZone.ZoneName", "BridgeMAC", "LocalBridgeMAC", "VendorName"],
            menus: ["M_Wmobile"]
        },
        SpmPortPoe: {
            nodes: ["AP", "SpmPortPoe"],
            row: "PortPoe",
            index: ["SpmName", "IfName"],
            column: ["Enable", "DetectionStatus", "CurrentPower", "MaxPower"],
            menus: ["M_Wmobile"]
        },
        SpmIfBoard: {
            nodes: ["AP", "SpmIfBoard"],
            row: "IfBoard",
            index: ["SpmName", "IfName"],
            column: ["Status", "PoeStatus"],
            menus: ["M_Wmobile"]
        },
        SpmPortIsolate: {
            nodes: ["AP", "SpmPortIsolate"],
            row: "PortIsolate",
            index: ["SpmName", "IfName"],
            column: ["IsolatedGroupID"],
            menus: ["M_Wmobile"]
        },
        SpmIfCfg: {
            nodes: ["AP", "SpmIfCfg"],
            row: "IfCfg",
            index: ["SpmName", "IfName"],
            column: ["AdminStatus", "Status", "LinkType", "AccessVlan", "TrunkPvidVlan", "TrunkVlanList", "ActualSpeed", "ActualDuplex", "Description"],
            menus: ["M_Wmobile"]
        },
        SpmIfStatistics: {
            nodes: ["AP", "SpmIfStatistics"],
            row: "IfStatistics",
            index: ["SpmName", "IfName"],
            column: ["IfType", "LinkStatus", "InRate", "OutRate", "InOctets", "OutOctets", "InUcastPkts", "OutUcastPkts", "InNUcastPkts", "OutNUcastPkts", "InErrors", "OutErrors", "LastClear"],
            menus: ["M_Wmobile"]
        },
        SpmVlan: {
            nodes: ["AP", "SpmVlan"],
            row: "Vlan",
            index: ["SpmName", "ID"],
            column: ["PortList", "PortListTag", "PortListUnTag"],
            menus: ["M_Wmobile"]
        }
    }
}

export default PageInfo.NC
