import getData from "./getData.js";
import { hex_md5 } from "../utils/md5.js";
//发送短信验证码
const sendSms = ({ mobile, area_code, company_id}) => {
    
    let timestamp = String((new Date()).getTime()),
        securt = "bb635dd47e5861f717472df95652077356a8f38dea6347851c191f66b7cf9dc8",
        sign = hex_md5(`timestamp=${timestamp}&mobile=${mobile}#${securt}`);
    return getData('/sl/v2/message/qrcode', { mobile, area_code, company_id,timestamp,sign }, 'get', 'formdata');
};
//校验短信验证码 并获取用户信息
const verifyCode = ({ mobile, code, area_code, company }) => {
    return getData('/sl/v2/user/nameinfo', { mobile, code, area_code, company });
};
//更新用户头像
const updateAvatar = ({ avatar, company, code, mobile, area_code }) => {

    return getData('/sl/v2/user/update/message', { avatar, company, code, mobile, area_code });
};
//获取公司头像
const getlogo = ({ id }) => {
    return getData('/sl/v2/company/logo', { id }, 'get', 'formdata');
};


export { sendSms, verifyCode, updateAvatar, getlogo }