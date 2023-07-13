import { UseQueryResult } from "@tanstack/react-query";

export const emptyReactQuery = <T>(initialData: T) =>
  ({
    status: "loading",
    fetchStatus: "idle",
    isLoading: true,
    isSuccess: false,
    isError: false,
    isInitialLoading: false,
    dataUpdatedAt: 0,
    error: null,
    errorUpdatedAt: 0,
    failureCount: 0,
    failureReason: null,
    errorUpdateCount: 0,
    isFetched: false,
    isFetchedAfterMount: false,
    isFetching: false,
    isRefetching: false,
    isLoadingError: false,
    isPaused: false,
    isPlaceholderData: false,
    isPreviousData: false,
    isRefetchError: false,
    isStale: true,
    data: initialData,
    refetch: () => Promise.resolve(null),
  } satisfies Omit<UseQueryResult<T, unknown>, "refetch" | "remove"> & {
    refetch: () => Promise<null>;
  });
