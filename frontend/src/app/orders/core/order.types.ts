export interface Order {
  id: string;
  externalId: string;
  amount: number;
  currency: string;
  dueDate: string;
  description?: string | null;
  street: string;
  town: string;
  country: string;
}

export interface Filter {
  description?: Filter.Field<string>;
  country?: string;
}

export namespace Filter {
  export type Field<T> = T | { op: string; val: T };
}
