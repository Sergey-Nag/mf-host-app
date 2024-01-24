/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Represents a value that can be a `String`, `Float`, `Int`, or `Boolean`. */
  MixedScalar: { input: any; output: any; }
  /** A String or Int or Float value to filter a range by a number. Provide a string: `< 100`, where first argument describes an operator to second argument that desribes a number. Supports operators: `<`, `<=`, `>`, `>=`, `==` To serch by exact value use `==` operator or provide number */
  NumberSearchInput: { input: any; output: any; }
};

export type Admin = CreatableModel & EditableModel & User & {
  __typename?: 'Admin';
  createdBy?: Maybe<Admin>;
  createdISO?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isOnline?: Maybe<Scalars['Boolean']['output']>;
  lastModifiedISO?: Maybe<Scalars['String']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  modifiedBy?: Maybe<Admin>;
  permissions?: Maybe<UserPermissions>;
};

export type AdminPagesRights = {
  __typename?: 'AdminPagesRights';
  admins?: Maybe<Scalars['Boolean']['output']>;
  analytics?: Maybe<Scalars['Boolean']['output']>;
  customers?: Maybe<Scalars['Boolean']['output']>;
  orders?: Maybe<Scalars['Boolean']['output']>;
  pages?: Maybe<Scalars['Boolean']['output']>;
  products?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminPagesRightsInput = {
  admins?: InputMaybe<Scalars['Boolean']['input']>;
  analytics?: InputMaybe<Scalars['Boolean']['input']>;
  customers?: InputMaybe<Scalars['Boolean']['input']>;
  orders?: InputMaybe<Scalars['Boolean']['input']>;
  pages?: InputMaybe<Scalars['Boolean']['input']>;
  products?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AdminsFilter = {
  createdById?: InputMaybe<Scalars['String']['input']>;
  createdISO?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isOnline?: InputMaybe<Scalars['Boolean']['input']>;
  lastModifiedISO?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  modifiedById?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<UserPermissionsInput>;
};

export type Category = {
  __typename?: 'Category';
  alias?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products?: Maybe<PaginatedProducts>;
};


export type CategoryProductsArgs = {
  filter?: InputMaybe<ProductFilter>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
};

export type CategoryFilter = {
  alias?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CharacteristicInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['MixedScalar']['input']>;
};

/** The model contains fields that show what user (Admin) and when (ISO time) created the model. */
export type CreatableModel = {
  createdBy?: Maybe<User>;
  createdISO?: Maybe<Scalars['String']['output']>;
};

export type Customer = User & {
  __typename?: 'Customer';
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  orders?: Maybe<Array<Maybe<CustomerOrder>>>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type CustomerFilter = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerOrder = {
  __typename?: 'CustomerOrder';
  billingAddress?: Maybe<Scalars['String']['output']>;
  createdISO?: Maybe<Scalars['String']['output']>;
  currentStatus?: Maybe<OrderStatus>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastModifiedISO?: Maybe<Scalars['String']['output']>;
  orderProducts?: Maybe<Array<Maybe<OrderProduct>>>;
  shippingAddress?: Maybe<Scalars['String']['output']>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
};

export type EditAdminInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<UserPermissionsInput>;
};

export type EditCategoryInput = {
  alias?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type EditCustomerInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type EditHistoryInput = {
  index?: InputMaybe<Scalars['Int']['input']>;
  input?: InputMaybe<OrderStatusDetailsInput>;
};

export type EditOrderInput = {
  billingAddress?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  editStatus?: InputMaybe<EditStatusHistory>;
  orderProductsId?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
};

export type EditPageInput = {
  alias?: InputMaybe<Scalars['String']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<PageMetaDataInput>;
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EditProductInput = {
  alias?: InputMaybe<Scalars['String']['input']>;
  categoriesId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  characteristics?: InputMaybe<Array<InputMaybe<CharacteristicInput>>>;
  coverPhoto?: InputMaybe<ImageContentInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Array<InputMaybe<ProductOptionInput>>>;
  photos?: InputMaybe<Array<InputMaybe<ImageContentInput>>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  stock?: InputMaybe<StockEditInput>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type EditStatusHistory = {
  add?: InputMaybe<OrderStatusDetailsInput>;
  edit?: InputMaybe<EditHistoryInput>;
  removeByIndexes?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

/** The model contains fields that show what user (Admin) and when (ISO time) edited the model. */
export type EditableModel = {
  lastModifiedISO?: Maybe<Scalars['String']['output']>;
  modifiedBy?: Maybe<User>;
};

export type ImageContent = CreatableModel & {
  __typename?: 'ImageContent';
  alt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Admin>;
  createdISO: Scalars['String']['output'];
  deleteUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mediumUrl?: Maybe<Scalars['String']['output']>;
  thumbUrl?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type ImageContentInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  deleteUrl?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  mediumUrl?: InputMaybe<Scalars['String']['input']>;
  thumbUrl?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAdmin?: Maybe<Admin>;
  addCategory?: Maybe<Category>;
  addCustomer?: Maybe<Customer>;
  addOrder?: Maybe<Order>;
  addPage?: Maybe<Page>;
  addProduct?: Maybe<Product>;
  deleteAdmins?: Maybe<Array<Maybe<Admin>>>;
  deleteCategories?: Maybe<Array<Maybe<Category>>>;
  deleteCustomers?: Maybe<Array<Maybe<Customer>>>;
  deleteOrders?: Maybe<Array<Maybe<Order>>>;
  deletePages?: Maybe<Array<Maybe<Page>>>;
  deleteProducts?: Maybe<Array<Maybe<Product>>>;
  editAdmin?: Maybe<Admin>;
  editCategory?: Maybe<Category>;
  editCustomer?: Maybe<Customer>;
  editOrder?: Maybe<Order>;
  editPage?: Maybe<Page>;
  editProduct?: Maybe<Product>;
};


export type MutationAddAdminArgs = {
  input: NewAdminInput;
};


export type MutationAddCategoryArgs = {
  input: NewCategoryInput;
};


export type MutationAddCustomerArgs = {
  input: NewCustomerInput;
};


export type MutationAddOrderArgs = {
  input?: InputMaybe<NewOrderInput>;
};


export type MutationAddPageArgs = {
  input: NewPageInput;
};


export type MutationAddProductArgs = {
  input: NewProductInput;
};


export type MutationDeleteAdminsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDeleteCategoriesArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDeleteCustomersArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDeleteOrdersArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDeletePagesArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDeleteProductsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationEditAdminArgs = {
  id: Scalars['ID']['input'];
  input: EditAdminInput;
};


export type MutationEditCategoryArgs = {
  id: Scalars['ID']['input'];
  input: EditCategoryInput;
};


export type MutationEditCustomerArgs = {
  id: Scalars['ID']['input'];
  input: EditCustomerInput;
};


export type MutationEditOrderArgs = {
  id: Scalars['ID']['input'];
  input: EditOrderInput;
};


export type MutationEditPageArgs = {
  id: Scalars['ID']['input'];
  input: EditPageInput;
};


export type MutationEditProductArgs = {
  id: Scalars['ID']['input'];
  input: EditProductInput;
};

export type NewAdminInput = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<UserPermissionsInput>;
};

export type NewCategoryInput = {
  alias?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type NewCustomerInput = {
  email: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

/** Create order. To assign existing user to this order provide customerId property, either provide customer property to create a new user */
export type NewOrderInput = {
  billingAddress?: InputMaybe<Scalars['String']['input']>;
  customer?: InputMaybe<NewCustomerInput>;
  customerId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  orderProducts: Array<InputMaybe<OrderProductInput>>;
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
};

export type NewPageInput = {
  alias?: InputMaybe<Scalars['String']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<PageMetaDataInput>;
  path: Array<InputMaybe<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type NewProductInput = {
  alias?: InputMaybe<Scalars['String']['input']>;
  categoriesId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  characteristics?: InputMaybe<Array<InputMaybe<CharacteristicInput>>>;
  coverPhoto?: InputMaybe<ImageContentInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  options?: InputMaybe<Array<InputMaybe<ProductOptionInput>>>;
  photos?: InputMaybe<Array<InputMaybe<ImageContentInput>>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  stock: StockInput;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Order = {
  __typename?: 'Order';
  billingAddress?: Maybe<Scalars['String']['output']>;
  createdISO?: Maybe<Scalars['String']['output']>;
  currentStatus?: Maybe<OrderStatus>;
  customer?: Maybe<Customer>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastModifiedISO?: Maybe<Scalars['String']['output']>;
  orderProducts?: Maybe<Array<Maybe<OrderProduct>>>;
  shippingAddress?: Maybe<Scalars['String']['output']>;
  statusHistory?: Maybe<Array<Maybe<OrderStatusDetails>>>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
};

export type OrderProduct = {
  __typename?: 'OrderProduct';
  amount?: Maybe<Scalars['Int']['output']>;
  fixedPrice?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<OrderProductDetails>;
};

export type OrderProductDetails = {
  __typename?: 'OrderProductDetails';
  alias: Scalars['String']['output'];
  categories?: Maybe<Array<Maybe<ProductCategory>>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['Float']['output']>;
};

export type OrderProductInput = {
  amount: Scalars['Int']['input'];
  productId: Scalars['ID']['input'];
};

export enum OrderStatus {
  Canceled = 'CANCELED',
  Delivered = 'DELIVERED',
  New = 'NEW',
  Packed = 'PACKED',
  Returned = 'RETURNED',
  Shipped = 'SHIPPED',
  Verified = 'VERIFIED'
}

/** Returns either the Admin or Customer types. They implement the User interface */
export type OrderStatusCreatedBy = Admin | Customer;

export type OrderStatusDetails = {
  __typename?: 'OrderStatusDetails';
  createdBy?: Maybe<OrderStatusCreatedBy>;
  createdISO?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  lastModifiedISO?: Maybe<Scalars['String']['output']>;
  status?: Maybe<OrderStatus>;
};

export type OrderStatusDetailsInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OrderStatus>;
};

export type OrdersFilter = {
  billingAddress?: InputMaybe<Scalars['String']['input']>;
  createdISO?: InputMaybe<Scalars['String']['input']>;
  currentStatus?: InputMaybe<OrderStatus>;
  customerId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  lastModifiedISO?: InputMaybe<Scalars['String']['input']>;
  orderProductsId?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
  totalPrice?: InputMaybe<Scalars['NumberSearchInput']['input']>;
};

export type Page = CreatableModel & EditableModel & {
  __typename?: 'Page';
  alias?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdBy?: Maybe<Admin>;
  createdISO?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isPublished?: Maybe<Scalars['Boolean']['output']>;
  lastModifiedISO?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<PageMetaData>;
  modifiedBy?: Maybe<Admin>;
  path?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type PageMetaData = {
  __typename?: 'PageMetaData';
  author?: Maybe<Scalars['String']['output']>;
  canonical?: Maybe<Scalars['String']['output']>;
  card?: Maybe<SocialMediasCard>;
  description?: Maybe<Scalars['String']['output']>;
  keywords?: Maybe<Scalars['String']['output']>;
};

export type PageMetaDataInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  canonical?: InputMaybe<Scalars['String']['input']>;
  card?: InputMaybe<SocialMediasCardInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  keywords?: InputMaybe<Scalars['String']['input']>;
};

export type PagesFilter = {
  alias?: InputMaybe<Scalars['String']['input']>;
  createdById?: InputMaybe<Scalars['String']['input']>;
  createdISO?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  lastModifiedISO?: InputMaybe<Scalars['String']['input']>;
  meta?: InputMaybe<PageMetaDataInput>;
  modifiedById?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PaginatedAdmins = {
  __typename?: 'PaginatedAdmins';
  end?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<Admin>>>;
  itemsLeft?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedCategories = {
  __typename?: 'PaginatedCategories';
  end?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<Category>>>;
  itemsLeft?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedCustomers = {
  __typename?: 'PaginatedCustomers';
  end?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<Customer>>>;
  itemsLeft?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedOrders = {
  __typename?: 'PaginatedOrders';
  end?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<Order>>>;
  itemsLeft?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedPages = {
  __typename?: 'PaginatedPages';
  end?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<Page>>>;
  itemsLeft?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedProducts = {
  __typename?: 'PaginatedProducts';
  end?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<Product>>>;
  itemsLeft?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
};

export type Pagination = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  start: Scalars['Int']['input'];
};

export type PriceHistory = CreatableModel & {
  __typename?: 'PriceHistory';
  createdBy?: Maybe<Admin>;
  createdISO?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

export type Product = CreatableModel & EditableModel & {
  __typename?: 'Product';
  alias: Scalars['String']['output'];
  categories?: Maybe<Array<Maybe<ProductCategory>>>;
  characteristics?: Maybe<Array<Maybe<ProductCharacteristic>>>;
  coverPhoto?: Maybe<ImageContent>;
  createdBy?: Maybe<Admin>;
  createdISO: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPublished: Scalars['Boolean']['output'];
  lastModifiedISO?: Maybe<Scalars['String']['output']>;
  modifiedBy?: Maybe<Admin>;
  name: Scalars['String']['output'];
  options?: Maybe<Array<Maybe<ProductOption>>>;
  photos?: Maybe<Array<Maybe<ImageContent>>>;
  price: Scalars['Float']['output'];
  priceHistory?: Maybe<Array<Maybe<PriceHistory>>>;
  sold: Scalars['Int']['output'];
  stock: Stock;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  alias?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ProductCharacteristic = {
  __typename?: 'ProductCharacteristic';
  name?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['MixedScalar']['output']>;
};

export type ProductFilter = {
  alias?: InputMaybe<Scalars['String']['input']>;
  /** Provide ids of categories */
  categoriesId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  characteristics?: InputMaybe<Array<InputMaybe<CharacteristicInput>>>;
  createdById?: InputMaybe<Scalars['ID']['input']>;
  createdISO?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  hasCoverPhoto?: InputMaybe<Scalars['Boolean']['input']>;
  hasPhotos?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  lastModifiedISO?: InputMaybe<Scalars['String']['input']>;
  modifiedById?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Array<InputMaybe<ProductOptionInput>>>;
  price?: InputMaybe<Scalars['NumberSearchInput']['input']>;
  sold?: InputMaybe<Scalars['NumberSearchInput']['input']>;
  stock?: InputMaybe<StockSearchInput>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProductOption = {
  __typename?: 'ProductOption';
  name?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<Scalars['MixedScalar']['output']>>>;
};

export type ProductOptionInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Array<InputMaybe<Scalars['MixedScalar']['input']>>>;
};

export type Query = {
  __typename?: 'Query';
  admin?: Maybe<Admin>;
  admins?: Maybe<PaginatedAdmins>;
  categories?: Maybe<PaginatedCategories>;
  category?: Maybe<Category>;
  customer?: Maybe<Customer>;
  customers?: Maybe<PaginatedCustomers>;
  me?: Maybe<Admin>;
  order?: Maybe<Order>;
  orders?: Maybe<PaginatedOrders>;
  page?: Maybe<Page>;
  pages?: Maybe<PaginatedPages>;
  product?: Maybe<Product>;
  products?: Maybe<PaginatedProducts>;
};


export type QueryAdminArgs = {
  find?: InputMaybe<AdminsFilter>;
};


export type QueryAdminsArgs = {
  filter?: InputMaybe<AdminsFilter>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
};


export type QueryCategoriesArgs = {
  filter?: InputMaybe<CategoryFilter>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
};


export type QueryCategoryArgs = {
  find?: InputMaybe<CategoryFilter>;
};


export type QueryCustomerArgs = {
  find?: InputMaybe<CustomerFilter>;
};


export type QueryCustomersArgs = {
  filter?: InputMaybe<CustomerFilter>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
};


export type QueryOrderArgs = {
  find?: InputMaybe<OrdersFilter>;
};


export type QueryOrdersArgs = {
  filter?: InputMaybe<OrdersFilter>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
};


export type QueryPageArgs = {
  find?: InputMaybe<PagesFilter>;
};


export type QueryPagesArgs = {
  filter?: InputMaybe<PagesFilter>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
};


export type QueryProductArgs = {
  find?: InputMaybe<ProductFilter>;
};


export type QueryProductsArgs = {
  filter?: InputMaybe<ProductFilter>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<Array<InputMaybe<Sort>>>;
};

export type SocialMediasCard = {
  __typename?: 'SocialMediasCard';
  description?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type SocialMediasCardInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type Sort = {
  field: Scalars['String']['input'];
  order: SortingOrder;
};

export enum SortingOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Stock = {
  __typename?: 'Stock';
  amount: Scalars['Int']['output'];
  lowStockAlert: Scalars['Int']['output'];
};

export type StockEditInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  lowStockAlert?: InputMaybe<Scalars['Int']['input']>;
};

export type StockInput = {
  amount: Scalars['Int']['input'];
  lowStockAlert?: InputMaybe<Scalars['Int']['input']>;
};

export type StockSearchInput = {
  amount?: InputMaybe<Scalars['NumberSearchInput']['input']>;
  lowStockAlert?: InputMaybe<Scalars['NumberSearchInput']['input']>;
};

export type User = {
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
};

export type UserPermissions = {
  __typename?: 'UserPermissions';
  canDelete?: Maybe<AdminPagesRights>;
  canEdit?: Maybe<AdminPagesRights>;
  canSee?: Maybe<AdminPagesRights>;
};

export type UserPermissionsInput = {
  canDelete?: InputMaybe<AdminPagesRightsInput>;
  canEdit?: InputMaybe<AdminPagesRightsInput>;
  canSee?: InputMaybe<AdminPagesRightsInput>;
};
