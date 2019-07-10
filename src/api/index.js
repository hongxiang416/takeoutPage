import ajax from './ajax'

const BASE_URL = '/api'

// 1、登录
export const reqLogin = ({account, password}) => ajax(BASE_URL + '/login', {account, password}, 'POST')

// 2、注册
export const reqSignup = ({account, name, password, code, mail}) => ajax(BASE_URL + '/user/signup', {account, name, password, code, mail}, 'POST')

// 3、改变用户状态
export const reqChangeUser = (account) => ajax(BASE_URL + '/user/change', {account}, 'POST')

// 4、获取所有用户状态
export const reqGetUserState = () => ajax(BASE_URL + '/user/states')

// 5、获取菜单
export const reqGetAllMenu = () => ajax(BASE_URL + '/menu/get')

// 6、添加菜品
export const reqAddMenu =(menu) => ajax(BASE_URL + '/menu/add', {
  name: menu.name,
  menuid: menu.menuid,
  description: menu.description,
  price: menu.price,
  stock: menu.stock,
  picture: menu.picture
  }, 'POST')

// 7、修改菜单
export const reqModifyMenu = (menu, newmenuid, picture) => ajax(BASE_URL + '/menu/modify', {
  name: menu.name,
  menuid: menu.menuid,
  newmenuid: newmenuid,
  description: menu.description,
  price: menu.price,
  stock: menu.stock,
  picture: menu.picture
}, 'POST')

// 8、获得相应用户订单
export const reqGetOrder = (account) => ajax(BASE_URL + '/order/get', {account}, 'POST')

// 9、添加订单
export const reqAddOrder = (orders) => ajax(BASE_URL + '/order/add', {orders}, 'POST')

// 10、获得所有订单
export const reqGetAllOrder = () => ajax(BASE_URL + '/order/getall')

// 11、搜索菜品
export const reqSearchMenu = (filter) => ajax(BASE_URL + '/menu/search', {filter})

// 12、删除上传的菜品图片
export const reqDeleteImg = (filename) => ajax(BASE_URL + '/delete', {filename})

// 13、获取菜品详情
export const reqGetMenuDetail = (menuId) => ajax(BASE_URL + '/menu/detail', {menuId})

// 14、删除菜品
export const reqDeleteMenu = (menuId) => ajax(BASE_URL + '/menu/delete', {menuId})

// 15、判断用户最近是否登录
export const reqInitLogin = () => ajax(BASE_URL + '/user/init')

// 16、用户登出
export const reqLogout = () => ajax(BASE_URL + '/logout')

// 17、搜索订单
export const reqSearchOrder = (filter) => ajax(BASE_URL + '/order/search', {filter})

// 18、日期筛选订单
export const reqDateOrderFilter = (beginDate, endDate, account) => ajax(BASE_URL + '/order/date', {beginDate, endDate, account})

// 19、日期筛选订单详情
export const reqDateDetailOrderFilter = (beginDate, endDate, account) => ajax(BASE_URL + '/order/dateDetail', {beginDate, endDate, account})

// 20、请求手机短信验证码
export const reqPhoneCode = (phoneNumber) => ajax(BASE_URL+ '/user/code', {phoneNumber})

// 21、请求发送找回密码的电子邮件
export const reqSendMail = (phoneNumber) => ajax(BASE_URL+ '/mail', {phoneNumber})
