

/*
  请求域名
*/ 


// 生产域名
// const HOST = 'https://citytvadmin.smgtech.net';

// 测试域名
// const HOST = 'https://citytvadmin-test.smgtech.net';

// 开发域名
// const HOST = 'http://anboguanli-dev.smgtech.net';

// 本地代理
const HOST = '';


/*
  接口路由
*/
const PATH = '/admin/web/index.php?r=';


/*
  接口地址
*/

// 巡检管理
const inspection = {
  index: HOST + PATH + 'tempxj/index',                      // 公共模板列表
  list: HOST + PATH + 'tempxj/list',                        // 科组获板列表（根据科组ID 如：depart_id=32）
  searchbycircle: HOST + PATH + 'tempxj/searchbycircle',    // 查询模板 按模板ID、名称、周期查询模板列表（如：depart_id=B657&circle_id=all&name=测试&template_id=XJ20200117164123，[depart_id=public 搜素公共模板默认值]）
  tempinfo: HOST + PATH + 'tempxj/tempinfo',                // 新增模板固定信息
  subcat: HOST + PATH + 'tempxj/subcat',                    // 根据对象父类id查询子分类（根据巡检类别ID 如：category_id=1000）
  indexlist: HOST + PATH + 'tempxj/indexlist',              // 获取指标列表
  addtemp: HOST + PATH + 'tempxj/addtemp',                  // 新增模板
  deltemp: HOST + PATH + 'tempxj/deltemp',                  // 删除模板（参数：template_id=XJMB20200207124129）
  tempdetail: HOST + PATH + 'tempxj/tempdetail',            // 模板详情（根据模板ID 如：template_id=XJ20200117164123）
  addindex: HOST + PATH + 'tempxj/addindex',                // 新增指标（参数： 一种情况：type为1和3（单选、下拉） 参数：name=指标1&type=1&value=正常;不正常 二种情况：type为2 参数：name=指标1&type=2&up_value=100&down_value=20）
  editindex: HOST + PATH + 'tempxj/editindex',              // 编辑指标（参数： 一种情况：type为1和3（单选、下拉） 参数：index_id=1&name=指标1&type=1&value=正常;不正常，二种情况：type为2 参数：index_id=2&name=指标1&type=2&up_value=100&down_value=20）
  delindex: HOST + PATH + 'tempxj/delindex',                // 删除指标（参数：template_id=XJMB20200207124129）
  createbill: HOST + PATH + 'tempxj/createbill',            // 创建巡检单（参数：template_id=XJMB20200207124129）
  myxjbill: HOST + PATH + 'tempxj/myxjbill',                // 我的巡检单列表
  circlelist: HOST + PATH + 'tempxj/circlelist',            // 周期列表
  userbydep: HOST + PATH + 'tempxj/userbydep',              // 科组人员列表
  check: HOST + PATH + 'tempxj/check',              // 复核
  departxjbill: HOST + PATH + 'tempxj/departxjbill',        // 未完成巡检单列表
  allxjbill: HOST + PATH + 'tempxj/allxjbill',              // 全部巡检单列表
  searchbill: HOST + PATH + 'tempxj/searchbill',            // 按单号ID、名称、日期查询巡检单（参数：xj_task_id、name、date）
  xjbilldetail: HOST + PATH + 'tempxj/xjbilldetail',        // 巡检单详情（参数：xj_task_id=XJF20200205181730）
  delbill: HOST + PATH + 'tempxj/delbill',                  // 删除巡检（参数：xj_task_id=XJF20200205181730）
  addbill: HOST + PATH + 'tempxj/addbill',                  // 保存巡检（参数：xj_task_id=XJF20200205181730&list=[]）
  submitbill: HOST + PATH + 'tempxj/submitbill',            // 提交巡检（参数：xj_task_id=XJF20200205181730&list=[]）
}

// 权限管理
const auth = {
  login: HOST + PATH + 'user/login',                        // 登录接口
  departmentinfo: HOST + PATH + 'user/departmentinfo',      // 权限中心部门信息接口
  setrole: HOST + PATH + 'user/setrole',                    // 根据工号设置权限接口 (参数：user_smgid=01810733&is_admin=1&list=[{"depart_id":"1","is_template":"1","is_xj":"1","is_unexpected":"1","is_email":"1"}])
  roleinfo: HOST + PATH + 'user/roleinfo'                   // 根据工号查询权限接口 (参数：user_smgid=01810733)
}

