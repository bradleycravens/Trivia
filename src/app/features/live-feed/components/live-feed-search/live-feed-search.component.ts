import {
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-live-feed-search',
  templateUrl: './live-feed-search.component.html',
  styleUrl: './live-feed-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveFeedSearchComponent {
  control = new FormControl();

  @Output() search = new EventEmitter<string>();

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((value: string) => {
        value.trim().toLowerCase();
        this.search.emit(value);
      });
  }
}
