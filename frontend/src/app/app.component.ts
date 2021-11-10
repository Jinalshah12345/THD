import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { MatPaginator } from '@angular/material/paginator';
import { OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  

  constructor(public dialog: MatDialog){}

  ngOnInit() {
    
  }

  

  openDialog(){
    this.dialog.open(DialogExampleComponent);
  }
  title = 'THD Tasks';
}
