import { ListItem } from "@mikrostack/vir";
import { SelectorFunction } from "../types";

// Common selector functions
export const selectors = {
  // Filter by types
  filterByTypes:
    <T>(types: string[]) =>
    (allItems: ListItem<T>[]): ListItem<T>[] => {
      if (types.length === 0) return allItems;
      const typeSet = new Set(types);
      return allItems.filter((item) => item.type && typeSet.has(item.type));
    },

  // Search in content
  searchText:
    <T>(
      searchText: string,
      searchFields: string[] = ["title", "name", "description"]
    ) =>
    (allItems: ListItem<T>[]): ListItem<T>[] => {
      if (!searchText.trim()) return allItems;

      const searchLower = searchText.toLowerCase();
      return allItems.filter((item) => {
        const content = item.content as any;
        const searchableText = [
          item.id,
          ...searchFields.map((field) => content?.[field]),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(searchLower);
      });
    },

  // Combine multiple filters (AND logic)
  combine:
    <T>(...selectors: SelectorFunction<T>[]) =>
    (allItems: ListItem<T>[], ...dependencies: any[]): ListItem<T>[] => {
      return selectors.reduce((filtered, selector) => {
        return selector(filtered, ...dependencies);
      }, allItems);
    },

  // Sort items
  sortBy:
    <T>(sortFn: (a: ListItem<T>, b: ListItem<T>) => number) =>
    (allItems: ListItem<T>[]): ListItem<T>[] => {
      return [...allItems].sort(sortFn);
    },
};
