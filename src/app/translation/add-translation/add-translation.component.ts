import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManagerService } from 'src/app/shared/data-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NonEnglishTermRequest,
  ISOLanguageCodeAPI,
  EnglishTermApi,
  DefinitionRequest,
  NonEnglishTermApi,
} from 'src/app/shared/model/term.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-translation',
  templateUrl: './add-translation.component.html',
  styleUrls: ['./add-translation.component.css'],
})
export class AddTranslationComponent implements OnInit {
  englishTerm: EnglishTermApi;
  newTranslatedTerm: NonEnglishTermRequest;
  newTerm: DataForm;
  languageCodes: ISOLanguageCodeAPI[];
  termResult: NonEnglishTermApi;

  @ViewChild('f') public termCreateForm: NgForm;

  constructor(
    private dataManager: DataManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.newTranslatedTerm = new NonEnglishTermRequest();
    this.newTerm = new DataForm();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.dataManager.getAllLanguageCodes().subscribe((results) => {
      this.languageCodes = results;
    });

    this.dataManager.getEnglishTermById(id).subscribe((result) => {
      this.englishTerm = result;
    });
  }

  submitNewTranslation() {
    if (this.termCreateForm.valid) {
      this.sendCreateRequest();
    }
  }

  private sendCreateRequest() {
    const createRequestData = new NonEnglishTermRequest();

    // TODO: What if wordExpanded needs modification?
    const { authorName, wordNonEnglish, definition } = this.newTerm;

    // Modify form data
    this.newTerm.authorName = authorName.trim();
    this.newTerm.wordNonEnglish = wordNonEnglish.trim();

    // Create definitionData
    const definitionData = new DefinitionRequest();
    definitionData.authorName = this.newTerm.authorName;
    definitionData.definition = definition;
    createRequestData.definitions = [definitionData];

    // Create data package to send for POST request
    const dataPackage = {
      ...createRequestData,
      wordEnglish: this.englishTerm.wordEnglish,
      wordExpanded: '',
      languageCode: 'en',
      image: '',
      imageType: '',
      audio: '',
      audioType: '',
      linkAuthoritative: '',
      linkWikipedia: '',
      linkYouTube: '',
      authorName: '',
      fieldOfStudy: '',
      helpYes: 0,
      helpNo: 0,
      termEnglishId: this.englishTerm._id,
      ...this.newTerm,
    };

    // Remove unnecessary properties
    delete dataPackage.definition;

    this.dataManager.addNonEnglishTerm(dataPackage).subscribe((result) => {
      this.termResult = result;
      this.router.navigate([`termsEnglish/detail/${this.englishTerm._id}`]);
    });
  }
}

// TODO: Word expanded
class DataForm {
  authorName: string;
  wordNonEnglish: string;
  fieldOfStudy: string;
  definition: string;
  languageCode: string;
  linkAuthoritative?: string;
  linkWikipedia?: string;
  linkYoutube?: string;
}
