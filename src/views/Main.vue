<template>
  <div >
    <el-main style="padding: 0;">
      <div class="box">
        <!-- <div class="l_aside"></div> -->
        <l_aside></l_aside>
        <div class="container">
          <div class="banner">
            <swiper
              :options="mySwiperOption"
              style="width: 1400px; height: 500px"
            >
              <swiper-slide v-for="i in 3" :key="i">
                <img :src="httpImageUrl" @click="onClick(i)" />
              </swiper-slide>
              <div
                class="swiper-pagination"
                slot="pagination"
                style="bottom: 1px"
              ></div>
            </swiper>
          </div>
          <div class="recommendbox">
            <div class="teacherbox">
              <div class="tittle">
                <span><i class="el-icon-s-custom"></i>名师推荐</span>
              </div>
              <div class="teachercontent">
                <div class="teachershow" v-for="item in teacherData" :key="item.id">
                  <div class="teacherdetail_left">
                    <img :src="item.avatarUrl" width="200px" height="200px" 
                    style="border-radius: 50%;" class="teacher_img" 
                    @click="to_teacherdetal(item.id)">
                  <div>{{ item.nickname}}</div>
                  </div>
                  <div class="teacherdetail_right">
                    <div class="teacher_description">
                      <p v-html="item.description" class="v_html_img">
                        {{item.description}}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="Coursebox">
              <div class="tittle">
                <span style="color: red;"><i class="el-icon-s-data"></i>热门课程</span>
              </div>
              <div class="Coursecontent">
                <div class="Courseshow" v-for="item in courseData" :key="item">
                  <div class="coursedetail_left">
                    <img :src="item.avatar" width="200px" height="200px" class="course_img" @click="to_coursedetail(item.id)">
                    <div>{{ item.name}}</div>
                    
                  </div>
                  <div class="coursedetail_right">
                    <div class="course_description">
                      <p v-html="item.description">
                        {{item.description}}
                      </p>
                    </div>
                      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="r_aside"></div> -->
        <r_aside></r_aside>
      </div>
    </el-main>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import teacher from "@/api/Teacher"
