import { Component, OnInit } from '@angular/core';
import { NonEnglishTermApi } from 'src/app/shared/model/term.model';
import { DataManagerService } from 'src/app/shared/data-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-term-other-detail',
  templateUrl: './term-other-detail.component.html',
  styleUrls: ['./term-other-detail.component.css']
})
export class TermOtherDetailComponent implements OnInit {
  term: NonEnglishTermApi;

  constructor(
    private dataManager: DataManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get english term by ID
    const id = this.route.snapshot.params['id'];
    this.dataManager.getNonEnglishTermById(id).subscribe(termResult => {
      this.term = termResult;
    });
  }

  onLikeClick(index: number) {
    const selectedDefinition = this.term.definitions[index];

    this.dataManager
      .incrementLikesOther(selectedDefinition._id, { _id: selectedDefinition._id })
      .subscribe(termResult => (this.term = termResult));
  }
  onHelpYesClick() {
    this.dataManager
      .incrementHelpYesOther(this.term._id, { _id: this.term._id })
      .subscribe(termResult => (this.term = termResult));
  }
  onHelpNoClick() {
    this.dataManager
      .incrementHelpNoOther(this.term._id, { _id: this.term._id })
      .subscribe(termResult => (this.term = termResult));
  }
}
