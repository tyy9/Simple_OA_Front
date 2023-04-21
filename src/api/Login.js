import request from "@/utils/request"
export default{
    login(sysUser){
        return request({
            url:`/my_oa/sys-user/login`,
            method:"post",
            data:sysUser
        })
    },
    register_common(sysUser){
        return request({
            url:`/my_oa/sys-user/register_common`,
            method:'post',
            data:sysUser
        })
    },
    checktoken(token){
        return request({
            url:`/my_oa/sys-user/getToken`,
            method:'get',
            data:token
        })
    }
}