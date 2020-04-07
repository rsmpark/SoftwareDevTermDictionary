import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManagerService } from 'src/app/shared/data-manager.service';
import {
  EnglishTermApi,
  DefinitionRequest,
  Definition,
} from 'src/app/shared/model/term.model';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-definition-edit',
  templateUrl: './definition-edit.component.html',
  styleUrls: ['./definition-edit.component.css'],
})
export class DefinitionEditComponent implements OnInit {
  term: EnglishTermApi;
  newDefinition: DefinitionRequest;
  isEditable = false;
  editedDefinition: Definition[];

  @ViewChild('f') public definitionAddForm: NgForm;

  constructor(private dataManager: DataManagerService, private route: ActivatedRoute) {
    this.newDefinition = new DefinitionRequest();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const translationId = this.route.snapshot.queryParams.translationId;

    if (translationId) {
      this.dataManager.getNonEnglishTermById(translationId).subscribe((termResult) => {
        this.term = termResult;
      });
    } else {
      this.dataManager.getEnglishTermById(id).subscribe((termResult) => {
        this.term = termResult;
        this.editedDefinition = termResult.definitions;
      });
    }
  }

  onLikeClick(index: number) {
    const selectedDefinition = this.term.definitions[index];

    this.dataManager
      .incrementLikes(selectedDefinition._id, { _id: selectedDefinition._id })
      .subscribe((termResult) => (this.term = termResult));
  }

  onReset() {
    this.definitionAddForm.reset();
  }

  onTermSave() {
    if (this.definitionAddForm.valid) {
      this.dataManager
        .addEnglishTermDefinition(this.term._id, this.newDefinition)
        .subscribe((termResult) => (this.term = termResult));
    }
  }

  onEdit() {
    this.isEditable = true;
  }

  onEditSave(index: number) {
    const definitionRequest = { ...this.editedDefinition[index] };

    delete definitionRequest._id;

    this.dataManager
      .updateEnglishTermDefinition(this.editedDefinition[index]._id, definitionRequest)
      .subscribe((newTerm) => {
        this.editedDefinition = newTerm.definitions;
        this.term = newTerm;
        this.isEditable = false;
      });
  }
}
