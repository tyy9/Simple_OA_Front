import request from "@/utils/request"
export default{
    getindexTeacher(){
        return request({
            url:`/my_oa/sys-user/getIndexTeacher`,
            method:"get"
        })
    },
    findUserById(id){
        return request({
            url:`/my_oa/sys-user/findUserById/${id}`,
            method:'post',
        })
    },
    getTeacherByCourseId(id){
        return request({
            url: `/my_oa/sys-user/getTeacherByCourseId/${id}`,
            method: 'post',
        })
    },
        
}