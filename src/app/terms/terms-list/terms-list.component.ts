import { Component, OnInit, Input } from '@angular/core';
import { EnglishTerm } from 'src/app/shared/model/term.model';
import { DataManagerService } from 'src/app/shared/data-manager.service';

@Component({
  selector: 'app-terms-list',
  templateUrl: './terms-list.component.html',
  styleUrls: ['./terms-list.component.css']
})
export class TermsListComponent implements OnInit {
  terms: EnglishTerm[];
  term: EnglishTerm;

  @Input() searchWord: string;

  constructor(private dataManager: DataManagerService) {}

  ngOnInit(): void {
    this.dataManager.getAllEnglishTerms().subscribe((terms: EnglishTerm[]) => {
      this.terms = terms;
    });
  }

  onSearchWord() {
    this.dataManager
      .getAllEnglishTermsByWord(this.searchWord)
      .subscribe((termsMatched: EnglishTerm[]) => {
        this.terms = termsMatched;
      });
  }
}
