import _ from 'lodash'
import print from './print'

import './index.css'
import './common/css/common.css'
import jpg from './test.jpg'
console.log(jpg)
import Data from './data.xml'
console.log(Data)
function component() {
  var
    element = document.createElement('div'),

    // 将图像添加到我们现有的 div。
    myIcon = new Image()

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.classList.add('hello')



  myIcon.src = jpg
  element.appendChild(myIcon)
  return element
}
print()
document.body.appendChild(component())
