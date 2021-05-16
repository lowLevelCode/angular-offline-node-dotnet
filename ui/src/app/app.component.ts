import { Component } from '@angular/core';
import { ConnectionService } from 'ngx-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
})
export class AppComponent {
  title = 'ui';
  hasNetworkConnection: boolean = true;
  hasInternetAccess: boolean = true;
  status: string = '';

  constructor(private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe(currentState => {
        this.hasNetworkConnection = currentState.hasNetworkConnection;
        this.hasInternetAccess = currentState.hasInternetAccess;
        if (this.hasNetworkConnection && this.hasInternetAccess) {
          this.status = 'ONLINE';          
        } else {
          this.status = 'OFFLINE';          
        }
    });
  }
}
