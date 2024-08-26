import { defer, finalize, Observable, Subject, tap } from 'rxjs';

/** RxJs operator which invokes a callback upon subscription. */
export const prepare = <T>(
  callback: () => void
): ((source: Observable<T>) => Observable<T>) => {
  return (source: Observable<T>): Observable<T> =>
    defer(() => {
      callback();
      return source;
    });
};

// Ended up not using this since local development loading times
// are so quick it made it just mainly flicker
/**
 * RxJs operator for contextual loading indications without explicitly flipping the loading
 * flag. Updates the subject to true upon subscription to the actual source stream then flips it to
 * false via `finalize` to inform that loading is complete.
 *
 * @example
 *   const isLoading$ = new BehaviorSubject<boolean>(false);
 *   of(1).pipe(delay(1000), indicate(isLoading$));
 *
 * @param indicator - The subject that holds the boolean value.
 */
export const indicate = <T>(
  indicator: Subject<boolean>
): ((source: Observable<T>) => Observable<T>) => {
  return (source: Observable<T>): Observable<T> =>
    source.pipe(
      prepare(() => indicator.next(true)),
      finalize(() => indicator.next(false))
    );
};

/**
 * RxJs operator that updates the subject with the value of the source stream.
 *
 * @example
 *   const myState$ = new BehaviorSubject<number>(0);
 *   of(1).pipe(delay(1000), update(myState$));
 *   console.log(myState$.value);
 *   // 1
 *
 * @param state$ - The subject thats being updated.
 */
export const update = <T>(
  state$: Subject<T>
): ((source: Observable<T>) => Observable<T>) => {
  return (source: Observable<T>): Observable<T> =>
    source.pipe(tap((value: T) => state$.next(value)));
};