// 异态管理
const abnormal = {
  index: HOST + PATH + 'unexpect/index',                    // 获取异态报告列表接口
  searchreport: HOST + PATH + 'unexpect/searchreport',      // 搜索异态报告列表接口
  detail: HOST + PATH + 'unexpect/detail',                  // 异态报告详情接口
  addreport: HOST + PATH + 'unexpect/addreport',            // 提交异态报告接口
  delreport: HOST + PATH + 'unexpect/delreport',            // 删除异态报告接口
  typelist: HOST + PATH + 'unexpect/typelist',             // 异态故障类型列表接口
  createreport: HOST + PATH + 'unexpect/createreport',     // 异态故障类型(第一步)接口
  savesp: HOST + PATH + 'unexpect/savesp',                  // 异态故障类型(第二步)接口
  applyloop: HOST + PATH + 'unexpect/applyloop',           // 异态故障类型(第三步)接口
  loop: HOST + PATH + 'unexpect/loop',                   // 异态故障类型(四步)接口
  export: HOST + PATH + 'unexpect/export',                    // 异态报告导出接口
  billListByReport: HOST + PATH + 'systembill/bill-list-by-report',                    // 系统列表名称接口
  classlist: HOST + PATH + 'unexpect/class-list'                    // 异态分类名称接口
}

// 应急演练
const exercise = {
  index: HOST + PATH + 'urgent/index',                    // 获取应急演练列表接口
  addurgent: HOST + PATH + 'urgent/addurgent',            // 保存提交应急演练接口
  detail: HOST + PATH + 'urgent/detail',                  // 应急演练详情接口
  drilltype: HOST + PATH + 'urgent/drilltype',            // 应急演练形式接口
  delurgent: HOST + PATH + 'urgent/delurgent',            // 删除应急演练报告接口
  downfile: HOST + PATH + 'urgent/downfile',            // 应急演练下载附件接口
  upload: HOST + PATH + 'urgent/upload'             // 应急演练请求附件是否成功接口
}

// 综述管理
const overview = {
  index: HOST + PATH + 'summary/index',                    // 获取综述管理列表接口
  addsummary: HOST + PATH + 'summary/addsummary',         // 保存提交综述管理列表接口
  detail: HOST + PATH + 'summary/detail',                  // 综述管理详情接口
  delsummary: HOST + PATH + 'summary/delsummary',            // 删除综述管理报告接口
  typelist: HOST + PATH + 'summary/typelist'             // 综述管理类型接口
}

// 系统清单
const checklist = {
  index: HOST + PATH + 'systembill/index',                    // 获取系统清单列表接口
  billtypelist: HOST + PATH + 'systembill/billtypelist',      // 获取系统清单类型列表接口
  addsystem: HOST + PATH + 'systembill/addsystem',         // 保存提交系统清单列表接口
  detail: HOST + PATH + 'systembill/detail',                  // 系统清单详情接口
  delsystem: HOST + PATH + 'systembill/delsystem'             // 删除系统清单报告接口
}
const index = {
  index: HOST + PATH + 'home/index', //栏目列表
  info: HOST + PATH + 'api/info'//背景图
}

// 节目回看首页
const videoBack = {
  index: HOST + PATH + 'api/index', //栏目列表
  info: HOST + PATH + 'api/info'//背景图
}

// 节目回看列表
const videoList = {
  getone: HOST + PATH + 'api/getone', //栏目内容
}

// 节目回看详情
const videoPlay = {
  play: HOST + PATH + 'api/play', //节目详情
  zan: HOST + PATH + 'api/zan'   //用户点赞
}

// 答题赚积分
const answer = {
  now: HOST + PATH + 'answer/now', //进行中答题
  submit: HOST + PATH + 'answer/submit', //进行中提交答题
  history: HOST + PATH + 'answer/history', //历史答题列表
  detail: HOST + PATH + 'answer/detail', //历史答题详情
}

// 签到赚积分
const checkIn = {
  sign: HOST + PATH + 'signin/sign', //签到
  signlist: HOST + PATH + 'signin/signlist', //签到列表
}

// 积分商城
const integralMall = {
  index: HOST + PATH + 'scoremall/index', //商品列表
}

// 商品详情
const goodsDetail = {
  detail: HOST + PATH + 'scoremall/detail', //商品详情
  exchange: HOST + PATH + 'scoremall/exchange', //商品兑换/抽奖
}

// 城市活动
const cityActivity = {
  index: HOST + PATH + 'activity/index', //活动列表
}

// 活动详情
const activityDetail = {
  info: HOST + PATH + 'activity/info', //活动详情
  upload: HOST + PATH + 'activity/upload', //文件上传
  submit: HOST + PATH + 'activity/submit', //活动提交
}

// 我的资料
const myMaterial = {
  userinfo: HOST + PATH + 'users/userinfo', //我的信息
  register: HOST + PATH + 'users/register', //保存信息
}

// 我的积分
const myIntegral = {
  scorerecord: HOST + PATH + 'signin/scorerecord', //积分记录
  myexchange: HOST + PATH + 'scoremall/myexchange', //兑换记录
}

// 我的活动
const myActivity = {
  myanswerlist: HOST + PATH + 'answer/myanswerlist', //答题记录
  myactivity: HOST + PATH + 'activity/myactivity', //报名记录
}



module.exports = {
  inspection,
  index,
  videoBack,
  exercise,
  overview,
  checklist,
  videoList,
  videoPlay,
  answer,
  checkIn,
  integralMall,
  goodsDetail,
  cityActivity,
  activityDetail,
  myMaterial,
  myIntegral,
  myActivity,
  auth,
  abnormal
};