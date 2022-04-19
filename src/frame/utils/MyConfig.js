let MyConfig = {
    name: "v7-web-config",
    ver: "7.54.2.08131800",
    root: "../../web/",
    responseWidth: 800,
    sessionid: "",
    titleSeperator: "|",
    config: {
        keepAlive: 5000,
        checkTimeout: 1000,
        menuDelay: 200,
        cachePage: true,
        effect: true
    },
    helpPanel: {
        size: "75%"
    },
    Dialog: {
        DEFAULT: {
            height: "auto",
            width: 400
        },
        INFO: {
            width: 500,
            height: 40,
            visibleTime: 2000,
            position: "center-center"
        },
        ALERT: {},
        CONFIRM: {},
        ERROR: {},
        PROMPT: {},
        FORM: {
            height: "auto",
            width: "auto"
        }
    },
    Plot: {
        maxPoint: 100,
        width: 250
    },
    Syslog: {
        severity: [
            "Emergency",
            "Alert",
            "Critical",
            "Error",
            "Warning",
            "Notification",
            "Informational",
            "Debugging"
        ],
        lastestCount: 5
    },
    MList: {
        errorVisible: 2000,
        smallWidth: 600,
        subRowHeight: 43,
        searchDelay: 500,
        selectMode: "pc",
        rowHeight: 23,
        ROW_MARGIN: 20,
        pageBar: true,
        statusBar: true,

        EditList: "cell"
    },
    jDate: {
        DEFAULT: {
            numberOfMonths: 1,
            stepMonths: 2,
            showOtherMonths: true,
            selectOtherMonths: true,
            changeMonth: true,
            changeYear: true,
            yearRange: "2000:2035",
            dateFormat: "yy-mm-dd",
            isRTL: false,
            showMonthAfterYear: true,

            showButtonPanel: true
        },
        INLINE: {
            numberOfMonths: 1,
            stepMonths: 1,
            altFormat: "yy-mm-dd",
            showButtonPanel: false
        }
    },
    PageRefresh: {
        SysInfo: 1,
        IfStat: 1
    }
}

export default MyConfig
