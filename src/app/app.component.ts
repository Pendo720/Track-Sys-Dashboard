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
  title = 'Tri-Front';
  footer = 'Tri-Front';
  entryData = [];

  constructor(private source: PlaceHolderDataService,
              private wslistener: WSMessageServiceService) {

    this.entryList = new MatTableDataSource();
    this.entryList.data = [];
    this.entryFormat =  {
                          paginator: {show: true,
                                      position: {vertical: 'bottom', horizontal: 'right'}},
                          columns: [{tag: 'rowIndex',     label: '#'},
                                    {tag: 'reg',          label: 'Item'},
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
                const item: any = {};
                item.reg = element._item;
                this.entryData.push(item);
              });

             this.entryList.data = this.entryData;
        }
      });
  }

  ngOnInit(): void {

    this.wslistener.stompClient.connect({}, () => {
      this.wslistener.holder.stompClient.subscribe('/topic/message', (message) => {
          if ( message.body ) {

            const msg = JSON.parse(message.body);
            const target = JSON.parse(msg.payload);

            console.log(message.body);
            if ( msg.event === 'updated' ) {
              const cur = this.entryData.find(r => r.reg === target.reg);
              this.entryData.splice(this.entryData.indexOf(cur), 1);
            }

            if ( msg.event === 'created' ) {
              this.entryData.push(target);
            }

            // this.entryList.data = this.getFormatted();
            this.wslistener.holder.msgs.push(message.body);
            this.refresh();
          }
      });
    });
    this.refresh();
  }


  onAction(event: any) {

    event.left = true;
    this.source.update(event);
  }

  onLink(event: {'tableIndex': number}) {
   alert('Table ' + event.tableIndex + ': SEEN THAT DONE THAT AND LOOKING FOR NEW CHALLENGES!');
  }


  // formatDuration( duration: number){
  //   return (duration / 60000).toFixed(0);
  // }

  // formatTime(epoch){
  //   const t =  new Date(epoch);
  //   const h = t.getHours();
  //   const m = t.getMinutes();
  //   return (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m);
  // }

  // getFormatted(){
  //   const that = this;
  //   const toReturn = JSON.parse(JSON.stringify(this.entryData));
  //   toReturn.map(r => !r.left);
  //   toReturn.sort((a, b) => a.time > b.time ? -1 : 1);
  //   toReturn.forEach( (i: any) => { i.time = that.formatTime(i.time);
  //                                   i.duration = that.formatDuration(i.duration);
  //                                 });
  //   return toReturn;
  // }
}

