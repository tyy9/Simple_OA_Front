import request from "@/utils/request"
export default{
    getcode(user){
        return request({
            url:`/my_oa/index/getcode`,
            method:"post",
            data:user
        })
    }
}