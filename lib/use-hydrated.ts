'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

/** Keep forms inactive until their client-side submit handlers are attached. */
export function useHydrated() {
  return useSyncExternalStore(subscribe, clientReady, serverReady);
}
