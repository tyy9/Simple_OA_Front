<template>
  <div>
    <el-main class="box2">
      <l-aside class="l_aside"></l-aside>
      <div class="container">
        <div class="container-back" @click="back">
          <i class="el-icon-back"></i>
          <span>返回</span>
        </div>
        <div class="title" style="clear: left">
          <i class="el-icon-notebook-2" style="line-height: 66px"></i>
          <p>相关课程</p>
        </div>
        <div class="container-box">
          <div class="courseinfo">
            <div class="courseinfo_left">
              <img :src="courseData.avatar" width="300px " height="350px" />
            </div>
            <div class="courseinfo_right" style="margin-left: 10px">
              <p style="font-size: 20px">
                {{ courseData.name }}
                <span style="font-size: 10px; color: #ccc"
                  >[{{ subject.title }}-{{ subject_children.title }}]</span
                >
              </p>
              <p>学时：{{ courseData.times }}</p>
              <p>学分：{{ courseData.score }}</p>
              <p>{{ courseData.state ? "已开课" : "未开课" }}</p>
              <p>￥{{ courseData.price }}</p>
              <el-button type="primary" slot="reference" @click="open_pay"
                ><i class="el-icon-shopping-cart-2"></i>购买
              </el-button>
              <i
                class="el-icon-star-off"
                style="margin-left: 10px; cursor: pointer"
              ></i>
            </div>
          </div>
          <div class="teacherinfo">
            <div class="title" style="font-size: 20px; margin: 10px">
              <i class="el-icon-user" style="line-height: 26px"></i>
              授课老师
            </div>
            <img
              :src="teacher_info.avatarUrl"
              width="200px"
              height="200px"
              style="margin-top: 10px; border-radius: 50%"
              @click="to_teacherdetal(teacher_info.id)"
            />
            <p style="color: black">{{ teacher_info.username }}</p>
          </div>
        </div>
        <div class="title" style="font-size: 20px">
          <i class="el-icon-view" style="line-height: 66px"></i>
          <p>课程简介</p>
        </div>
        <div class="detail_course_description" v-html="courseData.description">
          <p>{{ courseData.description }}</p>
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
          <el-button
            type="primary"
            style="height: 100%; margin-left: 10px"
            @click="submit_commit"
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

        <el-dialog title="购买课程" :visible.sync="dialogPayFormVisible">
          <div class="order">
            <div class="order_right">
                <img :src="courseData.avatar" width="500px" height="400px">
            </div>
            <div class="order_left">
                <p>{{ courseData.name }}</p>
                <p>￥{{ courseData.price }}</p>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="submit_pay_later">稍后支付</el-button>
            <el-button type="primary" @click="submit_pay"
              >立即支付</el-button
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
import subject from "@/api/Subject";
import order from '@/api/Order'

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
      time: 2,
      subject: {},
      subject_children: [],
      comment: {},
      commentList: {},
      commentdata: {},
      form:{},
      dialogFormVisible:false,
      dialogPayFormVisible:false,
      reply_id:"",
      orderdata:{}
    };
  },
  methods: {
    back() {
      if (localStorage.getItem("pre_teacherid")) {
        course
          .getCourseByUserId(localStorage.getItem("pre_teacherid"))
          .then((res) => {
            localStorage.setItem(
              "course_detail",
              JSON.stringify(res.data.course)
            );
          });
        teacher
          .findUserById(localStorage.getItem("pre_teacherid"))
          .then((res) => {
            localStorage.setItem(
              "teacher_detail",
              JSON.stringify(res.data.user)
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
      
      this.commentdata.courseId = this.courseData.id;
      //获取分类
      subject.findSubjectById(this.courseData.subjectId).then((res) => {
        console.log("subject=>", res.data.subject);
        this.subject = res.data.subject;
      });
      //获取分类
      subject.findSubjectById(this.courseData.subjectParentid).then((res) => {
        console.log("subject=>", res.data.subject);
        this.subject_children = res.data.subject;
      });
      this.getCourseComment();
    },
    to_teacherdetal(id) {
      course.getCourseByUserId(id).then((res) => {
        localStorage.setItem("course_detail", JSON.stringify(res.data.course));
      });
      teacher.findUserById(id).then((res) => {
        localStorage.setItem("teacher_detail", JSON.stringify(res.data.user));
      });
      //等数据加载到客户端中，避免出现上个数据
      let t = setInterval(() => {
        --this.time;
        if (this.time == 0) {
          this.$router.push("/teacher_detail");
          localStorage.setItem("pre_courseid", this.courseData.id);
          clearInterval(t);
          this.time = 2;
        }
      }, 1000);
    },
    //发布评论
    submit_commit() {
      this.comment.courseId = this.courseData.id;
      this.comment.userId = this.userinfo.id;
      Comment.addComment(this.comment).then((res) => {
        this.$message({
          message: "发布成功",
          type: "success",
        });
        this.comment.content = "";
        this.getCourseComment();
      });
    },
    //获取课程评论
    getCourseComment() {
      // Comment.getCourseComment(this.courseData.id).then(res=>{
      //   this.commentList=res.data.comment
      // })
      Comment.pageComment_Course(this.page, this.limit, this.commentdata).then(
        (res) => {
          this.total = res.data.total;
          this.commentList = res.data.comment;
        }
      );
    },
    //删除弹窗
    open(id) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Comment.deleteCommentById(id).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getCourseComment();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //回复窗口
    openreply(id) {
      this.dialogFormVisible=true
      this.reply_id=id
    },
    submit_reply(){
      this.comment.courseId = this.courseData.id;
      this.comment.userId = this.userinfo.id;
      this.comment.replyId=this.reply_id
      Comment.addComment(this.comment).then((res) => {
        this.$message({
          message: "发布成功",
          type: "success",
        });
        this.comment.content = "";
        this.getCourseComment();
        this.dialogFormVisible=false
      });
    },
    //打开购物菜单
    open_pay(){
      this.dialogPayFormVisible=true
      this.orderdata.userId=this.userinfo.id
      this.orderdata.courseId=this.courseData.id
      this.orderdata.price=this.courseData.price
      this.orderdata.courseName=this.courseData.name
      this.orderdata.courseAvatar=this.courseData.avatar
    },
    submit_pay(){
      this.orderdata.status=true
      this.orderdata.time=0
      order.addOrder(this.orderdata).then(res=>{
        this.$message({
          type:"success",
          message:"购买成功"
        })
        this.dialogPayFormVisible=false
        this.getdetailinfo()
      })
    },
    submit_pay_later(){
      this.orderdata.status=false
      this.orderdata.time=50*1000
      order.addOrder(this.orderdata).then(res=>{
        this.$message({
          type:"success",
          message:"请在我的课堂里继续支付，距自动取消支付还有5分钟"
        })
        this.dialogPayFormVisible=false
        this.getdetailinfo()
      })
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
  flex: 6;
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
.title {
  font-size: 40px;
  font-weight: bold;
  text-align: left;
  display: flex;
  flex-direction: row;
}

.title p {
  margin: 0;
  padding: 0;
  line-height: 66px;
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
/* 教师和课程 */
.container-box {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 0;
  display: flex;
  flex-direction: row;
}

/* 教师 */

.container-box .teacherinfo {
  flex: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-bottom: 10px;
}
.container-box .teacherinfo img {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.container-box .teacherinfo img:hover {
  position: relative;
  bottom: 10px;
  border: 2px solid rgb(201, 218, 255);
  border-top: none;
  border-bottom: 6px solid rgb(136, 85, 255);
  cursor: pointer;
}
/* 课程 */
.container-box .courseinfo {
  flex: 2;
  margin-bottom: 10px;
}
.container-box .courseinfo {
  flex: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: row;
  padding: 5px;
  box-sizing: border-box;
  margin-right: 5px;
}
.container-box .courseinfo .courseinfo_left img {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.container-box .courseinfo .courseinfo_right p {
  font-size: 15px;
  font-weight: bold;
  text-align: left;
}
/* 课程简介 */
.detail_course_description {
  border-bottom: 1px solid #ccc;
}
.detail_course_description p {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  font-size: 15px;
  padding: 5px;
  text-align: left;
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
/* 订单 */
.order{
  display: flex;
  flex-direction: row;
  justify-content: left;
}
.order .order_left{
  flex: 2;
}
.order .order_right{
  flex: 1;
}
/* 在el-dialog中tinymce z-index 被太小而被遮挡时要加这两句 */
.tox-tinymce-aux{z-index:99999 !important;}
.tinymce.ui.FloatPanel{z-Index: 99;}
</style>