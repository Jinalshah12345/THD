import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  
  
  
  
  constructor(private service:ApiserviceService, private router:ActivatedRoute, private fb:FormBuilder, public dialog: MatDialog) { }
  
  errormsg:any;
  successmsg:any;
  getparamid:any;
  
  ngOnInit(): void {
    console.log(this.router.snapshot.paramMap.get('id'),'getid');
    this.getparamid = this.router.snapshot.paramMap.get('id');
    // const pat = '^[a-zA-Z0-9]+@miraclesoft\.com$';
    if(this.getparamid)
    {
      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,'res==>');
        this.userForm.patchValue({
          name:res.data[0].name,
          email:res.data[0].email,
          username:res.data[0].username,
          password:res.data[0].password,
          contact:res.data[0].contact,
          state:res.data[0].state
    


      });

    });
    
  }
}


  userForm = new FormGroup({

    'name':new FormControl('', [Validators.required, Validators.minLength(2)]),
    'email':new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+@miraclesoft\.com") ]),
    'username':new FormControl('', [Validators.required, Validators.minLength(2)]),
    'password':new FormControl('', [Validators.required, Validators.minLength(7)]),
    'contact':new FormControl('', [Validators.required, Validators.minLength(10)]),
    'state':new FormControl('', [Validators.required, Validators.minLength(10)]),





  });

  //create new user

  userSubmit()
  {
      if(this.userForm.valid)
      {
        console.log(this.userForm.value);
        this.service.createData(this.userForm.value).subscribe((res)=>{
          console.log(res,'res==>');
          this.userForm.reset();
          this.successmsg = res.msg;
            
        });
      }
      else{
        this.errormsg = 'all fields required';
      }
  }

  //updated data

  userUpdate(){

    console.log(this.userForm.value,'updatedform');

    if(this.userForm.valid){

      this.service.updateData(this.userForm.value,this.getparamid).subscribe((res)=>{

        console.log(res,'resupdated');

      });

    } else{

    }
  }

    openDialog() {
      this.dialog.open(DialogExampleComponent);
   }

   onClear(){
     this.userForm.reset();
     
   }

  //  onClose(){
  //    this.userForm.reset();
  //    this.dialogRef.close();
  //  }

  






  // onSubmit() {
  //   console.log(this.userForm);
  // }

}

