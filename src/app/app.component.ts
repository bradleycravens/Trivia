import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ConnectionService } from './core/connection.service';
import { LiveFeedService } from './features/live-feed/live-feed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Cap Table Chaos';

  connectionService = inject(ConnectionService);

  liveFeedService = inject(LiveFeedService);

  name = Date.now().toString();

  ngOnInit() {
    this.connectionService.connect(this.name);
  }

  onSearchLiveFeed(value: string) {
    this.liveFeedService.search(value);
  }
}
