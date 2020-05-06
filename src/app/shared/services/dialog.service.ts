import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatConfirmDialogComponent } from "src/app/main/mat-confirm-dialog/mat-confirm-dialog.component";
import { EditUserComponent } from "src/app/main/edit-user/edit-user.component";

@Injectable({ providedIn: "root" })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(question: string) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: "300px",
      height: "200px",
      disableClose: true,
      data: {
        message: question,
      },
    });
  }

  openEditForm(id: string) {
    return this.dialog.open(EditUserComponent, {
      width: "60%",
      disableClose: true,
      data: {
        message: id,
      },
    });
  }
}
