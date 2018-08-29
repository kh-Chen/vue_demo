<template>
  <div style="border: 0 solid blue;width: 100%;height: 100%">
    <!--<div style="overflow-x:hidden; overflow-y:auto;border: 1px solid red;width: 100%;">-->
      <!--<video id="my-video" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="none" >-->
        <!--<source :src="videosrc" type="">&lt;!&ndash;/testVue/E/电影/生活大爆炸/s01/生活大爆炸.The.Big.Bang.Theory.S01E01.Chi_Eng.HR-HDTV.AAC.1024X576.x264-YYeTs人人影视.mkv&ndash;&gt;-->
      <!--</video>-->
    <!--</div>-->
    <div style="overflow-y:auto;border: 0 solid red;width: 100%;height: 100%">
      <Form :model="formItem" :label-width="80" style="width: 90%;">

        <FormItem :label="$t('DataMaintain.file_temppath')" class="menuitem">
          <Input v-model="formItem.file_temppath" ></Input>
        </FormItem>

        <FormItem :label="$t('DataMaintain.newFileName')" class="menuitem">
          <Input v-model="formItem.newFileName" ></Input>
        </FormItem>

        <Row>
          <Col span="12">
            <FormItem :label="$t('DataMaintain.startTime')" class="menuitem">
              <TimePicker v-model="formItem.startTime" confirm format="HH:mm:ss" ></TimePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="$t('DataMaintain.thumbnail')" class="menuitem">
              <TimePicker v-model="formItem.thumbnail" confirm format="HH:mm:ss" ></TimePicker>
            </FormItem>
          </Col>
        </Row>

        <FormItem :label="$t('DataMaintain.designation')" class="menuitem">
          <Input v-model="formItem.designation" ></Input>
        </FormItem>

        <FormItem :label="$t('DataMaintain.mosaic')" class="menuitem">
          <RadioGroup v-model="formItem.mosaic">
            <Radio label="1">{{$t('base.have')}}</Radio>
            <Radio label="0">{{$t('base.none')}}</Radio>
          </RadioGroup>
        </FormItem>

        <Row>
          <Col span="12">
            <FormItem :label="$t('DataMaintain.subtitle')" class="menuitem">
              <RadioGroup v-model="formItem.subtitle">
                <Radio label="1">{{$t('base.have')}}</Radio>
                <Radio label="0">{{$t('base.none')}}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="$t('DataMaintain.plot')" class="menuitem" style="border-left: 1px solid #d7dde4 ">
              <RadioGroup v-model="formItem.plot">
                <Radio label="1">{{$t('base.have')}}</Radio>
                <Radio label="0">{{$t('base.none')}}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>

        <FormItem :label="$t('label.type')" class="menuitem">
          <Select v-model="formItem.type_id" clearable filterable >
            <Option v-for="obj in type" :key="obj.value" :value="obj.value">{{obj.name}}</Option>
          </Select>
        </FormItem>

        <FormItem :label="$t('label.distributor')" class="menuitem">
          <Select v-model="formItem.distributor_id" clearable filterable>
            <Option v-for="obj in distributors" :key="obj.value" :value="obj.value">{{obj.name}}</Option>
          </Select>
        </FormItem>

        <FormItem :label="$t('label.location')" class="menuitem">
          <Select v-model="formItem.location_id" clearable filterable>
            <Option v-for="obj in location" :key="obj.value" :value="obj.value">{{obj.name}}</Option>
          </Select>
        </FormItem>

        <FormItem :label="$t('label.playactor')" class="menuitem">
          <Input v-model="formItem.playactor_ids" ></Input>
        </FormItem>

        <Row>
          <Col span="12">
            <FormItem :label="$t('DataMaintain.failarmy')" class="menuitem">
              <RadioGroup v-model="formItem.failarmy">
                <Radio label="1">{{$t('base.yes')}}</Radio>
                <Radio label="0">{{$t('base.no')}}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="$t('DataMaintain.scene')" class="menuitem" style="border-left: 1px solid #d7dde4 ">
              <RadioGroup v-model="formItem.scene">
                <Radio label="1">{{$t('base.yes')}}</Radio>
                <Radio label="0">{{$t('base.no')}}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="12">
            <FormItem :label="$t('DataMaintain.Creampie')" class="menuitem">
              <RadioGroup v-model="formItem.Creampie">
                <Radio label="1">{{$t('base.yes')}}</Radio>
                <Radio label="0">{{$t('base.no')}}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="$t('DataMaintain.Facia')" class="menuitem" style="border-left: 1px solid #d7dde4 ">
              <RadioGroup v-model="formItem.Facia">
                <Radio label="1">{{$t('base.yes')}}</Radio>
                <Radio label="0">{{$t('base.no')}}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="12">
            <FormItem :label="$t('DataMaintain.mouth_ejaculation')" class="menuitem">
              <RadioGroup v-model="formItem.mouth_ejaculation">
                <Radio label="1">{{$t('base.yes')}}</Radio>
                <Radio label="0">{{$t('base.no')}}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="$t('DataMaintain.eat_semen')" class="menuitem" style="border-left: 1px solid #d7dde4 ">
              <RadioGroup v-model="formItem.eat_semen">
                <Radio label="1">{{$t('base.yes')}}</Radio>
                <Radio label="0">{{$t('base.no')}}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="12">
            <FormItem :label="$t('DataMaintain.more_man')" class="menuitem">
              <RadioGroup v-model="formItem.more_man">
                <Radio label="1">{{$t('base.yes')}}</Radio>
                <Radio label="0">{{$t('base.no')}}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="$t('DataMaintain.more_woman')" class="menuitem" style="border-left: 1px solid #d7dde4 ">
              <RadioGroup v-model="formItem.more_woman">
                <Radio label="1">{{$t('base.yes')}}</Radio>
                <Radio label="0">{{$t('base.no')}}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>

        <FormItem :label="$t('DataMaintain.score')" class="menuitem">
          <Rate allow-half show-text v-model="formItem.score" >
            <span style="color: #f5a623">{{ formItem.score }}</span>
          </Rate>
        </FormItem>

        <FormItem :label="$t('base.describe')" class="menuitem">
          <Input v-model="formItem.describe" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="submit">{{$t('base.submit')}}</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  // import videojs from 'video.js';
  // import 'videojs-contrib-hls';
  // import selectCombo from '@/components/FormItem/selectCombo'
    export default {
      name: "infoForm",
      // components:{selectCombo},
      props:['filepath'],
      data () {
        return {
          distributors:[],
          location:[],
          type:[],
          formItem: {
            file_temppath:'',
            newFileName:'',
            designation:'',
            startTime:'',
            thumbnail:'',
            mosaic:'0',
            subtitle:'0',
            plot:'0',
            type_id:'',
            distributor_id:'',
            location_id:'',
            playactor_ids:'',
            failarmy:'0',
            scene:'0',
            Creampie:'0',
            Facia:'0',
            mouth_ejaculation:'0',
            eat_semen:'0',
            more_man:'0',
            more_woman:'0',
            score:0,
            describe:''
          }
        }
      },
      mounted () {
        // videojs('my-video', {
        //   bigPlayButton: true,
        //   textTrackDisplay: false,
        //   posterImage: true,
        //   errorDisplay: false,
        //   controlBar: true
        // }, function () {
        //   // this.play()
        // })
        this.loadComboData()
      },
      methods:{
        loadComboData () {
          this.$sendGET('/Label/getLabelComboData.json',{type:'distributor'},data => {
            this.distributors = data;
          });
          this.$sendGET('/Label/getLabelComboData.json',{type:'location'},data => {
            this.location = data;
          });
          this.$sendGET('/Label/getLabelComboData.json',{type:'type'},data => {
            this.type = data;
          });
        },
        submit () {
          // this.$emit('submit');
          console.log(this.formItem);
          this.$sendPOST('/Mov/addMov.json',this.formItem,data => {
            this.$Message.success(this.$t('base.savesucc'));
          })
        }
      },
      watch:{
        filepath (v){
          let filename = v.split('\\');
          filename = filename[filename.length-1];
          console.log(filename);
          this.formItem.file_temppath = v;
          this.formItem.newFileName = filename;
          // let v = videojs('my-video');
          // v.src({
          //   type : type,
          //   src : a
          // });
          // v.load();
        }
      }
    }
</script>

<style scoped>
  .video-js {
    width: 100%;
    height: 30%;
    padding: 10px 10px 10px 10px;
  }
  .video-js.vjs-playing {
    pointer-events: auto;
  }

  .menuitem{
    margin-bottom:10px;
  }
</style>
