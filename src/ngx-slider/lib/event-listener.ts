import { Subject, Subscription } from 'rxjs';

export class EventListener {
  eventName: string | null = null;
  events: Subject<Event> | null = null;
  eventsSubscription: Subscription | null = null;
  teardownCallback: (() => void) | null = null;
}
