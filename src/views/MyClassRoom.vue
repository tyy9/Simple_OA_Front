<template>
    <div class="">
        <el-main class="box4">
            <l-aside class="l_aside"></l-aside>
            <div class="container">
                <div class="order_show" v-for="item in orderdata" :key="item">
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
                            :disabled="item.status?true:false" @click="order_pay(item.id)"
                        >{{ !item.status?'支付':'已购买' }}</el-button>
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
            </div>
            <r-aside class="r_aside"></r-aside>
        </el-main>
    </div>
</template>
<script>
import Order from '../api/Order';
import l_aside from '../components/l_aside.vue';
import r_aside from '../components/r_aside.vue';
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
    };
  },
  methods:{
    getOrderinfo(){
        this.pageOrder()
    },
    pageOrder(){
        Order.pageOrder(this.page,this.limit,this.orderdata).then(res=>{
            this.orderdata=res.data.data
            this.total=res.data.total
            this.time=this.orderdata.map(v=>v.time_count)
            console.log("orderdata=>",this.orderdata)
            console.log("time=>",this.time)
            let t=setInterval(() => {
                this.orderdata.forEach(item=>{
                    console.log(item.second)
                    --item.time_count
                    item.second=Math.ceil(item.time_count%60)
                    item.min=Math.ceil(item.time_count/60)
                    item.hour=Math.round(item.time_count/60/60)
                    console.log("hour=>",item.hour)
                    // item.second=this.second
                    // item.min=this.min
                    // item.hour=this.hour
                    if(item.time_count==0){
                        item.time_count=0
                        clearInterval(t)
                    }
                })
               
            }, 1000);
            
            
        //    this.orderdata.forEach(item=>{
        //             console.log(item)
        //              --item.time_count
        //             this.second=Math.ceil(item.time_count%60)
        //             this.min=Math.ceil(item.time_count/60)
        //             this.hours=Math.ceil(this.min/60)
        //             this.orderinfo.second=this.second
        //             this.orderinfo.min=this.min
        //             this.orderinfo.hour=this.hour
        //    })
        })
        
    },
    order_pay(id){

    }
  },
  created () {
    this.getOrderinfo();
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
</style>