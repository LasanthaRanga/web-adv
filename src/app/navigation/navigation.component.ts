import { Component, OnInit, Injectable } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOF } from 'rxjs';

export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);

  constructor() {

    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);

    this.nestedDataSource = new MatTreeNestedDataSource();

    this.dataChange.subscribe(data => this.nestedDataSource.data = data);

    this.dataChange.next([
      {
        filename: 'Test 1',
        type: '',
        children: [
          {
            filename: 'Test3', type: '', children: [
              { filename: 'Test3', type: '', children: [ { filename: 'Test3', type: '', children: [] }] },
              { filename: 'Test3', type: '', children: [] }]
          }
        ],
      },
      { filename: 'test 2', type: '', children: [] }
    ]);
  }

  private _getChildren = (node: FileNode) => { return observableOF(node.children); };

  hasNestedChild = (_: number, nodeData: FileNode) => { return !(nodeData.type); };

  ngOnInit() {
  }

}
