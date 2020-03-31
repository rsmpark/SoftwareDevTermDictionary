import { Component, OnInit, Input } from '@angular/core';
import { EnglishTermApi } from 'src/app/shared/model/term.model';
import { DataManagerService } from 'src/app/shared/data-manager.service';

@Component({
  selector: 'app-terms-list',
  templateUrl: './terms-list.component.html',
  styleUrls: ['./terms-list.component.css']
})
export class TermsListComponent implements OnInit {
  terms: EnglishTermApi[];
  term: EnglishTermApi;

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
}
