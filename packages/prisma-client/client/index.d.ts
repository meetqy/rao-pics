
/**
 * Client
**/

import * as runtime from './runtime/library';
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends Prisma.PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Image
 * 
 */
export type Image = {
  id: string
  name: string
  size: number
  btime: bigint
  mtime: bigint
  modificationTime: bigint
  ext: string
  url: string
  annotation: string
  width: number
  height: number
  metadataMTime: bigint | null
  star: number | null
  palettes: string | null
  lastModified: bigint | null
  deletedTime: bigint | null
  isDeleted: boolean | null
  resolutionWidth: number | null
  resolutionHeight: number | null
  duration: string | null
  nsfw: boolean | null
  processingPalette: boolean | null
  noThumbnail: boolean | null
}

/**
 * Model Tag
 * 
 */
export type Tag = {
  id: string
  name: string
  starred: boolean
}

/**
 * Model Folder
 * 
 */
export type Folder = {
  id: string
  name: string
  description: string
  pid: string | null
  modificationTime: bigint
  iconColor: string | null
  icon: string | null
  password: string
  passwordTips: string
}

/**
 * Model TagsGroups
 * 
 */
export type TagsGroups = {
  id: string
  name: string
  color: string | null
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Images
 * const images = await prisma.image.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Images
   * const images = await prisma.image.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<this, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>

      /**
   * `prisma.image`: Exposes CRUD operations for the **Image** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Images
    * const images = await prisma.image.findMany()
    * ```
    */
  get image(): Prisma.ImageDelegate<GlobalReject>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<GlobalReject>;

  /**
   * `prisma.folder`: Exposes CRUD operations for the **Folder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Folders
    * const folders = await prisma.folder.findMany()
    * ```
    */
  get folder(): Prisma.FolderDelegate<GlobalReject>;

  /**
   * `prisma.tagsGroups`: Exposes CRUD operations for the **TagsGroups** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TagsGroups
    * const tagsGroups = await prisma.tagsGroups.findMany()
    * ```
    */
  get tagsGroups(): Prisma.TagsGroupsDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.11.0
   * Query Engine version: 8fde8fef4033376662cad983758335009d522acb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: runtime.Types.Utils.LegacyExact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Image: 'Image',
    Tag: 'Tag',
    Folder: 'Folder',
    TagsGroups: 'TagsGroups'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ImageCountOutputType
   */


  export type ImageCountOutputType = {
    folders: number
    tags: number
  }

  export type ImageCountOutputTypeSelect = {
    folders?: boolean
    tags?: boolean
  }

  export type ImageCountOutputTypeGetPayload<S extends boolean | null | undefined | ImageCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ImageCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ImageCountOutputTypeArgs)
    ? ImageCountOutputType 
    : S extends { select: any } & (ImageCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof ImageCountOutputType ? ImageCountOutputType[P] : never
  } 
      : ImageCountOutputType




  // Custom InputTypes

  /**
   * ImageCountOutputType without action
   */
  export type ImageCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ImageCountOutputType
     */
    select?: ImageCountOutputTypeSelect | null
  }



  /**
   * Count Type TagCountOutputType
   */


  export type TagCountOutputType = {
    tagsGroups: number
    images: number
  }

  export type TagCountOutputTypeSelect = {
    tagsGroups?: boolean
    images?: boolean
  }

  export type TagCountOutputTypeGetPayload<S extends boolean | null | undefined | TagCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TagCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (TagCountOutputTypeArgs)
    ? TagCountOutputType 
    : S extends { select: any } & (TagCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof TagCountOutputType ? TagCountOutputType[P] : never
  } 
      : TagCountOutputType




  // Custom InputTypes

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect | null
  }



  /**
   * Count Type FolderCountOutputType
   */


  export type FolderCountOutputType = {
    images: number
  }

  export type FolderCountOutputTypeSelect = {
    images?: boolean
  }

  export type FolderCountOutputTypeGetPayload<S extends boolean | null | undefined | FolderCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? FolderCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (FolderCountOutputTypeArgs)
    ? FolderCountOutputType 
    : S extends { select: any } & (FolderCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof FolderCountOutputType ? FolderCountOutputType[P] : never
  } 
      : FolderCountOutputType




  // Custom InputTypes

  /**
   * FolderCountOutputType without action
   */
  export type FolderCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the FolderCountOutputType
     */
    select?: FolderCountOutputTypeSelect | null
  }



  /**
   * Count Type TagsGroupsCountOutputType
   */


  export type TagsGroupsCountOutputType = {
    tags: number
  }

  export type TagsGroupsCountOutputTypeSelect = {
    tags?: boolean
  }

  export type TagsGroupsCountOutputTypeGetPayload<S extends boolean | null | undefined | TagsGroupsCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TagsGroupsCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (TagsGroupsCountOutputTypeArgs)
    ? TagsGroupsCountOutputType 
    : S extends { select: any } & (TagsGroupsCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof TagsGroupsCountOutputType ? TagsGroupsCountOutputType[P] : never
  } 
      : TagsGroupsCountOutputType




  // Custom InputTypes

  /**
   * TagsGroupsCountOutputType without action
   */
  export type TagsGroupsCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the TagsGroupsCountOutputType
     */
    select?: TagsGroupsCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Image
   */


  export type AggregateImage = {
    _count: ImageCountAggregateOutputType | null
    _avg: ImageAvgAggregateOutputType | null
    _sum: ImageSumAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  export type ImageAvgAggregateOutputType = {
    size: number | null
    btime: number | null
    mtime: number | null
    modificationTime: number | null
    width: number | null
    height: number | null
    metadataMTime: number | null
    star: number | null
    lastModified: number | null
    deletedTime: number | null
    resolutionWidth: number | null
    resolutionHeight: number | null
  }

  export type ImageSumAggregateOutputType = {
    size: number | null
    btime: bigint | null
    mtime: bigint | null
    modificationTime: bigint | null
    width: number | null
    height: number | null
    metadataMTime: bigint | null
    star: number | null
    lastModified: bigint | null
    deletedTime: bigint | null
    resolutionWidth: number | null
    resolutionHeight: number | null
  }

  export type ImageMinAggregateOutputType = {
    id: string | null
    name: string | null
    size: number | null
    btime: bigint | null
    mtime: bigint | null
    modificationTime: bigint | null
    ext: string | null
    url: string | null
    annotation: string | null
    width: number | null
    height: number | null
    metadataMTime: bigint | null
    star: number | null
    palettes: string | null
    lastModified: bigint | null
    deletedTime: bigint | null
    isDeleted: boolean | null
    resolutionWidth: number | null
    resolutionHeight: number | null
    duration: string | null
    nsfw: boolean | null
    processingPalette: boolean | null
    noThumbnail: boolean | null
  }

  export type ImageMaxAggregateOutputType = {
    id: string | null
    name: string | null
    size: number | null
    btime: bigint | null
    mtime: bigint | null
    modificationTime: bigint | null
    ext: string | null
    url: string | null
    annotation: string | null
    width: number | null
    height: number | null
    metadataMTime: bigint | null
    star: number | null
    palettes: string | null
    lastModified: bigint | null
    deletedTime: bigint | null
    isDeleted: boolean | null
    resolutionWidth: number | null
    resolutionHeight: number | null
    duration: string | null
    nsfw: boolean | null
    processingPalette: boolean | null
    noThumbnail: boolean | null
  }

  export type ImageCountAggregateOutputType = {
    id: number
    name: number
    size: number
    btime: number
    mtime: number
    modificationTime: number
    ext: number
    url: number
    annotation: number
    width: number
    height: number
    metadataMTime: number
    star: number
    palettes: number
    lastModified: number
    deletedTime: number
    isDeleted: number
    resolutionWidth: number
    resolutionHeight: number
    duration: number
    nsfw: number
    processingPalette: number
    noThumbnail: number
    _all: number
  }


  export type ImageAvgAggregateInputType = {
    size?: true
    btime?: true
    mtime?: true
    modificationTime?: true
    width?: true
    height?: true
    metadataMTime?: true
    star?: true
    lastModified?: true
    deletedTime?: true
    resolutionWidth?: true
    resolutionHeight?: true
  }

  export type ImageSumAggregateInputType = {
    size?: true
    btime?: true
    mtime?: true
    modificationTime?: true
    width?: true
    height?: true
    metadataMTime?: true
    star?: true
    lastModified?: true
    deletedTime?: true
    resolutionWidth?: true
    resolutionHeight?: true
  }

  export type ImageMinAggregateInputType = {
    id?: true
    name?: true
    size?: true
    btime?: true
    mtime?: true
    modificationTime?: true
    ext?: true
    url?: true
    annotation?: true
    width?: true
    height?: true
    metadataMTime?: true
    star?: true
    palettes?: true
    lastModified?: true
    deletedTime?: true
    isDeleted?: true
    resolutionWidth?: true
    resolutionHeight?: true
    duration?: true
    nsfw?: true
    processingPalette?: true
    noThumbnail?: true
  }

  export type ImageMaxAggregateInputType = {
    id?: true
    name?: true
    size?: true
    btime?: true
    mtime?: true
    modificationTime?: true
    ext?: true
    url?: true
    annotation?: true
    width?: true
    height?: true
    metadataMTime?: true
    star?: true
    palettes?: true
    lastModified?: true
    deletedTime?: true
    isDeleted?: true
    resolutionWidth?: true
    resolutionHeight?: true
    duration?: true
    nsfw?: true
    processingPalette?: true
    noThumbnail?: true
  }

  export type ImageCountAggregateInputType = {
    id?: true
    name?: true
    size?: true
    btime?: true
    mtime?: true
    modificationTime?: true
    ext?: true
    url?: true
    annotation?: true
    width?: true
    height?: true
    metadataMTime?: true
    star?: true
    palettes?: true
    lastModified?: true
    deletedTime?: true
    isDeleted?: true
    resolutionWidth?: true
    resolutionHeight?: true
    duration?: true
    nsfw?: true
    processingPalette?: true
    noThumbnail?: true
    _all?: true
  }

  export type ImageAggregateArgs = {
    /**
     * Filter which Image to aggregate.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: Enumerable<ImageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Images
    **/
    _count?: true | ImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImageMaxAggregateInputType
  }

  export type GetImageAggregateType<T extends ImageAggregateArgs> = {
        [P in keyof T & keyof AggregateImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImage[P]>
      : GetScalarType<T[P], AggregateImage[P]>
  }




  export type ImageGroupByArgs = {
    where?: ImageWhereInput
    orderBy?: Enumerable<ImageOrderByWithAggregationInput>
    by: ImageScalarFieldEnum[]
    having?: ImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImageCountAggregateInputType | true
    _avg?: ImageAvgAggregateInputType
    _sum?: ImageSumAggregateInputType
    _min?: ImageMinAggregateInputType
    _max?: ImageMaxAggregateInputType
  }


  export type ImageGroupByOutputType = {
    id: string
    name: string
    size: number
    btime: bigint
    mtime: bigint
    modificationTime: bigint
    ext: string
    url: string
    annotation: string
    width: number
    height: number
    metadataMTime: bigint | null
    star: number | null
    palettes: string | null
    lastModified: bigint | null
    deletedTime: bigint | null
    isDeleted: boolean | null
    resolutionWidth: number | null
    resolutionHeight: number | null
    duration: string | null
    nsfw: boolean | null
    processingPalette: boolean | null
    noThumbnail: boolean | null
    _count: ImageCountAggregateOutputType | null
    _avg: ImageAvgAggregateOutputType | null
    _sum: ImageSumAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  type GetImageGroupByPayload<T extends ImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImageGroupByOutputType[P]>
            : GetScalarType<T[P], ImageGroupByOutputType[P]>
        }
      >
    >


  export type ImageSelect = {
    id?: boolean
    name?: boolean
    size?: boolean
    btime?: boolean
    mtime?: boolean
    modificationTime?: boolean
    ext?: boolean
    url?: boolean
    annotation?: boolean
    width?: boolean
    height?: boolean
    metadataMTime?: boolean
    star?: boolean
    palettes?: boolean
    lastModified?: boolean
    deletedTime?: boolean
    isDeleted?: boolean
    resolutionWidth?: boolean
    resolutionHeight?: boolean
    duration?: boolean
    nsfw?: boolean
    processingPalette?: boolean
    noThumbnail?: boolean
    folders?: boolean | Image$foldersArgs
    tags?: boolean | Image$tagsArgs
    _count?: boolean | ImageCountOutputTypeArgs
  }


  export type ImageInclude = {
    folders?: boolean | Image$foldersArgs
    tags?: boolean | Image$tagsArgs
    _count?: boolean | ImageCountOutputTypeArgs
  }

  export type ImageGetPayload<S extends boolean | null | undefined | ImageArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Image :
    S extends undefined ? never :
    S extends { include: any } & (ImageArgs | ImageFindManyArgs)
    ? Image  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'folders' ? Array < FolderGetPayload<S['include'][P]>>  :
        P extends 'tags' ? Array < TagGetPayload<S['include'][P]>>  :
        P extends '_count' ? ImageCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ImageArgs | ImageFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'folders' ? Array < FolderGetPayload<S['select'][P]>>  :
        P extends 'tags' ? Array < TagGetPayload<S['select'][P]>>  :
        P extends '_count' ? ImageCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Image ? Image[P] : never
  } 
      : Image


  type ImageCountArgs = 
    Omit<ImageFindManyArgs, 'select' | 'include'> & {
      select?: ImageCountAggregateInputType | true
    }

  export interface ImageDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Image that matches the filter.
     * @param {ImageFindUniqueArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ImageFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ImageFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Image'> extends True ? Prisma__ImageClient<ImageGetPayload<T>> : Prisma__ImageClient<ImageGetPayload<T> | null, null>

    /**
     * Find one Image that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ImageFindUniqueOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ImageFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ImageFindUniqueOrThrowArgs>
    ): Prisma__ImageClient<ImageGetPayload<T>>

    /**
     * Find the first Image that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ImageFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ImageFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Image'> extends True ? Prisma__ImageClient<ImageGetPayload<T>> : Prisma__ImageClient<ImageGetPayload<T> | null, null>

    /**
     * Find the first Image that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ImageFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ImageFindFirstOrThrowArgs>
    ): Prisma__ImageClient<ImageGetPayload<T>>

    /**
     * Find zero or more Images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Images
     * const images = await prisma.image.findMany()
     * 
     * // Get first 10 Images
     * const images = await prisma.image.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const imageWithIdOnly = await prisma.image.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ImageFindManyArgs>(
      args?: SelectSubset<T, ImageFindManyArgs>
    ): Prisma.PrismaPromise<Array<ImageGetPayload<T>>>

    /**
     * Create a Image.
     * @param {ImageCreateArgs} args - Arguments to create a Image.
     * @example
     * // Create one Image
     * const Image = await prisma.image.create({
     *   data: {
     *     // ... data to create a Image
     *   }
     * })
     * 
    **/
    create<T extends ImageCreateArgs>(
      args: SelectSubset<T, ImageCreateArgs>
    ): Prisma__ImageClient<ImageGetPayload<T>>

    /**
     * Delete a Image.
     * @param {ImageDeleteArgs} args - Arguments to delete one Image.
     * @example
     * // Delete one Image
     * const Image = await prisma.image.delete({
     *   where: {
     *     // ... filter to delete one Image
     *   }
     * })
     * 
    **/
    delete<T extends ImageDeleteArgs>(
      args: SelectSubset<T, ImageDeleteArgs>
    ): Prisma__ImageClient<ImageGetPayload<T>>

    /**
     * Update one Image.
     * @param {ImageUpdateArgs} args - Arguments to update one Image.
     * @example
     * // Update one Image
     * const image = await prisma.image.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ImageUpdateArgs>(
      args: SelectSubset<T, ImageUpdateArgs>
    ): Prisma__ImageClient<ImageGetPayload<T>>

    /**
     * Delete zero or more Images.
     * @param {ImageDeleteManyArgs} args - Arguments to filter Images to delete.
     * @example
     * // Delete a few Images
     * const { count } = await prisma.image.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ImageDeleteManyArgs>(
      args?: SelectSubset<T, ImageDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ImageUpdateManyArgs>(
      args: SelectSubset<T, ImageUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Image.
     * @param {ImageUpsertArgs} args - Arguments to update or create a Image.
     * @example
     * // Update or create a Image
     * const image = await prisma.image.upsert({
     *   create: {
     *     // ... data to create a Image
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Image we want to update
     *   }
     * })
    **/
    upsert<T extends ImageUpsertArgs>(
      args: SelectSubset<T, ImageUpsertArgs>
    ): Prisma__ImageClient<ImageGetPayload<T>>

    /**
     * Count the number of Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageCountArgs} args - Arguments to filter Images to count.
     * @example
     * // Count the number of Images
     * const count = await prisma.image.count({
     *   where: {
     *     // ... the filter for the Images we want to count
     *   }
     * })
    **/
    count<T extends ImageCountArgs>(
      args?: Subset<T, ImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImageAggregateArgs>(args: Subset<T, ImageAggregateArgs>): Prisma.PrismaPromise<GetImageAggregateType<T>>

    /**
     * Group by Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImageGroupByArgs['orderBy'] }
        : { orderBy?: ImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Image.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ImageClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    folders<T extends Image$foldersArgs= {}>(args?: Subset<T, Image$foldersArgs>): Prisma.PrismaPromise<Array<FolderGetPayload<T>>| Null>;

    tags<T extends Image$tagsArgs= {}>(args?: Subset<T, Image$tagsArgs>): Prisma.PrismaPromise<Array<TagGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Image base type for findUnique actions
   */
  export type ImageFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ImageInclude | null
    /**
     * Filter, which Image to fetch.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image findUnique
   */
  export interface ImageFindUniqueArgs extends ImageFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Image findUniqueOrThrow
   */
  export type ImageFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ImageInclude | null
    /**
     * Filter, which Image to fetch.
     */
    where: ImageWhereUniqueInput
  }


  /**
   * Image base type for findFirst actions
   */
  export type ImageFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ImageInclude | null
    /**
     * Filter, which Image to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: Enumerable<ImageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: Enumerable<ImageScalarFieldEnum>
  }

  /**
   * Image findFirst
   */
  export interface ImageFindFirstArgs extends ImageFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Image findFirstOrThrow
   */
  export type ImageFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ImageInclude | null
    /**
     * Filter, which Image to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: Enumerable<ImageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: Enumerable<ImageScalarFieldEnum>
  }


  /**
   * Image findMany
   */
  export type ImageFindManyArgs = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ImageInclude | null
    /**
     * Filter, which Images to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: Enumerable<ImageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    distinct?: Enumerable<ImageScalarFieldEnum>
  }


  /**
   * Image create
   */
  export type ImageCreateArgs = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ImageInclude | null
    /**
     * The data needed to create a Image.
     */
    data: XOR<ImageCreateInput, ImageUncheckedCreateInput>
  }


  /**
   * Image update
   */
  export type ImageUpdateArgs = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ImageInclude | null
    /**
     * The data needed to update a Image.
     */
    data: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
    /**
     * Choose, which Image to update.
     */
    where: ImageWhereUniqueInput
  }


  /**
   * Image updateMany
   */
  export type ImageUpdateManyArgs = {
    /**
     * The data used to update Images.
     */
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyInput>
    /**
     * Filter which Images to update
     */
    where?: ImageWhereInput
  }


  /**
   * Image upsert
   */
  export type ImageUpsertArgs = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ImageInclude | null
    /**
     * The filter to search for the Image to update in case it exists.
     */
    where: ImageWhereUniqueInput
    /**
     * In case the Image found by the `where` argument doesn't exist, create a new Image with this data.
     */
    create: XOR<ImageCreateInput, ImageUncheckedCreateInput>
    /**
     * In case the Image was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
  }


  /**
   * Image delete
   */
  export type ImageDeleteArgs = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ImageInclude | null
    /**
     * Filter which Image to delete.
     */
    where: ImageWhereUniqueInput
  }


  /**
   * Image deleteMany
   */
  export type ImageDeleteManyArgs = {
    /**
     * Filter which Images to delete
     */
    where?: ImageWhereInput
  }


  /**
   * Image.folders
   */
  export type Image$foldersArgs = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FolderInclude | null
    where?: FolderWhereInput
    orderBy?: Enumerable<FolderOrderByWithRelationInput>
    cursor?: FolderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<FolderScalarFieldEnum>
  }


  /**
   * Image.tags
   */
  export type Image$tagsArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    where?: TagWhereInput
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TagScalarFieldEnum>
  }


  /**
   * Image without action
   */
  export type ImageArgs = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ImageInclude | null
  }



  /**
   * Model Tag
   */


  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    name: string | null
    starred: boolean | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    name: string | null
    starred: boolean | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    starred: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    name?: true
    starred?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
    starred?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    starred?: true
    _all?: true
  }

  export type TagAggregateArgs = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs = {
    where?: TagWhereInput
    orderBy?: Enumerable<TagOrderByWithAggregationInput>
    by: TagScalarFieldEnum[]
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }


  export type TagGroupByOutputType = {
    id: string
    name: string
    starred: boolean
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect = {
    id?: boolean
    name?: boolean
    starred?: boolean
    tagsGroups?: boolean | Tag$tagsGroupsArgs
    images?: boolean | Tag$imagesArgs
    _count?: boolean | TagCountOutputTypeArgs
  }


  export type TagInclude = {
    tagsGroups?: boolean | Tag$tagsGroupsArgs
    images?: boolean | Tag$imagesArgs
    _count?: boolean | TagCountOutputTypeArgs
  }

  export type TagGetPayload<S extends boolean | null | undefined | TagArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Tag :
    S extends undefined ? never :
    S extends { include: any } & (TagArgs | TagFindManyArgs)
    ? Tag  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'tagsGroups' ? Array < TagsGroupsGetPayload<S['include'][P]>>  :
        P extends 'images' ? Array < ImageGetPayload<S['include'][P]>>  :
        P extends '_count' ? TagCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (TagArgs | TagFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'tagsGroups' ? Array < TagsGroupsGetPayload<S['select'][P]>>  :
        P extends 'images' ? Array < ImageGetPayload<S['select'][P]>>  :
        P extends '_count' ? TagCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Tag ? Tag[P] : never
  } 
      : Tag


  type TagCountArgs = 
    Omit<TagFindManyArgs, 'select' | 'include'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TagFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TagFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Tag'> extends True ? Prisma__TagClient<TagGetPayload<T>> : Prisma__TagClient<TagGetPayload<T> | null, null>

    /**
     * Find one Tag that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TagFindUniqueOrThrowArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TagFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TagFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Tag'> extends True ? Prisma__TagClient<TagGetPayload<T>> : Prisma__TagClient<TagGetPayload<T> | null, null>

    /**
     * Find the first Tag that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TagFindFirstOrThrowArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TagFindManyArgs>(
      args?: SelectSubset<T, TagFindManyArgs>
    ): Prisma.PrismaPromise<Array<TagGetPayload<T>>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
    **/
    create<T extends TagCreateArgs>(
      args: SelectSubset<T, TagCreateArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
    **/
    delete<T extends TagDeleteArgs>(
      args: SelectSubset<T, TagDeleteArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TagUpdateArgs>(
      args: SelectSubset<T, TagUpdateArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TagDeleteManyArgs>(
      args?: SelectSubset<T, TagDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TagUpdateManyArgs>(
      args: SelectSubset<T, TagUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
    **/
    upsert<T extends TagUpsertArgs>(
      args: SelectSubset<T, TagUpsertArgs>
    ): Prisma__TagClient<TagGetPayload<T>>

    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TagClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    tagsGroups<T extends Tag$tagsGroupsArgs= {}>(args?: Subset<T, Tag$tagsGroupsArgs>): Prisma.PrismaPromise<Array<TagsGroupsGetPayload<T>>| Null>;

    images<T extends Tag$imagesArgs= {}>(args?: Subset<T, Tag$imagesArgs>): Prisma.PrismaPromise<Array<ImageGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Tag base type for findUnique actions
   */
  export type TagFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUnique
   */
  export interface TagFindUniqueArgs extends TagFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }


  /**
   * Tag base type for findFirst actions
   */
  export type TagFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: Enumerable<TagScalarFieldEnum>
  }

  /**
   * Tag findFirst
   */
  export interface TagFindFirstArgs extends TagFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: Enumerable<TagScalarFieldEnum>
  }


  /**
   * Tag findMany
   */
  export type TagFindManyArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: Enumerable<TagScalarFieldEnum>
  }


  /**
   * Tag create
   */
  export type TagCreateArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }


  /**
   * Tag update
   */
  export type TagUpdateArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }


  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
  }


  /**
   * Tag upsert
   */
  export type TagUpsertArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }


  /**
   * Tag delete
   */
  export type TagDeleteArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }


  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
  }


  /**
   * Tag.tagsGroups
   */
  export type Tag$tagsGroupsArgs = {
    /**
     * Select specific fields to fetch from the TagsGroups
     */
    select?: TagsGroupsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagsGroupsInclude | null
    where?: TagsGroupsWhereInput
    orderBy?: Enumerable<TagsGroupsOrderByWithRelationInput>
    cursor?: TagsGroupsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TagsGroupsScalarFieldEnum>
  }


  /**
   * Tag.images
   */
  export type Tag$imagesArgs = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ImageInclude | null
    where?: ImageWhereInput
    orderBy?: Enumerable<ImageOrderByWithRelationInput>
    cursor?: ImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ImageScalarFieldEnum>
  }


  /**
   * Tag without action
   */
  export type TagArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
  }



  /**
   * Model Folder
   */


  export type AggregateFolder = {
    _count: FolderCountAggregateOutputType | null
    _avg: FolderAvgAggregateOutputType | null
    _sum: FolderSumAggregateOutputType | null
    _min: FolderMinAggregateOutputType | null
    _max: FolderMaxAggregateOutputType | null
  }

  export type FolderAvgAggregateOutputType = {
    modificationTime: number | null
  }

  export type FolderSumAggregateOutputType = {
    modificationTime: bigint | null
  }

  export type FolderMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    pid: string | null
    modificationTime: bigint | null
    iconColor: string | null
    icon: string | null
    password: string | null
    passwordTips: string | null
  }

  export type FolderMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    pid: string | null
    modificationTime: bigint | null
    iconColor: string | null
    icon: string | null
    password: string | null
    passwordTips: string | null
  }

  export type FolderCountAggregateOutputType = {
    id: number
    name: number
    description: number
    pid: number
    modificationTime: number
    iconColor: number
    icon: number
    password: number
    passwordTips: number
    _all: number
  }


  export type FolderAvgAggregateInputType = {
    modificationTime?: true
  }

  export type FolderSumAggregateInputType = {
    modificationTime?: true
  }

  export type FolderMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    pid?: true
    modificationTime?: true
    iconColor?: true
    icon?: true
    password?: true
    passwordTips?: true
  }

  export type FolderMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    pid?: true
    modificationTime?: true
    iconColor?: true
    icon?: true
    password?: true
    passwordTips?: true
  }

  export type FolderCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    pid?: true
    modificationTime?: true
    iconColor?: true
    icon?: true
    password?: true
    passwordTips?: true
    _all?: true
  }

  export type FolderAggregateArgs = {
    /**
     * Filter which Folder to aggregate.
     */
    where?: FolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Folders to fetch.
     */
    orderBy?: Enumerable<FolderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Folders
    **/
    _count?: true | FolderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FolderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FolderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FolderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FolderMaxAggregateInputType
  }

  export type GetFolderAggregateType<T extends FolderAggregateArgs> = {
        [P in keyof T & keyof AggregateFolder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFolder[P]>
      : GetScalarType<T[P], AggregateFolder[P]>
  }




  export type FolderGroupByArgs = {
    where?: FolderWhereInput
    orderBy?: Enumerable<FolderOrderByWithAggregationInput>
    by: FolderScalarFieldEnum[]
    having?: FolderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FolderCountAggregateInputType | true
    _avg?: FolderAvgAggregateInputType
    _sum?: FolderSumAggregateInputType
    _min?: FolderMinAggregateInputType
    _max?: FolderMaxAggregateInputType
  }


  export type FolderGroupByOutputType = {
    id: string
    name: string
    description: string
    pid: string | null
    modificationTime: bigint
    iconColor: string | null
    icon: string | null
    password: string
    passwordTips: string
    _count: FolderCountAggregateOutputType | null
    _avg: FolderAvgAggregateOutputType | null
    _sum: FolderSumAggregateOutputType | null
    _min: FolderMinAggregateOutputType | null
    _max: FolderMaxAggregateOutputType | null
  }

  type GetFolderGroupByPayload<T extends FolderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<FolderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FolderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FolderGroupByOutputType[P]>
            : GetScalarType<T[P], FolderGroupByOutputType[P]>
        }
      >
    >


  export type FolderSelect = {
    id?: boolean
    name?: boolean
    description?: boolean
    pid?: boolean
    modificationTime?: boolean
    iconColor?: boolean
    icon?: boolean
    password?: boolean
    passwordTips?: boolean
    images?: boolean | Folder$imagesArgs
    _count?: boolean | FolderCountOutputTypeArgs
  }


  export type FolderInclude = {
    images?: boolean | Folder$imagesArgs
    _count?: boolean | FolderCountOutputTypeArgs
  }

  export type FolderGetPayload<S extends boolean | null | undefined | FolderArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Folder :
    S extends undefined ? never :
    S extends { include: any } & (FolderArgs | FolderFindManyArgs)
    ? Folder  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'images' ? Array < ImageGetPayload<S['include'][P]>>  :
        P extends '_count' ? FolderCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (FolderArgs | FolderFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'images' ? Array < ImageGetPayload<S['select'][P]>>  :
        P extends '_count' ? FolderCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Folder ? Folder[P] : never
  } 
      : Folder


  type FolderCountArgs = 
    Omit<FolderFindManyArgs, 'select' | 'include'> & {
      select?: FolderCountAggregateInputType | true
    }

  export interface FolderDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Folder that matches the filter.
     * @param {FolderFindUniqueArgs} args - Arguments to find a Folder
     * @example
     * // Get one Folder
     * const folder = await prisma.folder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FolderFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, FolderFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Folder'> extends True ? Prisma__FolderClient<FolderGetPayload<T>> : Prisma__FolderClient<FolderGetPayload<T> | null, null>

    /**
     * Find one Folder that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {FolderFindUniqueOrThrowArgs} args - Arguments to find a Folder
     * @example
     * // Get one Folder
     * const folder = await prisma.folder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FolderFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, FolderFindUniqueOrThrowArgs>
    ): Prisma__FolderClient<FolderGetPayload<T>>

    /**
     * Find the first Folder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderFindFirstArgs} args - Arguments to find a Folder
     * @example
     * // Get one Folder
     * const folder = await prisma.folder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FolderFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, FolderFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Folder'> extends True ? Prisma__FolderClient<FolderGetPayload<T>> : Prisma__FolderClient<FolderGetPayload<T> | null, null>

    /**
     * Find the first Folder that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderFindFirstOrThrowArgs} args - Arguments to find a Folder
     * @example
     * // Get one Folder
     * const folder = await prisma.folder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FolderFindFirstOrThrowArgs>(
      args?: SelectSubset<T, FolderFindFirstOrThrowArgs>
    ): Prisma__FolderClient<FolderGetPayload<T>>

    /**
     * Find zero or more Folders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Folders
     * const folders = await prisma.folder.findMany()
     * 
     * // Get first 10 Folders
     * const folders = await prisma.folder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const folderWithIdOnly = await prisma.folder.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FolderFindManyArgs>(
      args?: SelectSubset<T, FolderFindManyArgs>
    ): Prisma.PrismaPromise<Array<FolderGetPayload<T>>>

    /**
     * Create a Folder.
     * @param {FolderCreateArgs} args - Arguments to create a Folder.
     * @example
     * // Create one Folder
     * const Folder = await prisma.folder.create({
     *   data: {
     *     // ... data to create a Folder
     *   }
     * })
     * 
    **/
    create<T extends FolderCreateArgs>(
      args: SelectSubset<T, FolderCreateArgs>
    ): Prisma__FolderClient<FolderGetPayload<T>>

    /**
     * Delete a Folder.
     * @param {FolderDeleteArgs} args - Arguments to delete one Folder.
     * @example
     * // Delete one Folder
     * const Folder = await prisma.folder.delete({
     *   where: {
     *     // ... filter to delete one Folder
     *   }
     * })
     * 
    **/
    delete<T extends FolderDeleteArgs>(
      args: SelectSubset<T, FolderDeleteArgs>
    ): Prisma__FolderClient<FolderGetPayload<T>>

    /**
     * Update one Folder.
     * @param {FolderUpdateArgs} args - Arguments to update one Folder.
     * @example
     * // Update one Folder
     * const folder = await prisma.folder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FolderUpdateArgs>(
      args: SelectSubset<T, FolderUpdateArgs>
    ): Prisma__FolderClient<FolderGetPayload<T>>

    /**
     * Delete zero or more Folders.
     * @param {FolderDeleteManyArgs} args - Arguments to filter Folders to delete.
     * @example
     * // Delete a few Folders
     * const { count } = await prisma.folder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FolderDeleteManyArgs>(
      args?: SelectSubset<T, FolderDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Folders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Folders
     * const folder = await prisma.folder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FolderUpdateManyArgs>(
      args: SelectSubset<T, FolderUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Folder.
     * @param {FolderUpsertArgs} args - Arguments to update or create a Folder.
     * @example
     * // Update or create a Folder
     * const folder = await prisma.folder.upsert({
     *   create: {
     *     // ... data to create a Folder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Folder we want to update
     *   }
     * })
    **/
    upsert<T extends FolderUpsertArgs>(
      args: SelectSubset<T, FolderUpsertArgs>
    ): Prisma__FolderClient<FolderGetPayload<T>>

    /**
     * Count the number of Folders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderCountArgs} args - Arguments to filter Folders to count.
     * @example
     * // Count the number of Folders
     * const count = await prisma.folder.count({
     *   where: {
     *     // ... the filter for the Folders we want to count
     *   }
     * })
    **/
    count<T extends FolderCountArgs>(
      args?: Subset<T, FolderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FolderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Folder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FolderAggregateArgs>(args: Subset<T, FolderAggregateArgs>): Prisma.PrismaPromise<GetFolderAggregateType<T>>

    /**
     * Group by Folder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FolderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FolderGroupByArgs['orderBy'] }
        : { orderBy?: FolderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FolderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFolderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Folder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__FolderClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    images<T extends Folder$imagesArgs= {}>(args?: Subset<T, Folder$imagesArgs>): Prisma.PrismaPromise<Array<ImageGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Folder base type for findUnique actions
   */
  export type FolderFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FolderInclude | null
    /**
     * Filter, which Folder to fetch.
     */
    where: FolderWhereUniqueInput
  }

  /**
   * Folder findUnique
   */
  export interface FolderFindUniqueArgs extends FolderFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Folder findUniqueOrThrow
   */
  export type FolderFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FolderInclude | null
    /**
     * Filter, which Folder to fetch.
     */
    where: FolderWhereUniqueInput
  }


  /**
   * Folder base type for findFirst actions
   */
  export type FolderFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FolderInclude | null
    /**
     * Filter, which Folder to fetch.
     */
    where?: FolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Folders to fetch.
     */
    orderBy?: Enumerable<FolderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Folders.
     */
    cursor?: FolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Folders.
     */
    distinct?: Enumerable<FolderScalarFieldEnum>
  }

  /**
   * Folder findFirst
   */
  export interface FolderFindFirstArgs extends FolderFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Folder findFirstOrThrow
   */
  export type FolderFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FolderInclude | null
    /**
     * Filter, which Folder to fetch.
     */
    where?: FolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Folders to fetch.
     */
    orderBy?: Enumerable<FolderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Folders.
     */
    cursor?: FolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Folders.
     */
    distinct?: Enumerable<FolderScalarFieldEnum>
  }


  /**
   * Folder findMany
   */
  export type FolderFindManyArgs = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FolderInclude | null
    /**
     * Filter, which Folders to fetch.
     */
    where?: FolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Folders to fetch.
     */
    orderBy?: Enumerable<FolderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Folders.
     */
    cursor?: FolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Folders.
     */
    skip?: number
    distinct?: Enumerable<FolderScalarFieldEnum>
  }


  /**
   * Folder create
   */
  export type FolderCreateArgs = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FolderInclude | null
    /**
     * The data needed to create a Folder.
     */
    data: XOR<FolderCreateInput, FolderUncheckedCreateInput>
  }


  /**
   * Folder update
   */
  export type FolderUpdateArgs = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FolderInclude | null
    /**
     * The data needed to update a Folder.
     */
    data: XOR<FolderUpdateInput, FolderUncheckedUpdateInput>
    /**
     * Choose, which Folder to update.
     */
    where: FolderWhereUniqueInput
  }


  /**
   * Folder updateMany
   */
  export type FolderUpdateManyArgs = {
    /**
     * The data used to update Folders.
     */
    data: XOR<FolderUpdateManyMutationInput, FolderUncheckedUpdateManyInput>
    /**
     * Filter which Folders to update
     */
    where?: FolderWhereInput
  }


  /**
   * Folder upsert
   */
  export type FolderUpsertArgs = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FolderInclude | null
    /**
     * The filter to search for the Folder to update in case it exists.
     */
    where: FolderWhereUniqueInput
    /**
     * In case the Folder found by the `where` argument doesn't exist, create a new Folder with this data.
     */
    create: XOR<FolderCreateInput, FolderUncheckedCreateInput>
    /**
     * In case the Folder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FolderUpdateInput, FolderUncheckedUpdateInput>
  }


  /**
   * Folder delete
   */
  export type FolderDeleteArgs = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FolderInclude | null
    /**
     * Filter which Folder to delete.
     */
    where: FolderWhereUniqueInput
  }


  /**
   * Folder deleteMany
   */
  export type FolderDeleteManyArgs = {
    /**
     * Filter which Folders to delete
     */
    where?: FolderWhereInput
  }


  /**
   * Folder.images
   */
  export type Folder$imagesArgs = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ImageInclude | null
    where?: ImageWhereInput
    orderBy?: Enumerable<ImageOrderByWithRelationInput>
    cursor?: ImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ImageScalarFieldEnum>
  }


  /**
   * Folder without action
   */
  export type FolderArgs = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FolderInclude | null
  }



  /**
   * Model TagsGroups
   */


  export type AggregateTagsGroups = {
    _count: TagsGroupsCountAggregateOutputType | null
    _min: TagsGroupsMinAggregateOutputType | null
    _max: TagsGroupsMaxAggregateOutputType | null
  }

  export type TagsGroupsMinAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
  }

  export type TagsGroupsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
  }

  export type TagsGroupsCountAggregateOutputType = {
    id: number
    name: number
    color: number
    _all: number
  }


  export type TagsGroupsMinAggregateInputType = {
    id?: true
    name?: true
    color?: true
  }

  export type TagsGroupsMaxAggregateInputType = {
    id?: true
    name?: true
    color?: true
  }

  export type TagsGroupsCountAggregateInputType = {
    id?: true
    name?: true
    color?: true
    _all?: true
  }

  export type TagsGroupsAggregateArgs = {
    /**
     * Filter which TagsGroups to aggregate.
     */
    where?: TagsGroupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TagsGroups to fetch.
     */
    orderBy?: Enumerable<TagsGroupsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagsGroupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TagsGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TagsGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TagsGroups
    **/
    _count?: true | TagsGroupsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagsGroupsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagsGroupsMaxAggregateInputType
  }

  export type GetTagsGroupsAggregateType<T extends TagsGroupsAggregateArgs> = {
        [P in keyof T & keyof AggregateTagsGroups]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTagsGroups[P]>
      : GetScalarType<T[P], AggregateTagsGroups[P]>
  }




  export type TagsGroupsGroupByArgs = {
    where?: TagsGroupsWhereInput
    orderBy?: Enumerable<TagsGroupsOrderByWithAggregationInput>
    by: TagsGroupsScalarFieldEnum[]
    having?: TagsGroupsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagsGroupsCountAggregateInputType | true
    _min?: TagsGroupsMinAggregateInputType
    _max?: TagsGroupsMaxAggregateInputType
  }


  export type TagsGroupsGroupByOutputType = {
    id: string
    name: string
    color: string | null
    _count: TagsGroupsCountAggregateOutputType | null
    _min: TagsGroupsMinAggregateOutputType | null
    _max: TagsGroupsMaxAggregateOutputType | null
  }

  type GetTagsGroupsGroupByPayload<T extends TagsGroupsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TagsGroupsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagsGroupsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagsGroupsGroupByOutputType[P]>
            : GetScalarType<T[P], TagsGroupsGroupByOutputType[P]>
        }
      >
    >


  export type TagsGroupsSelect = {
    id?: boolean
    name?: boolean
    color?: boolean
    tags?: boolean | TagsGroups$tagsArgs
    _count?: boolean | TagsGroupsCountOutputTypeArgs
  }


  export type TagsGroupsInclude = {
    tags?: boolean | TagsGroups$tagsArgs
    _count?: boolean | TagsGroupsCountOutputTypeArgs
  }

  export type TagsGroupsGetPayload<S extends boolean | null | undefined | TagsGroupsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TagsGroups :
    S extends undefined ? never :
    S extends { include: any } & (TagsGroupsArgs | TagsGroupsFindManyArgs)
    ? TagsGroups  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'tags' ? Array < TagGetPayload<S['include'][P]>>  :
        P extends '_count' ? TagsGroupsCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (TagsGroupsArgs | TagsGroupsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'tags' ? Array < TagGetPayload<S['select'][P]>>  :
        P extends '_count' ? TagsGroupsCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof TagsGroups ? TagsGroups[P] : never
  } 
      : TagsGroups


  type TagsGroupsCountArgs = 
    Omit<TagsGroupsFindManyArgs, 'select' | 'include'> & {
      select?: TagsGroupsCountAggregateInputType | true
    }

  export interface TagsGroupsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one TagsGroups that matches the filter.
     * @param {TagsGroupsFindUniqueArgs} args - Arguments to find a TagsGroups
     * @example
     * // Get one TagsGroups
     * const tagsGroups = await prisma.tagsGroups.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TagsGroupsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TagsGroupsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TagsGroups'> extends True ? Prisma__TagsGroupsClient<TagsGroupsGetPayload<T>> : Prisma__TagsGroupsClient<TagsGroupsGetPayload<T> | null, null>

    /**
     * Find one TagsGroups that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TagsGroupsFindUniqueOrThrowArgs} args - Arguments to find a TagsGroups
     * @example
     * // Get one TagsGroups
     * const tagsGroups = await prisma.tagsGroups.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TagsGroupsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TagsGroupsFindUniqueOrThrowArgs>
    ): Prisma__TagsGroupsClient<TagsGroupsGetPayload<T>>

    /**
     * Find the first TagsGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsGroupsFindFirstArgs} args - Arguments to find a TagsGroups
     * @example
     * // Get one TagsGroups
     * const tagsGroups = await prisma.tagsGroups.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TagsGroupsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TagsGroupsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TagsGroups'> extends True ? Prisma__TagsGroupsClient<TagsGroupsGetPayload<T>> : Prisma__TagsGroupsClient<TagsGroupsGetPayload<T> | null, null>

    /**
     * Find the first TagsGroups that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsGroupsFindFirstOrThrowArgs} args - Arguments to find a TagsGroups
     * @example
     * // Get one TagsGroups
     * const tagsGroups = await prisma.tagsGroups.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TagsGroupsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TagsGroupsFindFirstOrThrowArgs>
    ): Prisma__TagsGroupsClient<TagsGroupsGetPayload<T>>

    /**
     * Find zero or more TagsGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsGroupsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TagsGroups
     * const tagsGroups = await prisma.tagsGroups.findMany()
     * 
     * // Get first 10 TagsGroups
     * const tagsGroups = await prisma.tagsGroups.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagsGroupsWithIdOnly = await prisma.tagsGroups.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TagsGroupsFindManyArgs>(
      args?: SelectSubset<T, TagsGroupsFindManyArgs>
    ): Prisma.PrismaPromise<Array<TagsGroupsGetPayload<T>>>

    /**
     * Create a TagsGroups.
     * @param {TagsGroupsCreateArgs} args - Arguments to create a TagsGroups.
     * @example
     * // Create one TagsGroups
     * const TagsGroups = await prisma.tagsGroups.create({
     *   data: {
     *     // ... data to create a TagsGroups
     *   }
     * })
     * 
    **/
    create<T extends TagsGroupsCreateArgs>(
      args: SelectSubset<T, TagsGroupsCreateArgs>
    ): Prisma__TagsGroupsClient<TagsGroupsGetPayload<T>>

    /**
     * Delete a TagsGroups.
     * @param {TagsGroupsDeleteArgs} args - Arguments to delete one TagsGroups.
     * @example
     * // Delete one TagsGroups
     * const TagsGroups = await prisma.tagsGroups.delete({
     *   where: {
     *     // ... filter to delete one TagsGroups
     *   }
     * })
     * 
    **/
    delete<T extends TagsGroupsDeleteArgs>(
      args: SelectSubset<T, TagsGroupsDeleteArgs>
    ): Prisma__TagsGroupsClient<TagsGroupsGetPayload<T>>

    /**
     * Update one TagsGroups.
     * @param {TagsGroupsUpdateArgs} args - Arguments to update one TagsGroups.
     * @example
     * // Update one TagsGroups
     * const tagsGroups = await prisma.tagsGroups.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TagsGroupsUpdateArgs>(
      args: SelectSubset<T, TagsGroupsUpdateArgs>
    ): Prisma__TagsGroupsClient<TagsGroupsGetPayload<T>>

    /**
     * Delete zero or more TagsGroups.
     * @param {TagsGroupsDeleteManyArgs} args - Arguments to filter TagsGroups to delete.
     * @example
     * // Delete a few TagsGroups
     * const { count } = await prisma.tagsGroups.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TagsGroupsDeleteManyArgs>(
      args?: SelectSubset<T, TagsGroupsDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TagsGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsGroupsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TagsGroups
     * const tagsGroups = await prisma.tagsGroups.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TagsGroupsUpdateManyArgs>(
      args: SelectSubset<T, TagsGroupsUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TagsGroups.
     * @param {TagsGroupsUpsertArgs} args - Arguments to update or create a TagsGroups.
     * @example
     * // Update or create a TagsGroups
     * const tagsGroups = await prisma.tagsGroups.upsert({
     *   create: {
     *     // ... data to create a TagsGroups
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TagsGroups we want to update
     *   }
     * })
    **/
    upsert<T extends TagsGroupsUpsertArgs>(
      args: SelectSubset<T, TagsGroupsUpsertArgs>
    ): Prisma__TagsGroupsClient<TagsGroupsGetPayload<T>>

    /**
     * Count the number of TagsGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsGroupsCountArgs} args - Arguments to filter TagsGroups to count.
     * @example
     * // Count the number of TagsGroups
     * const count = await prisma.tagsGroups.count({
     *   where: {
     *     // ... the filter for the TagsGroups we want to count
     *   }
     * })
    **/
    count<T extends TagsGroupsCountArgs>(
      args?: Subset<T, TagsGroupsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagsGroupsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TagsGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsGroupsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagsGroupsAggregateArgs>(args: Subset<T, TagsGroupsAggregateArgs>): Prisma.PrismaPromise<GetTagsGroupsAggregateType<T>>

    /**
     * Group by TagsGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsGroupsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagsGroupsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagsGroupsGroupByArgs['orderBy'] }
        : { orderBy?: TagsGroupsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagsGroupsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagsGroupsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for TagsGroups.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TagsGroupsClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    tags<T extends TagsGroups$tagsArgs= {}>(args?: Subset<T, TagsGroups$tagsArgs>): Prisma.PrismaPromise<Array<TagGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * TagsGroups base type for findUnique actions
   */
  export type TagsGroupsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the TagsGroups
     */
    select?: TagsGroupsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagsGroupsInclude | null
    /**
     * Filter, which TagsGroups to fetch.
     */
    where: TagsGroupsWhereUniqueInput
  }

  /**
   * TagsGroups findUnique
   */
  export interface TagsGroupsFindUniqueArgs extends TagsGroupsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TagsGroups findUniqueOrThrow
   */
  export type TagsGroupsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the TagsGroups
     */
    select?: TagsGroupsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagsGroupsInclude | null
    /**
     * Filter, which TagsGroups to fetch.
     */
    where: TagsGroupsWhereUniqueInput
  }


  /**
   * TagsGroups base type for findFirst actions
   */
  export type TagsGroupsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the TagsGroups
     */
    select?: TagsGroupsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagsGroupsInclude | null
    /**
     * Filter, which TagsGroups to fetch.
     */
    where?: TagsGroupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TagsGroups to fetch.
     */
    orderBy?: Enumerable<TagsGroupsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TagsGroups.
     */
    cursor?: TagsGroupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TagsGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TagsGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TagsGroups.
     */
    distinct?: Enumerable<TagsGroupsScalarFieldEnum>
  }

  /**
   * TagsGroups findFirst
   */
  export interface TagsGroupsFindFirstArgs extends TagsGroupsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TagsGroups findFirstOrThrow
   */
  export type TagsGroupsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the TagsGroups
     */
    select?: TagsGroupsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagsGroupsInclude | null
    /**
     * Filter, which TagsGroups to fetch.
     */
    where?: TagsGroupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TagsGroups to fetch.
     */
    orderBy?: Enumerable<TagsGroupsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TagsGroups.
     */
    cursor?: TagsGroupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TagsGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TagsGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TagsGroups.
     */
    distinct?: Enumerable<TagsGroupsScalarFieldEnum>
  }


  /**
   * TagsGroups findMany
   */
  export type TagsGroupsFindManyArgs = {
    /**
     * Select specific fields to fetch from the TagsGroups
     */
    select?: TagsGroupsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagsGroupsInclude | null
    /**
     * Filter, which TagsGroups to fetch.
     */
    where?: TagsGroupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TagsGroups to fetch.
     */
    orderBy?: Enumerable<TagsGroupsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TagsGroups.
     */
    cursor?: TagsGroupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TagsGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TagsGroups.
     */
    skip?: number
    distinct?: Enumerable<TagsGroupsScalarFieldEnum>
  }


  /**
   * TagsGroups create
   */
  export type TagsGroupsCreateArgs = {
    /**
     * Select specific fields to fetch from the TagsGroups
     */
    select?: TagsGroupsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagsGroupsInclude | null
    /**
     * The data needed to create a TagsGroups.
     */
    data: XOR<TagsGroupsCreateInput, TagsGroupsUncheckedCreateInput>
  }


  /**
   * TagsGroups update
   */
  export type TagsGroupsUpdateArgs = {
    /**
     * Select specific fields to fetch from the TagsGroups
     */
    select?: TagsGroupsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagsGroupsInclude | null
    /**
     * The data needed to update a TagsGroups.
     */
    data: XOR<TagsGroupsUpdateInput, TagsGroupsUncheckedUpdateInput>
    /**
     * Choose, which TagsGroups to update.
     */
    where: TagsGroupsWhereUniqueInput
  }


  /**
   * TagsGroups updateMany
   */
  export type TagsGroupsUpdateManyArgs = {
    /**
     * The data used to update TagsGroups.
     */
    data: XOR<TagsGroupsUpdateManyMutationInput, TagsGroupsUncheckedUpdateManyInput>
    /**
     * Filter which TagsGroups to update
     */
    where?: TagsGroupsWhereInput
  }


  /**
   * TagsGroups upsert
   */
  export type TagsGroupsUpsertArgs = {
    /**
     * Select specific fields to fetch from the TagsGroups
     */
    select?: TagsGroupsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagsGroupsInclude | null
    /**
     * The filter to search for the TagsGroups to update in case it exists.
     */
    where: TagsGroupsWhereUniqueInput
    /**
     * In case the TagsGroups found by the `where` argument doesn't exist, create a new TagsGroups with this data.
     */
    create: XOR<TagsGroupsCreateInput, TagsGroupsUncheckedCreateInput>
    /**
     * In case the TagsGroups was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagsGroupsUpdateInput, TagsGroupsUncheckedUpdateInput>
  }


  /**
   * TagsGroups delete
   */
  export type TagsGroupsDeleteArgs = {
    /**
     * Select specific fields to fetch from the TagsGroups
     */
    select?: TagsGroupsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagsGroupsInclude | null
    /**
     * Filter which TagsGroups to delete.
     */
    where: TagsGroupsWhereUniqueInput
  }


  /**
   * TagsGroups deleteMany
   */
  export type TagsGroupsDeleteManyArgs = {
    /**
     * Filter which TagsGroups to delete
     */
    where?: TagsGroupsWhereInput
  }


  /**
   * TagsGroups.tags
   */
  export type TagsGroups$tagsArgs = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagInclude | null
    where?: TagWhereInput
    orderBy?: Enumerable<TagOrderByWithRelationInput>
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TagScalarFieldEnum>
  }


  /**
   * TagsGroups without action
   */
  export type TagsGroupsArgs = {
    /**
     * Select specific fields to fetch from the TagsGroups
     */
    select?: TagsGroupsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TagsGroupsInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const FolderScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    pid: 'pid',
    modificationTime: 'modificationTime',
    iconColor: 'iconColor',
    icon: 'icon',
    password: 'password',
    passwordTips: 'passwordTips'
  };

  export type FolderScalarFieldEnum = (typeof FolderScalarFieldEnum)[keyof typeof FolderScalarFieldEnum]


  export const ImageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    size: 'size',
    btime: 'btime',
    mtime: 'mtime',
    modificationTime: 'modificationTime',
    ext: 'ext',
    url: 'url',
    annotation: 'annotation',
    width: 'width',
    height: 'height',
    metadataMTime: 'metadataMTime',
    star: 'star',
    palettes: 'palettes',
    lastModified: 'lastModified',
    deletedTime: 'deletedTime',
    isDeleted: 'isDeleted',
    resolutionWidth: 'resolutionWidth',
    resolutionHeight: 'resolutionHeight',
    duration: 'duration',
    nsfw: 'nsfw',
    processingPalette: 'processingPalette',
    noThumbnail: 'noThumbnail'
  };

  export type ImageScalarFieldEnum = (typeof ImageScalarFieldEnum)[keyof typeof ImageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    starred: 'starred'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const TagsGroupsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    color: 'color'
  };

  export type TagsGroupsScalarFieldEnum = (typeof TagsGroupsScalarFieldEnum)[keyof typeof TagsGroupsScalarFieldEnum]


  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  /**
   * Deep Input Types
   */


  export type ImageWhereInput = {
    AND?: Enumerable<ImageWhereInput>
    OR?: Enumerable<ImageWhereInput>
    NOT?: Enumerable<ImageWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    size?: IntFilter | number
    btime?: BigIntFilter | bigint | number
    mtime?: BigIntFilter | bigint | number
    modificationTime?: BigIntFilter | bigint | number
    ext?: StringFilter | string
    url?: StringFilter | string
    annotation?: StringFilter | string
    width?: IntFilter | number
    height?: IntFilter | number
    metadataMTime?: BigIntNullableFilter | bigint | number | null
    star?: IntNullableFilter | number | null
    palettes?: StringNullableFilter | string | null
    lastModified?: BigIntNullableFilter | bigint | number | null
    deletedTime?: BigIntNullableFilter | bigint | number | null
    isDeleted?: BoolNullableFilter | boolean | null
    resolutionWidth?: IntNullableFilter | number | null
    resolutionHeight?: IntNullableFilter | number | null
    duration?: StringNullableFilter | string | null
    nsfw?: BoolNullableFilter | boolean | null
    processingPalette?: BoolNullableFilter | boolean | null
    noThumbnail?: BoolNullableFilter | boolean | null
    folders?: FolderListRelationFilter
    tags?: TagListRelationFilter
  }

  export type ImageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    btime?: SortOrder
    mtime?: SortOrder
    modificationTime?: SortOrder
    ext?: SortOrder
    url?: SortOrder
    annotation?: SortOrder
    width?: SortOrder
    height?: SortOrder
    metadataMTime?: SortOrder
    star?: SortOrder
    palettes?: SortOrder
    lastModified?: SortOrder
    deletedTime?: SortOrder
    isDeleted?: SortOrder
    resolutionWidth?: SortOrder
    resolutionHeight?: SortOrder
    duration?: SortOrder
    nsfw?: SortOrder
    processingPalette?: SortOrder
    noThumbnail?: SortOrder
    folders?: FolderOrderByRelationAggregateInput
    tags?: TagOrderByRelationAggregateInput
  }

  export type ImageWhereUniqueInput = {
    id?: string
  }

  export type ImageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    btime?: SortOrder
    mtime?: SortOrder
    modificationTime?: SortOrder
    ext?: SortOrder
    url?: SortOrder
    annotation?: SortOrder
    width?: SortOrder
    height?: SortOrder
    metadataMTime?: SortOrder
    star?: SortOrder
    palettes?: SortOrder
    lastModified?: SortOrder
    deletedTime?: SortOrder
    isDeleted?: SortOrder
    resolutionWidth?: SortOrder
    resolutionHeight?: SortOrder
    duration?: SortOrder
    nsfw?: SortOrder
    processingPalette?: SortOrder
    noThumbnail?: SortOrder
    _count?: ImageCountOrderByAggregateInput
    _avg?: ImageAvgOrderByAggregateInput
    _max?: ImageMaxOrderByAggregateInput
    _min?: ImageMinOrderByAggregateInput
    _sum?: ImageSumOrderByAggregateInput
  }

  export type ImageScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ImageScalarWhereWithAggregatesInput>
    OR?: Enumerable<ImageScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ImageScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    size?: IntWithAggregatesFilter | number
    btime?: BigIntWithAggregatesFilter | bigint | number
    mtime?: BigIntWithAggregatesFilter | bigint | number
    modificationTime?: BigIntWithAggregatesFilter | bigint | number
    ext?: StringWithAggregatesFilter | string
    url?: StringWithAggregatesFilter | string
    annotation?: StringWithAggregatesFilter | string
    width?: IntWithAggregatesFilter | number
    height?: IntWithAggregatesFilter | number
    metadataMTime?: BigIntNullableWithAggregatesFilter | bigint | number | null
    star?: IntNullableWithAggregatesFilter | number | null
    palettes?: StringNullableWithAggregatesFilter | string | null
    lastModified?: BigIntNullableWithAggregatesFilter | bigint | number | null
    deletedTime?: BigIntNullableWithAggregatesFilter | bigint | number | null
    isDeleted?: BoolNullableWithAggregatesFilter | boolean | null
    resolutionWidth?: IntNullableWithAggregatesFilter | number | null
    resolutionHeight?: IntNullableWithAggregatesFilter | number | null
    duration?: StringNullableWithAggregatesFilter | string | null
    nsfw?: BoolNullableWithAggregatesFilter | boolean | null
    processingPalette?: BoolNullableWithAggregatesFilter | boolean | null
    noThumbnail?: BoolNullableWithAggregatesFilter | boolean | null
  }

  export type TagWhereInput = {
    AND?: Enumerable<TagWhereInput>
    OR?: Enumerable<TagWhereInput>
    NOT?: Enumerable<TagWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    starred?: BoolFilter | boolean
    tagsGroups?: TagsGroupsListRelationFilter
    images?: ImageListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    starred?: SortOrder
    tagsGroups?: TagsGroupsOrderByRelationAggregateInput
    images?: ImageOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = {
    id?: string
    name?: string
  }

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    starred?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TagScalarWhereWithAggregatesInput>
    OR?: Enumerable<TagScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TagScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    starred?: BoolWithAggregatesFilter | boolean
  }

  export type FolderWhereInput = {
    AND?: Enumerable<FolderWhereInput>
    OR?: Enumerable<FolderWhereInput>
    NOT?: Enumerable<FolderWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    description?: StringFilter | string
    pid?: StringNullableFilter | string | null
    modificationTime?: BigIntFilter | bigint | number
    iconColor?: StringNullableFilter | string | null
    icon?: StringNullableFilter | string | null
    password?: StringFilter | string
    passwordTips?: StringFilter | string
    images?: ImageListRelationFilter
  }

  export type FolderOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    pid?: SortOrder
    modificationTime?: SortOrder
    iconColor?: SortOrder
    icon?: SortOrder
    password?: SortOrder
    passwordTips?: SortOrder
    images?: ImageOrderByRelationAggregateInput
  }

  export type FolderWhereUniqueInput = {
    id?: string
  }

  export type FolderOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    pid?: SortOrder
    modificationTime?: SortOrder
    iconColor?: SortOrder
    icon?: SortOrder
    password?: SortOrder
    passwordTips?: SortOrder
    _count?: FolderCountOrderByAggregateInput
    _avg?: FolderAvgOrderByAggregateInput
    _max?: FolderMaxOrderByAggregateInput
    _min?: FolderMinOrderByAggregateInput
    _sum?: FolderSumOrderByAggregateInput
  }

  export type FolderScalarWhereWithAggregatesInput = {
    AND?: Enumerable<FolderScalarWhereWithAggregatesInput>
    OR?: Enumerable<FolderScalarWhereWithAggregatesInput>
    NOT?: Enumerable<FolderScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    pid?: StringNullableWithAggregatesFilter | string | null
    modificationTime?: BigIntWithAggregatesFilter | bigint | number
    iconColor?: StringNullableWithAggregatesFilter | string | null
    icon?: StringNullableWithAggregatesFilter | string | null
    password?: StringWithAggregatesFilter | string
    passwordTips?: StringWithAggregatesFilter | string
  }

  export type TagsGroupsWhereInput = {
    AND?: Enumerable<TagsGroupsWhereInput>
    OR?: Enumerable<TagsGroupsWhereInput>
    NOT?: Enumerable<TagsGroupsWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    color?: StringNullableFilter | string | null
    tags?: TagListRelationFilter
  }

  export type TagsGroupsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    tags?: TagOrderByRelationAggregateInput
  }

  export type TagsGroupsWhereUniqueInput = {
    id?: string
    name?: string
  }

  export type TagsGroupsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    _count?: TagsGroupsCountOrderByAggregateInput
    _max?: TagsGroupsMaxOrderByAggregateInput
    _min?: TagsGroupsMinOrderByAggregateInput
  }

  export type TagsGroupsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TagsGroupsScalarWhereWithAggregatesInput>
    OR?: Enumerable<TagsGroupsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TagsGroupsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    color?: StringNullableWithAggregatesFilter | string | null
  }

  export type ImageCreateInput = {
    id: string
    name: string
    size: number
    btime: bigint | number
    mtime: bigint | number
    modificationTime: bigint | number
    ext: string
    url: string
    annotation: string
    width: number
    height: number
    metadataMTime?: bigint | number | null
    star?: number | null
    palettes?: string | null
    lastModified?: bigint | number | null
    deletedTime?: bigint | number | null
    isDeleted?: boolean | null
    resolutionWidth?: number | null
    resolutionHeight?: number | null
    duration?: string | null
    nsfw?: boolean | null
    processingPalette?: boolean | null
    noThumbnail?: boolean | null
    folders?: FolderCreateNestedManyWithoutImagesInput
    tags?: TagCreateNestedManyWithoutImagesInput
  }

  export type ImageUncheckedCreateInput = {
    id: string
    name: string
    size: number
    btime: bigint | number
    mtime: bigint | number
    modificationTime: bigint | number
    ext: string
    url: string
    annotation: string
    width: number
    height: number
    metadataMTime?: bigint | number | null
    star?: number | null
    palettes?: string | null
    lastModified?: bigint | number | null
    deletedTime?: bigint | number | null
    isDeleted?: boolean | null
    resolutionWidth?: number | null
    resolutionHeight?: number | null
    duration?: string | null
    nsfw?: boolean | null
    processingPalette?: boolean | null
    noThumbnail?: boolean | null
    folders?: FolderUncheckedCreateNestedManyWithoutImagesInput
    tags?: TagUncheckedCreateNestedManyWithoutImagesInput
  }

  export type ImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    btime?: BigIntFieldUpdateOperationsInput | bigint | number
    mtime?: BigIntFieldUpdateOperationsInput | bigint | number
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    ext?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    annotation?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    metadataMTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    star?: NullableIntFieldUpdateOperationsInput | number | null
    palettes?: NullableStringFieldUpdateOperationsInput | string | null
    lastModified?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    deletedTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resolutionWidth?: NullableIntFieldUpdateOperationsInput | number | null
    resolutionHeight?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    nsfw?: NullableBoolFieldUpdateOperationsInput | boolean | null
    processingPalette?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noThumbnail?: NullableBoolFieldUpdateOperationsInput | boolean | null
    folders?: FolderUpdateManyWithoutImagesNestedInput
    tags?: TagUpdateManyWithoutImagesNestedInput
  }

  export type ImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    btime?: BigIntFieldUpdateOperationsInput | bigint | number
    mtime?: BigIntFieldUpdateOperationsInput | bigint | number
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    ext?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    annotation?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    metadataMTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    star?: NullableIntFieldUpdateOperationsInput | number | null
    palettes?: NullableStringFieldUpdateOperationsInput | string | null
    lastModified?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    deletedTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resolutionWidth?: NullableIntFieldUpdateOperationsInput | number | null
    resolutionHeight?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    nsfw?: NullableBoolFieldUpdateOperationsInput | boolean | null
    processingPalette?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noThumbnail?: NullableBoolFieldUpdateOperationsInput | boolean | null
    folders?: FolderUncheckedUpdateManyWithoutImagesNestedInput
    tags?: TagUncheckedUpdateManyWithoutImagesNestedInput
  }

  export type ImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    btime?: BigIntFieldUpdateOperationsInput | bigint | number
    mtime?: BigIntFieldUpdateOperationsInput | bigint | number
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    ext?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    annotation?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    metadataMTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    star?: NullableIntFieldUpdateOperationsInput | number | null
    palettes?: NullableStringFieldUpdateOperationsInput | string | null
    lastModified?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    deletedTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resolutionWidth?: NullableIntFieldUpdateOperationsInput | number | null
    resolutionHeight?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    nsfw?: NullableBoolFieldUpdateOperationsInput | boolean | null
    processingPalette?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noThumbnail?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type ImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    btime?: BigIntFieldUpdateOperationsInput | bigint | number
    mtime?: BigIntFieldUpdateOperationsInput | bigint | number
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    ext?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    annotation?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    metadataMTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    star?: NullableIntFieldUpdateOperationsInput | number | null
    palettes?: NullableStringFieldUpdateOperationsInput | string | null
    lastModified?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    deletedTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resolutionWidth?: NullableIntFieldUpdateOperationsInput | number | null
    resolutionHeight?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    nsfw?: NullableBoolFieldUpdateOperationsInput | boolean | null
    processingPalette?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noThumbnail?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type TagCreateInput = {
    id: string
    name: string
    starred?: boolean
    tagsGroups?: TagsGroupsCreateNestedManyWithoutTagsInput
    images?: ImageCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateInput = {
    id: string
    name: string
    starred?: boolean
    tagsGroups?: TagsGroupsUncheckedCreateNestedManyWithoutTagsInput
    images?: ImageUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    tagsGroups?: TagsGroupsUpdateManyWithoutTagsNestedInput
    images?: ImageUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    tagsGroups?: TagsGroupsUncheckedUpdateManyWithoutTagsNestedInput
    images?: ImageUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FolderCreateInput = {
    id: string
    name: string
    description: string
    pid?: string | null
    modificationTime: bigint | number
    iconColor?: string | null
    icon?: string | null
    password: string
    passwordTips: string
    images?: ImageCreateNestedManyWithoutFoldersInput
  }

  export type FolderUncheckedCreateInput = {
    id: string
    name: string
    description: string
    pid?: string | null
    modificationTime: bigint | number
    iconColor?: string | null
    icon?: string | null
    password: string
    passwordTips: string
    images?: ImageUncheckedCreateNestedManyWithoutFoldersInput
  }

  export type FolderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pid?: NullableStringFieldUpdateOperationsInput | string | null
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    iconColor?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    passwordTips?: StringFieldUpdateOperationsInput | string
    images?: ImageUpdateManyWithoutFoldersNestedInput
  }

  export type FolderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pid?: NullableStringFieldUpdateOperationsInput | string | null
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    iconColor?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    passwordTips?: StringFieldUpdateOperationsInput | string
    images?: ImageUncheckedUpdateManyWithoutFoldersNestedInput
  }

  export type FolderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pid?: NullableStringFieldUpdateOperationsInput | string | null
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    iconColor?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    passwordTips?: StringFieldUpdateOperationsInput | string
  }

  export type FolderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pid?: NullableStringFieldUpdateOperationsInput | string | null
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    iconColor?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    passwordTips?: StringFieldUpdateOperationsInput | string
  }

  export type TagsGroupsCreateInput = {
    id: string
    name: string
    color?: string | null
    tags?: TagCreateNestedManyWithoutTagsGroupsInput
  }

  export type TagsGroupsUncheckedCreateInput = {
    id: string
    name: string
    color?: string | null
    tags?: TagUncheckedCreateNestedManyWithoutTagsGroupsInput
  }

  export type TagsGroupsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: TagUpdateManyWithoutTagsGroupsNestedInput
  }

  export type TagsGroupsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: TagUncheckedUpdateManyWithoutTagsGroupsNestedInput
  }

  export type TagsGroupsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TagsGroupsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type BigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type BigIntNullableFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableFilter | bigint | number | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type BoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type FolderListRelationFilter = {
    every?: FolderWhereInput
    some?: FolderWhereInput
    none?: FolderWhereInput
  }

  export type TagListRelationFilter = {
    every?: TagWhereInput
    some?: TagWhereInput
    none?: TagWhereInput
  }

  export type FolderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ImageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    btime?: SortOrder
    mtime?: SortOrder
    modificationTime?: SortOrder
    ext?: SortOrder
    url?: SortOrder
    annotation?: SortOrder
    width?: SortOrder
    height?: SortOrder
    metadataMTime?: SortOrder
    star?: SortOrder
    palettes?: SortOrder
    lastModified?: SortOrder
    deletedTime?: SortOrder
    isDeleted?: SortOrder
    resolutionWidth?: SortOrder
    resolutionHeight?: SortOrder
    duration?: SortOrder
    nsfw?: SortOrder
    processingPalette?: SortOrder
    noThumbnail?: SortOrder
  }

  export type ImageAvgOrderByAggregateInput = {
    size?: SortOrder
    btime?: SortOrder
    mtime?: SortOrder
    modificationTime?: SortOrder
    width?: SortOrder
    height?: SortOrder
    metadataMTime?: SortOrder
    star?: SortOrder
    lastModified?: SortOrder
    deletedTime?: SortOrder
    resolutionWidth?: SortOrder
    resolutionHeight?: SortOrder
  }

  export type ImageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    btime?: SortOrder
    mtime?: SortOrder
    modificationTime?: SortOrder
    ext?: SortOrder
    url?: SortOrder
    annotation?: SortOrder
    width?: SortOrder
    height?: SortOrder
    metadataMTime?: SortOrder
    star?: SortOrder
    palettes?: SortOrder
    lastModified?: SortOrder
    deletedTime?: SortOrder
    isDeleted?: SortOrder
    resolutionWidth?: SortOrder
    resolutionHeight?: SortOrder
    duration?: SortOrder
    nsfw?: SortOrder
    processingPalette?: SortOrder
    noThumbnail?: SortOrder
  }

  export type ImageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    btime?: SortOrder
    mtime?: SortOrder
    modificationTime?: SortOrder
    ext?: SortOrder
    url?: SortOrder
    annotation?: SortOrder
    width?: SortOrder
    height?: SortOrder
    metadataMTime?: SortOrder
    star?: SortOrder
    palettes?: SortOrder
    lastModified?: SortOrder
    deletedTime?: SortOrder
    isDeleted?: SortOrder
    resolutionWidth?: SortOrder
    resolutionHeight?: SortOrder
    duration?: SortOrder
    nsfw?: SortOrder
    processingPalette?: SortOrder
    noThumbnail?: SortOrder
  }

  export type ImageSumOrderByAggregateInput = {
    size?: SortOrder
    btime?: SortOrder
    mtime?: SortOrder
    modificationTime?: SortOrder
    width?: SortOrder
    height?: SortOrder
    metadataMTime?: SortOrder
    star?: SortOrder
    lastModified?: SortOrder
    deletedTime?: SortOrder
    resolutionWidth?: SortOrder
    resolutionHeight?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type BigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
  }

  export type BigIntNullableWithAggregatesFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableWithAggregatesFilter | bigint | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedBigIntNullableFilter
    _min?: NestedBigIntNullableFilter
    _max?: NestedBigIntNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type BoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type TagsGroupsListRelationFilter = {
    every?: TagsGroupsWhereInput
    some?: TagsGroupsWhereInput
    none?: TagsGroupsWhereInput
  }

  export type ImageListRelationFilter = {
    every?: ImageWhereInput
    some?: ImageWhereInput
    none?: ImageWhereInput
  }

  export type TagsGroupsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    starred?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    starred?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    starred?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type FolderCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    pid?: SortOrder
    modificationTime?: SortOrder
    iconColor?: SortOrder
    icon?: SortOrder
    password?: SortOrder
    passwordTips?: SortOrder
  }

  export type FolderAvgOrderByAggregateInput = {
    modificationTime?: SortOrder
  }

  export type FolderMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    pid?: SortOrder
    modificationTime?: SortOrder
    iconColor?: SortOrder
    icon?: SortOrder
    password?: SortOrder
    passwordTips?: SortOrder
  }

  export type FolderMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    pid?: SortOrder
    modificationTime?: SortOrder
    iconColor?: SortOrder
    icon?: SortOrder
    password?: SortOrder
    passwordTips?: SortOrder
  }

  export type FolderSumOrderByAggregateInput = {
    modificationTime?: SortOrder
  }

  export type TagsGroupsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
  }

  export type TagsGroupsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
  }

  export type TagsGroupsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
  }

  export type FolderCreateNestedManyWithoutImagesInput = {
    create?: XOR<Enumerable<FolderCreateWithoutImagesInput>, Enumerable<FolderUncheckedCreateWithoutImagesInput>>
    connectOrCreate?: Enumerable<FolderCreateOrConnectWithoutImagesInput>
    connect?: Enumerable<FolderWhereUniqueInput>
  }

  export type TagCreateNestedManyWithoutImagesInput = {
    create?: XOR<Enumerable<TagCreateWithoutImagesInput>, Enumerable<TagUncheckedCreateWithoutImagesInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutImagesInput>
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type FolderUncheckedCreateNestedManyWithoutImagesInput = {
    create?: XOR<Enumerable<FolderCreateWithoutImagesInput>, Enumerable<FolderUncheckedCreateWithoutImagesInput>>
    connectOrCreate?: Enumerable<FolderCreateOrConnectWithoutImagesInput>
    connect?: Enumerable<FolderWhereUniqueInput>
  }

  export type TagUncheckedCreateNestedManyWithoutImagesInput = {
    create?: XOR<Enumerable<TagCreateWithoutImagesInput>, Enumerable<TagUncheckedCreateWithoutImagesInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutImagesInput>
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type FolderUpdateManyWithoutImagesNestedInput = {
    create?: XOR<Enumerable<FolderCreateWithoutImagesInput>, Enumerable<FolderUncheckedCreateWithoutImagesInput>>
    connectOrCreate?: Enumerable<FolderCreateOrConnectWithoutImagesInput>
    upsert?: Enumerable<FolderUpsertWithWhereUniqueWithoutImagesInput>
    set?: Enumerable<FolderWhereUniqueInput>
    disconnect?: Enumerable<FolderWhereUniqueInput>
    delete?: Enumerable<FolderWhereUniqueInput>
    connect?: Enumerable<FolderWhereUniqueInput>
    update?: Enumerable<FolderUpdateWithWhereUniqueWithoutImagesInput>
    updateMany?: Enumerable<FolderUpdateManyWithWhereWithoutImagesInput>
    deleteMany?: Enumerable<FolderScalarWhereInput>
  }

  export type TagUpdateManyWithoutImagesNestedInput = {
    create?: XOR<Enumerable<TagCreateWithoutImagesInput>, Enumerable<TagUncheckedCreateWithoutImagesInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutImagesInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutImagesInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    connect?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutImagesInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutImagesInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type FolderUncheckedUpdateManyWithoutImagesNestedInput = {
    create?: XOR<Enumerable<FolderCreateWithoutImagesInput>, Enumerable<FolderUncheckedCreateWithoutImagesInput>>
    connectOrCreate?: Enumerable<FolderCreateOrConnectWithoutImagesInput>
    upsert?: Enumerable<FolderUpsertWithWhereUniqueWithoutImagesInput>
    set?: Enumerable<FolderWhereUniqueInput>
    disconnect?: Enumerable<FolderWhereUniqueInput>
    delete?: Enumerable<FolderWhereUniqueInput>
    connect?: Enumerable<FolderWhereUniqueInput>
    update?: Enumerable<FolderUpdateWithWhereUniqueWithoutImagesInput>
    updateMany?: Enumerable<FolderUpdateManyWithWhereWithoutImagesInput>
    deleteMany?: Enumerable<FolderScalarWhereInput>
  }

  export type TagUncheckedUpdateManyWithoutImagesNestedInput = {
    create?: XOR<Enumerable<TagCreateWithoutImagesInput>, Enumerable<TagUncheckedCreateWithoutImagesInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutImagesInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutImagesInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    connect?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutImagesInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutImagesInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type TagsGroupsCreateNestedManyWithoutTagsInput = {
    create?: XOR<Enumerable<TagsGroupsCreateWithoutTagsInput>, Enumerable<TagsGroupsUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<TagsGroupsCreateOrConnectWithoutTagsInput>
    connect?: Enumerable<TagsGroupsWhereUniqueInput>
  }

  export type ImageCreateNestedManyWithoutTagsInput = {
    create?: XOR<Enumerable<ImageCreateWithoutTagsInput>, Enumerable<ImageUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<ImageCreateOrConnectWithoutTagsInput>
    connect?: Enumerable<ImageWhereUniqueInput>
  }

  export type TagsGroupsUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<Enumerable<TagsGroupsCreateWithoutTagsInput>, Enumerable<TagsGroupsUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<TagsGroupsCreateOrConnectWithoutTagsInput>
    connect?: Enumerable<TagsGroupsWhereUniqueInput>
  }

  export type ImageUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<Enumerable<ImageCreateWithoutTagsInput>, Enumerable<ImageUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<ImageCreateOrConnectWithoutTagsInput>
    connect?: Enumerable<ImageWhereUniqueInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TagsGroupsUpdateManyWithoutTagsNestedInput = {
    create?: XOR<Enumerable<TagsGroupsCreateWithoutTagsInput>, Enumerable<TagsGroupsUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<TagsGroupsCreateOrConnectWithoutTagsInput>
    upsert?: Enumerable<TagsGroupsUpsertWithWhereUniqueWithoutTagsInput>
    set?: Enumerable<TagsGroupsWhereUniqueInput>
    disconnect?: Enumerable<TagsGroupsWhereUniqueInput>
    delete?: Enumerable<TagsGroupsWhereUniqueInput>
    connect?: Enumerable<TagsGroupsWhereUniqueInput>
    update?: Enumerable<TagsGroupsUpdateWithWhereUniqueWithoutTagsInput>
    updateMany?: Enumerable<TagsGroupsUpdateManyWithWhereWithoutTagsInput>
    deleteMany?: Enumerable<TagsGroupsScalarWhereInput>
  }

  export type ImageUpdateManyWithoutTagsNestedInput = {
    create?: XOR<Enumerable<ImageCreateWithoutTagsInput>, Enumerable<ImageUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<ImageCreateOrConnectWithoutTagsInput>
    upsert?: Enumerable<ImageUpsertWithWhereUniqueWithoutTagsInput>
    set?: Enumerable<ImageWhereUniqueInput>
    disconnect?: Enumerable<ImageWhereUniqueInput>
    delete?: Enumerable<ImageWhereUniqueInput>
    connect?: Enumerable<ImageWhereUniqueInput>
    update?: Enumerable<ImageUpdateWithWhereUniqueWithoutTagsInput>
    updateMany?: Enumerable<ImageUpdateManyWithWhereWithoutTagsInput>
    deleteMany?: Enumerable<ImageScalarWhereInput>
  }

  export type TagsGroupsUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<Enumerable<TagsGroupsCreateWithoutTagsInput>, Enumerable<TagsGroupsUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<TagsGroupsCreateOrConnectWithoutTagsInput>
    upsert?: Enumerable<TagsGroupsUpsertWithWhereUniqueWithoutTagsInput>
    set?: Enumerable<TagsGroupsWhereUniqueInput>
    disconnect?: Enumerable<TagsGroupsWhereUniqueInput>
    delete?: Enumerable<TagsGroupsWhereUniqueInput>
    connect?: Enumerable<TagsGroupsWhereUniqueInput>
    update?: Enumerable<TagsGroupsUpdateWithWhereUniqueWithoutTagsInput>
    updateMany?: Enumerable<TagsGroupsUpdateManyWithWhereWithoutTagsInput>
    deleteMany?: Enumerable<TagsGroupsScalarWhereInput>
  }

  export type ImageUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<Enumerable<ImageCreateWithoutTagsInput>, Enumerable<ImageUncheckedCreateWithoutTagsInput>>
    connectOrCreate?: Enumerable<ImageCreateOrConnectWithoutTagsInput>
    upsert?: Enumerable<ImageUpsertWithWhereUniqueWithoutTagsInput>
    set?: Enumerable<ImageWhereUniqueInput>
    disconnect?: Enumerable<ImageWhereUniqueInput>
    delete?: Enumerable<ImageWhereUniqueInput>
    connect?: Enumerable<ImageWhereUniqueInput>
    update?: Enumerable<ImageUpdateWithWhereUniqueWithoutTagsInput>
    updateMany?: Enumerable<ImageUpdateManyWithWhereWithoutTagsInput>
    deleteMany?: Enumerable<ImageScalarWhereInput>
  }

  export type ImageCreateNestedManyWithoutFoldersInput = {
    create?: XOR<Enumerable<ImageCreateWithoutFoldersInput>, Enumerable<ImageUncheckedCreateWithoutFoldersInput>>
    connectOrCreate?: Enumerable<ImageCreateOrConnectWithoutFoldersInput>
    connect?: Enumerable<ImageWhereUniqueInput>
  }

  export type ImageUncheckedCreateNestedManyWithoutFoldersInput = {
    create?: XOR<Enumerable<ImageCreateWithoutFoldersInput>, Enumerable<ImageUncheckedCreateWithoutFoldersInput>>
    connectOrCreate?: Enumerable<ImageCreateOrConnectWithoutFoldersInput>
    connect?: Enumerable<ImageWhereUniqueInput>
  }

  export type ImageUpdateManyWithoutFoldersNestedInput = {
    create?: XOR<Enumerable<ImageCreateWithoutFoldersInput>, Enumerable<ImageUncheckedCreateWithoutFoldersInput>>
    connectOrCreate?: Enumerable<ImageCreateOrConnectWithoutFoldersInput>
    upsert?: Enumerable<ImageUpsertWithWhereUniqueWithoutFoldersInput>
    set?: Enumerable<ImageWhereUniqueInput>
    disconnect?: Enumerable<ImageWhereUniqueInput>
    delete?: Enumerable<ImageWhereUniqueInput>
    connect?: Enumerable<ImageWhereUniqueInput>
    update?: Enumerable<ImageUpdateWithWhereUniqueWithoutFoldersInput>
    updateMany?: Enumerable<ImageUpdateManyWithWhereWithoutFoldersInput>
    deleteMany?: Enumerable<ImageScalarWhereInput>
  }

  export type ImageUncheckedUpdateManyWithoutFoldersNestedInput = {
    create?: XOR<Enumerable<ImageCreateWithoutFoldersInput>, Enumerable<ImageUncheckedCreateWithoutFoldersInput>>
    connectOrCreate?: Enumerable<ImageCreateOrConnectWithoutFoldersInput>
    upsert?: Enumerable<ImageUpsertWithWhereUniqueWithoutFoldersInput>
    set?: Enumerable<ImageWhereUniqueInput>
    disconnect?: Enumerable<ImageWhereUniqueInput>
    delete?: Enumerable<ImageWhereUniqueInput>
    connect?: Enumerable<ImageWhereUniqueInput>
    update?: Enumerable<ImageUpdateWithWhereUniqueWithoutFoldersInput>
    updateMany?: Enumerable<ImageUpdateManyWithWhereWithoutFoldersInput>
    deleteMany?: Enumerable<ImageScalarWhereInput>
  }

  export type TagCreateNestedManyWithoutTagsGroupsInput = {
    create?: XOR<Enumerable<TagCreateWithoutTagsGroupsInput>, Enumerable<TagUncheckedCreateWithoutTagsGroupsInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutTagsGroupsInput>
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type TagUncheckedCreateNestedManyWithoutTagsGroupsInput = {
    create?: XOR<Enumerable<TagCreateWithoutTagsGroupsInput>, Enumerable<TagUncheckedCreateWithoutTagsGroupsInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutTagsGroupsInput>
    connect?: Enumerable<TagWhereUniqueInput>
  }

  export type TagUpdateManyWithoutTagsGroupsNestedInput = {
    create?: XOR<Enumerable<TagCreateWithoutTagsGroupsInput>, Enumerable<TagUncheckedCreateWithoutTagsGroupsInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutTagsGroupsInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutTagsGroupsInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    connect?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutTagsGroupsInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutTagsGroupsInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type TagUncheckedUpdateManyWithoutTagsGroupsNestedInput = {
    create?: XOR<Enumerable<TagCreateWithoutTagsGroupsInput>, Enumerable<TagUncheckedCreateWithoutTagsGroupsInput>>
    connectOrCreate?: Enumerable<TagCreateOrConnectWithoutTagsGroupsInput>
    upsert?: Enumerable<TagUpsertWithWhereUniqueWithoutTagsGroupsInput>
    set?: Enumerable<TagWhereUniqueInput>
    disconnect?: Enumerable<TagWhereUniqueInput>
    delete?: Enumerable<TagWhereUniqueInput>
    connect?: Enumerable<TagWhereUniqueInput>
    update?: Enumerable<TagUpdateWithWhereUniqueWithoutTagsGroupsInput>
    updateMany?: Enumerable<TagUpdateManyWithWhereWithoutTagsGroupsInput>
    deleteMany?: Enumerable<TagScalarWhereInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedBigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type NestedBigIntNullableFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableFilter | bigint | number | null
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedBoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedBigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
  }

  export type NestedBigIntNullableWithAggregatesFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableWithAggregatesFilter | bigint | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedBigIntNullableFilter
    _min?: NestedBigIntNullableFilter
    _max?: NestedBigIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedBoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type FolderCreateWithoutImagesInput = {
    id: string
    name: string
    description: string
    pid?: string | null
    modificationTime: bigint | number
    iconColor?: string | null
    icon?: string | null
    password: string
    passwordTips: string
  }

  export type FolderUncheckedCreateWithoutImagesInput = {
    id: string
    name: string
    description: string
    pid?: string | null
    modificationTime: bigint | number
    iconColor?: string | null
    icon?: string | null
    password: string
    passwordTips: string
  }

  export type FolderCreateOrConnectWithoutImagesInput = {
    where: FolderWhereUniqueInput
    create: XOR<FolderCreateWithoutImagesInput, FolderUncheckedCreateWithoutImagesInput>
  }

  export type TagCreateWithoutImagesInput = {
    id: string
    name: string
    starred?: boolean
    tagsGroups?: TagsGroupsCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateWithoutImagesInput = {
    id: string
    name: string
    starred?: boolean
    tagsGroups?: TagsGroupsUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagCreateOrConnectWithoutImagesInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutImagesInput, TagUncheckedCreateWithoutImagesInput>
  }

  export type FolderUpsertWithWhereUniqueWithoutImagesInput = {
    where: FolderWhereUniqueInput
    update: XOR<FolderUpdateWithoutImagesInput, FolderUncheckedUpdateWithoutImagesInput>
    create: XOR<FolderCreateWithoutImagesInput, FolderUncheckedCreateWithoutImagesInput>
  }

  export type FolderUpdateWithWhereUniqueWithoutImagesInput = {
    where: FolderWhereUniqueInput
    data: XOR<FolderUpdateWithoutImagesInput, FolderUncheckedUpdateWithoutImagesInput>
  }

  export type FolderUpdateManyWithWhereWithoutImagesInput = {
    where: FolderScalarWhereInput
    data: XOR<FolderUpdateManyMutationInput, FolderUncheckedUpdateManyWithoutFoldersInput>
  }

  export type FolderScalarWhereInput = {
    AND?: Enumerable<FolderScalarWhereInput>
    OR?: Enumerable<FolderScalarWhereInput>
    NOT?: Enumerable<FolderScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    description?: StringFilter | string
    pid?: StringNullableFilter | string | null
    modificationTime?: BigIntFilter | bigint | number
    iconColor?: StringNullableFilter | string | null
    icon?: StringNullableFilter | string | null
    password?: StringFilter | string
    passwordTips?: StringFilter | string
  }

  export type TagUpsertWithWhereUniqueWithoutImagesInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutImagesInput, TagUncheckedUpdateWithoutImagesInput>
    create: XOR<TagCreateWithoutImagesInput, TagUncheckedCreateWithoutImagesInput>
  }

  export type TagUpdateWithWhereUniqueWithoutImagesInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutImagesInput, TagUncheckedUpdateWithoutImagesInput>
  }

  export type TagUpdateManyWithWhereWithoutImagesInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutTagsInput>
  }

  export type TagScalarWhereInput = {
    AND?: Enumerable<TagScalarWhereInput>
    OR?: Enumerable<TagScalarWhereInput>
    NOT?: Enumerable<TagScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    starred?: BoolFilter | boolean
  }

  export type TagsGroupsCreateWithoutTagsInput = {
    id: string
    name: string
    color?: string | null
  }

  export type TagsGroupsUncheckedCreateWithoutTagsInput = {
    id: string
    name: string
    color?: string | null
  }

  export type TagsGroupsCreateOrConnectWithoutTagsInput = {
    where: TagsGroupsWhereUniqueInput
    create: XOR<TagsGroupsCreateWithoutTagsInput, TagsGroupsUncheckedCreateWithoutTagsInput>
  }

  export type ImageCreateWithoutTagsInput = {
    id: string
    name: string
    size: number
    btime: bigint | number
    mtime: bigint | number
    modificationTime: bigint | number
    ext: string
    url: string
    annotation: string
    width: number
    height: number
    metadataMTime?: bigint | number | null
    star?: number | null
    palettes?: string | null
    lastModified?: bigint | number | null
    deletedTime?: bigint | number | null
    isDeleted?: boolean | null
    resolutionWidth?: number | null
    resolutionHeight?: number | null
    duration?: string | null
    nsfw?: boolean | null
    processingPalette?: boolean | null
    noThumbnail?: boolean | null
    folders?: FolderCreateNestedManyWithoutImagesInput
  }

  export type ImageUncheckedCreateWithoutTagsInput = {
    id: string
    name: string
    size: number
    btime: bigint | number
    mtime: bigint | number
    modificationTime: bigint | number
    ext: string
    url: string
    annotation: string
    width: number
    height: number
    metadataMTime?: bigint | number | null
    star?: number | null
    palettes?: string | null
    lastModified?: bigint | number | null
    deletedTime?: bigint | number | null
    isDeleted?: boolean | null
    resolutionWidth?: number | null
    resolutionHeight?: number | null
    duration?: string | null
    nsfw?: boolean | null
    processingPalette?: boolean | null
    noThumbnail?: boolean | null
    folders?: FolderUncheckedCreateNestedManyWithoutImagesInput
  }

  export type ImageCreateOrConnectWithoutTagsInput = {
    where: ImageWhereUniqueInput
    create: XOR<ImageCreateWithoutTagsInput, ImageUncheckedCreateWithoutTagsInput>
  }

  export type TagsGroupsUpsertWithWhereUniqueWithoutTagsInput = {
    where: TagsGroupsWhereUniqueInput
    update: XOR<TagsGroupsUpdateWithoutTagsInput, TagsGroupsUncheckedUpdateWithoutTagsInput>
    create: XOR<TagsGroupsCreateWithoutTagsInput, TagsGroupsUncheckedCreateWithoutTagsInput>
  }

  export type TagsGroupsUpdateWithWhereUniqueWithoutTagsInput = {
    where: TagsGroupsWhereUniqueInput
    data: XOR<TagsGroupsUpdateWithoutTagsInput, TagsGroupsUncheckedUpdateWithoutTagsInput>
  }

  export type TagsGroupsUpdateManyWithWhereWithoutTagsInput = {
    where: TagsGroupsScalarWhereInput
    data: XOR<TagsGroupsUpdateManyMutationInput, TagsGroupsUncheckedUpdateManyWithoutTagsGroupsInput>
  }

  export type TagsGroupsScalarWhereInput = {
    AND?: Enumerable<TagsGroupsScalarWhereInput>
    OR?: Enumerable<TagsGroupsScalarWhereInput>
    NOT?: Enumerable<TagsGroupsScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    color?: StringNullableFilter | string | null
  }

  export type ImageUpsertWithWhereUniqueWithoutTagsInput = {
    where: ImageWhereUniqueInput
    update: XOR<ImageUpdateWithoutTagsInput, ImageUncheckedUpdateWithoutTagsInput>
    create: XOR<ImageCreateWithoutTagsInput, ImageUncheckedCreateWithoutTagsInput>
  }

  export type ImageUpdateWithWhereUniqueWithoutTagsInput = {
    where: ImageWhereUniqueInput
    data: XOR<ImageUpdateWithoutTagsInput, ImageUncheckedUpdateWithoutTagsInput>
  }

  export type ImageUpdateManyWithWhereWithoutTagsInput = {
    where: ImageScalarWhereInput
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyWithoutImagesInput>
  }

  export type ImageScalarWhereInput = {
    AND?: Enumerable<ImageScalarWhereInput>
    OR?: Enumerable<ImageScalarWhereInput>
    NOT?: Enumerable<ImageScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    size?: IntFilter | number
    btime?: BigIntFilter | bigint | number
    mtime?: BigIntFilter | bigint | number
    modificationTime?: BigIntFilter | bigint | number
    ext?: StringFilter | string
    url?: StringFilter | string
    annotation?: StringFilter | string
    width?: IntFilter | number
    height?: IntFilter | number
    metadataMTime?: BigIntNullableFilter | bigint | number | null
    star?: IntNullableFilter | number | null
    palettes?: StringNullableFilter | string | null
    lastModified?: BigIntNullableFilter | bigint | number | null
    deletedTime?: BigIntNullableFilter | bigint | number | null
    isDeleted?: BoolNullableFilter | boolean | null
    resolutionWidth?: IntNullableFilter | number | null
    resolutionHeight?: IntNullableFilter | number | null
    duration?: StringNullableFilter | string | null
    nsfw?: BoolNullableFilter | boolean | null
    processingPalette?: BoolNullableFilter | boolean | null
    noThumbnail?: BoolNullableFilter | boolean | null
  }

  export type ImageCreateWithoutFoldersInput = {
    id: string
    name: string
    size: number
    btime: bigint | number
    mtime: bigint | number
    modificationTime: bigint | number
    ext: string
    url: string
    annotation: string
    width: number
    height: number
    metadataMTime?: bigint | number | null
    star?: number | null
    palettes?: string | null
    lastModified?: bigint | number | null
    deletedTime?: bigint | number | null
    isDeleted?: boolean | null
    resolutionWidth?: number | null
    resolutionHeight?: number | null
    duration?: string | null
    nsfw?: boolean | null
    processingPalette?: boolean | null
    noThumbnail?: boolean | null
    tags?: TagCreateNestedManyWithoutImagesInput
  }

  export type ImageUncheckedCreateWithoutFoldersInput = {
    id: string
    name: string
    size: number
    btime: bigint | number
    mtime: bigint | number
    modificationTime: bigint | number
    ext: string
    url: string
    annotation: string
    width: number
    height: number
    metadataMTime?: bigint | number | null
    star?: number | null
    palettes?: string | null
    lastModified?: bigint | number | null
    deletedTime?: bigint | number | null
    isDeleted?: boolean | null
    resolutionWidth?: number | null
    resolutionHeight?: number | null
    duration?: string | null
    nsfw?: boolean | null
    processingPalette?: boolean | null
    noThumbnail?: boolean | null
    tags?: TagUncheckedCreateNestedManyWithoutImagesInput
  }

  export type ImageCreateOrConnectWithoutFoldersInput = {
    where: ImageWhereUniqueInput
    create: XOR<ImageCreateWithoutFoldersInput, ImageUncheckedCreateWithoutFoldersInput>
  }

  export type ImageUpsertWithWhereUniqueWithoutFoldersInput = {
    where: ImageWhereUniqueInput
    update: XOR<ImageUpdateWithoutFoldersInput, ImageUncheckedUpdateWithoutFoldersInput>
    create: XOR<ImageCreateWithoutFoldersInput, ImageUncheckedCreateWithoutFoldersInput>
  }

  export type ImageUpdateWithWhereUniqueWithoutFoldersInput = {
    where: ImageWhereUniqueInput
    data: XOR<ImageUpdateWithoutFoldersInput, ImageUncheckedUpdateWithoutFoldersInput>
  }

  export type ImageUpdateManyWithWhereWithoutFoldersInput = {
    where: ImageScalarWhereInput
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyWithoutImagesInput>
  }

  export type TagCreateWithoutTagsGroupsInput = {
    id: string
    name: string
    starred?: boolean
    images?: ImageCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateWithoutTagsGroupsInput = {
    id: string
    name: string
    starred?: boolean
    images?: ImageUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagCreateOrConnectWithoutTagsGroupsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutTagsGroupsInput, TagUncheckedCreateWithoutTagsGroupsInput>
  }

  export type TagUpsertWithWhereUniqueWithoutTagsGroupsInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutTagsGroupsInput, TagUncheckedUpdateWithoutTagsGroupsInput>
    create: XOR<TagCreateWithoutTagsGroupsInput, TagUncheckedCreateWithoutTagsGroupsInput>
  }

  export type TagUpdateWithWhereUniqueWithoutTagsGroupsInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutTagsGroupsInput, TagUncheckedUpdateWithoutTagsGroupsInput>
  }

  export type TagUpdateManyWithWhereWithoutTagsGroupsInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutTagsInput>
  }

  export type FolderUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pid?: NullableStringFieldUpdateOperationsInput | string | null
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    iconColor?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    passwordTips?: StringFieldUpdateOperationsInput | string
  }

  export type FolderUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pid?: NullableStringFieldUpdateOperationsInput | string | null
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    iconColor?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    passwordTips?: StringFieldUpdateOperationsInput | string
  }

  export type FolderUncheckedUpdateManyWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pid?: NullableStringFieldUpdateOperationsInput | string | null
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    iconColor?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    passwordTips?: StringFieldUpdateOperationsInput | string
  }

  export type TagUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    tagsGroups?: TagsGroupsUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    tagsGroups?: TagsGroupsUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateManyWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TagsGroupsUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TagsGroupsUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TagsGroupsUncheckedUpdateManyWithoutTagsGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ImageUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    btime?: BigIntFieldUpdateOperationsInput | bigint | number
    mtime?: BigIntFieldUpdateOperationsInput | bigint | number
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    ext?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    annotation?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    metadataMTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    star?: NullableIntFieldUpdateOperationsInput | number | null
    palettes?: NullableStringFieldUpdateOperationsInput | string | null
    lastModified?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    deletedTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resolutionWidth?: NullableIntFieldUpdateOperationsInput | number | null
    resolutionHeight?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    nsfw?: NullableBoolFieldUpdateOperationsInput | boolean | null
    processingPalette?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noThumbnail?: NullableBoolFieldUpdateOperationsInput | boolean | null
    folders?: FolderUpdateManyWithoutImagesNestedInput
  }

  export type ImageUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    btime?: BigIntFieldUpdateOperationsInput | bigint | number
    mtime?: BigIntFieldUpdateOperationsInput | bigint | number
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    ext?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    annotation?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    metadataMTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    star?: NullableIntFieldUpdateOperationsInput | number | null
    palettes?: NullableStringFieldUpdateOperationsInput | string | null
    lastModified?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    deletedTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resolutionWidth?: NullableIntFieldUpdateOperationsInput | number | null
    resolutionHeight?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    nsfw?: NullableBoolFieldUpdateOperationsInput | boolean | null
    processingPalette?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noThumbnail?: NullableBoolFieldUpdateOperationsInput | boolean | null
    folders?: FolderUncheckedUpdateManyWithoutImagesNestedInput
  }

  export type ImageUncheckedUpdateManyWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    btime?: BigIntFieldUpdateOperationsInput | bigint | number
    mtime?: BigIntFieldUpdateOperationsInput | bigint | number
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    ext?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    annotation?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    metadataMTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    star?: NullableIntFieldUpdateOperationsInput | number | null
    palettes?: NullableStringFieldUpdateOperationsInput | string | null
    lastModified?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    deletedTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resolutionWidth?: NullableIntFieldUpdateOperationsInput | number | null
    resolutionHeight?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    nsfw?: NullableBoolFieldUpdateOperationsInput | boolean | null
    processingPalette?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noThumbnail?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type ImageUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    btime?: BigIntFieldUpdateOperationsInput | bigint | number
    mtime?: BigIntFieldUpdateOperationsInput | bigint | number
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    ext?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    annotation?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    metadataMTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    star?: NullableIntFieldUpdateOperationsInput | number | null
    palettes?: NullableStringFieldUpdateOperationsInput | string | null
    lastModified?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    deletedTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resolutionWidth?: NullableIntFieldUpdateOperationsInput | number | null
    resolutionHeight?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    nsfw?: NullableBoolFieldUpdateOperationsInput | boolean | null
    processingPalette?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noThumbnail?: NullableBoolFieldUpdateOperationsInput | boolean | null
    tags?: TagUpdateManyWithoutImagesNestedInput
  }

  export type ImageUncheckedUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    btime?: BigIntFieldUpdateOperationsInput | bigint | number
    mtime?: BigIntFieldUpdateOperationsInput | bigint | number
    modificationTime?: BigIntFieldUpdateOperationsInput | bigint | number
    ext?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    annotation?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    metadataMTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    star?: NullableIntFieldUpdateOperationsInput | number | null
    palettes?: NullableStringFieldUpdateOperationsInput | string | null
    lastModified?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    deletedTime?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    resolutionWidth?: NullableIntFieldUpdateOperationsInput | number | null
    resolutionHeight?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    nsfw?: NullableBoolFieldUpdateOperationsInput | boolean | null
    processingPalette?: NullableBoolFieldUpdateOperationsInput | boolean | null
    noThumbnail?: NullableBoolFieldUpdateOperationsInput | boolean | null
    tags?: TagUncheckedUpdateManyWithoutImagesNestedInput
  }

  export type TagUpdateWithoutTagsGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    images?: ImageUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateWithoutTagsGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    starred?: BoolFieldUpdateOperationsInput | boolean
    images?: ImageUncheckedUpdateManyWithoutTagsNestedInput
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}