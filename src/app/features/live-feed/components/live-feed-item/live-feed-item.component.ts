import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { LiveFeedEvent, LiveFeedIcon } from '@models/live-feed-event';

@Component({
  selector: 'app-live-feed-item',
  templateUrl: './live-feed-item.component.html',
  styleUrl: './live-feed-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveFeedItemComponent {
  @Input() event: LiveFeedEvent;

  LiveFeedIcon = LiveFeedIcon;
}
