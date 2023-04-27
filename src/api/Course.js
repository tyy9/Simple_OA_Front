import request from "@/utils/request"
export default{
    getIndexCourseData(){
        return request({
            url:`/my_oa/course/getIndexCourseData`,
            method:"get"
        })
    },
    getCourseByUserId(id){
        return request({
            url:`/my_oa/course/getCourseByUserId/${id}`,
            method:"post"
        })
    },
    findCourseById(id) {
        return request({
            url: `/my_oa/course/findCourseById/${id}`,
            method: 'post',
        })
    },
    pageCourse(page, limit, course) {
        return request({
            url: `/my_oa/course/pageCourse/${page}/${limit}`,
            method: 'post',
            data: course
        })
    },
    
}