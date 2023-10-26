import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthToolService } from '../../services/auth-tool.service';

@Component({
  selector: 'app-auth-tool',
  templateUrl: './auth-tool.component.html',
  styleUrls: ['./auth-tool.component.scss'],
})
export class AuthToolComponent implements OnInit {
  sections: any[] = [];
  img: any;
  numberOfColumns: any[] = [1, 2, 3];
  layout: any[] = ['Vertical', 'Horizontal'];
  currentActiveType: any = '';
  currentActiveText: any = '';
  laoding = false;
  previewDisplay = false;
  notValidResource = false;
  resources: any[] = ['matlab', 'labview','multisim','packet_tracer','remote_controller_lab','emona'];

  trueAndFalse = 'True Or False';
  singleSelectMSQ = 'Single select Mcq';
  multileSelectMSQ = 'Multi select Mcq';
  openQuestion = 'Open Question';
  sectionForm!: any;
  content = [
    {
      display: 'text',
      text: this.authToolService.textType,
      icon: 'px-2 pi pi-book',
    },
    {
      display: 'code',
      text: this.authToolService.codeType,
      icon: 'px-2 pi pi-code',
    },
    {
      display: 'image',
      text: this.authToolService.imageType,
      icon: 'px-2 pi pi-image',
    },

    {
      display: 'video',
      text: this.authToolService.videoType,
      icon: 'px-2 pi pi-video',
    },
    {
      display: 'Iframe',
      text: this.authToolService.iframeType,
      icon: 'px-2 pi pi-link',
    },
  ];
  Questions = [
    { text: this.trueAndFalse, icon: 'px-2 pi pi-check' },
    { text: this.singleSelectMSQ, icon: 'px-2 pi pi-arrows-h' },
    { text: this.multileSelectMSQ, icon: 'px-2 pi pi-arrows-h' },
    { text: this.openQuestion, icon: 'px-2 pi pi-question' },
  ];
  display: boolean = false;
  expirementId: any = '';

  constructor(
    // private fb: FormBuilder,
    // private sanitizer: DomSanitizer,
    public authToolService: AuthToolService,
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.expirementId = params.id;
      this.authToolService.expirementId = params.id;
      this.authToolService.getOrCreateSections(this.expirementId);
    });
  }
  allowDrop(event: any) {
    event.preventDefault();
  }
  dragStart(event: any, type: any, content: any) {
    this.currentActiveType = type;
    this.currentActiveText = content;
  }
  dragEnterSection(event: any, selectionIndex: number, columnIndex: number) {
    if (this.currentActiveType && this.currentActiveText)
      this.authToolService.pushInFormcolumn(
        selectionIndex,
        columnIndex,
        this.currentActiveType,
        this.currentActiveText
      );
    this.currentActiveType = '';
    this.currentActiveText = '';
  }
  openPopUp() {
    this.initFormAddSection();
    this.setResourcesValidators();
    this.display = true;
  }
  setResourcesValidators() {
    this.notValidResource = false;
    this.sectionForm.get('resources').valueChanges.subscribe((res: any) => {
      if (!this.sectionForm.value.active && !res) this.notValidResource = false;
      else if (res) {
        this.notValidResource = false;
      } else {
        if (!this.sectionForm.value.active) this.notValidResource = true;
      }
    });
    this.sectionForm.get('active').valueChanges.subscribe((res: any) => {
      if (!this.sectionForm.value.resources && !res)
        this.notValidResource = false;
      else if (res) {
        this.sectionForm.get('resources').setValidators(Validators.required);
        if (!this.sectionForm.value.resources) this.notValidResource = true;
      } else {
        this.sectionForm.get('resources').clearValidators();
        this.notValidResource = true;
      }
    });
  }

  closeDialog() {}
  get formControls() {
    return this.sectionForm.controls;
  }

  initFormAddSection() {
    this.sectionForm = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      numberOfColumns: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      help: new FormControl(null, {
        updateOn: 'change',
        validators: [],
      }),
      answeringTime: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.pattern('[0-9]{1,3}')],
      }),
      showCountdown: new FormControl(null, {
        updateOn: 'change',
        validators: [],
      }),
      active: new FormControl(null, {
        updateOn: 'change',
        validators: [],
      }),
      layout: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      resources: new FormControl(null, {
        updateOn: 'change',
        validators: [],
      }),

      showScreenShotButton: new FormControl(null, {
        updateOn: 'change',
        validators: [],
      }),
    });
  }
  deleteSection(i: number) {
    this.authToolService.deleteSection(i);
  }
  createSection() {
    if (this.sectionForm.invalid) return;
    this.authToolService.pushSection(this.sectionForm.value);
    this.sectionForm.reset();
    this.display = false;
    this.scrollToSection();
  }
  getNumberOfColumns(columns: number) {
    let arr: any[] = [];
    for (let i = 1; i <= columns; i++) arr.push(i);
    return arr;
  }
  drangAndDropContent(event: any, sectionIndex: any, columnIndex: any) {
    this.authToolService.changeSelectionColumnPosition({
      sectionIndex,
      columnIndex,
      event,
    });
  }
  createExam() {
    let data: any[] = this.authToolService.getPreparedExam();
    if (!data.length) return;
    this.laoding = true;
    this.http
      .postRequest(`/api/Experiment/${this.expirementId}/LLO`, {
        sections: data,
      })
      .subscribe({
        next: (res: any) => {
          this.authToolService.requestSended();
          this.router.navigate(['/user/show-ex']);
          this.laoding = false;
        },
        error: (error: any) => {
          this.laoding = false;
        },
      });
  }
  scrollToSection() {
    setTimeout(() => {
      if (this.authToolService.sections.length > 1) {
        let el: any = document.getElementById(
          'section' + (this.authToolService.sections.length - 1) + 'section'
        );
        el.scrollIntoView();
      }
    }, 50);
  }
  showPreview() {
    this.previewDisplay = true;
  }
}
