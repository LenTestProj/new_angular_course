import { Component, Input, OnInit, inject} from '@angular/core';
import { ModalComponent } from "../modal.component";
import { ErrorService } from '../../error.service';

@Component({
    selector: 'app-error-modal',
    standalone: true,
    templateUrl: './error-modal.component.html',
    styleUrls: ['./error-modal.component.css'],
    imports: [ModalComponent]
})
export class ErrorModalComponent implements OnInit{
    @Input() title:String = '';
    @Input() message = '';
    private errorService = inject(ErrorService);

    onClearError() {
        this.errorService.clearError();
    }

    ngOnInit(): void {
        console.log("Hello Error component")
    }
    
}
