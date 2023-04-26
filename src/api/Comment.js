import request from "@/utils/request"
export default{
    addComment(comment){
        return request({
            url:`/my_oa/comment/addComment`,
            method:"post",
            data:comment
        })
    },
    getCourseComment(id){
        return request({
            url:`/my_oa/comment/getCommentByCourseId/${id}`,
            method:"post",
        })
    },
    getCommentByTeacherId(id){
        return request({
            url:`/my_oa/comment/getCommentByTeacherId/${id}`,
            method:"post",
        })
    },
    deleteCommentById(id){
        return request({
            url:`/my_oa/comment/${id}`,
            method:"delete",
        })
    },
    pageComment_Course(page,limit,comment){
        return request({
            url:`/my_oa/comment/pageComment_Course/${page}/${limit}`,
            method:"post",
            data:comment
        })
    },
    pageTeacher_Course(page,limit,comment){
        return request({
            url:`/my_oa/comment/pageTeacher_Course/${page}/${limit}`,
            method:"post",
            data:comment
        })
    }
}