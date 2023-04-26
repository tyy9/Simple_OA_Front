<template>
  <div>
    <el-main class="box3">
      <l-aside class="l_aside"></l-aside>
      <div class="container">
        <div class="search_header">
          <div class="subject_search">
            <div class="subject_show" v-for="i in 5" :key="i">
              <p>主分类:</p>
              <div class="subject_show_children" v-for="i in 5" :key="i">
                <p>子分类</p>
              </div>
            </div>
          </div>
          <div class="input_search">
            <el-input
              v-model="coursedata.name"
              placeholder="请输入课程标题"
              style="width: 200px"
            ></el-input>
            <el-button type="primary">搜索</el-button>
          </div>
        </div>
        <div class="course_content">
          <div class="course_content_show" v-for="i in 5" :key="i">
            <img src="../assets/logo.png" width="200px" height="200p" />
            <p>name</p>
          </div>
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
      <r-aside class="r_aside"></r-aside>
    </el-main>
  </div>
</template>
<script>
import l_aside from "../components/l_aside.vue";
import r_aside from "../components/r_aside.vue";

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
    };
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
  flex: 3;
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
/* 课程列表 */
.course_content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
}
.course_content .course_content_show > img {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.course_content .course_content_show > p {
  margin: 0;
}
</style>