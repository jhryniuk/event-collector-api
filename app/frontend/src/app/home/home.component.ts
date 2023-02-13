import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  public ngOnInit(): void {
    if (this.authService.getToken() === '') {
      this.router.navigateByUrl('/login');
    }
  }
}
