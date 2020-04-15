import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.scss']
})
export class HowToComponent implements OnInit {

  public code =
    `
  const PROJECT_NAME = 'peachtree';

  const PROXY_CONFIG = {
      "*": {
          target: "http://0.0.0.0:3003/",
          pathRewrite: (path, req) => {
              console.log('path', path);
              if (path.indexOf('?') < 0) {
                  path = path + '?' + 'projectName=' + PROJECT_NAME;
              } else {
                  path = path + '&' + 'projectName=' + PROJECT_NAME;
              }
              return path;
          },
          bypass: (req, res, proxyOptions) => {
              console.log('bypass', req.url);
              if (req.headers.accept.indexOf('text/html') >= 0) {
                  return "/index.html";
              }
          },
          secure: false,
          logLevel: "debug",
          changeOrigin: true
      }
  }
  
  module.exports = PROXY_CONFIG;`;

    public angularJSONServiceCode = `
  {
    "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
    "version": 1,
    "newProjectRoot": "",
    "projects": {
          //...
          "serve": {
            //...
            "configurations": {
              //... ADD THE PROPERTY BELOW
              "aymme": {
                "proxyConfig": "proxy.conf.aymme.js"
              }
            }
          }
        }
      }
    }
  }`;


  public scriptsCode = `"start:aymme": "ng serve --configuration=aymme"`;

  public terminalCode = `npm run start:aymme`;

  public disableMockCode = `localStorage.setItem("enableMocks", false)`;

  public environmentCode = `
  import { Environment } from './type';
  import { ExternalServices } from '@backbase/foundation-ang/start';
  
  const services: ExternalServices = {};
  
  export const environment: Environment = {
      production: false,
  };
  
  const EXPERIENCE_NAME = 'peachtree';
  
  fetch('http://localhost:3000/api/portals/simpleModel/' + EXPERIENCE_NAME)
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
      });
  `;

  public angularJSONExperienceCode = `
  {
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
                    "replace": "apps/APP_NAME/src/environments/environment.ts",
                    "with": "apps/APP_NAME/src/environments/environment.aymme.ts"
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
                "browserTarget": "APP_NAME:build:aymme"
              }
            }
          }
        }
      }
    }
  }`;

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
