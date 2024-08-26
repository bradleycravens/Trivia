import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LiveFeedService } from './live-feed.service';
import { LiveFeedComponent } from './live-feed.component';
import { LiveFeedItemComponent } from './components/live-feed-item/live-feed-item.component';
import { LiveFeedSearchComponent } from './components/live-feed-search/live-feed-search.component';

@NgModule({
  declarations: [
    LiveFeedComponent,
    LiveFeedItemComponent,
    LiveFeedSearchComponent,
  ],
  exports: [LiveFeedComponent, LiveFeedSearchComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [LiveFeedService],
})
export class LiveFeedModule {}
