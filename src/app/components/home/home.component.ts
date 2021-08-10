import { Component, OnInit } from '@angular/core';
import { List } from '../../data/list';
import { Node, Edge } from '@swimlane/ngx-graph'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // List of all individuals
  data = List;

  // Nodes for the graph
  nodes : Node[] = [];

  // Edges for the graph
  edges : Edge[] = [];

  constructor() { }

  ngOnInit(): void {

    // Iterate over data 
    this.data.forEach(
      person => {
        this.nodes.push({
          id    : person.id,
          label : person.name,
        })
        person.parent.forEach(
          parent => {
            this.edges.push({
              id      : parent + '_' + person.id,
              source  : parent,
              target  : person.id
            })
          }
        )
      }
    )

  }

}
