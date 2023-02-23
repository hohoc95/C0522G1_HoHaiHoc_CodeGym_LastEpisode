import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Genres} from "../../model/genres";
import {GameService} from "../../service/game.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {
  gameFormGroup: FormGroup = new FormGroup({
    gameName: new FormControl('', [Validators.required, Validators.pattern('^([A-Z]{1}[a-z]{2,30}\\s[A-Z]{1}[a-z]{2,30})$')]),
    gameDate: new FormControl('', Validators.required),
    gameCode: new FormControl('', Validators.required),
    gameProduct: new FormControl('', Validators.required),
    gameDescription: new FormControl('', Validators.required),
    gameAmount: new FormControl('', Validators.required),
    gamePrice: new FormControl('', [Validators.required, Validators.min(0)]),
    genres: new FormControl('', Validators.required),
  });
  genresList: Genres[];

  constructor(private gameService: GameService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.gameService.findAllGenres().subscribe(value => {
      this.genresList = value;
    })
  }
  submit(): void {
    const game = this.gameFormGroup.value;
    this.gameService.addGame(game).subscribe(() => {
      Swal.fire({
        title: 'Thêm mới thành công!',
        text: 'Game: ' + game.gameName,
        imageUrl: 'https://genk.mediacdn.vn/2018/9/20/a2989534790f069f03671d247dd5222b-15374152422351400600667.gif',
        imageHeight: 250,
        imageWidth: 400
      });
      this.gameFormGroup.reset();
    }, error => {
      console.log(error);
    }, () => {
      this.router.navigateByUrl('');
      console.log('Thêm game thành công!');
    });
  }

}
