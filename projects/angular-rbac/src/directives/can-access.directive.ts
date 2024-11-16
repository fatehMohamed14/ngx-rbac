import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Abilities } from '../shared/interfaces';
import { AngularRbacService } from '../lib/angular-rbac.service';

@Directive({
  selector: '[@CanAccess]',
  standalone: true,
})
export class CanAccessDirective {
  protected readonly templateRef = inject(TemplateRef);
  protected readonly viewContainer = inject(ViewContainerRef);
  ngxRbacService = inject(AngularRbacService);

  @Input({ required: true }) abilities!: Partial<Abilities>;
  @Input() conditionalRenderOther!: TemplateRef<any>;

  ngOnChanges() {
    this.viewContainer.clear();
    if (this.ngxRbacService.can(this.abilities)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (this.conditionalRenderOther) {
      this.viewContainer.createEmbeddedView(this.conditionalRenderOther);
    } else {
      this.viewContainer.clear();
    }
  }
}