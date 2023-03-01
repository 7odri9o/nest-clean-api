import { Inject, Type } from '@nestjs/common';

import { registerLoggerProvider } from './logger.internal';

declare type InjectLogParameterDecorator<T> = (
  target: Type<T>,
  propertyKey: string | symbol,
  parameterIndex: number,
) => void;

export function InjectLog<T>(
  context?: string | Type<T>,
): InjectLogParameterDecorator<T> {
  switch (typeof context) {
    case 'string':
      break;
    case 'function':
      context = context.name;
      break;
    default:
      break;
  }

  const $context = context;
  const token = Symbol($context);

  const inject = Inject(token);
  return (target: Type<T>, key, index) => {
    registerLoggerProvider({
      token,
      context: $context ?? target.name,
    });

    inject(target, key, index);
  };
}
