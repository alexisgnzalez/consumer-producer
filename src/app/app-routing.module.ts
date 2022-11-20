import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { ProducerComponent } from './producer/producer.component';

const routes: Routes = [
  {path: 'consumer', component: ConsumerComponent},
  {path: 'producer', component: ProducerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
