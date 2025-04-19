<template>
  <div>
    <div class="CustomVueBox">
      <div class="Header">
        <div class="Header_Left">
          <img :src="wd" alt="">
          <el-tooltip effect="dark" :content="node.properties.tableObject.tableName" placement="top">
            <div class="Header_Title">
              {{ node.properties.tableObject.tableName }}
            </div>
          </el-tooltip>
        </div>

        <el-tooltip effect="light" placement="right">
          <template #content="{ }">
            <div>
              <div class="btn" @click="getInfoTable(node.properties.tableObject, '编辑')">编辑</div>
              <div class="btn" @click="del">移除</div>
            </div>
          </template>
          <span style="font-weight: 600;">...</span>
        </el-tooltip>

      </div>
      <div ref="box" @wheel="doWheel" class="Content">
        <el-table :data="node.properties.tableObject.list" stripe style="width: 100%" class="custom-table">
          <el-table-column prop="fieldName" label="名称" align="center">
            <template #default="{ row }">
              <div :style="{ color: row.primary ? 'red' : '' }">
                {{ row.fieldName }}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="fieldType" label="类型" align="center">
            <template #default="{ row }">
              <div :style="{ color: row.primary ? 'red' : '' }">
                {{ row.fieldType }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="fieldAccuracy" label="精度" align="center">
            <template #default="{ row }">
              <div :style="{ color: row.primary ? 'red' : '' }">
                {{ row.fieldAccuracy }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="Footer"></div>
    </div>
    <teleport to="body">
      <el-dialog v-model="flagUpdate" title="编辑" class="dialog" @close="doClose">
        <div class="dialogBox">
          <el-form :model="formUpdate" label-width="110px" label-position="top">
            <el-row :gutter="20">
              <el-col :span="8"> <el-form-item label="模式名">
                  <el-input v-model="formUpdate.modeName" placeholder="请输入模式名" :disabled="true" />
                </el-form-item></el-col>
              <el-col :span="8"> <el-form-item label="表名">
                  <el-input v-model="formUpdate.tableName" placeholder="请输入表名" :disabled="true" />
                </el-form-item></el-col>
            </el-row>
          </el-form>
          <div class="itemArr">
            <div class="item" v-for="item, index in fieldArrEdit" :key="index">
              <div class="itemBtn">
                <el-button plain icon="Plus" type="primary" size="small" @click="addItem"
                  v-if="index == fieldArrEdit.length - 1">添加</el-button>
                <el-button plain icon="Delete" type="danger" size="small" v-if="fieldArrEdit.length != 1"
                  @click="delItem(index)">删除</el-button>
              </div>
              <div class="itemForm">
                <el-row :gutter="20">
                  <el-col :span="8" style="margin-bottom: 10px;"> <el-input v-model="item.fieldName"
                      placeholder="请输入字段名" /></el-col>
                  <el-col :span="8" style="margin-bottom: 10px;">
                    <el-select v-model="item.fieldType" placeholder="请选择字段类型" clearable filterable
                      @change="dictNameChange(item)">
                      <el-option v-for="domain in options1" :label="domain.dictName" :value="domain.id" />
                    </el-select>
                  </el-col>
                  <el-col :span="8" style="margin-bottom: 10px;">
                    <el-select v-model="item.primary" placeholder="请选择是否主键" clearable>
                      <el-option v-for="domain in options2" :label="domain.label" :value="domain.value" />
                    </el-select>
                  </el-col>
                  <el-col :span="8" style="margin-bottom: 10px;">
                    <el-select v-model="item.notNull" placeholder="请选择是否非空" clearable>
                      <el-option v-for="domain in options3" :label="domain.label" :value="domain.value" />
                    </el-select>
                  </el-col>
                  <el-col :span="8" style="margin-bottom: 10px;"
                    v-if="item.fieldType?.slice(-1) == 1 || item.fieldType?.slice(-1) == 2"> <el-input
                      v-model="item.fieldAccuracy" placeholder="请输入精度" /></el-col>
                  <el-col :span="8" style="margin-bottom: 10px;" v-if="item.fieldType?.slice(-1) == 2"> <el-input
                      v-model="item.scale" placeholder="请输入标度" /></el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <el-button @click="doClose">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确认</el-button>
        </template>
      </el-dialog>
    </teleport>
  </div>
</template>
<script lang="ts" setup>
import { ref, inject } from 'vue'
import wd from '../images/wd.png'
import { commonData } from '../utils/commonData'
import { lywMessage, lywConfirm } from '@/utils/feedBack'

const { options1, options2, options3 } = commonData()

/* 这两个数据，他会通过依赖注入传递给你，源码中其余的数据不会再给你了，
 你也不必通过传参而去获取数据，你是拿不到的，
 这两个已经包含了lf实例对象的大部分功能，使用好这两个数据即可*/
const getNode: any = inject('getNode')
const getGraph: any = inject('getGraph')

const node = getNode()
const graph = getGraph()

const box = ref()

// 添加滚动事件处理，主要是监听盒子内部滚动
const doWheel = (e: any) => {
  e.stopPropagation()
  box.value.scrollTop += e.deltaY
}

// 编辑
const fieldArrEdit = ref<any>([{
  fieldName: '',
  fieldType: null,
  primary: null,
  notNull: null,
  fieldAccuracy: null,
  scale: null
}])
const flagUpdate = ref(false)
const formUpdate = ref<any>({
  modeName: '',
  tableName: '',
  relateTableId: null,
  relateField: null
})

const getInfoTable = (row: any, title: any) => {
  if (title == '编辑') {
    fieldArrEdit.value = [...row.list]
    formUpdate.value = {
      modeName: row.modeName,
      tableName: row.tableName
    }
    flagUpdate.value = true
  }
}

const addItem = () => {
  fieldArrEdit.value.push({
    fieldName: '',
    fieldType: null,
    primary: null,
    notNull: null,
    fieldAccuracy: null,
    scale: null
  })
}

const dictNameChange = (data: any) => {
  data.fieldAccuracy = null
  data.scale = null
}

const delItem = (index: any) => {
  fieldArrEdit.value.splice(index, 1)
}

const doClose = () => {
  flagUpdate.value = false
  formUpdate.value = {}
  fieldArrEdit.value = []
}


const updateSubmit = () => {
  graph.eventCenter?.emit('node:doEdit', {
    form: formUpdate.value,
    pojoList: fieldArrEdit.value
  })
  graph.eventCenter.on('node:axiosStatus', (args: any) => {
    if (args) {
      doClose()
    } else {
      lywMessage('编辑失败', 'error')
    }
  })
}

const del = () => {
  lywConfirm('您确定要移除当前项吗', null, async () => {
    graph.eventCenter?.emit('node:doDel', {
      data: node.properties.tableObject
    })
  })
}
</script>
<style scoped>
.CustomVueBox {
  background-color: #fff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border-radius: 6px;

  .Header {
    padding: 15px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #dbe9f9;
    margin-bottom: 5px;

    .Header_Left {
      display: flex;
      align-items: center;

      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }

      .Header_Title {
        font-weight: 600;
        font-size: 18px;
        width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .Content {
    height: 200px;
    background-color: #fff;
    overflow-y: scroll;
    padding: 10px;
    border-radius: 6px;
  }

  .Footer {
    width: 100%;
    height: 15px;
  }
}

.dialog {
  min-width: 800px;

  .dialogBox {
    height: 400px;
    box-sizing: border-box;

    .itemArr {
      height: 300px;
      overflow-y: scroll;

      .item {
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        border: 1px solid #e4e7ed;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
        border-radius: 10px;
        margin-bottom: 10px;

        .itemBtn {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-right: 10px;
        }

        .itemForm {
          padding: 10px;
        }
      }
    }
  }
}

.btn {
  padding: 3px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.btn:hover {
  background-color: #4e88f3;
  color: #ffffff
}

:deep(.custom-table .el-table__body tr) {
  height: 30px;
}

:deep(.custom-table .el-table__cell) {
  padding: 6px 0;
}

:deep(.custom-table .el-table__header tr) {
  height: 30px;
}

::v-deep .el-table__header th {
  height: 30px !important;
}
</style>