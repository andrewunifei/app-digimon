import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { DigimonService } from 'src/app/services/digimon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  digimons = <any>[];
  searchValue = '';
  oneResult = <any>{
    name: '',
    img: '',
    level: ''
  };
  levelsResult = <any>[];
  levels = <any>[];

  hide = false;
  hideOneResult = true;
  hideLevelsResult = true;

  constructor(
    private loadingController: LoadingController,
    private digimonService: DigimonService
  ) {}

  ngOnInit(): void {
    this.loadDigimons()
  }

  async loadDigimons(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'crescent'
    })
    await loading.present()

    this.digimonService.getDigimons().subscribe(
      (res) => {
        loading.dismiss()
        this.digimons = res
        this.levels = [...new Set(this.digimons.map((instance: {name: string, img: string, level:string}) => instance.level))];

        event?.target.complete()
      }
    )
  }

  async handleSearchChange(event: any){
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'crescent'
    })
    await loading.present()

    let term = event.target.value

    if(this.searchValue == ''){
      this.hideOneResult = true;
      this.hide = false;
      this.hideLevelsResult = true;
      loading.dismiss()
    }
    else{
      if(!this.levels.includes(term)){
        this.oneResult = this.digimons.find((instance: {name: string, img: string, level:string}) => instance.name == term)

        if(typeof this.oneResult == 'undefined'){
          this.oneResult = {}
          this.hideOneResult = true;
          this.hide = true;
          this.hideLevelsResult = true;
        }
        else{
          this.hideOneResult = false;
          this.hide = true;
          this.hideLevelsResult = true;
        }

        loading.dismiss()
      }
      else{
        this.digimonService.getDigimonsByLevel(term).subscribe(
          (res) => {
            loading.dismiss()
            this.levelsResult = res

            this.hideOneResult = true;
            this.hide = true;
            this.hideLevelsResult = false;
    
            event?.target.complete()
          }
        )
      }
    }
  }
}
