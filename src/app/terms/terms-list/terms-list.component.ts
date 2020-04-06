import { Component, OnInit, Input } from '@angular/core';
import { EnglishTermApi } from 'src/app/shared/model/term.model';
import { DataManagerService } from 'src/app/shared/data-manager.service';

@Component({
  selector: 'app-terms-list',
  templateUrl: './terms-list.component.html',
  styleUrls: ['./terms-list.component.css'],
})
export class TermsListComponent implements OnInit {
  terms: EnglishTermApi[];

  @Input() searchWord: string;

  constructor(private dataManager: DataManagerService) {}

  ngOnInit(): void {
    this.dataManager.getAllEnglishTerms().subscribe((terms: EnglishTermApi[]) => {
      this.terms = terms;
    });
  }

  onSearchWord() {
    // TODO: Do we have to encode the word before sending the Web API
    this.dataManager
      .getAllEnglishTermsByWord(this.searchWord)
      .subscribe((termsMatched: EnglishTermApi[]) => {
        this.terms = termsMatched;
      });
  }

  onRemoveTerm(index: number) {
    const englishTermId = this.terms[index]._id;
    this.dataManager.deleteEnglishTerm(englishTermId).subscribe();

    this.dataManager
      .getNonEnglishTermsByTermEnglishId(englishTermId)
      .subscribe((nonEnglishTerm) => {
        nonEnglishTerm.forEach((term) => {
          this.dataManager.deleteNonEnglishTerm(term._id).subscribe();
        });
      });
  }
}
