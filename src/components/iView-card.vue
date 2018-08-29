<template>

    <Card style="width:300px;margin: 2px 2px 2px 2px">
      <p slot="title">{{title}}</p>
      <a slot="extra" style="margin-right: 5px " @click.prevent="btn1click">{{btn1Text}}</a>
      <a slot="extra" style="margin-left: 5px " @click.prevent="btn2click">{{btn2Text}}</a>
      <!--<div style="display: flex">&lt;!&ndash;/testVue/E/备份/u盘/html/贴吧/img/4863f6246b600c33469c8f61184c510fd8f9a1b6.jpg&ndash;&gt;
        <div style="overflow: hidden;width: 120px;height: 120px;border: 1px solid #ddd">
          <img style="width:100%;height: 100%" :src="imgPath" onerror="this.src='/testVue/E/备份/u盘/html/贴吧/img/4863f6246b600c33469c8f61184c510fd8f9a1b6.jpg';this.onerror=null">
        </div>
        <div style="overflow: hidden;width:160px; margin-left: 3px">
          <ul>
            <template v-for="(item,index) in fields" >
              <li class="li" >
                <span class="font">{{item.text}}</span>
                <span style="float: right">
                  <template v-if="item.rate">
                    <Rate disabled allow-half class="ivu-rate" v-model="item.value" />{{item.value%1 === 0 ? item.value + '.0' : item.value }}
                  </template>
                  <span v-else style="margin-left: 30px">{{item.value}}</span>
                </span>
              </li>
              <Divider v-if="index !== (fields.length-1)" class="divider"/>
            </template>
          </ul>
        </div>
      </div>-->
      <Row >
        <Col span="10" >
          <img style="width:100%;height: 120px" :src="imgPath" onerror="this.src='/testVue/E/备份/u盘/html/贴吧/img/4863f6246b600c33469c8f61184c510fd8f9a1b6.jpg';this.onerror=null">
        </Col>
        <Col span="14" >
          <ul>
            <template v-for="(item,index) in fields" >
              <li class="li" >
                <Row>
                  <Col span="6" >
                    <span class="font">{{item.text}}</span>
                  </Col>
                  <Col span="18" >
                    <span style="float: right">
                      <template v-if="item.rate">
                        <Rate disabled allow-half class="ivu-rate" v-model="item.value" />{{item.value%1 === 0 ? item.value + '.0' : item.value }}
                      </template>
                      <span v-else style="margin-left: 30px">{{item.value}}</span>
                    </span>
                  </Col>
                </Row>
                <Divider v-if="index !== (fields.length-1)" class="divider"/>
              </li>
            </template>
          </ul>
        </Col>
      </Row>


    </Card>

</template>
<script>
  export default {
    name: "iView-card",
    props:['cardid','index','title','btn1Text','btn2Text','imgPath','fields'],
    data () {
      return {
        show:true
      }
    },
    methods: {
      btn1click () {
        this.show = !this.show;
        this.$emit('btn1click',[this.cardid,this.index])
      },
      btn2click () {
        this.show = !this.show;
        this.$emit('btn2click',[this.cardid,this.index])
      }
    }
  }
</script>
<style scoped>
  .ivu-rate {
    font-size: 14px;
    align-self: right;
  }
  .ivu-rate /deep/ .ivu-rate-star{
    margin-right: 2px;
  }
  .li{
    list-style-type: none;
  }
  .divider{
    margin: 1px 8px 1px 30px;
    width:80%;
  }
  .font{
    font-weight: bold;
  }
</style>
