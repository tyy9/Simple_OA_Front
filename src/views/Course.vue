<template>
  <div>
    <el-main class="box3">
      <l-aside class="l_aside"></l-aside>
      <div class="container">
        <div class="search_header">
          <div class="subject_search">
            <div class="subject_show" v-for="item in subjectList" :key="item">
              <p>{{item.title}}:</p>
              <div class="subject_show_children" v-for="item2 in item.children" :key="item2" style="cursor: pointer;" 
              @click="findCourseBySubject(item2.id)">
                <p :class=" item2.id==subject_active?'active':''">{{item2.title}}</p>
              </div>
            </div>
          </div>
          <div class="input_search">
            <el-input
              v-model="coursedata.name"
              placeholder="请输入课程标题"
              style="width: 200px;"
              
            ></el-input>
            <el-button type="primary"  @click="findCourseByname">搜索</el-button>
          </div>
        </div>
        <div class="course_content">
          <div class="course_content_show" v-for="item in courseList" :key="item">
            <img :src="item.avatar" width="200px" height="200p" style="cursor: pointer;"
             @click="to_coursedetail(item.id)"/>
            <p>{{item.name}}</p>
          </div>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getcourseinfo"
          :current-page.sync="page"
          :page-size="limit"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
      <r-aside class="r_aside"></r-aside>
    </el-main>
  </div>
</template>
<script>
import l_aside from "../components/l_aside.vue";
import r_aside from "../components/r_aside.vue";
import course from "@/api/Course";
import subject from "@/api/Subject";
import teacher from "@/api/Teacher"
export default {
  components: {
    l_aside,
    r_aside,
  },
  data() {
    return {
      coursedata: {},
      total: 0,
      page: 1,
      limit: 5,
      subjectList: {},
      subject_active:0,
      courseList:{},
      time:2
    };
  },
  methods: {
    getinfo(){
      //获取分类
      this.getSubjectinfo()
      //获取课程信息
      this.getcourseinfo()
    },
    //获取父类分类
    getSubjectinfo(){
      subject.getAllSubject().then(res=>{
            this.subjectList=res.data.subjectList
            this.getsubject_childrenList(this.form.subjectId)
            console.log("subjectinfo=>",res.data.subjectList)
        })
    },
    getcourseinfo(){
      course.pageCourse(this.page,this.limit,this.coursedata).then(res=>{
        this.courseList=res.data.data
        this.total=res.data.total
      })
    },
    //根据分类搜索课程
    findCourseBySubject(id){
      if(this.subject_active!=id){
        this.subject_active=id
        this.coursedata.subjectParentid=id
      }else{
        this.subject_active=0
        this.coursedata.subjectParentid=""
      }
      this.getinfo()
    },
    //模糊搜索
    findCourseByname(){
      this.getinfo()
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
    this.getinfo()
  }
};
</script>
<style>
.box3 {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 100%;
  margin: 0;
  padding-top: 50px;
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.box3 .l_aside {
  flex: 1;
}
.box3 .r_aside {
  flex: 1;
}

.box3 .container {
  background-color: #ffffff;
  flex: 6;
  width: 100%;
  height: auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
/* 搜索框 */
.input_search {
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-top: 10px;
}
/*课程分类*/
.box3 .container .search_header .subject_search {
  border-bottom: 1px solid #ccc;
}
.box3 .container .search_header .subject_search .subject_show {
  display: flex;
  flex-direction: row;
  line-height: 20px;
}
.box3 .container .search_header .subject_search .subject_show > p {
  margin: 0;
  margin-bottom: 5px;
  margin-left: 10px;
  margin-top: 10px;
  color: rgb(54, 90, 1);
  font-weight: bold;
}
.box3 .container .search_header .subject_search .subject_show .subject_show_children{
  margin-left: 5px;

}
.box3 .container .search_header .subject_search .subject_show .subject_show_children:hover{
  position: relative;
  bottom: 10px;
  border-top: none;
  border-bottom: 1px solid blue;
  cursor: pointer;
}

/*  */
.box3
  .container
  .search_header
  .subject_search
  .subject_show
  .subject_show_children
  > p {
  margin: 0;
  margin-bottom: 5px;
  margin-left: 10px;
  margin-top: 10px;
  font-size: 10px;
}
/* 课程列表 */
.course_content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: left;
}
.course_content .course_content_show {
  margin-left: 15px;
    margin-right: 15px;
}
.course_content .course_content_show > img {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.course_content .course_content_show > img:hover{
  position: relative;
  bottom: 10px;
  border: 2px solid rgb(245, 152, 142);
  border-top: none;
  border-bottom: 5px solid rgb(255, 83, 64);
  cursor: pointer;
}
.course_content .course_content_show > p {
  margin: 0;
}
 .active{
  font-weight: bold;
  color: red;
}
</style>