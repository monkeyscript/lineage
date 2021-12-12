import { Component, OnInit } from '@angular/core';
import { List } from '../../data/list';
import { Node, Edge } from '@swimlane/ngx-graph';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

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

  // Selected node
  selectedNode: any = {};

  // List of upcoming birthdays
  upcomingBirthdays: {
    name: string,
    date: string
  }[] = [];

  constructor(
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {

    let items = this.firestore.collection('people').valueChanges();
    items.subscribe(result=>console.log(result))

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
    
    // Find upcoming birthdays
    let currentDate = new Date(); 
    // Iterate over people and check date 
    this.data.forEach(person => {
      let bday = new Date(person.bday);
      bday.setFullYear(currentDate.getFullYear());
      if(person.bday!=='' && bday > currentDate) {
        this.upcomingBirthdays.push({
          name : person.name,
          date : new Date(bday).toLocaleDateString('en-us', {weekday:"long", month:"short", day:"numeric"}) 
        })
      }
    });

  }

  // On node click
  onNodeSelect(node:Node) {
    let selectedNode = this.data.find(person=>person.id===node.id);
    if(selectedNode) {
      this.selectedNode = selectedNode;
    }
  }

}
