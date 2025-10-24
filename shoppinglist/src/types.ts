export type ItemResponse = {
  product: string;
  amount: number;
  _links: {
    self: {
      href: string;
    };
  };
};

export type Item = {
  product: string;
  amount: number;
};

export type ItemEntity = {
  item: Item;
  url: string;
};
