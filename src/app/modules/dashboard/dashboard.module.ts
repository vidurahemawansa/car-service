import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PieChartComponent } from './components/dashboard/pie-chart/pie-chart.component';
import { JobTableComponent } from './components/dashboard/job-table/job-table.component';
import { BaseChartDirective } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent, PieChartComponent, JobTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    BaseChartDirective,
    TranslateModule,
    NzSwitchModule,
    NzTableModule,
    NzPaginationComponent,
  ],
})
export class DashboardModule {}
