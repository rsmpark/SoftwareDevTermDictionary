import { Component, OnInit } from '@angular/core';
import { EnglishTerm, EnglishTermCreate } from 'src/app/shared/model/term.model';
import { DataManagerService } from 'src/app/shared/data-manager.service';

@Component({
  selector: 'app-terms-create',
  templateUrl: './terms-create.component.html',
  styleUrls: ['./terms-create.component.css']
})
export class TermsCreateComponent implements OnInit {
  newTerm: EnglishTermCreate;
  termResult: EnglishTerm;
  currentTerms: EnglishTerm[];

  constructor(private dataManager: DataManagerService) {
    this.newTerm = new EnglishTerm();
    this.termResult = new EnglishTerm();
  }

  ngOnInit(): void {
    this.dataManager.getAllEnglishTerms().subscribe(terms => {
      this.currentTerms = terms;
    });
  }

  onTermSave() {
    console.log(this.newTerm);
  }
}
