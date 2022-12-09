import { Component } from "@angular/core";
import { AuthService } from "../shared/services/auth.service";
import { EventService } from "../shared/services/event.service";
import { IEvent } from "../shared/model/event.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  public events: IEvent[] = [];

  public constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  public ngOnInit(): void {
    if (this.authService.getToken() !== '') {
      this.eventService.list(this.authService.getToken()).subscribe((events: IEvent[]) => {
        this.events = events;
      }, () => {
        this.authService.logout();
        this.router.navigateByUrl('');
      });
    } else {
      this.router.navigateByUrl('');
    }
  }
}
