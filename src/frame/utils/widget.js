import i18n from "@/i18n/i18n"
const $t = i18n.global.t

const checkPasswordLogin = (string) => {
    let reg = /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![_!@#$%|^&*`~()+='"\-[\]<>{},.\\/:;]+$)[\da-zA-z_!@#$%|^&*`~()+='"\-[\]<>{},.\\/:;]{10,63}$/
    if (reg.test(string) == false || string.indexOf("admin") != -1 || string.indexOf("nimda") != -1) {
        return $t("Password.passwordErr")
    } else {
        return true
    }
}

const checkDigitsVlan = (num) => {
    const vlan = parseInt(num)
    if (isNaN(vlan)) {
        return $t("Vlan.vlanErr")
    } else {
        if (vlan < 1 || vlan > 4094) {
            return $t("Vlan.vlanErr")
        } else {
            return true
        }
    }
}

const widget = {
    passwordLogin: checkPasswordLogin,
    digitsVlan: checkDigitsVlan
}

export default widget