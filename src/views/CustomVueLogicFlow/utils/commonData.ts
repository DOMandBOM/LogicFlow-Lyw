import { ref } from 'vue'
export const commonData = () => {
  const tableData = ref<any>({
    "nodes": [
      {
        "id": 125,
        "tableName": "DEPT_AUAZAEAHASBYAN_AUAZAEAJAJATAK_TEST_A",
        "modeName": "TEST",
        "x": 724,
        "y": -520,
        "createTime": "2025-04-11 09:34:20",
        "updateTime": null,
        "list": [
          {
            "fieldName": "ID",
            "fieldType": "短整型（INT）",
            "fieldAccuracy": "-",
            "primary": true,
            "notNull": true
          }
        ],
        "relateTable": null,
        "relateTableId": null,
        "relateField": null
      },
      {
        "id": 133,
        "tableName": "DEPT_AUAZAEAHASBYAN_AUAZAEAJAJATAK_TEST_G",
        "modeName": "TEST",
        "x": 484,
        "y": 44,
        "createTime": "2025-04-11 10:19:23",
        "updateTime": null,
        "list": [
          {
            "fieldName": "ID",
            "fieldType": "短整型（INT）",
            "fieldAccuracy": "-",
            "primary": true,
            "notNull": true
          }
        ],
        "relateTable": null,
        "relateTableId": null,
        "relateField": null
      },
      {
        "id": 134,
        "tableName": "DEPT_AUAZAEAHASBYAN_AUAZAEAJAJATAK_TEST_H",
        "modeName": "TEST",
        "x": 110,
        "y": -518,
        "createTime": "2025-04-15 10:27:14",
        "updateTime": null,
        "list": [
          {
            "fieldName": "ID",
            "fieldType": "短整型（INT）",
            "fieldAccuracy": "-",
            "primary": true,
            "notNull": true
          },
          {
            "fieldName": "STR",
            "fieldType": "不定长字符串（VARCHAR）",
            "fieldAccuracy": "64",
            "primary": false,
            "notNull": false
          },
          {
            "fieldName": "DOUBO",
            "fieldType": "精度浮点型（DECIMAL）",
            "fieldAccuracy": "10,2",
            "primary": false,
            "notNull": false
          },
          {
            "fieldName": "DATETIME",
            "fieldType": "日期时间类型（DATETIME）",
            "fieldAccuracy": "-",
            "primary": false,
            "notNull": false
          }
        ],
        "relateTable": null,
        "relateTableId": null,
        "relateField": null
      },
      {
        "id": 135,
        "tableName": "DEPT_AUAZAEAHASBYAN_AUAZAEAJAJATAK_TEST_I",
        "modeName": "TEST",
        "x": 1042,
        "y": 54,
        "createTime": "2025-04-11 14:08:21",
        "updateTime": null,
        "list": [
          {
            "fieldName": "TEST_I",
            "fieldType": "短整型（INT）",
            "fieldAccuracy": "-",
            "primary": true,
            "notNull": true
          }
        ],
        "relateTable": null,
        "relateTableId": null,
        "relateField": null
      }
    ],
    "edges": [
      {
        "id": "f9494491-50c7-4e9c-82f5-b4b8a86cbc85",
        "sourceAnchorId": "133_0",
        "targetAnchorId": "125_2",
        "sourceNodeId": 133,
        "targetNodeId": 125,
        "tableIds": "[125, 133, 134, 135]",
        "ids": "[75, 95, 104]",
        "idOnly": 68,
        "createBy": null,
        "createTime": "2025-04-15 11:26:23",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "isDeleted": 0
      },
      {
        "id": "7ab96332-61af-4810-99db-ebfe549e4eee",
        "sourceAnchorId": "135_0",
        "targetAnchorId": "125_2",
        "sourceNodeId": 135,
        "targetNodeId": 125,
        "tableIds": "[125, 133, 134, 135]",
        "ids": "[75, 95, 104]",
        "idOnly": 69,
        "createBy": null,
        "createTime": "2025-04-15 11:26:23",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "isDeleted": 0
      },
      {
        "id": "2150a510-f38b-4afb-9cbd-581c8d73aa49",
        "sourceAnchorId": "125_3",
        "targetAnchorId": "134_1",
        "sourceNodeId": 125,
        "targetNodeId": 134,
        "tableIds": "[125, 133, 134, 135]",
        "ids": "[75, 95, 104]",
        "idOnly": 70,
        "createBy": null,
        "createTime": "2025-04-15 11:26:23",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "isDeleted": 0
      }
    ]
  }
  )

  const options1 = ref<any>([])

  const options2 = [{
    label: '否', value: false
  }, {
    label: '是', value: true
  }]

  const options3 = [{
    label: '否', value: false
  }, {
    label: '是', value: true
  }]
  return {
    options1,
    options2,
    options3,
    tableData
  }
}