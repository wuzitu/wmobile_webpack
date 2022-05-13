// m: merge, d: remove, r: replace, c: create
const getNCData = {
    addRows: addRows,
    mInterfaces: mInterfaces,
    mIPFWTcpMss: mIPFWTcpMss,
    dDDR: dDDR,
    mDHCPAlloc: mDHCPAlloc,
    dPPPUserPap: dPPPUserPap,
    mPPPUserPap: mPPPUserPap,
    dPPPUserChap: dPPPUserChap,
    mPPPUserChap: mPPPUserChap,
    dPppoecClient: dPppoecClient,
    mPppoecClient: mPppoecClient,
    mIPv4ApplyPolicies: mIPv4ApplyPolicies,
    dIPv4ApplyPolicies: dIPv4ApplyPolicies,
    dOutbound: dOutbound,
    mOutbound: mOutbound,
    mServerOnInterfaces: mServerOnInterfaces,
    dServerOnInterfaces: dServerOnInterfaces,
    dPBRApplyOutInterface: dPBRApplyOutInterface,
    cPBRApplyOutInterface: cPBRApplyOutInterface,
    dLBLinks: dLBLinks,
    dStaticRoute: dStaticRoute,
    mStaticRoute: mStaticRoute,
    dIpv4Addresses: dIpv4Addresses,
    mIpv4Addresses: mIpv4Addresses,
    mDHCPIfMode: mDHCPIfMode
}

const addRows = (NC, rows, arr) => {
    for (let item in arr) {
        if (item.NC == NC) {
            item.rows.push(rows)
        }
    }
    return arr
}

const mInterfaces = (IfIndex, CfgMTU) => {
    const ncTable = {
        NC: "Interfaces",
        operation: "merge",
        rows: [
            {
                IfIndex: IfIndex,
                ConfigMTU: CfgMTU == "" ? 1500 : CfgMTU
            }
        ]
    }
    return ncTable
}

const mIPFWTcpMss = (IfIndex, GETcpMss) => {
    const ncTable = {
        NC: "IPFWTcpMss",
        operation: "merge",
        rows: [
            {
                IfIndex: IfIndex,
                Num: GETcpMss
            }
        ]
    }
    return ncTable
}

const dDDR = (IfIndex) => {
    const ncTable = {
        NC: "DDR",
        operation: "remove",
        rows: [
            {
                IfIndex: IfIndex
            }
        ]
    }
    return ncTable
}

const mDHCPAlloc = (IfIndex, AllocEnable) => {
    const ncTable = {
        NC: "DHCPAlloc",
        operation: "merge",
        rows: [
            {
                IfIndex: IfIndex,
                AllocEnable: AllocEnable
            }
        ]
    }
    return ncTable
}

const dPPPUserPap = (IfIndex) => {
    const ncTable = {
        NC: "PPPUserPap",
        operation: "remove",
        rows: [
            {
                IfIndex: IfIndex
            }
        ]
    }
    return ncTable
}

const mPPPUserPap = (IfIndex, UserName, Password) => {
    const ncTable = {
        NC: "PPPUserPap",
        operation: "remove",
        rows: [
            {
                IfIndex: IfIndex,
                UserName: UserName,
                Password: Password
            }
        ]
    }
    return ncTable
}

const dPPPUserChap = (IfIndex) => {
    const ncTable = {
        NC: "PPPUserChap",
        operation: "remove",
        rows: [
            {
                IfIndex: IfIndex
            }
        ]
    }
    return ncTable
}

const mPPPUserChap = (IfIndex, UserName, Password) => {
    const ncTable = {
        NC: "PPPUserChap",
        operation: "remove",
        rows: [
            {
                IfIndex: IfIndex,
                UserName: UserName,
                Password: Password
            }
        ]
    }
    return ncTable
}

const dPppoecClient = (IfIndex) => {
    const ncTable = {
        NC: "PppoecClient",
        operation: "remove",
        rows: [
            {
                IfIndex: IfIndex,
                BundleNum: "1"
            }
        ]
    }
    return ncTable
}

const mPppoecClient = (IfIndex, BundleNum) => {
    const ncTable = {
        NC: "PppoecClient",
        operation: "merge",
        rows: [
            {
                IfIndex: IfIndex,
                BundleNum: BundleNum
            }
        ]
    }
    return ncTable
}

const mIPv4ApplyPolicies = (IfIndex, VpnPolicyName) => {
    const ncTable = {
        NC: "IPv4ApplyPolicies",
        operation: "merge",
        rows: [
            {
                IfIndex: IfIndex,
                Policy: VpnPolicyName
            }
        ]
    }
    return ncTable
}

const dIPv4ApplyPolicies = (IfIndex) => {
    const ncTable = {
        NC: "IPv4ApplyPolicies",
        operation: "remove",
        rows: [
            {
                IfIndex: IfIndex,
                Policy: ""
            }
        ]
    }
    return ncTable
}

