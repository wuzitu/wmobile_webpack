const testData = {
    DHCPC: {
        "DHCPAlloc": [
            {
                "IfIndex": "2",
                "AllocEnable": "false"
            },
            {
                "IfIndex": "3",
                "AllocEnable": "false"
            },
            {
                "IfIndex": "5",
                "AllocEnable": "true"
            },
            {
                "IfIndex": "15",
                "AllocEnable": "false"
            },
            {
                "IfIndex": "16",
                "AllocEnable": "false"
            }
        ]
    },
    IPV4ADDRESS: {
        "Ipv4Addresses": [
            {
                "IfIndex": "15",
                "Ipv4Address": "192.168.0.47",
                "Ipv4Mask": "255.255.252.0",
                "AddressOrigin": "1"
            },
            {
                "IfIndex": "16",
                "Ipv4Address": "172.16.100.1",
                "Ipv4Mask": "255.255.252.0",
                "AddressOrigin": "1"
            }
        ]
    },
    Ifmgr: {
        "Interfaces": [
            {
                "IfIndex": "1",
                "Name": "GigabitEthernet1/0/1",
                "AbbreviatedName": "GE1/0/1",
                "PortIndex": "1",
                "ifTypeExt": "19",
                "ifType": "6",
                "Description": "GigabitEthernet1/0/1 Interface",
                "AdminStatus": "1",
                "OperStatus": "1",
                "ConfigSpeed": "1",
                "ActualSpeed": "1000000",
                "ConfigDuplex": "3",
                "ActualDuplex": "1",
                "PortLayer": "1",
                "LinkType": "1",
                "PVID": "1",
                "MAC": "9C-06-1B-84-36-59",
                "Loopback": "0",
                "ActualBandwidth": "1000000",
                "SubPort": "false"
            },
            {
                "IfIndex": "2",
                "Name": "GigabitEthernet1/0/2",
                "AbbreviatedName": "GE1/0/2",
                "PortIndex": "2",
                "ifTypeExt": "23",
                "ifType": "6",
                "Description": "GigabitEthernet1/0/2",
                "AdminStatus": "1",
                "OperStatus": "2",
                "ConfigSpeed": "1",
                "ActualSpeed": "0",
                "ConfigDuplex": "3",
                "ActualDuplex": "3",
                "PortLayer": "2",
                "MAC": "9C-06-1B-84-36-5A",
                "ForwardingAttributes": "17",
                "Loopback": "0",
                "ConfigMTU": "1500",
                "ActualMTU": "1500",
                "ActualBandwidth": "0",
                "SubPort": "false"
            },
            {
                "IfIndex": "3",
                "Name": "GigabitEthernet1/0/3",
                "AbbreviatedName": "GE1/0/3",
                "PortIndex": "3",
                "ifTypeExt": "23",
                "ifType": "6",
                "Description": "GigabitEthernet1/0/3",
                "AdminStatus": "1",
                "OperStatus": "2",
                "ConfigSpeed": "1",
                "ActualSpeed": "0",
                "ConfigDuplex": "3",
                "ActualDuplex": "3",
                "PortLayer": "2",
                "MAC": "9C-06-1B-84-36-5B",
                "ForwardingAttributes": "17",
                "Loopback": "0",
                "ConfigMTU": "1500",
                "ActualMTU": "1500",
                "ActualBandwidth": "0",
                "SubPort": "false"
            },
            {
                "IfIndex": "4",
                "Name": "GigabitEthernet1/0/4",
                "AbbreviatedName": "GE1/0/4",
                "PortIndex": "4",
                "ifTypeExt": "19",
                "ifType": "6",
                "Description": "GigabitEthernet1/0/4 Interface",
                "AdminStatus": "1",
                "OperStatus": "2",
                "ConfigSpeed": "1",
                "ActualSpeed": "0",
                "ConfigDuplex": "3",
                "ActualDuplex": "3",
                "PortLayer": "1",
                "LinkType": "1",
                "PVID": "1",
                "MAC": "9C-06-1B-84-36-5C",
                "Loopback": "0",
                "ActualBandwidth": "0",
                "SubPort": "false"
            },
            {
                "IfIndex": "5",
                "Name": "GigabitEthernet1/0/5",
                "AbbreviatedName": "GE1/0/5",
                "PortIndex": "5",
                "ifTypeExt": "23",
                "ifType": "6",
                "Description": "GigabitEthernet1/0/5 Interface",
                "AdminStatus": "1",
                "OperStatus": "2",
                "ConfigSpeed": "1",
                "ActualSpeed": "0",
                "ConfigDuplex": "3",
                "ActualDuplex": "3",
                "PortLayer": "2",
                "MAC": "9C-06-1B-84-36-5D",
                "ForwardingAttributes": "17",
                "Loopback": "0",
                "ConfigMTU": "1500",
                "ActualMTU": "1500",
                "ActualBandwidth": "0",
                "SubPort": "false"
            },
            {
                "IfIndex": "7",
                "Name": "NULL0",
                "AbbreviatedName": "NULL0",
                "ifTypeExt": "30",
                "ifType": "1",
                "Description": "NULL0 Interface",
                "AdminStatus": "1",
                "OperStatus": "1",
                "PortLayer": "2",
                "MAC": "00-10-00-00-00-10",
                "ForwardingAttributes": "18",
                "ConfigMTU": "1500",
                "ActualMTU": "1500",
                "ActualBandwidth": "1000000",
                "SubPort": "false"
            },
            {
                "IfIndex": "8",
                "Name": "InLoopBack0",
                "AbbreviatedName": "InLoop0",
                "ifTypeExt": "15",
                "ifType": "24",
                "Description": "InLoopBack0 Interface",
                "AdminStatus": "1",
                "OperStatus": "1",
                "PortLayer": "2",
                "InetAddressIPV4": "127.0.0.1",
                "InetAddressIPV4Mask": "255.0.0.0",
                "MAC": "00-10-00-00-00-10",
                "ForwardingAttributes": "20",
                "ConfigMTU": "1536",
                "ActualMTU": "1536",
                "ActualBandwidth": "0",
                "SubPort": "false"
            },
            {
                "IfIndex": "10",
                "Name": "Dialer1",
                "AbbreviatedName": "Dia1",
                "ifTypeExt": "10",
                "ifType": "23",
                "Description": "Dialer1 Interface",
                "AdminStatus": "1",
                "OperStatus": "1",
                "PortLayer": "2",
                "MAC": "00-10-00-00-00-10",
                "ForwardingAttributes": "18",
                "ConfigMTU": "1492",
                "ActualMTU": "1492",
                "ActualBandwidth": "64",
                "SubPort": "false"
            },
            {
                "IfIndex": "11",
                "Name": "Dialer2",
                "AbbreviatedName": "Dia2",
                "ifTypeExt": "10",
                "ifType": "23",
                "Description": "Dialer2 Interface",
                "AdminStatus": "1",
                "OperStatus": "2",
                "PortLayer": "2",
                "MAC": "00-10-00-00-00-10",
                "ForwardingAttributes": "24",
                "ConfigMTU": "1492",
                "ActualMTU": "1492",
                "ActualBandwidth": "0",
                "SubPort": "false"
            },
            {
                "IfIndex": "12",
                "Name": "Dialer3",
                "AbbreviatedName": "Dia3",
                "ifTypeExt": "10",
                "ifType": "23",
                "Description": "Dialer3 Interface",
                "AdminStatus": "1",
                "OperStatus": "2",
                "PortLayer": "2",
                "MAC": "00-10-00-00-00-10",
                "ForwardingAttributes": "24",
                "ConfigMTU": "1492",
                "ActualMTU": "1492",
                "ActualBandwidth": "0",
                "SubPort": "false"
            },
            {
                "IfIndex": "13",
                "Name": "Dialer4",
                "AbbreviatedName": "Dia4",
                "ifTypeExt": "10",
                "ifType": "23",
                "Description": "Dialer4 Interface",
                "AdminStatus": "1",
                "OperStatus": "1",
                "PortLayer": "2",
                "MAC": "00-10-00-00-00-10",
                "ForwardingAttributes": "18",
                "ConfigMTU": "1492",
                "ActualMTU": "1492",
                "ActualBandwidth": "64",
                "SubPort": "false"
            },
            {
                "IfIndex": "14",
                "Name": "Dialer5",
                "AbbreviatedName": "Dia5",
                "ifTypeExt": "10",
                "ifType": "23",
                "Description": "Dialer5 Interface",
                "AdminStatus": "1",
                "OperStatus": "1",
                "PortLayer": "2",
                "MAC": "00-10-00-00-00-10",
                "ForwardingAttributes": "18",
                "ConfigMTU": "1492",
                "ActualMTU": "1492",
                "ActualBandwidth": "64",
                "SubPort": "false"
            },
            {
                "IfIndex": "15",
                "Name": "Vlan-interface1",
                "AbbreviatedName": "Vlan1",
                "ifTypeExt": "41",
                "ifType": "136",
                "Description": "Vlan-interface1 Interface",
                "AdminStatus": "1",
                "OperStatus": "1",
                "PortLayer": "2",
                "InetAddressIPV4": "192.168.0.47",
                "InetAddressIPV4Mask": "255.255.252.0",
                "MAC": "9C-06-1B-84-36-58",
                "ForwardingAttributes": "17",
                "ConfigMTU": "1500",
                "ActualMTU": "1500",
                "ActualBandwidth": "1000000",
                "SubPort": "false"
            },
            {
                "IfIndex": "16",
                "Name": "Vlan-interface100",
                "AbbreviatedName": "Vlan100",
                "ifTypeExt": "41",
                "ifType": "136",
                "Description": "Vlan-interface100 Interface",
                "AdminStatus": "1",
                "OperStatus": "2",
                "PortLayer": "2",
                "InetAddressIPV4": "172.16.100.1",
                "InetAddressIPV4Mask": "255.255.252.0",
                "MAC": "9C-06-1B-84-36-58",
                "ForwardingAttributes": "17",
                "ConfigMTU": "1500",
                "ActualMTU": "1500",
                "ActualBandwidth": "1000000",
                "SubPort": "false"
            }
        ],
        "InterfaceCapabilities": [
            {
                "IfIndex": "1",
                "Configurable": "true",
                "MaxCreateSubNum": "0",
                "Removable": "false"
            },
            {
                "IfIndex": "2",
                "Configurable": "true",
                "MinMTU": "46",
                "MaxMTU": "1560",
                "MaxCreateSubNum": "1024",
                "Removable": "false"
            },
            {
                "IfIndex": "3",
                "Configurable": "true",
                "MinMTU": "46",
                "MaxMTU": "1560",
                "MaxCreateSubNum": "1024",
                "Removable": "false"
            },
            {
                "IfIndex": "4",
                "Configurable": "true",
                "MaxCreateSubNum": "0",
                "Removable": "false"
            },
            {
                "IfIndex": "5",
                "Configurable": "true",
                "MinMTU": "46",
                "MaxMTU": "1560",
                "MaxCreateSubNum": "1024",
                "Removable": "false"
            },
            {
                "IfIndex": "7",
                "Configurable": "true",
                "MaxCreateSubNum": "0",
                "Removable": "false"
            },
            {
                "IfIndex": "8",
                "Configurable": "false",
                "MaxCreateSubNum": "0",
                "Removable": "false"
            },
            {
                "IfIndex": "10",
                "Configurable": "true",
                "MinMTU": "128",
                "MaxMTU": "1500",
                "MaxCreateSubNum": "0",
                "Removable": "true"
            },
            {
                "IfIndex": "11",
                "Configurable": "true",
                "MinMTU": "128",
                "MaxMTU": "1500",
                "MaxCreateSubNum": "0",
                "Removable": "true"
            },
            {
                "IfIndex": "12",
                "Configurable": "true",
                "MinMTU": "128",
                "MaxMTU": "1500",
                "MaxCreateSubNum": "0",
                "Removable": "true"
            },
            {
                "IfIndex": "13",
                "Configurable": "true",
                "MinMTU": "128",
                "MaxMTU": "1500",
                "MaxCreateSubNum": "0",
                "Removable": "true"
            },
            {
                "IfIndex": "14",
                "Configurable": "true",
                "MinMTU": "128",
                "MaxMTU": "1500",
                "MaxCreateSubNum": "0",
                "Removable": "true"
            },
            {
                "IfIndex": "15",
                "Configurable": "true",
                "MinMTU": "46",
                "MaxMTU": "1748",
                "MaxCreateSubNum": "0",
                "Removable": "true"
            },
            {
                "IfIndex": "16",
                "Configurable": "true",
                "MinMTU": "46",
                "MaxMTU": "1748",
                "MaxCreateSubNum": "0",
                "Removable": "true"
            }
        ]
    },
    NAT: {
        "ServerOnInterfaces": [
            {
                "IfIndex": "5",
                "ProtocolType": "6",
                "GlobalInfo": {
                    "GlobalVRF": "",
                    "GlobalStartIpv4Address": "",
                    "GlobalEndIpv4Address": "",
                    "GlobalStartPortNumber": "8888",
                    "GlobalEndPortNumber": "",
                    "GlobalIfIndex": "5"
                },
                "LocalInfo": {
                    "LocalStartIpv4Address": "192.168.1.2",
                    "LocalStartPortNumber": "9999"
                },
                "ACLNumber": ""
            }
        ],
        "OutboundDynamicRules": [
            {
                "IfIndex": "2",
                "ACLNumber": ""
            },
            {
                "IfIndex": "3",
                "ACLNumber": ""
            },
            {
                "IfIndex": "5",
                "ACLNumber": ""
            },
            {
                "IfIndex": "10",
                "ACLNumber": ""
            },
            {
                "IfIndex": "11",
                "ACLNumber": ""
            },
            {
                "IfIndex": "12",
                "ACLNumber": ""
            },
            {
                "IfIndex": "13",
                "ACLNumber": ""
            },
            {
                "IfIndex": "14",
                "ACLNumber": ""
            }
        ]
    },
    PPPOEC: {
        "PppoecClient": [
            {
                "IfIndex": "2",
                "BundleNum": "2",
                "Hostuniq": "true"
            },
            {
                "IfIndex": "3",
                "BundleNum": "3",
                "Hostuniq": "true"
            }
        ]
    },
    XiaoBei: {
        "Interfaces": [
            {
                "IfIndex": "1",
                "PortPanel": "LAN"
            },
            {
                "IfIndex": "2",
                "PortPanel": "LAN"
            },
            {
                "IfIndex": "3",
                "PortPanel": "LAN"
            },
            {
                "IfIndex": "4",
                "PortPanel": "LAN"
            },
            {
                "IfIndex": "5",
                "PortPanel": "WAN"
            }
        ]
    },
    IB: {
        "IbBackup": [
            {
                "IfIndex": "3",
                "BackupIfIndex": "2",
                "Priority": "5"
            }
        ]
    },
    MGROUP: {
        "Groups": [
            {
                "ID": "1",
                "Type": "1"
            }
        ]
    },
    PPP: {
        "PPPUserPap": [
            {
                "IfIndex": "11",
                "UserName": "1"
            },
            {
                "IfIndex": "12",
                "UserName": "1"
            }
        ],
        "PPPUserChap": [
            {
                "IfIndex": "11",
                "UserName": "1"
            },
            {
                "IfIndex": "12",
                "UserName": "1"
            }
        ]
    },
    DNS: {
        "DNSServer": [
            {
                "VRF": "",
                "Type": "1",
                "AddressType": "1",
                "IpAddress": "2.2.2.2",
                "IfIndex": "",
                "Priority": "0"
            }
        ]
    }
}

export default { testData }