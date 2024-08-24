import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LiveFeedService } from './live-feed.service';

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.component.html',
  styleUrl: './live-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveFeedComponent {
  liveFeedService = inject(LiveFeedService);

  events$ = this.liveFeedService.filteredEvents$;

  ngOnInit() {
    this.liveFeedService.init();
  }
}