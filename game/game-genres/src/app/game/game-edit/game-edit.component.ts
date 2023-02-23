import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Genres} from "../../model/genres";
import {GameService} from "../../service/game.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {

  gameFormGroup: FormGroup;
  gameId: number;
  genresList: Genres[];

  constructor(private gameService: GameService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.gameService.findAllGenres().subscribe(value => {
      this.genresList = value;
    });
    this.gameId = Number(this.activatedRoute.snapshot.params.id);

    this.gameService.getById(this.gameId).subscribe(game => {
      this.gameFormGroup = new FormGroup({
        gameName: new FormControl(game.gameName, [Validators.required, Validators.pattern('^([A-Z]{1}[a-z]{2,30}\\s[A-Z]{1}[a-z]{2,30})$')]),
        gameDate: new FormControl(game.gameDate, Validators.required),
        gameCode: new FormControl(game.gameCode, Validators.required),
        gameProduct: new FormControl(game.gameProduct, Validators.required),
        gameDescription: new FormControl(game.gameDescription, Validators.required),
        gameAmount: new FormControl(game.gameAmount, Validators.required),
        gamePrice: new FormControl(game.gamePrice, [Validators.required, Validators.min(0)]),
        genres: new FormControl(game.genres, Validators.required),
      });
    }, error => {
      console.log(error);
    }, () => {
      console.log('Ok!')
    })
  }

  updateGame(id: number) {
    const game = this.gameFormGroup.value;
    this.gameService.updateGame(id, game).subscribe( () =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Chỉnh sửa thành công!',
        text: 'Game: ' + game.gameName,
        showConfirmButton: false,
        timer: 2500
      });

      this.router.navigateByUrl('');
    }, error => {
      console.log(error);
    }, () => {
      console.log('Cập nhật game thành công!');
    });
  }

  compareWithId(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }

}
