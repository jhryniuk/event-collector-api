import { Component } from "@angular/core";
import { AuthService } from "../shared/services/auth.service";
import { EventService } from "../shared/services/event.service";
import { IEvent } from "../shared/model/event.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import { AuthenticatedUserService } from "../shared/services/authenticated-user.service";
import {ToastService} from "../shared/services/toast-service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent {
  public events: IEvent[] = [];
  public eventId?: number;
  public event: IEvent = {} as IEvent;

  public newEvent: IEvent = {} as IEvent;
  public newStartDate: NgbDateStruct = {} as NgbDateStruct;
  public newStartTime = {hour: 0, minute: 0};
  public newEndDate: NgbDateStruct = {} as NgbDateStruct;
  public newEndTime = {hour: 0, minute: 0};
  public createEvent = false;
  public disableAddParticipant = true;
  public constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticatedUserService: AuthenticatedUserService,
    private toastService: ToastService
  ) {
    this.eventId = parseInt(<string>this.activatedRoute.snapshot.paramMap.get('event'), 10);
  }

  public createNewEvent() {
    this.newEvent.startDateTime = new Date(this.newStartDate.year,this.newStartDate.month - 1 ,this.newStartDate.day, this.newStartTime.hour, this.newStartTime.minute);
    this.newEvent.endDateTime = new Date(this.newEndDate.year, this.newEndDate.month - 1, this.newEndDate.day, this.newEndTime.hour, this.newEndTime.minute);
    this.newEvent.owner = `/api/users/${this.authenticatedUserService.getUser().id}`;
    this.eventService.post(this.newEvent, this.authService.getToken()).subscribe((result) => {
      this.toastService.show('Event has been created', {classname: 'bg-success text-light', delay: 3000});
      this.getEvents();
      this.createEvent = false;
    });
  }

  public addParticipant(): void {
    const participants = this.event.participants;
    participants.push(`/api/users/${this.authenticatedUserService.getUser().id}`);
    this.event.participants = participants;
    this.eventService.put(this.event, this.authService.getToken()).subscribe((result) => {
      this.toastService.show('Your participation has been added', {classname: 'bg-success text-light', delay: 3000})
    });
  }

  public getEvents(): void {
    if (!this.eventId) {
      this.eventService.list(this.authService.getToken()).subscribe((events: IEvent[]) => {
        this.events = events;
      }, () => {
        this.authService.logout();
        this.router.navigateByUrl('');
      });
    } else {
      this.eventService.get(this.authService.getToken(), this.eventId).subscribe((event: IEvent) => {
        this.event = event;

        if (new Date(this.event.startDateTime) > new Date()) {
          this.disableAddParticipant = false;
        }
      });
    }
  }
  public ngOnInit(): void {
    this.getEvents();
  }
}
