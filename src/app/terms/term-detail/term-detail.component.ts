import { Component, OnInit } from '@angular/core';
import { DataManagerService } from 'src/app/shared/data-manager.service';
import { EnglishTermApi } from 'src/app/shared/model/term.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-term-detail',
  templateUrl: './term-detail.component.html',
  styleUrls: ['./term-detail.component.css']
})
export class TermDetailComponent implements OnInit {
  term: EnglishTermApi;

  constructor(private dataManager: DataManagerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.dataManager.getEnglishTermById(id).subscribe(termResult => {
      this.term = termResult;
      console.log(this.term);
    });
  }
}
