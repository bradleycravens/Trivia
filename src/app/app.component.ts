import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { playerNames } from '@models/player';

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

  ngOnInit() {
    const randomName =
      playerNames[Math.floor(Math.random() * playerNames.length)];
    this.connectionService.connect(randomName);
  }

  onSearchLiveFeed(value: string) {
    this.liveFeedService.search(value);
  }
}
