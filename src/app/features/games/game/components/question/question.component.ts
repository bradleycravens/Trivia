import {
  Input,
  inject,
  Output,
  Component,
  ViewChild,
  OnChanges,
  Renderer2,
  ElementRef,
  EventEmitter,
  SimpleChanges,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ActiveGame } from '@models/game';
import { GameQuestionPayload } from '@models/game-events';
import { PlayerCommandAnswer } from '@models/player-commands';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnChanges, AfterViewInit {
  @Input() game: ActiveGame;

  @Input() question: GameQuestionPayload;

  @Output() submitAnswer = new EventEmitter<PlayerCommandAnswer>();

  @ViewChild('circle') circle: ElementRef;

  @ViewChild('countdownNumber') countdownNumber: ElementRef;

  formBuilder = inject(FormBuilder);

  renderer = inject(Renderer2);

  submitted = false;

  private timer: any;

  form = this.formBuilder.group({
    answer: [null, { validators: Validators.required }],
  });

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['question'].firstChange) {
      this.form.reset();
      this.submitted = false;
      this.resetCountdown();
      this.startCountdown();
    }
  }

  ngAfterViewInit() {
    this.startCountdown();
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitAnswer.emit({
        game_id: this.game.id,
        question_id: this.question.id,
        index: this.form.controls.answer.value,
      });
      this.submitted = true;
    }
  }

  private startCountdown() {
    let countdown = this.question.seconds;
    let countdownNumberEl = this.countdownNumber.nativeElement;

    countdownNumberEl.textContent = countdown.toString();

    this.timer = setInterval(() => {
      if (countdown <= 1) {
        this.renderer.removeClass(this.circle.nativeElement, 'circle');
        clearInterval(this.timer);
      }
      countdown--;
      countdownNumberEl.textContent = countdown.toString();
    }, 1000);
  }

  private resetCountdown() {
    clearInterval(this.timer);

    this.renderer.removeClass(this.circle.nativeElement, 'circle');
    setTimeout(() => {
      this.renderer.addClass(this.circle.nativeElement, 'circle');
    }, 1);
  }
}
