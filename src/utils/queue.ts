type EventPayload<T> = { type: string; data: T };
type Subscriber<T> = (event: EventPayload<T>) => void;

export default class Queue<T> {
  private _queue: string[] = [];
  private _tasks = new Map<string, { data: T; time: number }>();
  private _timeInterval: number;
  private _baseInterval = 60;
  private _subscriber = new Set<Subscriber<T>>();

  constructor(timeInterval: number) {
    this._timeInterval = timeInterval;
  }

  add(id: string, event: { data: T }) {
    this._tasks.set(id, {
      ...event,
      time: Date.now() + this._timeInterval,
    });
    this._queue.push(id);

    if (this._queue.length === 1) {
      this._interval();
    }
  }

  pop(id: string) {
    this._subscriber.forEach((sub) => {
      const payload = this._tasks.get(id);
      if (payload) {
        sub({ type: "remove", data: payload.data });
      }
    });
    this._queue = this._queue.filter((i) => i !== id);
  }

  subscribe(fn: Subscriber<T>) {
    this._subscriber.add(fn);

    return { unsubscribe: () => this._subscriber.delete(fn) };
  }

  private _clearQueue() {
    clearInterval(this._intervalRef);
    this._intervalRef = undefined;
  }

  private _intervalRef: NodeJS.Timeout | undefined = undefined;
  private _interval = () => {
    if (!this._intervalRef) {
      this._intervalRef = setInterval(() => {
        const payload = this._tasks.get(this._queue[0]);
        const diffTime = (payload?.time || 0) - Date.now();

        if (diffTime <= 60) {
          if (this._queue.length === 1) {
            this._clearQueue();
          }

          this._subscriber.forEach((sub) => {
            if (payload) {
              sub({ type: "remove", data: payload.data });
            }
          });
          this._tasks.delete(this._queue[0]);
          this._queue.shift();
        }
      }, this._baseInterval);
    }
  };
}
