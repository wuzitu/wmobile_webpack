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
    },
    WLANClient: {
        // Stations: [{ MacAddress: "0000-0000-0001", UserName: "AAA", Aid: "1", ApName: "AP1", RadioId: "1", Ssid: "SSID1", VLAN: "VLAN1", PowerSaveMode: "2", TxRate: "20", RxRate: "65", SupportedRate: "6,9,12,8,48,54", Ipv4Address: "192.168.0.12", ClassifyDeviceType: "С��" }],
        Stations: [
            {
                MacAddress: "40-C7-11-C0-1F-62",
                UserName: "",
                Aid: "1",
                ApName: "fatap",
                RadioId: "1",
                Ssid: "W_Mobile",
                Bssid: "98-F1-81-12-E4-20",
                VLAN: "1",
                PowerSaveMode: "6418",
                ListenInterval: "20",
                RxRate: "400",
                TxRate: "6",
                UpTime: "143523",
                QoSMode: "1",
                Ipv4Address: "192.168.0.18",
                Ipv6Address: "::",
                WirelessMode: "64",
                SNR: "36",
                DeviceType: "Apple",
                ClassifyDeviceType: "Apple",
                SupportedRate: "6, 9, 12, 18, 24, 36, 48, 54",
                RetransmissionRate: "129"
            },
            {
                MacAddress: "72-96-66-36-51-71",
                UserName: "",
                Aid: "3",
                ApName: "fatap",
                RadioId: "1",
                Ssid: "W_Mobile",
                Bssid: "98-F1-81-12-E4-20",
                VLAN: "1",
                PowerSaveMode: "546",
                ListenInterval: "10",
                RxRate: "360",
                TxRate: "6",
                UpTime: "15389",
                QoSMode: "1",
                Ipv4Address: "192.168.0.35",
                Ipv6Address: "::",
                WirelessMode: "64",
                SNR: "32",
                DeviceType: "NA",
                ClassifyDeviceType: "Other",
                SupportedRate: "6, 9, 12, 18, 24, 36, 48, 54",
                RetransmissionRate: "0"
            },
            {
                MacAddress: "9A-C3-FA-48-4D-C6",
                UserName: "",
                Aid: "2",
                ApName: "fatap",
                RadioId: "1",
                Ssid: "W_Mobile",
                Bssid: "98-F1-81-12-E4-20",
                VLAN: "1",
                PowerSaveMode: "709",
                ListenInterval: "20",
                RxRate: "216",
                TxRate: "6",
                UpTime: "19159",
                QoSMode: "1",
                Ipv4Address: "192.168.0.149",
                Ipv6Address: "::",
                WirelessMode: "64",
                SNR: "41",
                DeviceType: "NA",
                ClassifyDeviceType: "Other",
                SupportedRate: "6, 9, 12, 18, 24, 36, 48, 54",
                RetransmissionRate: "0"
            },
            {
                MacAddress: "9A-C3-FA-48-4D-C6",
                UserName: "",
                Aid: "2",
                ApName: "fatap",
                RadioId: "1",
                Ssid: "wulei",
                Bssid: "98-F1-81-12-E4-20",
                VLAN: "1",
                PowerSaveMode: "709",
                ListenInterval: "20",
                RxRate: "216",
                TxRate: "6",
                UpTime: "19159",
                QoSMode: "1",
                Ipv4Address: "192.168.0.149",
                Ipv6Address: "::",
                WirelessMode: "8",
                SNR: "41",
                DeviceType: "NA",
                ClassifyDeviceType: "Other",
                SupportedRate: "6, 9, 12, 18, 24, 36, 48, 54",
                RetransmissionRate: "0"
            }
        ],
        StationWmmInformation: [{ MacAddress: "0000-0000-0001", UpCacBytes: "454647", DownCacBytes: "234551" }],
        APAssociations: [{ Name: "fatap", Total: "404", Current: "7", Client11a: "0", Client11b: "0", Client11g: "0", Client11an: "0", Client11gn: "0", Client11gac: "0", Client11ac: "5", Client11gax: "0", Client11ax: "0", Client2G: "2", Client5G: "5" }],
        ServiceStatus: [
            {
                ServiceTemplateName: "1",
                SSID: "H3C_WiFi_1",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "2",
                SSID: "H3C_WiFi_2",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "3",
                SSID: "H3C_WiFi_3",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "4",
                SSID: "H3C_WiFi_4",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "5",
                SSID: "H3C_WiFi_5",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "6",
                SSID: "H3C_WiFi_6",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "7",
                SSID: "H3C_WiFi_7",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "8",
                SSID: "H3C_WiFi_8",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "9",
                SSID: "H3C_WiFi_9",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "10",
                SSID: "H3C_WiFi_10",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "11",
                SSID: "H3C_WiFi_11",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "12",
                SSID: "H3C_WiFi_12",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "13",
                SSID: "H3C_WiFi_13",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "14",
                SSID: "H3C_WiFi_14",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "15",
                SSID: "H3C_WiFi_15",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "0",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "16",
                SSID: "H3C_12E420",
                ClientNumber: "0",
                ClientNumber2G: "0",
                ClientNumber5G: "0",
                RadioNumber2G: "1",
                RadioNumber5G: "0"
            },
            {
                ServiceTemplateName: "wmobile",
                SSID: "W_Mobile",
                ClientNumber: "3",
                ClientNumber2G: "0",
                ClientNumber5G: "3",
                RadioNumber2G: "1",
                RadioNumber5G: "1"
            }
        ],
        ServiceTemplates: [
            {
                "Name": "1",
                "Enable": "true",
                "SSID": "H3C_Autonet",
                "DefaultVlan": "1",
                "HideSsid": "false",
                "MaxClientCnt": "0",
                "ForwardingLocation": "2",
                "PolicyForwarding": "false",
                "AssociationLocation": "2",
                "AuthenticationLocation": "2",
                "QuikAssociation": "false",
                "UserIsolation": "false",
                "Location": "default-location",
                "WPA3Switch": "2"
            },
            {
                "Name": "111",
                "Enable": "false",
                "SSID": "11223",
                "DefaultVlan": "1",
                "HideSsid": "false",
                "MaxClientCnt": "0",
                "ForwardingLocation": "2",
                "PolicyForwarding": "false",
                "AssociationLocation": "2",
                "AuthenticationLocation": "2",
                "QuikAssociation": "true",
                "UserIsolation": "false",
                "Location": "default-location",
                "WPA3Switch": "2"
            },
            {
                "Name": "ryy",
                "Enable": "true",
                "SSID": "111ryy",
                "DefaultVlan": "1",
                "HideSsid": "false",
                "MaxClientCnt": "0",
                "ForwardingLocation": "2",
                "PolicyForwarding": "false",
                "AssociationLocation": "2",
                "AuthenticationLocation": "2",
                "QuikAssociation": "true",
                "UserIsolation": "false",
                "Location": "default-location",
                "WPA3Switch": "0"
            },
            {
                "Name": "1111",
                "Enable": "false",
                "DefaultVlan": "1",
                "HideSsid": "false",
                "MaxClientCnt": "0",
                "ForwardingLocation": "2",
                "PolicyForwarding": "false",
                "AssociationLocation": "2",
                "AuthenticationLocation": "2",
                "QuikAssociation": "false",
                "UserIsolation": "false",
                "Location": "default-location",
                "WPA3Switch": "0"
            },
            {
                "Name": "sssss",
                "Enable": "false",
                "SSID": "aaa",
                "DefaultVlan": "10",
                "HideSsid": "true",
                "MaxClientCnt": "10",
                "ForwardingLocation": "2",
                "PolicyForwarding": "false",
                "AssociationLocation": "4",
                "AuthenticationLocation": "2",
                "QuikAssociation": "false",
                "UserIsolation": "true",
                "Location": "default-location",
                "WPA3Switch": "1"
            },
            {
                "Name": "streamblock3",
                "Enable": "false",
                "SSID": "StreamBlock3",
                "DefaultVlan": "1",
                "HideSsid": "false",
                "MaxClientCnt": "0",
                "ForwardingLocation": "2",
                "PolicyForwarding": "false",
                "AssociationLocation": "2",
                "AuthenticationLocation": "2",
                "QuikAssociation": "false",
                "UserIsolation": "false",
                "Location": "default-location",
                "WPA3Switch": "0"
            }
        ],
        ServiceSecurity: [
            {
                "Name": "h3c-g-843658",
                "WpaIeSelected": "false",
                "RsnIeSelected": "false",
                "TkipSelected": "false",
                "CcmpSelected": "false",
                "Wep40Selected": "false",
                "Wep104Selected": "false",
                "Wep128Selected": "false",
                "PtkLifeTime": "43200",
                "GtkUpdateEnable": "true",
                "GtkUpdateMode": "1",
                "GtkUpdateTime": "86400",
                "ClientOffUpdateGtk": "false",
                "TkipCmTime": "0"
            },
            {
                "Name": "1",
                "WpaIeSelected": "true",
                "RsnIeSelected": "true",
                "TkipSelected": "true",
                "CcmpSelected": "true",
                "Wep40Selected": "false",
                "Wep104Selected": "false",
                "Wep128Selected": "false",
                "AkmMode": "2",
                "PskInputMode": "1",
                "PtkLifeTime": "43200",
                "GtkUpdateEnable": "true",
                "GtkUpdateMode": "1",
                "GtkUpdateTime": "86400",
                "ClientOffUpdateGtk": "false",
                "TkipCmTime": "0"
            }
        ]
    },
    AutoNet: {
        OnlineStations: [
            {
                MAC: "0000-0000-0000",
                SSID: "wifi0",
                IP: "192.168.0.1",
                ApName: "AP0",
                TCID: "0",
                ClassifyDeviceType: "Apple",
                WireLessMode: "2",
                CurrentUpTime: "10d:5h:10m",
                OnlineMoment: "2022/3/25 08:25:30",
                OnlineTime: "10d:5h:10m",
                TotalOnlineCnt: "20",
                TotalOnlineTime: "200d:5h:10m"
            },
            {
                MAC: "0000-0000-0001",
                SSID: "wifi1",
                IP: "192.168.0.11",
                ApName: "AP1",
                TCID: "1",
                ClassifyDeviceType: "Apple",
                WireLessMode: "32",
                modeAll: "10",
                mode24: "5",
                mode5: "5",
                CurrentUpTime: "10d:5h:10m",
                OnlineMoment: "2022/3/25 08:25:30",
                OnlineTime: "10d:5h:10m",
                TotalOnlineCnt: "20",
                TotalOnlineTime: "200d:5h:10m"
            },
            {
                MAC: "0000-0000-0002",
                SSID: "wifi1",
                IP: "192.168.0.22",
                ApName: "AP1",
                TCID: "2",
                ClassifyDeviceType: "Apple",
                WireLessMode: "16",
                modeAll: "10",
                mode24: "5",
                mode5: "5",
                CurrentUpTime: "10d:5h:10m",
                OnlineMoment: "2022/3/25 08:25:30",
                OnlineTime: "10d:5h:10m",
                TotalOnlineCnt: "20",
                TotalOnlineTime: "200d:5h:10m"
            },
            {
                MAC: "0000-0000-0003",
                SSID: "wifi3",
                IP: "192.168.0.33",
                ApName: "AP3",
                TCID: "3",
                ClassifyDeviceType: "Apple",
                WireLessMode: "256",
                modeAll: "10",
                mode24: "5",
                mode5: "5",
                CurrentUpTime: "10d:5h:10m",
                OnlineMoment: "2022/3/25 08:25:30",
                OnlineTime: "10d:5h:10m",
                TotalOnlineCnt: "20",
                TotalOnlineTime: "200d:5h:10m"
            }
        ],
        OnlineAPHistory: [
            {
                Time: "3/25 08:25:00",
                APCount: "5",
                StationCount: "20"
            },
            {
                Time: "3/25 08:30:00",
                APCount: "7",
                StationCount: "20"
            },
            {
                Time: "3/25 08:35:00",
                APCount: "9",
                StationCount: "20"
            },
            {
                Time: "3/25 08:40:00",
                APCount: "5",
                StationCount: "20"
            },
            {
                Time: "3/25 08:45:00",
                APCount: "7",
                StationCount: "20"
            },
            {
                Time: "3/25 08:55:00",
                APCount: "9",
                StationCount: "20"
            }
        ]
    },
    SmartMC: {
        DeviceList: [
            {
                Id: "0",
                MacAddress: "30-B0-37-A5-79-A0",
                Type: "AC",
                Role: "1",
                HostName: "MSG360",
                Model: "MSG360-4-PWR-F",
                Hop: "0",
                IpAddress: "127.0.0.1",
                SerialNumber: "219801A2WY8217E000TZ",
                Status: "1",
                SysVersion: "7.1.064, ESS 5607",
                IrfCount: "0",
                IsSnapshot: "true",
                ModelType: "GATEWAY"
            },
            {
                Id: "1",
                Type: "AC",
                MacAddress: "00-E0-FC-00-51-00",
                Role: "2",
                HostName: "SW-1",
                Model: "MSG360-4-PWR-F",
                Hop: "2",
                IpAddress: "192.168.2.2",
                SerialNumber: "DPPMWWB123456",
                Status: "1",
                SysVersion: "7.1.070 Release 6338",
                IrfCount: "1",
                IsSnapshot: "false",
                ModelType: "SWITCH"
            },
            {
                Id: "2",
                Type: "Switch",
                MacAddress: "5C-A7-21-EE-F8-E0",
                Role: "2",
                HostName: "SW-2",
                Model: "Switch",
                Hop: "1",
                IpAddress: "192.168.2.6",
                SerialNumber: "219801A3718216E00009",
                Status: "1",
                SysVersion: "7.1.064, ESS 5607",
                IrfCount: "0",
                IsSnapshot: "false",
                ModelType: "SWITCH"
            },
            {
                Id: "3",
                MacAddress: "5C-A7-21-EE-F8-E3",
                Type: "Switch",
                Role: "2",
                HostName: "SW-3",
                Model: "Switch",
                Hop: "3",
                IpAddress: "192.168.2.6",
                SerialNumber: "219801A3718216E00009",
                Status: "1",
                SysVersion: "7.1.064, ESS 5607",
                IrfCount: "0",
                IsSnapshot: "false",
                ModelType: "SWITCH"
            },
            {
                Id: "4",
                MacAddress: "5C-A7-21-EE-F8-E4",
                Role: "2",
                Type: "Switch",
                HostName: "SW-4",
                Model: "Switch",
                Hop: "4",
                IpAddress: "192.168.2.6",
                SerialNumber: "219801A3718216E00009",
                Status: "1",
                SysVersion: "7.1.064, ESS 5607",
                IrfCount: "0",
                IsSnapshot: "false",
                ModelType: "SWITCH"
            },
            {
                Id: "5",
                Type: "Switch",
                MacAddress: "5C-A7-21-EE-F8-E5",
                Role: "2",
                HostName: "WA6520-C_T",
                Model: "WA6520-C_T",
                Hop: "5",
                IpAddress: "192.168.2.6",
                SerialNumber: "219801A3718216E00009",
                Status: "1",
                SysVersion: "7.1.064, ESS 5607",
                IrfCount: "0",
                IsSnapshot: "false",
                ModelType: "AP"
            },
            {
                Id: "6",
                Type: "Switch",
                MacAddress: "5C-A7-21-EE-F8-E5",
                Role: "2",
                HostName: "WA6520-C_T",
                Model: "WA6520-C_T",
                Hop: "5",
                IpAddress: "192.168.2.6",
                SerialNumber: "219801A3718216E00009",
                Status: "1",
                SysVersion: "7.1.064, ESS 5607",
                IrfCount: "0",
                IsSnapshot: "false",
                ModelType: "AP"
            },
            {
                Id: "7",
                Type: "AP",
                MacAddress: "5C-A7-21-EE-F8-E5",
                Role: "2",
                HostName: "WA6520-C_T",
                Model: "WA6520-C_T",
                Hop: "5",
                IpAddress: "192.168.2.6",
                SerialNumber: "219801A3718216E00009",
                Status: "1",
                SysVersion: "7.1.064, ESS 5607",
                IrfCount: "0",
                IsSnapshot: "false",
                ModelType: "AP"
            }
        ]
    }
}

export default response
