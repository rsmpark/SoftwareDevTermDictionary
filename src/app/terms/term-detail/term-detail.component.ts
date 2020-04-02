import { Component, OnInit } from '@angular/core';
import { DataManagerService } from 'src/app/shared/data-manager.service';
import {
  EnglishTermApi,
  NonEnglishTermApi,
  ISOLanguageCodeAPI
} from 'src/app/shared/model/term.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-term-detail',
  templateUrl: './term-detail.component.html',
  styleUrls: ['./term-detail.component.css']
})
export class TermDetailComponent implements OnInit {
  term: EnglishTermApi;
  translatedTerms: NonEnglishTermApi[];
  languageCode: ISOLanguageCodeAPI[];
  languageNames: string[] = [];

  constructor(private dataManager: DataManagerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get english term by ID
    const id = this.route.snapshot.params['id'];
    this.dataManager.getEnglishTermById(id).subscribe(termResult => {
      this.term = termResult;
    });

    // TODO: Fix observable chaining
    // Get ISO language codes
    this.dataManager.getAllLanguageCodes().subscribe(results => {
      this.languageCode = results;

      // Get translated terms
      this.dataManager.getAllNonEnglishTerms().subscribe(termResults => {
        const tempTranslateTerms = [];

        // Map to find corresponding translation
        termResults.map(termResult => {
          if (termResult.termEnglishId === this.term._id) {
            tempTranslateTerms.push(termResult);
            this.languageNames.push(this.getLanguageNames(termResult.languageCode));
          }
        });

        this.translatedTerms = tempTranslateTerms;
      });
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

  getLanguageNames(languageCode: string) {
    const languageCodeFound = this.languageCode.find(result => result.code === languageCode);
    return languageCodeFound.name;
  }
}
