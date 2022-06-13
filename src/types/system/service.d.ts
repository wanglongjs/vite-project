/**
 * 分销等级类型
 */
export interface gradeaddFrom {
  level: number;//个人等级配置实体
  name: string;//等级名称,示例值(合伙人)
  thresholdHigh: number;//最高门槛,示例值(2000)
  thresholdLow: number;//	最低门槛,示例值(1000)
}
/**分销设置类型 */
export interface directSettFrom {
  enable: boolean,
  proportion: number,
  type: null
}
/**人才管理 */