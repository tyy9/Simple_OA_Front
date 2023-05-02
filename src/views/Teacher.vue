<template>
    <div>
      <el-main class="box3">
        <l-aside class="l_aside"></l-aside>
        <div class="container">
          <div class="search_header">
            <div class="input_search">
              <el-input
                v-model="teacherdata.username"
                placeholder="请输入教师名字标题"
                style="width: 200px"
              ></el-input>
              <el-button type="primary" @click="findTeacherByname">搜索</el-button>
            </div>
          </div>
          <div class="teacher_content">
            <div class="teacher_content_show" v-for="item in teacherList" :key="item">
              <img :src="item.avatarUrl" width="200px" height="200p" style="cursor: pointer;"
              @click="to_teacherdetal(item.id)"/>
              <p>{{item.username}}</p>
            </div>
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="getteacherinfo"
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
  import teacher from "@/api/Teacher"
  import user from "@/api/user"
  export default {
    components: {
      l_aside,
      r_aside,
    },
    data() {
      return {
        teacherdata: {},
        total: 0,
        page: 1,
        limit: 5,
        teacherList:{},
        time:2
      };
    },
    methods: {
      getinfo(){
        this.getteacherinfo()
      },
      getteacherinfo(){
        this.teacherdata.role="ROLE_TEACHER"  
        user.pageUser(this.page,this.limit,this.teacherdata).then(res=>{
          this.total=this.total=parseInt(res.data.total)  
          this.teacherList=res.data.data
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
    findTeacherByname(){
      this.getteacherinfo()
    }
    },
    created () {
      this.getinfo()
    },
    
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
    flex: 6 ;
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
  /* 教师列表 */
  .teacher_content {
    display: flex;
    flex-direction: row;
    justify-content: left;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .teacher_content .teacher_content_show {
    margin-left: 15px;
    margin-right: 15px;
  }
  .teacher_content .teacher_content_show > img {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .teacher_content .teacher_content_show > img:hover{
    position: relative;
  bottom: 10px;
  border: 2px solid rgb(201, 218, 255);
  border-top: none;
  border-bottom: 6px solid rgb(136, 85, 255);
  cursor: pointer;
  }
  .teacher_content .teacher_content_show > p {
    margin: 0;
  }
  </style>