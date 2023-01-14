# Image 参考

## `POST` /api/image

获取图片列表

- query
  - page - 当前页
  - pageSize - 每页多少条
- body
  - tags - `string[]` (可选) 包含标签
  - noTags - `boolean` (可选) 未添加标签
  - size - [Size](#size) (可选) 宽高
  - annotation - `string` (可选) 注释
  - orderBy - [Order](#orderby) (可选) 根据 filed 字段 排序
  - ext - `string` (可选) 扩展名
  - star - `number` (可选) 评级
  - isDeleted - `boolean` (可选) 删除，回收站
  - includes - `string[]` (可选) 包含返回的字段

## `GET` /api/image/folder/[id]

根据文件夹查询图片

- query

  - page - 当前页
  - pageSize - 每页多少条

## `GET` /api/image/random

随机获取一张图片 redirect 重定向到图片

---

### Interface 类型

### Size

```typescript
interface Size {
  width: {
    min: number;
    max: number;
  };
  height: {
    min: number;
    max: number;
  };
}
```

### OrderBy

```typescript
interface OrderBy {
  field: string;
  by: "desc" | "asc";
}
```

### Response

```typescript
interface Response {
  count: number;
  size: number;
  page: number;
  pageSize: number;
  data: Image[];
  // prisma 查询条件
  where: any;
}
```
