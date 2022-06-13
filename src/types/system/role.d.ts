/**用户管理添加 */
export interface useraddFrom {
  mail: sgtring;
  remark: string;
  status: number;
  telephone: string;
  username: string
}
/**用户权限路由类型声明 */
export interface groupModule {
  groupId: string;
  moduleIdList: Array
}
export interface gropFormData {
  groupCode: string;
  groupName: string;
  tip: string
}
/**用户列表查询 */
export interface userqueyFrom {
  pageIndex: number;
  pageSize: number;
  name: string
}
