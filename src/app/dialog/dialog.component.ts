import { ApiService } from './../services/api.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  userForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogref: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      Age: ['', Validators.required],
      DOB: ['', Validators.required],
      salary: ['', Validators.required],
      address: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }
  addUser() {
    if (this.userForm.valid) {
      this.api.postUser(this.userForm.value).subscribe({
        next: (res) => {
          alert('user added successfully');
          this.userForm.reset();
          this.dialogref.close('save');
        },
        error: () => {
          alert('tchek your data');
        },
      });
    }
  }
}
