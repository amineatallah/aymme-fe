import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.scss']
})
export class HowToComponent implements OnInit {

  public code = `{
    "/gateway/api//*": {
      "target": "http://0.0.0.0:3000/gateway/api",
      "secure": false,
      "logLevel": "debug",
      "changeOrigin": true,
      "pathRewrite": {
        "^/gateway/api": ""
      }
    }
  }`;

  constructor() { }

  ngOnInit() {
  }

  copyCode(): boolean {
    const textArea = document.createElement('textarea');
    textArea.textContent = this.code;
    textArea.style.position = 'absolute';
    textArea.style.left = '-100%';
    document.body.append(textArea);
    textArea.select();
    document.execCommand('copy');
    return false;
  }

}
