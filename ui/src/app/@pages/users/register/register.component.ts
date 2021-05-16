import { Component  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableNameEnum } from 'src/app/data/db.config';
import { IStorable } from 'src/app/data/IStorable';
import { User } from 'src/app/models/users/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form:FormGroup;
  constructor(
    private readonly _fb:FormBuilder,
    private readonly _usersService:UsersService) {
    this.form = _fb.group({
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      email:['', Validators.compose([Validators.required, Validators.email])],
    });
   }

   onSubmit() {
    if(this.form.invalid){
      console.error("form invalido");
      return;
    }

    const storableUser:IStorable<User> = {
      tableName:TableNameEnum.USERS,
      data:this.form.value
    }

    this._usersService.create(storableUser).subscribe(data => {
      console.log("server response this:", data);
    });
   }
}
