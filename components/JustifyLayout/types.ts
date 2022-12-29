// 搜索条件
export interface SearchModuleParams {
  // 标签
  tags?: string[];
  //   尺寸
  size?: {
    width: {
      min: number;
      max: number;
    };
    height: {
      min: number;
      max: number;
    };
  };
}
