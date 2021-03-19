import { Component, OnInit } from '@angular/core';
import { PlaceHolderDataService } from '../services/place-holder-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { WSMessageServiceService } from '../services/wsmessage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  entryList: MatTableDataSource<any>;
  entryFormat: any;
  today: string;
  title = 'Track-Sys Dashboard';
  footer = 'Track-Sys Dashboard';
  entryData = [];

  constructor(private source: PlaceHolderDataService,
              private wslistener: WSMessageServiceService) {

    this.entryList = new MatTableDataSource();
    this.entryList.data = [];
    this.entryFormat =  {
                          paginator: {show: true,
                          position: {vertical: 'bottom', horizontal: 'right'}},
                          columns: [{tag: 'rowIndex',     label: '#'},
                                    {tag: '_item',         label: 'Reg'},
                                    {tag: '_entryTime',   label: 'Entry(time)'},
                                    {tag: '_duration',    label: 'Duration(mins)'},
                                    {tag: 'actions',      label: 'Actions'}],
                          actions: [{activator: 'button', label: 'Exit'}]
                        };
  }

  refresh(){
    this.source.getData().subscribe( response => {
        const received: any = response[0];
        if (response){
          this.entryList.data = [];
            this.entryData = [];
            received.forEach(element => {
                const item: any = element;
                if(!item['_exited'])
                  this.entryData.push(item);
            });

            this.entryData.sort((a,b)=>b._id-a._id);
            this.entryList.data = this.entryData;
        }
    });
  }

  ngOnInit(): void {

    this.wslistener.stompClient.connect({}, () => {
      this.wslistener.holder.stompClient.subscribe('/topic/message', (message) => {
          if ( message.body ) {

            const msg = JSON.parse(message.body);
            const target = msg['payload'];

            console.log(message.body);
            if ( msg.event === 'updated' ) {
              var cur = this.entryData.find(r => r._id === target._id);
              cur._duration = target._duration;
              // this.entryData.splice(this.entryData.indexOf(cur), 1);
              this.refresh();
            }

            if ( msg.event === 'created' ) {
              // this.entryData.unshift(target);
              this.entryData.push(target);
              this.refresh();
            }

            this.wslistener.holder.msgs.push(message.body);
          }
      });
    });
    this.refresh();
  }


  onAction(event: any) {
    this.source.update(event);
    event.srcElement.enable = false;
  }

  onLink(event: {'tableIndex': number}) {
   alert('Table ' + event.tableIndex + ': SEEN THAT DONE THAT AND LOOKING FOR NEW CHALLENGES!');
  }
}

