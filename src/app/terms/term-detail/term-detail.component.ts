import { Component, OnInit } from '@angular/core';
import { DataManagerService } from 'src/app/shared/data-manager.service';
import { EnglishTermApi, NonEnglishTermApi } from 'src/app/shared/model/term.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-term-detail',
  templateUrl: './term-detail.component.html',
  styleUrls: ['./term-detail.component.css']
})
export class TermDetailComponent implements OnInit {
  term: EnglishTermApi;
  translatedTerms: NonEnglishTermApi[];

  constructor(private dataManager: DataManagerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get english term by ID
    const id = this.route.snapshot.params['id'];
    this.dataManager.getEnglishTermById(id).subscribe(termResult => {
      this.term = termResult;
    });

    // Get translated terms
    this.dataManager.getAllNonEnglishTerms().subscribe(termResults => {
      let tempTranslateTerms = [];

      // Map to find corresponding translation
      termResults.map(termResult => {
        if (termResult.termEnglishId === this.term._id) {
          tempTranslateTerms.push(termResult);
        }
      });
      this.translatedTerms = tempTranslateTerms;
    });
  }

  onLikeClick(index: number) {
    const selectedDefinition = this.term.definitions[index];

    this.dataManager
      .incrementLikes(selectedDefinition._id, { _id: selectedDefinition._id })
      .subscribe(termResult => (this.term = termResult));
  }
  onHelpYesClick() {
    this.dataManager
      .incrementHelpYes(this.term._id, { _id: this.term._id })
      .subscribe(termResult => (this.term = termResult));
  }
  onHelpNoClick() {
    this.dataManager
      .incrementHelpNo(this.term._id, { _id: this.term._id })
      .subscribe(termResult => (this.term = termResult));
  }

  onAddTranslation() {}
}
