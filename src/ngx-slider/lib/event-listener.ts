import { Subject, Subscription } from 'rxjs';

export class EventListener {
  eventName: string = null;
  events: Subject<Event> = null;
  eventsSubscription: Subscription = null;
  teardownCallback: () => void = null;
}
