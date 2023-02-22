import { ApiService } from './services/api.service';
import { DialogComponent } from './dialog/dialog.component';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  displayedColumns: string[] = [
    'FirstName',
    'LastName',
    'Email',
    'contactNumber',
    'Age',
    'DOB',
    'salary',
    'address',
    'imageUrl',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private api: ApiService) {}
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '50%',
      height: '60%',
    });
  }
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.api.getUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert('error while fetching data');
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
