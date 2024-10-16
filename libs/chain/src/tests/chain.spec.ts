import type { Context } from '../lib/chain.js';
import { CommandBuilder, ChainBuilder, ContextBuilder } from '../lib/base.js';

describe('Test simple command & simple chain', () => {
  describe('Simple Command', () => {
    it('should work', () => {
      const cmd = CommandBuilder.build((context: Context) => {
        context.state.set('out', context.get('in'));
        return true;
      });
      const ctx = ContextBuilder.build();
      ctx.put('in', 'test');
      const exec = cmd.execute(ctx);
      expect(exec).toBeTruthy();
      expect(ctx.get('out')).toBe('test');
    });
  });

  describe('Simple Chain', () => {
    it('should pass', () => {
      const ctx = ContextBuilder.build();

      const cmd1 = CommandBuilder.build((context: Context) => {
        context.put('in', 2);
        return context.getNumber('in') === 2;
      });

      const cmd2 = CommandBuilder.build((context: Context) => {
        context.put('out', context.getNumber('in') + 2);
        return context.getNumber('in') === 4;
      });

      const chain = ChainBuilder.build([cmd1, cmd2], false);
      chain.execute(ctx);

      expect(ctx.getNumber('in')).toBe(2);
      expect(ctx.getNumber('out')).toBe(4);
    });
  });
});
