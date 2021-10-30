import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhoneBookEntry } from 'src/app/api/phone-book-entry.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-entry-creation',
  templateUrl: './entry-creation.component.html',
  styleUrls: ['./entry-creation.component.scss']
})
export class EntryCreationComponent implements OnInit {
  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PhoneBookEntry, private fb: FormBuilder) {
    this.form = fb.group({
      id: [data.id],
      phoneNumber: [data.phoneNumber],
      nickname: [data.nickname]
    })

    
  }

  ngOnInit(): void {
  }

}