const dOutbound = (IfIndex, gsVpnNatBoundsNum) => {
    const ncTable = {
        NC: "Outbound",
        operation: "remove",
        rows: [
            {
                IfIndex: IfIndex,
                ACLNumber: gsVpnNatBoundsNum
            }
        ]
    }
    return ncTable
}

const mOutbound = (IfIndex) => {
    const ncTable = {
        NC: "Outbound",
        operation: "merge",
        rows: [
            {
                IfIndex: IfIndex,
                ACLNumber: ""
            }
        ]
    }
    return ncTable
}

const mServerOnInterfaces = (IfIndex, data) => {
    const ncTable = {
        NC: "ServerOnInterfaces",
        operation: "merge",
        rows: [
            {
                IfIndex: IfIndex,
                ProtocolType: "",
                GlobalInfo: {
                    GlobalVRF: "",
                    GlobalStartIpv4Address: "",
                    GlobalEndIpv4Address: "",
                    GlobalStartPortNumber: data.GlobalInfo.GlobalStartPortNumber,
                    GlobalEndPortNumber: "",
                    GlobalIfIndex: ""
                },
                LocalInfo: {
                    LocalStartIpv4Address: data.LocalInfo.LocalStartIpv4Address,
                    LocalStartPortNumber: data.LocalInfo.LocalStartPortNumber
                }
            }
        ]
    }
    return ncTable
}

const dServerOnInterfaces = (IfIndex, data) => {
    const ncTable = {
        NC: "ServerOnInterfaces",
        operation: "remove",
        rows: [
            {
                IfIndex: IfIndex,
                ProtocolType: data.ProtocolType,
                GlobalInfo: {
                    GlobalVRF: "",
                    GlobalStartIpv4Address: "",
                    GlobalEndIpv4Address: "",
                    GlobalStartPortNumber: data.GlobalInfo.GlobalStartPortNumber,
                    GlobalEndPortNumber: "",
                    GlobalIfIndex: data.GlobalInfo.GlobalIfIndex
                }
            }
        ]
    }
    return ncTable
}

const dPBRApplyOutInterface = (IfIndex) => {
    const ncTable = {
        NC: "Outbound",
        operation: "remove",
        rows: [
            {
                IfIndex: IfIndex,
                ACLNumber: ""
            }
        ]
    }
    return ncTable
}

const cPBRApplyOutInterface = (IfIndex) => {
    const ncTable = {
        NC: "Outbound",
        operation: "create",
        rows: [
            {
                IfIndex: IfIndex,
                ACLNumber: ""
            }
        ]
    }
    return ncTable
}

const dLBLinks = (Name) => {
    const ncTable = {
        NC: "LBLinks",
        operation: "remove",
        rows: [
            {
                Name: Name
            }
        ]
    }
    return ncTable
}

const dStaticRoute = (IfIndex, ip) => {
    const ncTable = {
        NC: "StaticRoute",
        operation: "remove",
        rows: [
            {
                DestVrfIndex : "0",
                DestTopologyIndex : "0",
                Ipv4Address : "0.0.0.0",
                Ipv4PrefixLength : "0",
                NexthopVrfIndex : "65535",
                NexthopIpv4Address : ip,
                IfIndex : IfIndex
            }
        ]
    }
    return ncTable
}

const mStaticRoute = (IfIndex, ip) => {
    const ncTable = {
        NC: "StaticRoute",
        operation: "merge",
        rows: [
            {
                DestVrfIndex : "0",
                DestTopologyIndex : "0",
                Ipv4Address : "0.0.0.0",
                Ipv4PrefixLength : "0",
                NexthopVrfIndex : "65535",
                NexthopIpv4Address : ip,
                IfIndex : IfIndex
            }
        ]
    }
    return ncTable
}

const dIpv4Addresses = (IfIndex, ip) => {
    const ncTable = {
        NC: "Ipv4Addresses",
        operation: "remove",
        rows: [
            {
                Ipv4Address : ip,
                IfIndex : IfIndex
            }
        ]
    }
    return ncTable
}

const mIpv4Addresses = (IfIndex, ip, mask) => {
    const ncTable = {
        NC: "Ipv4Addresses",
        operation: "merge",
        rows: [
            {
                Ipv4Address : ip,
                Ipv4Mask: mask,
                IfIndex : IfIndex
            }
        ]
    }
    return ncTable
}

const mDHCPIfMode = (IfIndex, Mode) => {
    const ncTable = {
        NC: "DHCPIfMode",
        operation: "merge",
        rows: [
            {
                IfIndex : IfIndex,
                Mode: Mode
            }
        ]
    }
    return ncTable
}

export default { getNCData }