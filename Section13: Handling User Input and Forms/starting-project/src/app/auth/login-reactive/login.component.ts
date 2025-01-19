import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subscription, debounceTime, of } from "rxjs";

function mustContainQuestionMark(control:AbstractControl){
    if(control.value.includes('?')){
        return null
    }
    return {doesNotContainQuestionMark:true}//just some check to know that the error exists
}

function emailIsUnique(control:AbstractControl){
    if(control.value !== 'test@example.com'){
        return of(null) //observable with the value null
    }
    return of({notUnqiue:true});  
}

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');

if(savedForm){
    const loadedForm = JSON.parse(savedForm);
    initialEmailValue = loadedForm.email;
}

@Component({
    selector:'app-login',
    standalone:true,
    templateUrl:'./login.component.html',
    imports:[ReactiveFormsModule,CommonModule]
})
export class LoginComponent implements OnInit,OnDestroy{
    form = new FormGroup({
        email:new FormControl(initialEmailValue,{
            validators:[Validators.email, Validators.required],
            asyncValidators:[emailIsUnique]
        }),
        password:new FormControl('',{
            validators:[Validators.required, Validators.minLength(6),mustContainQuestionMark]
        })
    });  
    subscription!:Subscription;
    
    ngOnInit(){
        // const savedForm = window.localStorage.getItem('saved-login-form');
        // if(savedForm){
        //     const loadedForm = JSON.parse(savedForm);
        //     this.form.patchValue({email:loadedForm.email});//patch value is used to update partial fields
        // }


        this.subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
            next:value => {
                window.localStorage.setItem('saved-login-form',JSON.stringify({email:value.email}));
            }
        })
    }


    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    
    get emailIsInvalid(){
        return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid
    }

    get passwordIsInvalid(){
        return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid
    }

    onSubmit(){
        console.log(this.form);
        const enteredEmail = this.form.value.email;
        const enteredPassword = this.form.value.password;
        console.log(enteredEmail,enteredPassword)
    }
}