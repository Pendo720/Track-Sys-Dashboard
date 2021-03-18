import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DryTableDataSource } from './dry-table-datasource';

@Component({
  selector: 'app-dry-table',
  templateUrl: './dry-table.component.html',
  styleUrls: ['./dry-table.component.css']
})
export class DryTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @Input() dataSource: DryTableDataSource<any>;
  @Input() tableFormat: any;
  @Input() tableIndex: number;
  @Output() buttonClick = new EventEmitter<object>();
  @Output() linkClick = new EventEmitter<object>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  columnsTags: any = [];
  showRowIndex = false;

  ngOnInit() {
    this.columnsTags = [];
    this.tableFormat?.columns.forEach(c => {
      this.columnsTags.push(c.label);
    });

    this.showRowIndex = this.tableFormat?.columns[0].tag === 'rowIndex';
    if (this.dataSource){
      this.dataSource.data = [];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    this.table.dataSource = this.dataSource;
  }
  

  onActionButtonClick(element) {
    this.buttonClick.emit(element);
  }

  onActionLinkClick(element) {
    this.linkClick.emit(element);
  }
}
