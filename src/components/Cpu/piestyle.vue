<template>     
    <div class="control">
           <mt-header title='设备详情' >
    <a slot="left">
      <mt-button icon="back" @click="toback()">back</mt-button> 
    </a>
    </mt-header>
   <div id="myChart" :style="{width:'320px',height:'528px'}"></div>
        
    </div> 
</template>
<script>

export default {
  props: {},
  data() {
    return {
     
     
      option:{
          tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        
        // orient: 'vertical',
        // x: 'top',
        // top:'20%',
        // right:'center',
          bottom: 10,
        left: 'center',
        data:['直接访问','邮件营销']
        // data:['直接访问1111111111','邮件营销','联盟广告','视频广告','搜索引擎',
        // '直接访问1','邮件营销31','联盟广告1','视频广告1','搜索引擎1','直接访问2','邮件营销2','联盟广告2','视频广告3',
        // '搜索引擎3','直接访问3','邮件营销3','联盟广告3','视频广告2','搜索引擎1']

    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
                 bottom: 10,
                 left: 'center',
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            // labelLine: {
            //     normal: {
            //         show: false
            //     }
            // },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                // {value:135, name:'视频广告'},
                // {value:1548, name:'搜索引擎1'},
                //  {value:335, name:'直接访问1'},
                // {value:310, name:'邮件营销1'},
                // {value:234, name:'联盟广告1'},
                // {value:135, name:'视频广告2'},
                // {value:1548, name:'搜索引擎2'},
                //  {value:335, name:'直接访问2'},
                // {value:310, name:'邮件营销2'},
                // {value:234, name:'联盟广告2'},
                // {value:135, name:'视频广告3'},
                // {value:1548, name:'搜索引擎3'},
                //  {value:335, name:'直接访问3'},
                // {value:310, name:'邮件营销3'},
               
            ]
        }
    ]
      }
      
    
    };
  },
  mounted(){
    this.CpuStatDonut(); 
  },
  methods: {
    toback() {
          this.$router.go(-1);
      
    },
    CpuStatDonut(){
      let myChart=this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption(this.option);
       
    }
        
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

