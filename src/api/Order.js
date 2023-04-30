import request from '@/utils/request'
export default{
    addOrder(order){
        return request({
            url:`/my_oa/course-order/addOrder`,
            method:"post",
            data:order
        })
    },
    pageOrder(page,limit,order){
        return request({
            url:`/my_oa/course-order/PageUserOrder/${page}/${limit}`,
            method:"post",
            data:order
        })
    }
}