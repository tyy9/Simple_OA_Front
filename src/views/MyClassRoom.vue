<template>
    <div class="">
        <el-main class="box4">
            <l-aside class="l_aside"></l-aside>
            <div class="container">
                <div class="order_show" v-for="(item,index) in orderdata" :key="index">
                    <div class="order_show_left">
                        <img :src="item.courseAvatar" width="300px" height="200px">
                    </div>
                    <div class="order_show_mid" >
                        <router-link to="" style="font-size: 50px;margin: 0;font-weight: bold;text-decoration: none;color: black;">
                            {{item.courseName}}</router-link> 
                        <p style="margin-top: 70px;color: red;">￥{{ item.price }}</p>
                    </div>
                    <div class="order_show_right">
                        <p v-show="!item.status?'primary':''">
                        剩余时间:{{item.hour!=0?item.hour:0}}时{{ item.min }}分{{ item.second }}秒</p>
                        <el-button :type="!item.status?'primary':''"
                             @click="payORlearning(item.id,item.status,index)"
                        >{{ !item.status?'支付':'进入课程' }}</el-button>
                        <el-button :type="!item.status?'danger':''"
                             @click="open(item.id,index)"
                             v-show="!item.status?true:false "
                             style="margin-top: 10px;"
                        >取消支付</el-button>
                        <!-- <el-button :type="!item.status?'primary':''"
                             @click="payORlearning(item.id,item.status)"
                        >{{ !item.status?'支付':'进入课程' }}</el-button> -->
                    </div>
                </div>
                <el-pagination
            @size-change="handleSizeChange"
            @current-change="getOrderinfo"
            :current-page.sync="page"
            :page-size="limit"
            layout="total, prev, pager, next"
            :total="total"
          >
          </el-pagination>

          <el-dialog title="购买课程" :visible.sync="dialogPayFormVisible">
          <div class="order">
            <div class="order_right">
                <img :src="OrderTemp.courseAvatar" width="500px" height="400px">
            </div>
            <div class="order_left">
                <p>{{ OrderTemp.courseName }}</p>
                <p>￥{{ OrderTemp.price }}</p>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="order_pay"
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
import Order from '../api/Order';
import l_aside from '../components/l_aside.vue';
import r_aside from '../components/r_aside.vue';
import course from "@/api/Course"
export default {
    comments:{
        l_aside,    
        r_aside
    },
    data() {
    return {    
      total: 0,
      page: 1,
      limit: 5,
      orderdata:{},
      time:{},
      hours:[],
      min:[],
      second:[],
      ordersearch:{},
      OrderTemp:{
        courseAvatar:"",
        courseName:"",
        price:""
      },
      dialogPayFormVisible:false,
      t:"",
      flag:[],
      sleceted_order:""
    };
  },
  methods:{
    getOrderinfo(){
        this.pageOrder()
    },
    pageOrder(){
        Order.pageOrder(this.page,this.limit,this.ordersearch).then(res=>{
            this.orderdata=res.data.data
            this.total=parseInt(res.data.total)  
            this.time=this.orderdata.map(v=>v.time_count)
            console.log("orderdata=>",this.orderdata)
            console.log("time=>",this.time)
            this.t=setInterval(() => {
                this.orderdata.forEach((item,index)=>{
                    if(item.time_count!=null){
                      console.log("index=>",item.time_count)
                      --item.time_count
                      item.second=Math.floor(item.time_count%60)
                      item.min=Math.floor(item.time_count/60)
                      item.hour=Math.floor(item.time_count/60/60)
                      if(item.time_count<=0){
                        console.log(item.time_count)
                        this.flag[index]=1
                        item.item_count=0
                        this.getOrderinfo()
                        return
                      }
                    }
                    // console.log("hour=>",item.hour)
                    
                })
            }, 1000);
          
        })
        
    },
    order_pay(id,item){
      this.OrderTemp.status=1
      this.orderdata[this.sleceted_order].item_count=0
      Order.updateOrder(this.OrderTemp).then(res=>{
        this.$message({
          type:"success",
          message:"购买成功"
        })
        this.dialogPayFormVisible=false
        this.getOrderinfo()
      })
    },
    findOrderById(id,item){
      this.dialogPayFormVisible=true
      console.log(id)
      Order.findOrderById(id).then(res=>{
        this.OrderTemp=res.data.order
      })
    },
    payORlearning(id,status,index){
      if(status){
        this.$message({
          message:"课程功能还在制作，敬请期待",
          type:"error"
        })
        // this.findOrderById(id)
      }
      else{
          this.sleceted_order=index
        this.findOrderById(id)
      }
    },
    open(id,index) {
      this.$confirm("此操作将永久取消该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.sleceted_order=index
          this.orderdata[this.sleceted_order].item_count=0
          Order.deleteOrderByid(id).then((res) => {
            this.$message({
              type: "success",
              message: "取消成功!",
            });
            this.getOrderinfo();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created () {
    this.getOrderinfo();
  },
  destroyed () {
    clearInterval(this.t)
  }
}
</script>
<style>
.box4 {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    height: 100%;
    margin: 0;
    padding-top: 70px;
    background-color: #e9eef3;
    color: #333;
    text-align: center;
  }
  .box4 .l_aside {
    flex: 1;    
  }
  .box4 .r_aside {
    flex: 1;
  }
  
  .box4 .container {
    background-color: #ffffff;
    flex: 6 ;
    width: 100%;
    height: auto;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding-bottom:100px ;
    
  }
  /* 课程订单 */
  .container .order_show{
    display: flex;
    flex-direction: row;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    margin: 20px; 
    padding: 10px;
  }
  .container .order_show:hover{
    position: relative;
    box-shadow: -6px 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    bottom: 10px;
  }
  .container .order_show .order_show_left{
    flex: 1;
  }
  .container .order_show .order_show_mid{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: left;
    font-size: 20px ;
    margin-left: 30px;  
  }
  .container .order_show .order_show_right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 2;
  }
  .container .order_show .order_show_right .el-button{
    width: 100px;
    margin: 0 auto;
  }
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
</style>