export interface IRule {
  order: number;
  title?: string;
  value: string;
}

export interface IRuleBuilder {
  setOrder(order: number): IRuleBuilder;
  setValue(value: string): IRuleBuilder;
  setTitle(title: string): IRuleBuilder;
  build(): IRule;
}
