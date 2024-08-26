import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { PlayerCommandCreate } from '@models/player-commands';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGameComponent {
  readonly dialogRef = inject(MatDialogRef<CreateGameComponent>);

  formGroup = new FormGroup({
    name: new FormControl<string>(null, [Validators.required]),
    questionCount: new FormControl<number>(null, [Validators.required, Validators.max(10)]),
  });

  onCreate() {
    if (this.formGroup.valid) {
      const create: PlayerCommandCreate = {
        name: this.formGroup.controls.name.value,
        question_count: this.formGroup.controls.questionCount.value,
      };
      this.dialogRef.close(create);
    } 
  }

  onNoOp() {
    this.dialogRef.close();
  }
}
