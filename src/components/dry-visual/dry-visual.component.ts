import { Component, OnInit } from '@angular/core';
import * as d3 from '../../../d3/d3';

@Component({
  selector: 'app-dry-visual',
  templateUrl: './dry-visual.component.html',
  styleUrls: ['./dry-visual.component.css']
})
export class DryVisualComponent implements OnInit {

  visualData: any[];
  constructor() { }

  ngOnInit(): void {
    this.visualData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    setInterval( () => {
      this.visualData.shift();
      this.visualData.push(1 + Math.round(Math.random() * 36));
      this.render(this.visualData);
    }, 1000);
  }

  render(data) {

    d3.select('#svg-view')
      .style('position', 'relative')
      .style('top', '200px')
      .selectAll('div.h-bar')
      .data(data)
      .enter()
      .append('div')
      .attr('class', 'h-bar')
      .append('rect');

    d3.select('#svg-view')
      .selectAll('div.h-bar')
      .data(data)
      .style('width', (d) => d * 10 + 'px')
      .style('margin-left', (d) => 8 + 'px')
      .style('padding', (d) => 4 + 'px')
      .style('margin-bottom', (d) => 1 + 'px')
      .style('background-color', (d) => 'gold')
      .style('align', 'bottom')
      .style('text-align', 'center')
      .style('font-weight', 'bold')
      .select('rect')
      .text( (d) => {
        return d;
      });

    d3.select('#svg-view')
    .selectAll('div.h-bar')
    .data(data)
    .exit()
    .remove();
  }
}
