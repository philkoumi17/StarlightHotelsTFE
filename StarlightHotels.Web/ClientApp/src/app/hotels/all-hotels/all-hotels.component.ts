import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Hotel } from '../../models/hotel.model';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-hotels',
  templateUrl: './all-hotels.component.html',
  styleUrls: ['./all-hotels.component.sass'],
})
export class AllHotelComponent implements OnInit {
  displayedColumns = [
    'select',
    'nom',
    'nbEtoiles',
    'nbChambres',
    'ville',
    'checkIn',
    'checkOut',
    'coefficient',
    'actif',
    'actions',
  ];
  exampleDatabase: HotelService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Hotel>(true, []);
  id: number;
  hotel: Hotel | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public hotelService: HotelService,
    private snackBar: MatSnackBar,
    public fb: FormBuilder,
    private toastr: ToastrService
  ) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        hotel: this.hotel,
        action: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase.dataChange.value.unshift(
          this.hotelService.formModel.value
        );
        this.refreshTable();
        this.snackBar.open('Nouvel hôtel créé, Enregistrement avec succès !', '', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'snackbar-success',
        });
      }
    });
  }
  editCall(row) {
    this.id = row.id;
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        hotel: row,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[
          foundIndex
        ] = this.hotelService.formModel.value;
        // And lastly refresh table
        this.refreshTable();
        this.snackBar.open('Hôtel modifié, Modifié avec succès !', '', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'snackbar-success',
        });
      }
    });
  }

  editActif(row) {
    row.actif = !row.actif;
    this.hotelService.updateHotel(row)

    this.snackBar.open('Hôtel modifié avec succès !', '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'snackbar-success',
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Hotel>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new HotelService(this.httpClient, this.fb);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item: Hotel) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}
export class ExampleDataSource extends DataSource<Hotel> {
  // tslint:disable-next-line: variable-name
  _filterChange = new BehaviorSubject('');
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }
  filteredData: Hotel[] = [];
  renderedData: Hotel[] = [];
  constructor(
    // tslint:disable-next-line: variable-name
    public hotelService: HotelService,
    // tslint:disable-next-line: variable-name
    public _paginator: MatPaginator,
    // tslint:disable-next-line: variable-name
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Hotel[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.hotelService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    this.hotelService.getAllHotels();
    return merge(...displayDataChanges).pipe(
      map(() => {
        if (this.hotelService.data) {
          // Filter data
          this.filteredData = this.hotelService.data
            .slice()
            .filter((hotel: Hotel) => {
              const searchStr = (
                hotel.nom +
                hotel.nbEtoiles +
                hotel.nbChambres +
                hotel.ville +
                hotel.checkIn +
                hotel.checkOut +
                hotel.coefficient +
                hotel.actif
              ).toLowerCase();
              return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
          // Sort filtered data
          const sortedData = this.sortData(this.filteredData.slice());
          // Grab the page's slice of the filtered sorted data.
          const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
          this.renderedData = sortedData.splice(
            startIndex,
            this._paginator.pageSize
          );
          return this.renderedData;
        }
      })
    );
  }
  disconnect() { }
  /** Returns a sorted copy of the database data. */
  sortData(data: Hotel[]): Hotel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'nom':
          [propertyA, propertyB] = [a.nom, b.nom];
          break;
        case 'nbEtoiles':
          [propertyA, propertyB] = [a.nbEtoiles, b.nbEtoiles];
          break;
        case 'nbChambres':
          [propertyA, propertyB] = [a.nbChambres, b.nbChambres];
          break;
        case 'ville':
          [propertyA, propertyB] = [a.ville, b.ville];
          break;
        case 'coefficient':
          [propertyA, propertyB] = [a.coefficient, b.coefficient];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
