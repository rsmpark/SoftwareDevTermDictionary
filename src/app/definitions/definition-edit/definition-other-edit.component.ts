import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NonEnglishTermApi,
  DefinitionRequest,
  Definition,
} from 'src/app/shared/model/term.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataManagerService } from 'src/app/shared/data-manager.service';

@Component({
  selector: 'app-definition-other-edit',
  templateUrl: './definition-other-edit.component.html',
  styleUrls: ['./definition-other-edit.component.css'],
})
export class DefinitionOtherEditComponent implements OnInit {
  term: NonEnglishTermApi;
  newDefinition: DefinitionRequest;
  isEditable = false;
  editedDefinition: Definition[];

  @ViewChild('f') public definitionAddForm: NgForm;

  constructor(private dataManager: DataManagerService, private route: ActivatedRoute) {
    this.newDefinition = new DefinitionRequest();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.dataManager.getNonEnglishTermById(id).subscribe((termResult) => {
      this.term = termResult;
      this.editedDefinition = termResult.definitions;
    });
  }

  onLikeClick(index: number) {
    const selectedDefinition = this.term.definitions[index];

    this.dataManager
      .incrementLikesOther(selectedDefinition._id, { _id: selectedDefinition._id })
      .subscribe((termResult) => (this.term = termResult));
  }

  onReset() {
    this.definitionAddForm.reset();
  }

  onTermSave() {
    if (this.definitionAddForm.valid) {
      this.dataManager
        .addNonEnglishTermDefinition(this.term._id, this.newDefinition)
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
      .updateNonEnglishTermDefinition(this.editedDefinition[index]._id, definitionRequest)
      .subscribe((newTerm) => {
        this.editedDefinition = newTerm.definitions;
        this.term = newTerm;
        this.isEditable = false;
      });
  }
}
