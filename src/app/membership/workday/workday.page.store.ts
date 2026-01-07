import { computed, DestroyRef, inject } from '@angular/core';
import { Workday } from '@app/core/entity/workday';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { Subject, takeUntil, timer } from 'rxjs';
import { MAXIMUM_POMODORO_DURATION, Task } from './task.model';

interface WorkdayState {
  workday: Workday;
  progress: number;
}

export const getEmptyTask = (): Task => ({
  type: 'Hit the target',
  title: 'Nouvelle tâche',
  status: 'Not started',
  pomodoroCount: 1,
  pomodoroList: [0],
  statusEmoji: '🏁',
});

const WORKDAY_TASK_LIMIT = 6;

export const WorkdayStore = signalStore(
  withState<WorkdayState>({
    workday: Workday.createEmpty(),
    progress: 0,
  }),
  withProps(() => ({
    destroyRef: inject(DestroyRef),
    /*
     * Using Subject for intra-store event.
     */
    pomodoroCompleted: new Subject<void>(),
  })),
  withComputed((state) => {
    const pomodoroProgress = computed(() => {
      return Math.floor((state.progress() / MAXIMUM_POMODORO_DURATION) * 100);
    });

    return {
      pomodoroProgress,
    };
  }),
  withMethods(({ destroyRef, pomodoroCompleted, ...store }) => ({
    startWorkday() {
      timer(0, 1000)
        .pipe(takeUntil(pomodoroCompleted), takeUntilDestroyed(destroyRef))
        .subscribe((elapsedSeconds: number) => {
          patchState(store, { progress: elapsedSeconds });

          if (elapsedSeconds === Workday.MAX_POMODORO_DURATION_IN_SEC) {
            pomodoroCompleted.next();
            patchState(store, ({ workday }) => ({
              workday: workday.setEditMode(),
              progress: 0,
            }));

            return;
          }
          patchState(store, ({ workday }) => {
            return { workday: workday.tick() };
          });
        });
    },

    addTask() {
      patchState(store, ({ workday }) => ({
        workday: workday.addEmptyTask(),
      }));
    },
    removeTask(index: number) {
      patchState(store, ({ workday }) => ({
        workday: workday.removeTask(index),
      }));
    },
    updateDate(event: Event) {
      const date = (event.target as HTMLInputElement).value;
      patchState(store, ({ workday }) => ({
        workday: workday.createEmptyAtDate(date),
      }));
    },
    updateTask(index: number, updatedTask: Task) {
      patchState(store, ({ workday }) => ({
        workday: workday.updateTask(index, updatedTask),
      }));
    },
    // TODO: Persist current Workday on Firestore.
    // saveWorkday(workday: Workday): Observable<void> {
    //   console.log('Workday saved!', workday);
    //   return of(undefined);
    // },
  })),
);
function takeUntilDestroyed<T>(
  destroyRef: DestroyRef,
): import('rxjs').OperatorFunction<T, T> {
  const notifier = new Subject<void>();
  // notify when the Angular destroy lifecycle triggers
  destroyRef.onDestroy(() => {
    notifier.next();
    notifier.complete();
  });
  return takeUntil(notifier) as import('rxjs').OperatorFunction<T, T>;
}
