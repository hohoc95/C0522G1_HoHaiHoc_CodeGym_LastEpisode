import {Component, OnInit} from '@angular/core';
import {Genres} from "../../model/genres";
import {Game} from "../../model/game";
import {GameService} from "../../service/game.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  nameSearch = '';
  codeSearch = '';
  productSearch = '';
  genresSearch = '';
  genres: Genres[];
  gameListPaging: Game[];
  numberRecord = 5;
  curPage = 1;
  totalPage: number;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.getAllGenres();
    this.getAllGamePaging();
  }

  getAllGamePaging(): void {
    this.gameService.findAllGameSearch(this.nameSearch, this.codeSearch, this.productSearch, this.genresSearch).subscribe(list => {
      this.totalPage = Math.ceil(list.length / this.numberRecord);
    }, error => {
      console.log(error);
    });
    this.gameService.findGameSearchPaging(this.numberRecord, this.curPage, this.nameSearch, this.codeSearch, this.productSearch, this.genresSearch).subscribe(pagingList => {
      this.gameListPaging = pagingList;
    }, error => {
      console.log(error);
    }, () => {
      console.log("Hiển thị game ở trang " + this.curPage);
    });
  }

  getAllGenres(): void {
    this.gameService.findAllGenres().subscribe(list => {
      this.genres = list;
    }, error => {
      console.log(error);
    });
  }

  next(): void {
    this.curPage++;
    this.getAllGamePaging();
  }

  previos(): void {
    this.curPage--;
    this.getAllGamePaging();
  }

  compareWithId(item1, item2): boolean {
    return item1 && item2 && item1.id === item2.id;
  }

  resetSearchInput(): void {
    this.nameSearch = '';
    this.codeSearch = '';
    this.productSearch = '';
    this.genresSearch = '';
  }

  searchByMore(): void {
    this.curPage = 1;
    this.getAllGamePaging();
  }

  deleteGame(id: number, name: string): void {
    Swal.fire({
      title: 'Bạn có muốn xóa?',
      text: 'Học sinh: ' + name + ' (id: ' + id + ').',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, tôi muốn xóa!',
      cancelButtonText: 'Đóng'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gameService.deteleGame(id).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa thành công!',
            text: 'Học sinh: ' + name + ' (id: ' + id + ').',
            showConfirmButton: false,
            timer: 2000
          });

          this.curPage = 1;
          this.getAllGamePaging();
        }, error => {
          console.log(error);
        });
      }
    });
  }

  detailGame(id: number, name: string, date: string, description: string, amount: number): void {
    Swal.fire({
      title: 'Chi tiết game',
      html: 'Tên game: ' + name + ' <br> ' + ' Ngày sản xuất: '+ date + ' <br> ' + ' Mô tả: ' + description  + '<br>' + 'Số lượng: ' + amount,
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      // confirmButtonText: 'Có, tôi muốn xóa!',
      cancelButtonText: 'Đóng'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gameService.detailGame(id).subscribe(() => {
          Swal.fire({
            // position: 'center',
            icon: 'success',
            title: 'Xong!',
            timer: 1000
          });

          this.curPage = 1;
          this.getAllGamePaging();
        }, error => {
          console.log(error);
        });
      }
    });
  }

  buyGame(id: number, name: string, amount: number, price: number): void {
    Swal.fire({
      title: 'Chi tiết game',

      html: 'Tên game: ' + name + '<br>' + 'Số lượng: ' + amount +
        ' <br> ' + ' Giá: ' + price + '$',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, tôi muốn mua!',
      cancelButtonText: 'Đóng'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gameService.buyGame(id).subscribe(() => {
          Swal.fire({
            // position: 'center',
            icon: 'success',
            title: 'Mua thành công!',
            timer: 1000
          });
          this.curPage = 1;
          this.getAllGamePaging();
        }, error => {
          console.log(error);
        });
      }
    });
  }

}
