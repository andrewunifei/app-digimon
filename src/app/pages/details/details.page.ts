import { Component, OnInit } from '@angular/core';
import { DigimonService } from 'src/app/services/digimon.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  digimon = <any>[]

  constructor(
    private route: ActivatedRoute,
    private digimonService: DigimonService,
    private loadingController: LoadingController,
    private routerOutlet: IonRouterOutlet,
  ) {}

  ngOnInit() {
    this.load()
  }

  async load(){
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'crescent'
    })
    await loading.present()

    const name = this.route.snapshot.paramMap.get('name');
    this.digimonService.getDigimonByName(name).subscribe((res) => {
      this.digimon = res;
      loading.dismiss()
    });
  }
}
