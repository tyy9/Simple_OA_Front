import request from "@/utils/request"
export default{
    getIndexCourseData(){
        return request({
            url:`/my_oa/course/getIndexCourseData`,
            method:"get"
        })
    }
}