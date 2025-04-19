import LogicFlow, { BaseNodeModel, BezierEdge, BezierEdgeModel, RectNode, RectNodeModel, h } from '@logicflow/core'
import { v4 as uuidv4 } from 'uuid'
import shujuchuli from './images/logicflowIcon/shujuchuli.png'
import shujujihe from './images/logicflowIcon/shujujihe.png'
import shujujishuchu from './images/logicflowIcon/shujujishuchu.png'
import shujuyuanlaiyuan from './images/logicflowIcon/shujuyuanlaiyuan.png'
import tieyuankushuchu from './images/logicflowIcon/tieyuankushuchu.png'
import tieyuankushuru from './images/logicflowIcon/tieyuankushuru.png'
import yuanshujushuchu from './images/logicflowIcon/yuanshujushuchu.png'
import zhibiaoshuchu from './images/logicflowIcon/zhibiaoshuchu.png'
import zhilikushuchu from './images/logicflowIcon/zhilikushuchu.png'

export function registeNode(lf: any) {
  // 输入节点一号
  class dataSourceNode extends RectNode {
    getShape() {
      const { x, y, width, height, radius, properties, text } = this.props.model

      const style = this.props.model.getNodeStyle()
      return h('g', {}, [
        h('rect', {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          rx: radius,
          ry: radius,
          width: 82,
          height: 68,
          stroke: '#cce6fa',
          fill: '#fff',
        }),
        h(
          'text',
          {
            x,
            y: y + height / 2 + 20,
            style: {
              'font-size': '14px',
              fill: '#333',
              'text-anchor': 'middle',
              fontWeight: 500,
            },
          },
          text.value
        ),
      ])
    }
    getText() {
      const { x, y, text, width, height, properties } = this.props.model
      return h(
        'foreignObject',
        {
          x: x - width / 2,
          y: y - height / 2,
          className: 'foreign-object',
          style: {
            width: width,
            height: height,
          },
        },
        [
          h(
            'div',
            {
              style: {
                width: width,
                height: height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            h('img', {
              draggable: false,
              style: {
                width: width,
                height: height,
              },
              src: shujuyuanlaiyuan,
            })
          ),
        ]
      )
    }
  }
  class dataSourceModel extends RectNodeModel {
    // 添加自定义属性
    initNodeData(data: any) {
      super.initNodeData(data)
      this.setProperties({
        DataSourceId: null,
        DataSourceTable: [],
      })
    }
    // 文本下移
    get anchors() {
      const { width, height, x, y } = this
      return [
        { x: x + width / 2, y, id: 'right' }, // 右侧中点
      ]
    }
    //移入放大锚点
    getAnchorStyle(anchorInfo: any) {
      const style = super.getAnchorStyle(anchorInfo)
      style.stroke = 'rgb(24, 125, 255)'
      style.fill = '#4E88F3'
      style.r = 3
      if (!style.hover) return style
      style.hover.r = 8
      style.hover.fill = 'rgb(24, 125, 255)'
      style.hover.stroke = 'rgb(24, 125, 255)'
      return style
    }

    // constructor(data: LogicFlow.NodeConfig, graphModel: any) {
    //   data.text = {
    //     // 自定义文本坐标：向下移动40px
    //     value: data.text as string,
    //     x: data.x,
    //     y: data.y + 40,
    //   }
    //   super(data, graphModel)
    // } // 设置锚点
    // getDefaultAnchor() {
    //   const { width, height, x, y, id } = this
    //   return [
    //     {
    //       x: x + width / 2,
    //       y,
    //       name: 'right',
    //       id: `${id}_0`,
    //     },
    //   ]
    // } // 设置节点样式
    setAttributes() {
      this.width = 82
      this.height = 68
      this.radius = 4
      this.isSelected = false
    } // 规则
    getConnectedSourceRules() {
      const rules = super.getConnectedSourceRules()
      const notAsTarget = {
        message: '不能连接自己',
        validate: (source?: BaseNodeModel, target?: BaseNodeModel) => {
          let isValid = true
          if (source?.id === target?.id) {
            isValid = false
          }
          return isValid
        },
      }
      rules.push(notAsTarget)

      // const onlyOneOutEdge = {
      //   message: '输入节点一号只能连接输出节点四号',
      //   validate: (source?: BaseNodeModel, target?: any) => {
      //     // console.log(source, target, 'targettarget')

      //     let isValid = true
      //     if (!allRule4(target)) {
      //       isValid = false
      //     }
      //     return isValid
      //   },
      // }
      // rules.push(onlyOneOutEdge)
      return rules
    } // 锚点边框
    getOutlineStyle() {
      const style = super.getOutlineStyle()
      return {
        ...style,
        stroke: 'transparent', // 将边框颜色设为透明
        strokeDasharray: '0', // 取消虚线效果
        strokeWidth: 0, // 完全隐藏边框
      }
    }
    // 可选：调整选中时的节点主体样式
    getNodeStyle() {
      const style = super.getNodeStyle()
      return {
        ...style, // fill: this.isSelected ? : '#fff', // 选中时浅蓝背景
        stroke: this.isSelected ? '#1890ff' : '#999', // 选中时蓝色，默认灰色
        strokeDasharray: this.isSelected ? '0' : '3,2', // 选中时实线，默认虚线
      }
    }

    createId() {
      return uuidv4()
    }
  }
  lf.value?.register({
    type: 'dataSource',
    view: dataSourceNode,
    model: dataSourceModel,
  })
  // 输入节点二号
  class pasteSourceNode extends RectNode {
    getShape() {
      const { x, y, width, height, radius, properties, text } = this.props.model

      const style = this.props.model.getNodeStyle()
      return h('g', {}, [
        h('rect', {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          rx: radius,
          ry: radius,
          width: 82,
          height: 68,
          stroke: '#cce6fa',
          fill: '#fff',
        }),
        h(
          'text',
          {
            x,
            y: y + height / 2 + 20,
            style: {
              'font-size': '14px',
              fill: '#333',
              'text-anchor': 'middle',
              fontWeight: 500,
            },
          },
          text.value
        ),
      ])
    }
    getText() {
      const { x, y, text, width, height, properties } = this.props.model
      return h(
        'foreignObject',
        {
          x: x - width / 2,
          y: y - height / 2,
          className: 'foreign-object',
          style: {
            width: width,
            height: height,
          },
        },
        [
          h(
            'div',
            {
              style: {
                width: width,
                height: height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            h('img', {
              draggable: false,
              style: {
                width: width,
                height: height,
              },
              src: tieyuankushuru,
            })
          ),
        ]
      )
    }
  }
  class pasteSourceModel extends RectNodeModel {
    // 添加自定义属性
    initNodeData(data: any) {
      super.initNodeData(data)
      this.setProperties({
        DataSourceId: null,
        DataSourceTable: [],
      })
    }
    // 文本下移
    get anchors() {
      const { width, height, x, y } = this
      return [
        { x: x + width / 2, y, id: 'right' }, // 右侧中点
      ]
    }
    //移入放大锚点
    getAnchorStyle(anchorInfo: any) {
      const style = super.getAnchorStyle(anchorInfo)
      style.stroke = 'rgb(24, 125, 255)'
      style.fill = '#4E88F3'
      style.r = 3
      if (!style.hover) return style
      style.hover.r = 8
      style.hover.fill = 'rgb(24, 125, 255)'
      style.hover.stroke = 'rgb(24, 125, 255)'
      return style
    }

    // 设置节点样式
    setAttributes() {
      this.width = 82
      this.height = 68
      this.radius = 4
      this.isSelected = false
    } // 规则
    getConnectedSourceRules() {
      const rules = super.getConnectedSourceRules()
      const notAsTarget = {
        message: '不能连接自己',
        validate: (source?: BaseNodeModel, target?: BaseNodeModel) => {
          let isValid = true
          if (source?.id === target?.id) {
            isValid = false
          }
          return isValid
        },
      }
      rules.push(notAsTarget)

      // const onlyOneOutEdge = {
      //   message: '输入节点一号只能连接输出节点四号',
      //   validate: (source?: BaseNodeModel, target?: any) => {
      //     // console.log(source, target, 'targettarget')

      //     let isValid = true
      //     if (!allRule4(target)) {
      //       isValid = false
      //     }
      //     return isValid
      //   },
      // }
      // rules.push(onlyOneOutEdge)
      return rules
    } // 锚点边框
    getOutlineStyle() {
      const style = super.getOutlineStyle()
      return {
        ...style,
        stroke: 'transparent', // 将边框颜色设为透明
        strokeDasharray: '0', // 取消虚线效果
        strokeWidth: 0, // 完全隐藏边框
      }
    }
    // 可选：调整选中时的节点主体样式
    getNodeStyle() {
      const style = super.getNodeStyle()
      return {
        ...style, // fill: this.isSelected ? : '#fff', // 选中时浅蓝背景
        stroke: this.isSelected ? '#1890ff' : '#999', // 选中时蓝色，默认灰色
        strokeDasharray: this.isSelected ? '0' : '3,2', // 选中时实线，默认虚线
      }
    }

    createId() {
      return uuidv4()
    }
  }
  lf.value?.register({
    type: 'pasteSource',
    view: pasteSourceNode,
    model: pasteSourceModel,
  })

  // 处理节点一号
  class dataProcessingNode extends RectNode {
    getShape() {
      const { x, y, width, height, radius, properties, text } = this.props.model

      const style = this.props.model.getNodeStyle()
      return h('g', {}, [
        h('rect', {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          rx: radius,
          ry: radius,
          width: 82,
          height: 68,
          stroke: '#cce6fa',
          fill: '#fff',
        }),
        h(
          'text',
          {
            x,
            y: y + height / 2 + 20,
            style: {
              'font-size': '14px',
              fill: '#333',
              'text-anchor': 'middle',
              fontWeight: 500,
            },
          },
          text.value
        ),
      ])
    }
    getText() {
      const { x, y, text, width, height, properties } = this.props.model
      return h(
        'foreignObject',
        {
          x: x - width / 2,
          y: y - height / 2,
          className: 'foreign-object',
          style: {
            width: width,
            height: height,
          },
        },
        [
          h(
            'div',
            {
              style: {
                width: width,
                height: height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            h('img', {
              draggable: false,
              style: {
                width: width,
                height: height,
              },
              src: shujuchuli,
            })
          ),
        ]
      )
    }
  }
  class dataProcessingModel extends RectNodeModel {
    // 添加自定义属性
    initNodeData(data: any) {
      super.initNodeData(data)
      this.setProperties({
        setType: null,
      })
    } // 设置节点样式
    setAttributes() {
      this.width = 82
      this.height = 68
      this.radius = 4
      this.isSelected = false
    }
    get anchors() {
      const { width, height, x, y } = this
      return [
        { x: x - width / 2, y, id: 'left' }, // 左侧中点
        { x: x + width / 2, y, id: 'right' }, // 右侧中点
      ]
    }

    //移入放大锚点
    getAnchorStyle(anchorInfo: any) {
      const style = super.getAnchorStyle(anchorInfo)
      style.stroke = 'rgb(24, 125, 255)'
      style.fill = '#4E88F3'
      style.r = 3
      if (!style.hover) return style
      style.hover.r = 8
      style.hover.fill = 'rgb(24, 125, 255)'
      style.hover.stroke = 'rgb(24, 125, 255)'
      return style
    }

    getConnectedSourceRules() {
      const rules = super.getConnectedSourceRules()
      const notAsTarget = {
        message: '不能连接自己',
        validate: (source?: BaseNodeModel, target?: BaseNodeModel) => {
          let isValid = true
          if (source?.id === target?.id) {
            isValid = false
          }
          return isValid
        },
      }
      rules.push(notAsTarget)

      // const onlyOneOutEdge = {
      //   message: '处理节点一号无法连接输入节点一号或处理节点一号或输出节点四号',
      //   validate: (source?: BaseNodeModel, target?: any) => {
      //     let isValid = true
      //     if (allRule5(target)) {
      //       isValid = false
      //     }
      //     return isValid
      //   },
      // }
      // rules.push(onlyOneOutEdge)

      return rules
    } // 锚点边框

    getOutlineStyle() {
      const style = super.getOutlineStyle()
      return {
        ...style,
        stroke: 'transparent', // 将边框颜色设为透明
        strokeDasharray: '0', // 取消虚线效果
        strokeWidth: 0, // 完全隐藏边框
      }
    } // 可选：调整选中时的节点主体样式

    getNodeStyle() {
      const style = super.getNodeStyle()
      return {
        ...style, // fill: this.isSelected ? : '#fff', // 选中时浅蓝背景
        stroke: this.isSelected ? '#1890ff' : '#999', // 选中时蓝色，默认灰色
        strokeDasharray: this.isSelected ? '0' : '3,2', // 选中时实线，默认虚线
      }
    }
    createId() {
      return uuidv4()
    }
  }
  lf.value?.register({
    type: 'dataProcessing',
    view: dataProcessingNode,
    model: dataProcessingModel,
  })
  // 稽核节点一号
  class dataAuditNode extends RectNode {
    getShape() {
      const { x, y, width, height, radius, properties, text } = this.props.model

      const style = this.props.model.getNodeStyle()
      return h('g', {}, [
        h('rect', {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          rx: radius,
          ry: radius,
          width: 82,
          height: 68,
          stroke: '#cce6fa',
          fill: '#fff',
        }),
        h(
          'text',
          {
            x,
            y: y + height / 2 + 20,
            style: {
              'font-size': '14px',
              fill: '#333',
              'text-anchor': 'middle',
              fontWeight: 500,
            },
          },
          text.value
        ),
      ])
    }
    getText() {
      const { x, y, text, width, height, properties } = this.props.model
      return h(
        'foreignObject',
        {
          x: x - width / 2,
          y: y - height / 2,
          className: 'foreign-object',
          style: {
            width: width,
            height: height,
          },
        },
        [
          h(
            'div',
            {
              style: {
                width: width,
                height: height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            h('img', {
              draggable: false,
              style: {
                width: width,
                height: height,
              },
              src: shujujihe,
            })
          ),
        ]
      )
    }
  }
  class dataAuditModel extends RectNodeModel {
    // 文本下移
    // constructor(data: LogicFlow.NodeConfig, graphModel: any) {
    //   data.text = {
    //     // 自定义文本坐标：向下移动40px
    //     value: data.text as string,
    //     x: data.x,
    //     y: data.y + 40,
    //   }
    //   super(data, graphModel)
    // } // 添加自定义属性
    initNodeData(data: any) {
      super.initNodeData(data)
      this.setProperties({
        script: [{ ruleType: null, ruleKey: [] }],
      })
    } // 设置节点样式
    setAttributes() {
      this.width = 82
      this.height = 68
      this.radius = 4
      this.isSelected = false
    }
    get anchors() {
      const { width, height, x, y } = this
      return [
        { x: x - width / 2, y, id: 'left' }, // 左侧中点
        { x: x + width / 2, y, id: 'right' }, // 右侧中点
      ]
    }

    //移入放大锚点
    getAnchorStyle(anchorInfo: any) {
      const style = super.getAnchorStyle(anchorInfo)
      style.stroke = 'rgb(24, 125, 255)'
      style.fill = '#4E88F3'
      style.r = 3
      if (!style.hover) return style
      style.hover.r = 8
      style.hover.fill = 'rgb(24, 125, 255)'
      style.hover.stroke = 'rgb(24, 125, 255)'
      return style
    }

    getConnectedSourceRules() {
      const rules = super.getConnectedSourceRules()
      const notAsTarget = {
        message: '不能连接自己',
        validate: (source?: BaseNodeModel, target?: BaseNodeModel) => {
          let isValid = true
          if (source?.id === target?.id) {
            isValid = false
          }
          return isValid
        },
      }
      rules.push(notAsTarget)

      // const onlyOneOutEdge = {
      //   message: '处理节点一号无法连接输入节点一号或处理节点一号或输出节点四号',
      //   validate: (source?: BaseNodeModel, target?: any) => {
      //     let isValid = true
      //     if (allRule5(target)) {
      //       isValid = false
      //     }
      //     return isValid
      //   },
      // }
      // rules.push(onlyOneOutEdge)

      return rules
    } // 锚点边框

    getOutlineStyle() {
      const style = super.getOutlineStyle()
      return {
        ...style,
        stroke: 'transparent', // 将边框颜色设为透明
        strokeDasharray: '0', // 取消虚线效果
        strokeWidth: 0, // 完全隐藏边框
      }
    } // 可选：调整选中时的节点主体样式

    getNodeStyle() {
      const style = super.getNodeStyle()
      return {
        ...style, // fill: this.isSelected ? : '#fff', // 选中时浅蓝背景
        stroke: this.isSelected ? '#1890ff' : '#999', // 选中时蓝色，默认灰色
        strokeDasharray: this.isSelected ? '0' : '3,2', // 选中时实线，默认虚线
      }
    }
    createId() {
      return uuidv4()
    }
  }
  lf.value?.register({
    type: 'dataAudit',
    view: dataAuditNode,
    model: dataAuditModel,
  })

  // 输出节点一号
  class metadataOutputNode extends RectNode {
    getShape() {
      const { x, y, width, height, radius, properties, text } = this.props.model

      const style = this.props.model.getNodeStyle()
      return h('g', {}, [
        h('rect', {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          rx: radius,
          ry: radius,
          width: 82,
          height: 68,
          stroke: '#cce6fa',
          fill: '#fff',
        }),
        h(
          'text',
          {
            x,
            y: y + height / 2 + 20,
            style: {
              'font-size': '14px',
              fill: '#333',
              'text-anchor': 'middle',
              fontWeight: 500,
            },
          },
          text.value
        ),
      ])
    }
    getText() {
      const { x, y, text, width, height, properties } = this.props.model
      return h(
        'foreignObject',
        {
          x: x - width / 2,
          y: y - height / 2,
          className: 'foreign-object',
          style: {
            width: width,
            height: height,
          },
        },
        [
          h(
            'div',
            {
              style: {
                width: width,
                height: height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            h('img', {
              draggable: false,
              style: {
                width: width,
                height: height,
              },
              src: yuanshujushuchu,
            })
          ),
        ]
      )
    }
  }
  class metadataOutputModel extends RectNodeModel {
    initNodeData(data: any) {
      super.initNodeData(data)
      this.setProperties({
        DataSourceId: null,
      })
    } // 文本下移
    // constructor(data: LogicFlow.NodeConfig, graphModel: any) {
    //   data.text = {
    //     // 自定义文本坐标：向下移动40px
    //     value: data.text as string,
    //     x: data.x,
    //     y: data.y + 40,
    //   }
    //   super(data, graphModel)
    // } // 设置节点样式

    setAttributes() {
      this.width = 82
      this.height = 68
      this.radius = 4
      this.isSelected = false
    }

    get anchors() {
      const { width, height, x, y } = this
      return [
        { x: x - width / 2, y, id: 'left' }, // 左侧中点
        { x: x + width / 2, y, id: 'right' }, // 右侧中点
      ]
    }

    //移入放大锚点
    getAnchorStyle(anchorInfo: any) {
      const style = super.getAnchorStyle(anchorInfo)
      style.stroke = 'rgb(24, 125, 255)'
      style.fill = '#4E88F3'
      style.r = 3
      if (!style.hover) return style
      style.hover.r = 8
      style.hover.fill = 'rgb(24, 125, 255)'
      style.hover.stroke = 'rgb(24, 125, 255)'
      return style
    }

    getConnectedSourceRules() {
      const rules = super.getConnectedSourceRules()
      const notAsTarget = {
        message: '不能连接自己',
        validate: (source?: BaseNodeModel, target?: BaseNodeModel) => {
          let isValid = true
          if (source?.id === target?.id) {
            isValid = false
          }
          return isValid
        },
      }
      rules.push(notAsTarget)

      // const onlyOneOutEdge = {
      //   message: '输出节点一号仅能连接处理节点一号',
      //   validate: (source?: BaseNodeModel, target?: any) => {
      //     let isValid = true
      //     if (allRule1(target)) {
      //       isValid = false
      //     }
      //     return isValid
      //   },
      // }
      // rules.push(onlyOneOutEdge)
      return rules
    } // 锚点边框

    getOutlineStyle() {
      const style = super.getOutlineStyle()
      return {
        ...style,
        stroke: 'transparent', // 将边框颜色设为透明
        strokeDasharray: '0', // 取消虚线效果
        strokeWidth: 0, // 完全隐藏边框
      }
    } // 可选：调整选中时的节点主体样式

    getNodeStyle() {
      const style = super.getNodeStyle()
      return {
        ...style, // fill: this.isSelected ? : '#fff', // 选中时浅蓝背景
        stroke: this.isSelected ? '#1890ff' : '#999', // 选中时蓝色，默认灰色
        strokeDasharray: this.isSelected ? '0' : '3,2', // 选中时实线，默认虚线
      }
    }
    createId() {
      return uuidv4()
    }
  }
  lf.value?.register({
    type: 'metadataOutput',
    view: metadataOutputNode,
    model: metadataOutputModel,
  })
  // 输出节点四号
  class governanceOutputNode extends RectNode {
    getShape() {
      const { x, y, width, height, radius, properties, text } = this.props.model

      const style = this.props.model.getNodeStyle()
      return h('g', {}, [
        h('rect', {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          rx: radius,
          ry: radius,
          width: 82,
          height: 68,
          stroke: '#cce6fa',
          fill: '#fff',
        }),
        h(
          'text',
          {
            x,
            y: y + height / 2 + 20,
            style: {
              'font-size': '14px',
              fill: '#333',
              'text-anchor': 'middle',
              fontWeight: 500,
            },
          },
          text.value
        ),
      ])
    }
    getText() {
      const { x, y, text, width, height, properties } = this.props.model
      return h(
        'foreignObject',
        {
          x: x - width / 2,
          y: y - height / 2,
          className: 'foreign-object',
          style: {
            width: width,
            height: height,
          },
        },
        [
          h(
            'div',
            {
              style: {
                width: width,
                height: height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            h('img', {
              draggable: false,
              style: {
                width: width,
                height: height,
              },
              src: zhilikushuchu,
            })
          ),
        ]
      )
    }
  }
  class governanceOutputModel extends RectNodeModel {
    initNodeData(data: any) {
      super.initNodeData(data)
      this.setProperties({
        DataSourceId: null,
      })
    } // 文本下移
    // constructor(data: LogicFlow.NodeConfig, graphModel: any) {
    //   data.text = {
    //     // 自定义文本坐标：向下移动40px
    //     value: data.text as string,
    //     x: data.x,
    //     y: data.y + 40,
    //   }
    //   super(data, graphModel)
    // } // 设置节点样式

    setAttributes() {
      this.width = 82
      this.height = 68
      this.radius = 4
      this.isSelected = false
    }

    get anchors() {
      const { width, height, x, y } = this
      return [
        { x: x - width / 2, y, id: 'left' }, // 左侧中点
        { x: x + width / 2, y, id: 'right' }, // 右侧中点
      ]
    }

    //移入放大锚点
    getAnchorStyle(anchorInfo: any) {
      const style = super.getAnchorStyle(anchorInfo)
      style.stroke = 'rgb(24, 125, 255)'
      style.fill = '#4E88F3'
      style.r = 3
      if (!style.hover) return style
      style.hover.r = 8
      style.hover.fill = 'rgb(24, 125, 255)'
      style.hover.stroke = 'rgb(24, 125, 255)'
      return style
    }

    getConnectedSourceRules() {
      const rules = super.getConnectedSourceRules()
      const notAsTarget = {
        message: '不能连接自己',
        validate: (source?: BaseNodeModel, target?: BaseNodeModel) => {
          let isValid = true
          if (source?.id === target?.id) {
            isValid = false
          }
          return isValid
        },
      }
      rules.push(notAsTarget)

      // const onlyOneOutEdge = {
      //   message: '输出节点一号仅能连接处理节点一号',
      //   validate: (source?: BaseNodeModel, target?: any) => {
      //     let isValid = true
      //     if (allRule1(target)) {
      //       isValid = false
      //     }
      //     return isValid
      //   },
      // }
      // rules.push(onlyOneOutEdge)
      return rules
    } // 锚点边框

    getOutlineStyle() {
      const style = super.getOutlineStyle()
      return {
        ...style,
        stroke: 'transparent', // 将边框颜色设为透明
        strokeDasharray: '0', // 取消虚线效果
        strokeWidth: 0, // 完全隐藏边框
      }
    } // 可选：调整选中时的节点主体样式

    getNodeStyle() {
      const style = super.getNodeStyle()
      return {
        ...style, // fill: this.isSelected ? : '#fff', // 选中时浅蓝背景
        stroke: this.isSelected ? '#1890ff' : '#999', // 选中时蓝色，默认灰色
        strokeDasharray: this.isSelected ? '0' : '3,2', // 选中时实线，默认虚线
      }
    }
    createId() {
      return uuidv4()
    }
  }
  lf.value?.register({
    type: 'governanceOutput',
    view: governanceOutputNode,
    model: governanceOutputModel,
  })

  // 输出节点四号
  class dataOutputNode extends RectNode {
    getShape() {
      const { x, y, width, height, radius, properties, text } = this.props.model

      const style = this.props.model.getNodeStyle()
      return h('g', {}, [
        h('rect', {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          rx: radius,
          ry: radius,
          width: 82,
          height: 68,
          stroke: '#cce6fa',
          fill: '#fff',
        }),
        h(
          'text',
          {
            x,
            y: y + height / 2 + 20,
            style: {
              'font-size': '14px',
              fill: '#333',
              'text-anchor': 'middle',
              fontWeight: 500,
            },
          },
          text.value
        ),
      ])
    }
    getText() {
      const { x, y, text, width, height, properties } = this.props.model
      return h(
        'foreignObject',
        {
          x: x - width / 2,
          y: y - height / 2,
          className: 'foreign-object',
          style: {
            width: width,
            height: height,
          },
        },
        [
          h(
            'div',
            {
              style: {
                width: width,
                height: height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            h('img', {
              draggable: false,
              style: {
                width: width,
                height: height,
              },
              src: tieyuankushuchu,
            })
          ),
        ]
      )
    }
  }
  class dataOutputModel extends RectNodeModel {
    initNodeData(data: any) {
      super.initNodeData(data)
      this.setProperties({
        DataSourceId: null,
      })
    } // 文本下移
    // constructor(data: LogicFlow.NodeConfig, graphModel: any) {
    //   data.text = {
    //     // 自定义文本坐标：向下移动40px
    //     value: data.text as string,
    //     x: data.x,
    //     y: data.y + 40,
    //   }
    //   super(data, graphModel)
    // } // 设置节点样式

    setAttributes() {
      this.width = 82
      this.height = 68
      this.radius = 4
      this.isSelected = false
    }

    get anchors() {
      const { width, height, x, y } = this
      return [
        { x: x - width / 2, y, id: 'left' }, // 左侧中点
        { x: x + width / 2, y, id: 'right' }, // 右侧中点
      ]
    }

    //移入放大锚点
    getAnchorStyle(anchorInfo: any) {
      const style = super.getAnchorStyle(anchorInfo)
      style.stroke = 'rgb(24, 125, 255)'
      style.fill = '#4E88F3'
      style.r = 3
      if (!style.hover) return style
      style.hover.r = 8
      style.hover.fill = 'rgb(24, 125, 255)'
      style.hover.stroke = 'rgb(24, 125, 255)'
      return style
    }

    getConnectedSourceRules() {
      const rules = super.getConnectedSourceRules()
      const notAsTarget = {
        message: '不能连接自己',
        validate: (source?: BaseNodeModel, target?: BaseNodeModel) => {
          let isValid = true
          if (source?.id === target?.id) {
            isValid = false
          }
          return isValid
        },
      }
      rules.push(notAsTarget)

      // const onlyOneOutEdge = {
      //   message: '输出节点四号只能连接处理节点一号',
      //   validate: (source?: BaseNodeModel, target?: any) => {
      //     let isValid = true

      //     if (allRule6(target)) {
      //       isValid = false
      //     }
      //     return isValid
      //   },
      // }
      // rules.push(onlyOneOutEdge)
      return rules
    } // 锚点边框

    getOutlineStyle() {
      const style = super.getOutlineStyle()
      return {
        ...style,
        stroke: 'transparent', // 将边框颜色设为透明
        strokeDasharray: '0', // 取消虚线效果
        strokeWidth: 0, // 完全隐藏边框
      }
    } // 可选：调整选中时的节点主体样式

    getNodeStyle() {
      const style = super.getNodeStyle()
      return {
        ...style, // fill: this.isSelected ? : '#fff', // 选中时浅蓝背景
        stroke: this.isSelected ? '#1890ff' : '#999', // 选中时蓝色，默认灰色
        strokeDasharray: this.isSelected ? '0' : '3,2', // 选中时实线，默认虚线
      }
    }
    createId() {
      return uuidv4()
    }
  }
  lf.value?.register({
    type: 'dataOutput',
    view: dataOutputNode,
    model: dataOutputModel,
  })

  // 输出节点二号
  class indexOutputNode extends RectNode {
    getShape() {
      const { x, y, width, height, radius, properties, text } = this.props.model

      const style = this.props.model.getNodeStyle()
      return h('g', {}, [
        h('rect', {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          rx: radius,
          ry: radius,
          width: 82,
          height: 68,
          stroke: '#cce6fa',
          fill: '#fff',
        }),
        h(
          'text',
          {
            x,
            y: y + height / 2 + 20,
            style: {
              'font-size': '14px',
              fill: '#333',
              'text-anchor': 'middle',
              fontWeight: 500,
            },
          },
          text.value
        ),
      ])
    }
    getText() {
      const { x, y, text, width, height, properties } = this.props.model
      return h(
        'foreignObject',
        {
          x: x - width / 2,
          y: y - height / 2,
          className: 'foreign-object',
          style: {
            width: width,
            height: height,
          },
        },
        [
          h(
            'div',
            {
              style: {
                width: width,
                height: height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            h('img', {
              draggable: false,
              style: {
                width: width,
                height: height,
              },
              src: zhibiaoshuchu,
            })
          ),
        ]
      )
    }
  }
  class indexOutputModel extends RectNodeModel {
    // 文本下移
    // constructor(data: LogicFlow.NodeConfig, graphModel: any) {
    //   data.text = {
    //     // 自定义文本坐标：向下移动40px
    //     value: data.text as string,
    //     x: data.x,
    //     y: data.y + 40,
    //   }
    //   super(data, graphModel)
    // } // 设置节点样式

    setAttributes() {
      this.width = 82
      this.height = 68
      this.radius = 4
      this.isSelected = false
    }

    get anchors() {
      const { width, height, x, y } = this
      return [
        { x: x - width / 2, y, id: 'left' }, // 左侧中点
        { x: x + width / 2, y, id: 'right' }, // 右侧中点
      ]
    }

    //移入放大锚点
    getAnchorStyle(anchorInfo: any) {
      const style = super.getAnchorStyle(anchorInfo)
      style.stroke = 'rgb(24, 125, 255)'
      style.fill = '#4E88F3'
      style.r = 3
      if (!style.hover) return style
      style.hover.r = 8
      style.hover.fill = 'rgb(24, 125, 255)'
      style.hover.stroke = 'rgb(24, 125, 255)'
      return style
    }

    getConnectedSourceRules() {
      const rules = super.getConnectedSourceRules()
      const notAsTarget = {
        message: '不能连接自己',
        validate: (source?: BaseNodeModel, target?: BaseNodeModel) => {
          let isValid = true
          if (source?.id === target?.id) {
            isValid = false
          }
          return isValid
        },
      }
      rules.push(notAsTarget)

      // const onlyOneOutEdge = {
      //   message: '输出节点二号仅能连接处理节点一号',
      //   validate: (source?: BaseNodeModel, target?: any) => {
      //     let isValid = true
      //     if (allRule2(target)) {
      //       isValid = false
      //     }
      //     return isValid
      //   },
      // }
      // rules.push(onlyOneOutEdge)

      return rules
    } // 锚点边框
    getOutlineStyle() {
      const style = super.getOutlineStyle()
      return {
        ...style,
        stroke: 'transparent', // 将边框颜色设为透明
        strokeDasharray: '0', // 取消虚线效果
        strokeWidth: 0, // 完全隐藏边框
      }
    } // 可选：调整选中时的节点主体样式

    getNodeStyle() {
      const style = super.getNodeStyle()
      return {
        ...style, // fill: this.isSelected ? : '#fff', // 选中时浅蓝背景
        stroke: this.isSelected ? '#1890ff' : '#999', // 选中时蓝色，默认灰色
        strokeDasharray: this.isSelected ? '0' : '3,2', // 选中时实线，默认虚线
      }
    }
    createId() {
      return uuidv4()
    }
  }
  lf.value?.register({
    type: 'indexOutput',
    view: indexOutputNode,
    model: indexOutputModel,
  })

  // 输出节点三号
  class dataSetoutputNode extends RectNode {
    getShape() {
      const { x, y, width, height, radius, properties, text } = this.props.model

      const style = this.props.model.getNodeStyle()
      return h('g', {}, [
        h('rect', {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          rx: radius,
          ry: radius,
          width: 82,
          height: 68,
          stroke: '#cce6fa',
          fill: '#fff',
        }),
        h(
          'text',
          {
            x,
            y: y + height / 2 + 20,
            style: {
              'font-size': '14px',
              fill: '#333',
              'text-anchor': 'middle',
              fontWeight: 500,
            },
          },
          text.value
        ),
      ])
    }
    getText() {
      const { x, y, text, width, height, properties } = this.props.model
      return h(
        'foreignObject',
        {
          x: x - width / 2,
          y: y - height / 2,
          className: 'foreign-object',
          style: {
            width: width,
            height: height,
          },
        },
        [
          h(
            'div',
            {
              style: {
                width: width,
                height: height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            h('img', {
              draggable: false,
              style: {
                width: width,
                height: height,
              },
              src: shujujishuchu,
            })
          ),
        ]
      )
    }
  }
  class dataSetoutputModel extends RectNodeModel {
    initNodeData(data: any) {
      super.initNodeData(data)
      this.setProperties({
        setName: null,
        setNo: null,
        sqlScript: null,
      })
    }
    // 文本下移
    // constructor(data: LogicFlow.NodeConfig, graphModel: any) {
    //   data.text = {
    //     // 自定义文本坐标：向下移动40px
    //     value: data.text as string,
    //     x: data.x,
    //     y: data.y + 40,
    //   }
    //   super(data, graphModel)
    // } // 设置节点样式

    setAttributes() {
      this.width = 82
      this.height = 68
      this.radius = 4
      this.isSelected = false
    }
    get anchors() {
      const { width, height, x, y } = this
      return [
        { x: x - width / 2, y, id: 'left' }, // 左侧中点
        { x: x + width / 2, y, id: 'right' }, // 右侧中点
      ]
    }
    //移入放大锚点
    getAnchorStyle(anchorInfo: any) {
      const style = super.getAnchorStyle(anchorInfo)
      style.stroke = 'rgb(24, 125, 255)'
      style.fill = '#4E88F3'
      style.r = 3
      if (!style.hover) return style
      style.hover.r = 8
      style.hover.fill = 'rgb(24, 125, 255)'
      style.hover.stroke = 'rgb(24, 125, 255)'
      return style
    }
    getConnectedSourceRules() {
      const rules = super.getConnectedSourceRules()
      const notAsTarget = {
        message: '不能连接自己',
        validate: (source?: BaseNodeModel, target?: BaseNodeModel) => {
          let isValid = true
          if (source?.id === target?.id) {
            isValid = false
          }
          return isValid
        },
      }
      rules.push(notAsTarget)

      // const onlyOneOutEdge = {
      //   message: '输出节点三号无法连接其他',
      //   validate: (source?: BaseNodeModel, target?: any) => {
      //     let isValid = true
      //     if (allRule3(target)) {
      //       isValid = false
      //     }
      //     return isValid
      //   },
      // }
      // rules.push(onlyOneOutEdge)

      return rules
    } // 锚点边框
    getOutlineStyle() {
      const style = super.getOutlineStyle()
      return {
        ...style,
        stroke: 'transparent', // 将边框颜色设为透明
        strokeDasharray: '0', // 取消虚线效果
        strokeWidth: 0, // 完全隐藏边框
      }
    } // 可选：调整选中时的节点主体样式

    getNodeStyle() {
      const style = super.getNodeStyle()
      return {
        ...style, // fill: this.isSelected ? : '#fff', // 选中时浅蓝背景
        stroke: this.isSelected ? '#1890ff' : '#999', // 选中时蓝色，默认灰色
        strokeDasharray: this.isSelected ? '0' : '3,2', // 选中时实线，默认虚线
      }
    }
    createId() {
      return uuidv4()
    }
  }
  lf.value?.register({
    type: 'dataSetoutput',
    view: dataSetoutputNode,
    model: dataSetoutputModel,
  })

  /**
   * @description 虚线
   */
  class DashedLineModel extends BezierEdgeModel {
    getEdgeStyle() {
      const style = super.getEdgeStyle()
      style.stroke = '#808080'
      style.strokeDasharray = '3 3'
      style.strokeWidth = 1
      return style
    }
  }
  lf.value?.register({
    type: 'dashedLine',
    view: BezierEdge,
    model: DashedLineModel,
  })
}

export const moduleArr = [
  {
    label: '处理节点一号',
    value: 'dataProcessing',
  },
  {
    label: '输出节点一号',
    value: 'metadataOutput',
  },
  {
    label: '输出节点三号',
    value: 'dataSetoutput',
  },
  {
    label: '输入节点一号',
    value: 'dataSource',
  },
  {
    label: '输出节点二号',
    value: 'indexOutput',
  },
  {
    label: '输出节点四号',
    value: 'dataOutput',
  },
]




