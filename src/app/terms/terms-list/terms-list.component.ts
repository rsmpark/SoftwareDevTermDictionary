import { Component, OnInit, Input } from '@angular/core';
import { EnglishTermApi } from 'src/app/shared/model/term.model';
import { DataManagerService } from 'src/app/shared/data-manager.service';
import { Router } from '@angular/router';
import { Observable, concat } from 'rxjs';

@Component({
  selector: 'app-terms-list',
  templateUrl: './terms-list.component.html',
  styleUrls: ['./terms-list.component.css'],
})
export class TermsListComponent implements OnInit {
  terms: EnglishTermApi[];

  @Input() searchWord: string;

  constructor(private dataManager: DataManagerService, private router: Router) {}

  ngOnInit(): void {
    console.log('BBBB');

    this.dataManager.getAllEnglishTerms().subscribe((terms: EnglishTermApi[]) => {
      this.terms = terms;
    });
  }

  onSearchWord() {
    this.dataManager
      .getAllEnglishTermsByWord(this.searchWord)
      .subscribe((termsMatched: EnglishTermApi[]) => {
        this.terms = termsMatched;
      });
  }

  onRemoveTerm(index: number) {
    // TODO: Fix subscription chaining
    const englishTermId = this.terms[index]._id;

    this.dataManager
      .getNonEnglishTermsByTermEnglishId(englishTermId)
      .subscribe((nonEnglishTerm) => {
        nonEnglishTerm.forEach((term) => {
          this.dataManager.deleteNonEnglishTerm(term._id).subscribe();
        });
      });

    this.dataManager.deleteEnglishTerm(englishTermId).subscribe(() => {
      this.dataManager.getAllEnglishTerms().subscribe((terms) => (this.terms = terms));
    });
  }
}
