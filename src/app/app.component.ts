import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ApiService } from './api/api.service';
import { PhoneBookEntry } from './api/phone-book-entry.model';
import { EntryCreationComponent } from './modal/entry-creation/entry-creation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = ['id', 'phoneNumber', 'nickname', 'actions'];
  public data$: Observable<PhoneBookEntry[]>;
  public form: FormGroup;

  constructor(private dialog: MatDialog, private api: ApiService, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.data$ = this.api.getEntries();
    this.form = fb.group({
      phoneNumber: [''],
      nickname: ['']
    })
  }

  create() {
    this.api.createEntry(this.form.value).subscribe(updated => {
      this.snackBar.open('Entry successfully created', undefined, {
        duration: 3000
      });
      this.data$ = this.api.getEntries();
    });
  }

  openDialog(event: Event, entry: PhoneBookEntry) {
    event.preventDefault();
    let dialogRef = this.dialog.open(EntryCreationComponent, {data: entry});

    dialogRef.afterClosed().pipe(
      filter((result: PhoneBookEntry | null): result is PhoneBookEntry => {
        return result != null
      }),
      switchMap((result: PhoneBookEntry) => {
        return this.api.updateEntry(result);
      })
    ).subscribe(updated => {
      this.snackBar.open('Entry successfully updated', undefined, {
        duration: 3000
      });
      entry.nickname = updated.nickname;
      entry.phoneNumber = updated.phoneNumber;
    })
  }

  delete(event: Event, entry: PhoneBookEntry) {
    event.preventDefault();
    this.api.deleteEntry(entry).subscribe(() => {
      this.snackBar.open('Entry successfully deleted', undefined, {
        duration: 3000
      });
      this.data$ = this.api.getEntries();
    });
  }
}
