import { createContext } from 'react';
import { FetchLoadArgs } from '../../lib/utils';

export const InfiniteLoaderContext = createContext<FetchLoadArgs[]>([]);