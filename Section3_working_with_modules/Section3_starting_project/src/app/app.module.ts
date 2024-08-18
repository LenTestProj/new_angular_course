import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";
import { BrowserModule } from "@angular/platform-browser"; //used for angular modules to run correctly
import { SharedModule } from "./shared/shared.module";
import { TasksModule } from "./tasks/tasks.module";
 
@NgModule({
    declarations:[AppComponent,UserComponent,HeaderComponent],
    bootstrap:[AppComponent],
    imports:[BrowserModule,SharedModule,TasksModule]
    //only for root component to tell angular which component to start with  
})
export class AppModule{

}