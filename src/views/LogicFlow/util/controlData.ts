import { ref } from 'vue'
import disIcon1 from '../images/btnIcon/disIcon1.png'
import disIcon2 from '../images/btnIcon/disIcon2.png'
import icon1 from '../images/btnIcon/icon1.png'
import icon2 from '../images/btnIcon/icon2.png'
import icon3 from '../images/btnIcon/icon3.png'
import icon4 from '../images/btnIcon/icon4.png'
import icon5 from '../images/btnIcon/icon5.png'
import icon6 from '../images/btnIcon/icon6.png'
import icon7 from '../images/btnIcon/icon7.png'

export const controlData = (lf: any, clear: Function) => {
    const tabList = ref([
        { icon: icon1, label: '上一步', type: 'up', disIcon: disIcon1 },
        { icon: icon2, label: '下一步', type: 'dowm', disIcon: disIcon2 },
        { icon: icon3, label: '缩小', type: 'minification' },
        { icon: icon4, label: '放大', type: 'blow' },
        { icon: icon6, label: '大小适应', type: 'adapt' },
        { icon: icon7, label: '定位还原', type: 'orientation' },
        { icon: icon5, label: '清空', type: 'clear' },
    ])

    let undoDisable = ref(true)
    let redoDisable = ref(true)

    const doClick = (type: any) => {
        if (type == 'up') {
            lf.value?.undo()
        } else if (type == 'dowm') {
            lf.value?.redo()
        } else if (type == 'minification') {
            lf.value?.zoom(false)
            lf.value?.translateCenter()
        } else if (type == 'blow') {
            lf.value?.zoom(true)
            lf.value?.translateCenter()
        } else if (type == 'clear') {
            clear()
        } else if (type == 'adapt') {
            lf.value?.resetZoom()
        } else if (type == 'orientation') {
            lf.value?.resetZoom()
            lf.value?.translateCenter()
        }
    }

    return {
        tabList, undoDisable, redoDisable, doClick
    }
}

