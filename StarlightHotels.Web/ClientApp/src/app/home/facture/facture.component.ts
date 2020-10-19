import { Component, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.sass']
})
export class FactureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /* Export the invoice html into the PDF file */
  download()
  {
    const options = {
      filename: 'invoice_file.pdf',
      image: {type: 'jpeg'},
      html2canvas: {},
      jsPDF: { orientation: 'portrait'}
    };

    const element: Element = document.getElementById('invoice');

    console.log(element);

    html2pdf()
      .from(element)
      .set(options)
      .save();
  }
}
