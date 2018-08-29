<template>
  <div >
    <Table border ref="table" size="small"
           :columns="columns" :data="data" :loading="loading"
           @on-select="select" @on-select-cancel="selectCancel" @on-row-click="rowClick" @on-selection-change="selectChange"></Table>


    <div style="margin: 5px 5px 0px 0px;border: 0 solid red;display: flex;float: right">
      <Page transfer show-sizer show-total
            v-if="paging" :total="dataTotal" :page-size="pageSize"
            @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
      <Button  @click="refresh"><Icon size="20" type="md-refresh"></Icon></Button>
    </div>

  </div>
</template>

<script>
  export default {
    name: "iView-table",
    props:['paging','columns','url','params'],
    data () {
      return {
        loading:false,
        data: [],
        selectData:[],
        pageSize:20,
        dataTotal:0,
        showPage:1
      }
    },
    mounted() {
      // this.height = document.documentElement.clientHeight-270;
      // const that = this;
      // window.onresize = function () {
      //   that.height = document.documentElement.clientHeight-270
      // };
      this.loadData();
    },
    methods :{
      pageChange (num) {
        this.showPage = num;
        this.loadData()
      },
      pageSizeChange (num) {
        this.pageSize = num;
        this.loadData()
      },
      loadData () {
        const param = Object.assign({}, this.params, {paging:this.paging,showpage:this.showPage,pageSize:this.pageSize})
        if(this.url && this.url != ''){

          this.loading = true;
          this.$sendGET(this.url,param,obj => {
            this.data = obj.data;
            this.dataTotal = obj.total;
            this.loading = false;
            this.selectData = [];
          })
        }
      },
      select (seletion,row) {
        // this.selectData=seletion;
      },
      selectCancel (seletion,row) {
        // this.selectData=seletion;
      },
      selectChange (seletion) {
        console.log(seletion);
        this.selectData=seletion;
      },
      rowClick (data,index) {
        this.$refs.table.toggleSelect(index);
      },
      refresh (){
        this.loadData()
      }
    }
  }

</script>

<style scoped>

</style>
