import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';



@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})



export class ReadComponent implements OnInit {

  

  constructor(private service:ApiserviceService) { 


  }

 
   


  

  //  readData:any;


  readData: MatTableDataSource<any>;


  displayedColumns: string[] = ['id','name','email','username','password','contact','state','actions','delete'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator:MatPaginator;
  searchkey: string;
  

  ngOnInit(): void {
    this.readData = new MatTableDataSource();
    this.getAllData();
    
     this.readData.sort = this.sort;
    this.readData.paginator = this.paginator;
  }
  

  //get deleteid

  deleteID(id:any,i){

    if(confirm('Are you sure you want to delete?')){

      console.log(id,'deleteid==>');
    this.service.deleteData(id).subscribe((res)=>{
      console.log(res,'deleteres==>');
      this.getAllData();
      
    });
   

    }
    // console.log(id,'deleteid==>');
    // this.service.deleteData(id).subscribe((res)=>{
    //   console.log(res,'deleteres==>');
    //   this.getAllData();
      // this.dialogService.openConfirmDialog('Are you sure you want to delete this record ?');
      
    // });
  }

  //getData

  getAllData(){

    this.service.getAllData().subscribe((res)=>{
      console.log(res,"res==>");

      this.readData.data = res.data;
      
    });

  }

  onSearchClear() {
    this.searchkey = "";
    // this.applyFilter();
  }

  applyFilter() {
    this.readData.filter = this.searchkey.trim().toLowerCase();
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.readData.filter = filterValue.trim().toLowerCase();

  //   if (this.readData.paginator) {
  //     this.readData.paginator.firstPage();
  //   }
  // }

// onCreate(){
//   const dialogConfig = new MatDialogConfig(); 
//   dialogConfig.disableClose = true;
//   dialogConfig.autoFocus = true;
  
//   this.dialog.open(CreateComponent);
// }




}

 


