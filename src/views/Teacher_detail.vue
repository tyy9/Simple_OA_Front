<template>
  <div>
    <el-main class="box2">
      <l-aside class="l_aside"></l-aside>
      <div class="container">
        <div class="container-back" @click="back">
          <i class="el-icon-back"></i>
          <span>返回</span>
        </div>
        <div class="teacherinfo">
          <div class="title">
            <i class="el-icon-user" style="line-height: 66px"></i>
            <p>教师详情</p>
          </div>
          <div class="tacherinfo_box">
            <img
              :src="teacher_info.avatarUrl"
              alt=""
              width="300px"
              height="400px"
              style="margin: 10px"
            />
            <div class="t_info_right">
              <p style="font-size: 30px; font-weight: bold">
                {{ teacher_info.username }}
              </p>
              <p v-html="teacher_info.description" class="teacher_description">
                {{ teacher_info.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="title">
          <i class="el-icon-notebook-2" style="line-height: 66px"></i>
          <p>相关课程</p>
        </div>
        <div class="course_info">
          <div class="courseshow" v-for="item in courseData" :key="item">
            <img
              :src="item.avatar"
              alt="img"
              width="200px"
              height="200px"
              style="border-radius: 50%"
            />
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="title" style="font-size: 20px">
          <i class="el-icon-chat-line-round" style="line-height: 66px"></i>
          <p>最新评论</p>
        </div>
        <div class="comment_info">
          <div class="comment_show" v-for="i in 5" :key="i">
            <div class="user_info">
              <img
              src="../assets/user.png"
              width="50px"
              height="50px"
              style="border-radius: 50%"
            />
              <p>username</p>
            </div>
              <p>:</p>
              <p>user_comment</p>
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="getUserList"
            :current-page.sync="page"
            :page-size="limit"
            layout="total, prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
        <div class="title" style="font-size: 20px">
          <i class="el-icon-chat-line-round" style="line-height: 66px"></i>
          <p>发表你的评论吧！</p>
          <VueTinymce id="tinymce"  v-model="description" ></VueTinymce>
        </div>
        <div class="input_comment">
          <img
              :src="userinfo.avatarUrl"
              width="50px"
              height="50px"
              style="border-radius: 50%"
            />
        </div>
      </div>
      <r-aside class="r_aside"></r-aside>
    </el-main>
  </div>
</template>
<script>
import Course from "@/api/Course";
import l_aside from "../components/l_aside.vue";
import r_aside from "../components/r_aside.vue";

export default {
  components: {
    l_aside,
    r_aside,
  },
  data() {
    return {
      teacher_info: {},
      courseData: {},
      total: 0,
      page: 1,
      limit: 5,
      userinfo:{},
      description:{}
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    getdetailinfo() {
      this.teacher_info = JSON.parse(localStorage.getItem("teacher_detail"));
      this.courseData = JSON.parse(localStorage.getItem("course_detail"));
      this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    },
  },
  created() {
    this.getdetailinfo();
  },
};
</script>
<style>
.box2 {
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
.box2 .l_aside {
  flex: 1;
}
.box2 .r_aside {
  flex: 1;
}

.box2 .container {
  background-color: #ffffff;
  flex: 3;
  width: 100%;
  height: auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.box2 .container .container-back {
  float: left;
  font-size: 25px;
  color: green;
  cursor: pointer;
  font-weight: bold;
  border-bottom: 1px solid black;
  padding-bottom: 5px;
}
/* 教师 */
.box2 .container .teacherinfo {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 0;
  margin-top: 50px;
}
.title {
  font-size: 40px;
  font-weight: bold;
  text-align: left;
  display: flex;
  flex-direction: row;
}
.title p {
  line-height: 66px;
  margin: 0;
  padding: 0;
}
.box2 .container .teacherinfo .tacherinfo_box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.box2 .container .teacherinfo .tacherinfo_box img {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.box2 .container .teacherinfo .tacherinfo_box .t_info_right {
  flex: 2;
  text-align: left;
  margin-left: 20px;
}
.box2
  .container
  .teacherinfo
  .tacherinfo_box
  .t_info_right
  .teacher_description {
  width: 100%;
  height: 70%;
  padding: 5px;
  box-sizing: border-box;
  border: 2px dashed #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
/* 课程 */
.box2 .container .course_info {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: 1px solid #ccc;
}
.box2 .container .course_info .courseshow {
  margin: 10px;
}
.box2 .container .course_info .courseshow img:hover {
  position: relative;
  bottom: 10px;
  border: 2px solid rgb(245, 152, 142);
  border-top: none;
  border-bottom: 5px solid rgb(255, 83, 64);
  cursor: pointer;
}
/* 评论区 */
.comment_info{
  display: flex;
  flex-direction:column;
  text-align: left;
  border-bottom: 1px solid #ccc;
}
.comment_info .comment_show{
  display: flex;
  flex-direction: row;

}
.comment_info .comment_show .user_info{
  text-align: center;
}
.comment_info .comment_show .user_info>p{
  
  margin-top:10px;
}
.comment_info .comment_show>p{
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-top: 10px;
  margin-left: 10px;
  padding: 5px;
  box-sizing: border-box;
  height: 100%;
}
</style>