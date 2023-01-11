# Image 参考

## `POST` /api/image/list

获取图片列表

- query
  - page - 当前页
  - pageSize - 每页多少条
- body
  - tags - `string[]`(可选) 包含标签
  - size - [Size](#size) (可选) 宽高
  - orderBy - [Order](#orderby) (可选) 根据 filed 字段 排序
  - includes - `string[]` (可选) 包含返回的字段

## `GET` /api/image/not-tag

获取未标签图片

- query
  - page - 当前页
  - pageSize - 每页多少条

## `GET` /api/image/recycle

已删除/回收站

- query
  - page - 当前页
  - pageSize - 每页多少条

## `GET` /api/image/folder/[id]

根据文件夹查询图片

- query

  - page - 当前页
  - pageSize - 每页多少条

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
