import { Component, OnInit, ViewChild } from '@angular/core';
import {
  EnglishTermApi,
  EnglishTermRequest,
  DefinitionRequest
} from 'src/app/shared/model/term.model';
import { DataManagerService } from 'src/app/shared/data-manager.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-create',
  templateUrl: './terms-create.component.html',
  styleUrls: ['./terms-create.component.css']
})
export class TermsCreateComponent implements OnInit {
  newTerm: DataForm;
  termResult: EnglishTermApi;

  @ViewChild('f') public termCreateForm: NgForm;

  constructor(private dataManager: DataManagerService, private router: Router) {
    this.newTerm = new DataForm();
    this.termResult = new EnglishTermApi();
  }

  ngOnInit(): void {}

  onTermSave() {
    if (this.termCreateForm.valid) {
      this.sendCreateRequest();
      this.router.navigate([`terms/detail/${this.termResult._id}`]);
    }
  }

  private sendCreateRequest() {
    const createRequestData = new EnglishTermRequest();

    // TODO: What if wordExpanded needs modification?
    const { authorName, wordEnglish, definition } = this.newTerm;

    // Modify form data
    this.newTerm.authorName = authorName.trim();
    this.newTerm.wordEnglish = wordEnglish.trim();

    // Create definitionData
    const definitionData = new DefinitionRequest(this.newTerm.authorName, definition);
    createRequestData.definitions = [definitionData];

    // Create data package to send for POST request
    const dataPackage = {
      ...createRequestData,
      wordNonEnglish: '',
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
      ...this.newTerm
    };

    // Remove unnecessary properties
    delete dataPackage.definition;

    // this.dataManager
    //   .addEnglishTerm(dataPackage)
    //   .subscribe(result => (this.termResult = result));

    // TODO: Remove log
    console.log(this.termResult);
  }
}

class DataForm {
  authorName: string;
  wordEnglish: string;
  wordExpanded?: string;
  definition: string;
  linkAuthoritative?: string;
  linkWikipedia?: string;
  linkYoutube?: string;
}
