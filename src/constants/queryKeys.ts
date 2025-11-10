export const queryKeys = {
  cycles: {
    all: ['cycles'] as const,
    lists: () => [...queryKeys.cycles.all, 'list'] as const,
    details: (id: string) => [...queryKeys.cycles.all, 'details', id] as const,
  },
  events: {
    all: ['events'] as const,
    lists: () => [...queryKeys.events.all, 'list'] as const,
    details: (id: string) => [...queryKeys.events.all, 'details', id] as const,
  },
  terms: {
    all: ['terms'] as const,
  },
  user: {
    me: ['me'] as const,
  },
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
type ExtractQueryKey<T> = T extends (...args: any[]) => infer R ? R : T;

export type TQueryKey = {
  [K in keyof typeof queryKeys]: {
    [P in keyof (typeof queryKeys)[K]]: ExtractQueryKey<
      (typeof queryKeys)[K][P]
    >;
  }[keyof (typeof queryKeys)[K]];
}[keyof typeof queryKeys];
