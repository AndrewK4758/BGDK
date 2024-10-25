import { IRule, IRuleBuilder } from '@bgdk/types-game';

export class Rule {
  private rule: IRule;
  constructor() {
    this.rule = new Object() as IRule;
  }
  setOrder(order: number): IRuleBuilder {
    this.rule.order = order;
    return this;
  }
  setValue(value: string): IRuleBuilder {
    if (value) {
      value = value.replace(/[\n|\r] +/g, ' ');
    }
    this.rule.value = value;
    return this;
  }
  setTitle(title: string): IRuleBuilder {
    this.rule.title = title;
    return this;
  }
  build(): IRule {
    return this.rule;
  }
}
