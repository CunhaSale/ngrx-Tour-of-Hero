import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../models/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  hero: Hero;
  heroes: Hero[];
  matchHero: Hero[];
  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroes()
    .subscribe(heroes => {
      this.heroes = heroes;
      this.matchHero = this.heroes.filter(h => h.id == id)
      this.heroService.getHero(this.matchHero[0]._id)
        .subscribe(hero => this.hero = hero)
    })
  }

  goBack(): void{
    this.location.back();
  }

  save(): void{
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
