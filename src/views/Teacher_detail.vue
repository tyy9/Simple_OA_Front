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
              @click=" to_coursedetail(item.id)"
            />
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="title" style="font-size: 20px">
          <i class="el-icon-chat-line-round" style="line-height: 66px"></i>
          <p>最新评论</p>
        </div>
        <div class="comment_info">
          <div class="comment_show" v-for="item in commentList" :key="item">
            <div class="user_info">
              <img
                :src="item.avatarUrl"
                width="50px"
                height="50px"
                style="border-radius: 50%"
              />
              <p>{{ item.username }}</p>
            </div>
            <p>:</p>
            <div class="content_box">
              <div class="reply_box" v-show="item.replyuser_username?true:false">
                <p style="line-height: 40px;color:red;font-size: 10px;font-weight: bold;">
                  回复  {{item.replyuser_username}}:
                </p> 
                <p style="line-height: 40px;">
                  "
                </p> 
              <p v-html="item.reply_content">
                {{ item.reply_content }}
              </p>
              <p style="line-height: 40px;">
                  "
                </p> 
              </div>
              
              <p v-html="item.content">
                {{ item.content }}
              </p>
            </div>
           
           
            <p style="box-shadow: none; font-size: 10px; color: #ccc">
              {{ item.gmtCreate }}
            </p>
            <p
              style="
                box-shadow: none;
                font-size: 10px;
                color: blue;
                cursor: pointer;
                font-weight: bold;
              "
              @click="openreply(item.id)"
            >
              回复
            </p>
            <p
              style="
                box-shadow: none;
                font-size: 10px;
                color: red;
                cursor: pointer;
                font-weight: bold;
              "
              v-show="item.userId == userinfo.id ? true : false"
              @click="open(item.id)"
            >
              删除
            </p>
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="getCourseComment"
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
        </div>

        <div class="input_comment">
          <img
            :src="userinfo.avatarUrl"
            width="50px"
            height="50px"
            style="border-radius: 50%; margin-right: 10px"
          />
          <VueTinymce id="tinymce" v-model="comment.content"></VueTinymce>
          <el-button type="primary" style="height: 100%; margin-left: 10px" @click="submit_commit"
            >发布</el-button
          >
        </div>
        <el-dialog title="回复" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <VueTinymce id="tinymce" v-model="comment.content"></VueTinymce>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit_reply"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </div>

      <r-aside class="r_aside"></r-aside>
    </el-main>
  </div>
</template>
<script>
import teacher from "@/api/Teacher";
import course from "@/api/Course";
import l_aside from "../components/l_aside.vue";
import r_aside from "../components/r_aside.vue";
import Comment from "@/api/Comment";
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
      userinfo: {},
      description: "",
      time: 2,
      comment:{},
      commentList:{},
      commentdata:{},
      dialogFormVisible:false,
      reply_id:""
    };
  },
  methods: {
    back() {
      if (localStorage.getItem("pre_courseid")) {
        course
          .findCourseById(localStorage.getItem("pre_courseid"))
          .then((res) => {
            localStorage.setItem(
              "course_detail",
              JSON.stringify(res.data.course)
            );
          });
        teacher
          .getTeacherByCourseId(localStorage.getItem("pre_courseid"))
          .then((res) => {
            localStorage.setItem(
              "teacher_detail",
              JSON.stringify(res.data.teacher)
            );
          });
      }
      let t = setInterval(() => {
        --this.time;
        console.log(this.time);

        if (this.time == 0) {
          this.$router.go(-1);
          clearInterval(t);
          this.time = 2;
        }
      }, 1000);
    },
    getdetailinfo() {
      this.teacher_info = JSON.parse(localStorage.getItem("teacher_detail"));
      this.courseData = JSON.parse(localStorage.getItem("course_detail"));
      if(localStorage.getItem("userinfo")){
        this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
      }
      this.commentdata.teacherId=this.teacher_info.id
      this.getTeacherComment()
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
          localStorage.setItem("pre_teacherid",this.teacher_info.id)
          this.$router.push("/course_detail")
          clearInterval(t)
          this.time=2
        }
      }, 1000);
    },
    //发布评论
    submit_commit(){
        this.comment.teacherId=this.teacher_info.id
        this.comment.userId=this.userinfo.id
        Comment.addComment(this.comment).then(res=>{
          this.$message({
            message:"发布成功",
            type:"success"
          })
          this.comment.content=""
          this.getTeacherComment() 
        })
    },
    //获取课程评论
    getTeacherComment(){
      // Comment.getCourseComment(this.courseData.id).then(res=>{
      //   this.commentList=res.data.comment
      // })
      Comment.pageTeacher_Course(this.page,this.limit,this.commentdata).then(res=>{
          this.total=this.total=parseInt(res.data.total); 
          this.commentList=res.data.comment
      })
    },
     //删除弹窗
     open(id){
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Comment.deleteCommentById(id).then(res=>{
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getTeacherComment() 
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },    
    openreply(id) {
      this.dialogFormVisible=true
      this.reply_id=id
    },
    submit_reply(){
      this.comment.teacherId = this.teacher_info.id;
      this.comment.userId = this.userinfo.id;
      this.comment.replyId=this.reply_id
      Comment.addComment(this.comment).then((res) => {
        this.$message({
          message: "发布成功",
          type: "success",
        });
        this.comment.content = "";
        this.dialogFormVisible=false
        this.getTeacherComment();
      });
    }
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
  flex: 5;
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
.comment_info {
  display: flex;
  flex-direction: column;
  text-align: left;
  border-bottom: 1px solid #ccc;
}
.comment_info .comment_show {
  display: flex;
  flex-direction: row;
}
.comment_info .comment_show .user_info {
  text-align: center;
}
.comment_info .comment_show .user_info > p {
  margin-top: 10px;
}
.comment_info .comment_show > p {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-top: 10px;
  margin-left: 10px;
  padding: 5px;
  box-sizing: border-box;
  height: 100%;
}
.content_box{
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 5px;
  height: 100%;
  margin-left: 5px;
  margin-bottom: 5px;
}
.content_box .reply_box{
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: row;
  font-size: 10px;
  background-color: #dedede;
  padding: 5px;
}
.content_box .reply_box>p{
  line-height: 20px;
  color: white;
}
.input_comment {
  display: flex;
  flex-direction: row;
}
/* 在el-dialog中tinymce z-index 被太小而被遮挡时要加这两句 */
.tox-tinymce-aux{z-index:99999 !important;}
.tinymce.ui.FloatPanel{z-Index: 99;}
</style>