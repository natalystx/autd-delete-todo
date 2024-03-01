/* eslint-disable @typescript-eslint/no-explicit-any */
export default class Queue {
  private _queue: string[] = [];
  private _tasks = new Map<string, { type: string; data: any }>();
  private _timeInterval: number;
  private _intervalRef: number | undefined = undefined;
  private _subscriber = new Set<(event: { type: string; data: any }) => void>();

  constructor(timeInterval: number) {
    this._timeInterval = timeInterval;
  }

  add(id: string, event: { type: string; data: unknown }) {
    this._queue.push(id);
    this._tasks.set(id, event);

    if (!this._intervalRef) {
      this._interval();
    }
  }

  pop(id: string) {
    this._subscriber.forEach((sub) => {
      const payload = this._tasks.get(id);
      if (payload) {
        sub(payload);
      }
    });
    this._queue = this._queue.filter((i) => i !== id);
  }

  subscribe<T>(fn: (event: { type: string; data: T }) => void) {
    this._subscriber.add(fn);
  }

  private _clearQueue() {
    clearInterval(this._intervalRef);
    this._intervalRef = undefined;
  }

  private _interval = () => {
    if (!this._intervalRef) {
      this._intervalRef = setInterval(() => {
        if (this._queue.length === 1) {
          this._clearQueue();
        }

        this._subscriber.forEach((sub) => {
          const payload = this._tasks.get(this._queue[0]);
          if (payload) {
            sub(payload);
          }
        });
        this._tasks.delete(this._queue[0]);
        this._queue.shift();
      }, this._timeInterval);
    }
  };
}