import course from "@/api/Course"
import l_aside from "../components/l_aside.vue";
import r_aside from "../components/r_aside.vue";
export default {
  components: {
    // 注册 vue-awesome-swiper 组件
    swiper,
    swiperSlide,
    l_aside,
    r_aside
  },

  data() {
    return {
      mySwiperOption: {
        pagination: {
          el: ".swiper-pagination", //与slot="pagination"处 class 一致
          clickable: true, //轮播按钮支持点击
        },
        //自动播放
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        //循环
        loop: true,
      },
      httpImageUrl:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F013fe45544a15e0000019ae9049657.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663827624&t=884f3f882f3070c1168c89864ae1c289",
      teacherData:{},
      courseData:{},
      time:2
    };
  },
  methods: {
    onClick(i) {
      alert(i);
    },
    getindexTeacherData(){
      teacher.getindexTeacher().then(res=>{
        this.teacherData=res.data.teacher
        console.log(res)
      })
    },
    getindexCourseData(){
      course.getIndexCourseData().then(res=>{
        this.courseData=res.data.coursedata
      })
    },
    to_teacherdetal(id){
      course.getCourseByUserId(id).then(res=>{
        localStorage.setItem('course_detail',JSON.stringify(res.data.course))
      })
      teacher.findUserById(id).then(res=>{
        localStorage.setItem('teacher_detail',JSON.stringify(res.data.user))
      })
      //等数据加载到客户端中，避免出现上个数据
      let t=setInterval(() => {
        --this.time
        if(this.time==0){
          this.$router.push("/teacher_detail")
          clearInterval(t)
          this.time=2
        }
      }, 1000);
      
    },
    to_coursedetail(id){
      course.findCourseById(id).then(res=>{
        localStorage.setItem('course_detail',JSON.stringify(res.data.course))
      })
      teacher.getTeacherByCourseId(id).then(res=>{
        localStorage.setItem('teacher_detail',JSON.stringify(res.data.teacher))
      })
      //等数据加载到客户端中，避免出现上个数据
      let t=setInterval(() => {
        --this.time
        if(this.time==0){
          this.$router.push("/course_detail")
          clearInterval(t)
          this.time=2
        }
      }, 1000);
    }
  },
  created () {
    this.getindexTeacherData()
    this.getindexCourseData()
  }
};
</script>
<style>
.box {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 100%;
 
}
.box .l_aside {
  flex: 1;
  
}
.box .r_aside {
  flex: 1;

  
}
.container {
  background-color: #ffffff;
  flex: 2;
  width: 100%;
  height: auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding-bottom:100px ;
}
.box .container .banner {
}
.box .container .recommendbox {
  width: 100%;
  height: auto;
}
.box .container .recommendbox .teacherbox {
  margin-top: 20px;
  width: 100%;
}
.box .container .recommendbox .teacherbox .tittle {
  font-size: 20px;
  line-height: 30px;
}
.box .container .recommendbox .teacherbox .teachercontent {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 10px;
  border-top: 1px solid #cccc;
}
.box .container .recommendbox .teacherbox .teachercontent .teachershow {
  height: 200px;
  text-align: center;
  margin: 5px;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
}
.box .container .recommendbox .teacherbox .teachercontent .teachershow .teacherdetail_left .teacher_img{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  
}
.box .container .recommendbox .teacherbox .teachercontent .teachershow .teacherdetail_left .teacher_img:hover{
  position: relative;
  bottom: 10px;
  border: 2px solid rgb(201, 218, 255);
  border-top: none;
  border-bottom: 6px solid rgb(136, 85, 255);
  cursor: pointer;
  
}
.box .container .recommendbox .teacherbox .teachercontent .teachershow .teacherdetail_right{
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
}
.box .container .recommendbox .teacherbox .teachercontent .teachershow .teacherdetail_right .teacher_description{
  width: 400px;
 height: 100px;
 padding: 0;
 margin-left: 5px;
 border-radius: 10%;
 box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
 border-bottom-left-radius: 0;
 
}
.box .container .recommendbox .teacherbox .teachercontent .teachershow .teacherdetail_right .teacher_description p{
  margin: 0;
  padding: 5px;
  font-size: 10px;
  color: #767676;
  text-align: left;
}
/* cousrse */
.box .container .recommendbox .Coursebox {
  margin-top: 20px;
  width: 100%;
}
.box .container .recommendbox .Coursebox .tittle {
  font-size: 20px;
  line-height: 30px;
}
.box .container .recommendbox .Coursebox .Coursecontent {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 10px;
  border-top: 1px solid #cccc;
  padding-top: 5px;
}
.box .container .recommendbox .Coursebox .Coursecontent .Courseshow {
  height: 200px;
  text-align: center;
  margin: 5px;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
}
.box .container .recommendbox .Coursebox .Coursecontent .Courseshow .coursedetail_left img{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}  
.box .container .recommendbox .Coursebox .Coursecontent .Courseshow .coursedetail_left .course_img:hover{
  position: relative;
  bottom: 10px;
  border: 2px solid rgb(245, 152, 142);
  border-top: none;
  border-bottom: 5px solid rgb(255, 83, 64);
  cursor: pointer;
}  
.box .container .recommendbox .Coursebox .Coursecontent .Courseshow .coursedetail_right{
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
}
.box .container .recommendbox .Coursebox .Coursecontent .Courseshow .coursedetail_right .course_description {
 width: 400px;
 height: 100px;
 padding: 0;
 margin-left: 5px;
 border-radius: 10%;
 border-bottom-left-radius: 0;
 box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.box .container .recommendbox .Coursebox .Coursecontent .Courseshow .coursedetail_right .course_description>p{
  margin: 0;
  padding: 5px;
  font-size: 10px;
  color: #767676;
  text-align: left;
}
.v_html_img img{
  display: none;
}
</style>