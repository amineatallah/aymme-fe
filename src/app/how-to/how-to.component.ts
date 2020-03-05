import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.scss']
})
export class HowToComponent implements OnInit {

  public code =
    `{
    "/gateway/api//*": {
      "target": "http://0.0.0.0:3000/gateway/{{project_name}}/api",
      "secure": false,
      "logLevel": "debug",
      "changeOrigin": true,
      "pathRewrite": {
        "^/gateway/api": ""
      }
    }
}`;

  public scriptsCode = `"start:aymme": "ng serve --proxy-config=proxy.conf.aymme.json"`;

  public terminalCode = `npm run start:aymme`;

  public disableMockCode = `localStorage.setItem("enableMocks", false)`;

  public environmentCode = `
  import { Environment } from './type';
  import { ExternalServices } from '@backbase/foundation-ang/start';

  const services: ExternalServices = {};

  export const environment: Environment = {
      production: false,
  };

  let experienceName = 'your-experience-name';

  fetch('http://localhost:3000/api/simpleModel/' + experienceName)
      .then(
          function (response) {
              if (response.status !== 200) {
                  console.log('Unexpected error: Unable to retrieve Experience Model. Status Code: ' +
                      response.status);
                  return;
              }
              // Examine the text in the response
              response.json().then(function (data) {
                  window.BB.startSingleApp(services).then((app: any) => app.bootstrap(data.children[0]));
              });
          }
      )
      .catch(function (err) {
          console.log('Fetch Error: Unable to retrieve Experience Model', err);
      });`;

  public angularJSONcode = `{
        "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
        "version": 1,
        "newProjectRoot": "",
        "projects": {
          "banking-app": {
            //...
            "architect": {
              //...
              "build": {
                "configurations": {
                  //... ADD THE PROPERTY BELOW
                  "aymme": {
                    "fileReplacements": [
                      {
                        "replace": "apps/your-app-name/src/environments/environment.ts",
                        "with": "apps/your-app-name/src/environments/environment.aymme.ts"
                      }
                    ]
                  },
                }
              },
              "serve": {
                //...
                "configurations": {
                  //... ADD THE PROPERTY BELOW
                  "aymme": {
                    "browserTarget": "your-app-name:build:aymme"
                  }
                }
              }
            }
          }
        }
      }`;


  public simplifiedModelScriptsCode = `"start:aymme": "ng serve --proxy-config=proxy.conf.aymme.json --configuration=aymme"`;

  constructor() { }

  ngOnInit() {
  }

  copyCode(copyText: string): boolean {
    const textArea = document.createElement('textarea');
    textArea.textContent = copyText;
    textArea.style.position = 'absolute';
    textArea.style.left = '-100%';
    document.body.append(textArea);
    textArea.select();
    document.execCommand('copy');
    return false;
  }

}
