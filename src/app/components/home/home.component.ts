import { Component, OnInit } from '@angular/core';
import { Node, Edge } from '@swimlane/ngx-graph';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // List of all individuals
  people : {
    id        :   string,
    name      :   string,
    parent    :   string[],
    birthday  :   string,
    image     :   string,
  }[] = [];

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

  // For triggering graph update 
  update$: Subject<boolean> = new Subject();

  constructor(
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {

    // Load data from firestore
    let people = this.firestore.collection('people').valueChanges();
    people.subscribe((result:any[])=> {
      this.people = result;
      
      // Iterate over people 
      this.people.forEach(
        person => {
          let nodeObject :any = {
            id    : person.id,
            label : person.name,
            image : person.image
          }
          this.nodes.push(nodeObject);
          if(person.parent) {
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
        }
      )

      // Find upcoming birthdays
      let currentDate = new Date(); 
      // Iterate over people and check date 
      this.people.forEach(person => {
        let bday = new Date(person.birthday);
        bday.setFullYear(currentDate.getFullYear());
        if(person.birthday!=='' && bday > currentDate) {
          this.upcomingBirthdays.push({
            name : person.name,
            date : new Date(bday).toLocaleDateString('en-us', {weekday:"long", month:"short", day:"numeric"}) 
          })
        }
      });

      // Update graph 
      this.update$.next(true);
      
    });

  }

  // On node click
  onNodeSelect(node:Node) {
    let selectedNode = this.people.find(person=>person.id===node.id);
    if(selectedNode) {
      this.selectedNode = selectedNode;
    }
  }

}
