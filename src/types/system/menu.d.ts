/**菜单管理列表查询 */
export interface parmasQuery {
  limit: number | string;
  page: number | string;
  name: string;
}
/**新增路由 */
export interface menuFromData {
  alwaysShow: boolean;
  assembly: string;
  centreId: string;
  formId: string;
  hidden: boolean;
  hiddenChildren: number | string;
  icon: string;
  imIcon: string;
  isCentreShow: number;
  isCentreUpdate: number | string;
  isCustom: number | string;
  isTool: number,
  name: string;
  parentId: string;
  redirect: string;
  sortNum: string;
  type: number;
  url: string
}