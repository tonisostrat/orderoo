export type Store<T extends Record<string, Store.Entry<unknown>>> = T;

export namespace Store {
  export interface Entry<T> {
    loading: boolean;
    value: T;
  }
}
