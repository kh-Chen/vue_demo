<template>
  <Modal v-model="showEditWin" :title="$t('base.edit')" :loading="editing" @on-ok="editMov">
    <Form :model="editForm" :label-width="60" label-position="right" style="width: 95%;">

      <Row>
        <Col span="12">
          <FormItem class="menuitem">
            <i-view-upload-img ref="imgupload" style="display: inline-block;" _width="150" _height="100" _line-height="100" @uploadsucc="uploadsucc"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem :label="$t('DataMaintain.designation')" class="menuitem">
            <Input v-model="editForm.designation" ></Input>
          </FormItem>
          <FormItem :label="$t('label.playactor')" class="menuitem">
            <Input v-model="editForm.playactor_ids" ></Input>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem :label="$t('label.distributor')" class="menuitem">
            <Select v-model="editForm.distributor_id" clearable filterable>
              <Option v-for="obj in distributors" :key="obj.value" :value="obj.value">{{obj.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem :label="$t('label.location')" class="menuitem">
            <Select v-model="editForm.location_id" clearable filterable>
              <Option v-for="obj in location" :key="obj.value" :value="obj.value">{{obj.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem :label="$t('label.type')" class="menuitem">
            <Select v-model="editForm.type_id" clearable filterable >
              <Option v-for="obj in type" :key="obj.value" :value="obj.value">{{obj.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem :label="$t('DataMaintain.score')" class="menuitem">
            <Rate allow-half show-text v-model="editForm.score" >
              <span style="color: #f5a623">{{ editForm.score }}</span>
            </Rate>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="8">
          <FormItem :label="$t('DataMaintain.mosaic')" class="menuitem">
            <RadioGroup v-model="editForm.mosaic">
              <Radio label="1">{{$t('base.have')}}</Radio>
              <Radio label="0">{{$t('base.none')}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <!--<Divider type="vertical" />-->
        <Col span="8">
          <FormItem :label="$t('DataMaintain.subtitle')" class="menuitem">
            <RadioGroup v-model="editForm.subtitle">
              <Radio label="1">{{$t('base.have')}}</Radio>
              <Radio label="0">{{$t('base.none')}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <!--<Divider type="vertical" />-->
        <Col span="8">
          <FormItem :label="$t('DataMaintain.plot')" class="menuitem">
            <RadioGroup v-model="editForm.plot">
              <Radio label="1">{{$t('base.have')}}</Radio>
              <Radio label="0">{{$t('base.none')}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="8">
          <FormItem :label="$t('DataMaintain.failarmy')" class="menuitem">
            <RadioGroup v-model="editForm.failarmy">
              <Radio label="1">{{$t('base.yes')}}</Radio>
              <Radio label="0">{{$t('base.no')}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem :label="$t('DataMaintain.scene')" class="menuitem" >
            <RadioGroup v-model="editForm.scene">
              <Radio label="1">{{$t('base.yes')}}</Radio>
              <Radio label="0">{{$t('base.no')}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem :label="$t('DataMaintain.Creampie')" class="menuitem">
            <RadioGroup v-model="editForm.Creampie">
              <Radio label="1">{{$t('base.yes')}}</Radio>
              <Radio label="0">{{$t('base.no')}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="8">
          <FormItem :label="$t('DataMaintain.Facia')" class="menuitem" >
            <RadioGroup v-model="editForm.Facia">
              <Radio label="1">{{$t('base.yes')}}</Radio>
              <Radio label="0">{{$t('base.no')}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem :label="$t('DataMaintain.mouth_ejaculation')" class="menuitem">
            <RadioGroup v-model="editForm.mouth_ejaculation">
              <Radio label="1">{{$t('base.yes')}}</Radio>
              <Radio label="0">{{$t('base.no')}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem :label="$t('DataMaintain.eat_semen')" class="menuitem" >
            <RadioGroup v-model="editForm.eat_semen">
              <Radio label="1">{{$t('base.yes')}}</Radio>
              <Radio label="0">{{$t('base.no')}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="8">
          <FormItem :label="$t('DataMaintain.more_man')" class="menuitem">
            <RadioGroup v-model="editForm.more_man">
              <Radio label="1">{{$t('base.yes')}}</Radio>
              <Radio label="0">{{$t('base.no')}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem :label="$t('DataMaintain.more_woman')" class="menuitem" >
            <RadioGroup v-model="editForm.more_woman">
              <Radio label="1">{{$t('base.yes')}}</Radio>
              <Radio label="0">{{$t('base.no')}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>

      <FormItem :label="$t('base.describe')" class="menuitem">
        <Input v-model="editForm.describe" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
      </FormItem>

    </Form>
  </Modal>
</template>

<script>
    export default {
      name: "movEditModal",
      data () {
        return {
          showEditWin:false,
          editing:false,
          editForm:{}
        }
      },
      methods:{
        show () {
          this.showEditWin = true;
        },
        editMov () {
          this.editing = true;
          this.$sendGET('/Playactor/editPlayactor.json',this.editForm,data => {
            this.editing = false;
            this.showEditWin = false;
            // this.editForm = {id:'',name:'',type:'',point:'',img:'',face_rate:3,figure_rate:3,vagina_rate:3,breast_rate:3};
            this.$refs.imgupload.handleRemove();
            this.$Message.success(this.$t('base.savesucc'));
            this.$emit('editsucc');
          })
        }
      }
    }
</script>

<style scoped>

</style>
