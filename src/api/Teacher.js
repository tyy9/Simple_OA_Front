import request from "@/utils/request"
export default{
    getindexTeacher(){
        return request({
            url:`/my_oa/sys-user/getIndexTeacher`,
            method:"get"
        })
    }
}