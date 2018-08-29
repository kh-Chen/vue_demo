<template>
  <div>
    <i-view-table ref="table" paging="false" :url="url" :params="params" :columns="columns" />
    <iview-modal-del ref="delmodal" centerText="" :onContinue="delMov" />
    <mov-edit-modal ref="editModal" ></mov-edit-modal>
  </div>
</template>

<script>
  import iViewTable from '@/components/iView-table';
  import movEditModal from './movEditModal';
    export default {
      name: "movtable",
      components:{iViewTable,movEditModal},
      data () {
        return {
          url:'/Mov/getMovList.json',
          params:{},
          columns: [
            {type:'selection', width: 50, align: 'center',fixed: 'left'},
            { title: this.$t('DataMaintain.designation'), minWidth: 100,key: 'designation',fixed: 'left'},
            { title: this.$t('DataMaintain.duration'), minWidth: 110,key: 'duration',fixed: 'left'},
            { title: this.$t('DataMaintain.file_size'), minWidth: 100,key: 'file_size',fixed: 'left',
              render: (h, params) => {
                let s = params.row.file_size ;
                function bytesToSize(bytes) {
                  if (bytes === 0) return '0 B';
                  var k = 1000, // or 1024
                    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                    i = Math.floor(Math.log(bytes) / Math.log(k));

                  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
                }
                return h('span',[bytesToSize(s)]);
              }
            },
            { title: this.$t('label.type'), minWidth: 100,key: 'type_id' },
            { title: this.$t('label.distributor'), minWidth: 100,key: 'distributor_id' },
            { title: this.$t('label.location'), minWidth: 100,key: 'location_id' },
            { title: this.$t('label.playactor'), minWidth: 150,key: 'playactor_ids' },
            { title: this.$t('DataMaintain.resolution'), minWidth: 100,key: 'resolution',
              render: (h, params) => {
                let s = params.row.resolution;
                return h('Tooltip',{
                  attrs:{placement:"bottom-start",content:s,maxWidth:"300"},
                  props:{delay:500}
                },[h('span',{
                  style:{whiteSpace:"nowrap"}
                },s)])
              }
            },
            { title: this.$t('DataMaintain.bit_rate'), minWidth: 80,key: 'bit_rate' },
            { title: this.$t('DataMaintain.fps'), minWidth: 80,key: 'fps'},
            { title: this.$t('DataMaintain.mosaic'), minWidth: 80,key: 'mosaic',
              render: (h, params) => {
                let s = (params.row.mosaic === 0) ? this.$t('DataMaintain.mosaic_n') : this.$t('DataMaintain.mosaic_y');
                return h('span',[s]);
              }
            },
            { title: this.$t('DataMaintain.subtitle'), minWidth: 80,key: 'subtitle',
              render: (h, params) => {
                let s = (params.row.subtitle === 0) ? this.$t('base.none') : this.$t('base.have');
                return h('span',[s]);
              }
            },
            { title: this.$t('DataMaintain.plot'), minWidth: 80,key: 'plot',
              render: (h, params) => {
                let s = (params.row.plot === 0) ? this.$t('base.none') : this.$t('base.have');
                return h('span',[s]);
              }
            },

            { title: this.$t('DataMaintain.failarmy'), minWidth: 80,key: 'failarmy',
              render: (h, params) => {
                let s = (params.row.failarmy === 0) ? this.$t('base.no') : this.$t('base.yes');
                return h('span',[s]);
              }
            },
            { title: this.$t('DataMaintain.scene'), minWidth: 80,key: 'scene',
              render: (h, params) => {
                let s = (params.row.scene === 0) ? this.$t('base.no') : this.$t('base.yes');
                return h('span',[s]);
              }
            },
            { title: this.$t('DataMaintain.Creampie'), minWidth: 80,key: 'Creampie',
              render: (h, params) => {
                let s = (params.row.Creampie === 0) ? this.$t('base.no') : this.$t('base.yes');
                return h('span',[s]);
              }
            },
            { title: this.$t('DataMaintain.Facia'), minWidth: 80,key: 'Facia',
              render: (h, params) => {
                let s = (params.row.Facia === 0) ? this.$t('base.no') : this.$t('base.yes');
                return h('span',[s]);
              }
            },
            { title: this.$t('DataMaintain.mouth_ejaculation'), minWidth: 80,key: 'mouth_ejaculation',
              render: (h, params) => {
                let s = (params.row.mouth_ejaculation === 0) ? this.$t('base.no') : this.$t('base.yes');
                return h('span',[s]);
              }
            },
            { title: this.$t('DataMaintain.eat_semen'), minWidth: 80,key: 'eat_semen',
              render: (h, params) => {
                let s = (params.row.eat_semen === 0) ? this.$t('base.no') : this.$t('base.yes');
                return h('span',[s]);
              }
            },
            { title: this.$t('DataMaintain.more_man'), minWidth: 80,key: 'more_man',
              render: (h, params) => {
                let s = (params.row.more_man === 0) ? this.$t('base.no') : this.$t('base.yes');
                return h('span',[s]);
              }
            },
            { title: this.$t('DataMaintain.more_woman'), minWidth: 80,key: 'more_woman',
              render: (h, params) => {
                let s = (params.row.more_woman === 0) ? this.$t('base.no') : this.$t('base.yes');
                return h('span',[s]);
              }
            },
            { title: this.$t('DataMaintain.file_path'), minWidth: 150,key: 'file_path',
              render: (h, params) => {
                let s = params.row.file_path;
                return h('Tooltip',{
                  attrs:{placement:"bottom-start",content:s,maxWidth:"300"},
                  props:{delay:500}
                },[h('span',{
                  style:{whiteSpace:"nowrap"}
                },s)])
              }
            },
            { title: this.$t('DataMaintain.score'), minWidth: 80,key: 'score',fixed: 'right' },
            { title: this.$t('base.describe'), minWidth: 150,key: 'describe',fixed: 'right' },
            { title: this.$t('base.action'), minWidth: 130,key: 'id',fixed: 'right',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {type: 'primary',size: 'small'},
                    style:{margin:'0 5px 0 0'},
                    on: {click: event => this.editBtn(event,params.row)}
                  }, this.$t('base.edit')),
                  h('Button', {
                    props: {type: 'primary',size: 'small'},
                    on: {click: event => this.delBtn(event,params.row)}
                  }, this.$t('base.del'))
                ]);
              }
            }
          ]
        }
      },
      methods:{
        editBtn () {
          this.$refs.editModal.show();
        },
        delBtn (event,row) {
          this.$refs.delmodal.show({id:row.id});
          event.stopPropagation()
        },
        delMov (obj) {
          this.$Message.success(this.$t('base.delsucc'));
          this.$refs.delmodal.close()
        }
      }
    }
</script>

<style scoped>

</style>
