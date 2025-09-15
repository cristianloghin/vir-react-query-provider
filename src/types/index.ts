import { ListItem } from "@mikrostack/vir";

export type SelectorFunction<TData, TTransformed = TData> = (
  allItems: ListItem<TData>[],
  ...dependencies: any[]
) => ListItem<TTransformed>[];

// Integration options with selector support
export interface UseQueryDataProviderOptions<TData, TTransformed = TData> {
  // Data transformation (applied before selector)
  transformData?: (data: TData[]) => ListItem<TData>[];

  // Selector pattern
  selector?: SelectorFunction<TData, TTransformed>;
  dependencies?: readonly any[];

  // Placeholder behavior
  placeholderCount?: number;
  showPlaceholdersWhileLoading?: boolean;

  // Error handling
  showErrorItem?: boolean;

  // Performance
  enableChangeDetection?: boolean;

  // Query options
  enabled?: boolean;
  refetchInterval?: number | false;
  refetchIntervalInBackground?: boolean;
  staleTime?: number;
  gcTime?: number;
  retry?: boolean | number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  placeholderData?: TData[] | ((previousData: TData[] | undefined) => TData[]);
}
