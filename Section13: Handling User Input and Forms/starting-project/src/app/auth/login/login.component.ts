import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ViewChild, afterNextRender, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[FormsModule,CommonModule]
})
export class LoginComponent {
    @ViewChild('form') form!:NgForm;
    private destroyRef = inject(DestroyRef);

    constructor(){
        //similar to use-effect in react

        afterNextRender(()=>{
            const savedForm = window.localStorage.getItem('saved-login-form');
            if(savedForm){
                const loadedFormData = JSON.parse(savedForm);
                const savedEmail = loadedFormData.email;
                const savedPassword = loadedFormData.password;

                setTimeout(()=>{
                    this.form.controls['email'].setValue(savedEmail);
                    this.form.controls['password'].setValue(savedPassword);
                },1)
                

                // this.form.setValue({email:savedEmail})
            }

            const subscription = this.form.valueChanges?.pipe(debounceTime(500)).subscribe({next:(value)=>{
                window.localStorage.setItem('saved-login-form',JSON.stringify({email:value.email,password:value.password}))     
            }});

            this.destroyRef.onDestroy(()=>{
                subscription?.unsubscribe()
            })
        })
    }

    onSubmit(formData:NgForm){
        if(!formData.form.valid){
            return;
        }
        const enteredEmail =  formData.form.value.email;
        const enteredPassword = formData.form.value.password;

        formData.form.reset();
    }   
}
