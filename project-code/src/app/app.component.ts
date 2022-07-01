import { Component, OnInit, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  asIsOrder(a, b) {
    return 1;
  }
  isDataLoaded = false;
  title = 'userDetails';
  accessToken: any;
  userDetails: any;
  demoData: any;
  parentData: any = [];
  immediateChild: any = [];
  secondChild: any = [];
  thirdChild: any = [];
  mainData: any;
  keys = {
    name: 'Name',
    userId: 'User ID',
    username: 'Username',
    // fName: 'Family Name',
    email: 'Email ID',
    contact: 'Contact',
    created: 'Created On',
  };

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  getAccessToken() {
    $('#userData').fadeOut();
    // Get access Token
    let tokenApiUrl =
      'https://authorizationserverapi20210311132545.azurewebsites.net/connect/token';
    let username = 'cdcdcdcdcd';
    let password = 'Suman123*';
    let scope = 'read write uiapi_all';
    let grant_type = 'password';
    let auth =
      'Basic RVZBLlVJLldFQjpzYzdGUWNiZ2Q2RWVzQ1padmRidWRkTnQ1dlEtMEFZLVZYYl84NDhQME1v';
    let body = `username=${username}&password=${password}&scope=${scope}&grant_type=${grant_type}`;
    let contentType = 'application/x-www-form-urlencoded';
    let options = {
      headers: new HttpHeaders({
        Authorization: auth,
        'Content-Type': contentType,
      }),
    };
    this.http.post(tokenApiUrl, body, options).subscribe((Response) => {
      if (Response) {
        console.log(Response);
        this.accessToken = Response['access_token'];
        this.getUserDetails(this.accessToken);
      }
    });
  }

  getUserDetails(token) {
   // Get User Details
    let userDetailsApiUrl =
      'https://evaapi20210311111013.azurewebsites.net/api/User/GetUsersByOrganization?orgId=3';
    let options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    this.http.get(userDetailsApiUrl, options).subscribe((Response) => {
      if (Response) {
        this.userDetails = Response['data'];
        this.displayData();
      }
    });
  }

  displayData() {
    this.isDataLoaded = true;
    // let details = this.userDetails;
    this.demoData = [
      {
        userId: 10181,
        imsuserId: '68d676d7-caab-46fe-a56c-af61a398457f',
        name: 'mesha',
        familyName: 's',
        userName: 'mesha09@gmail.com',
        emailIdPrimary: 'mesha09@gmail.com',
        contactNumberPrimary: '9876943214',
        reportingManager: null,
        teamName: null,
        teamCount: 0,
        createdBy: 10114,
        createdOn: '2021-04-01T11:56:13.9898484+00:00',
        parentId: 10114,
        isActive: 0,
        timeZoneId: 92,
        languageId: 1,
        dataAccessTypeId: 1,
        orgId: 3,
        currencyCode: null,
        currencyLocale: null,
        jobTitle: null,
        userHierarchy: null,
        teamUsers: null,
      },
      {
        userId: 10180,
        imsuserId: '62ab2b05-39c1-44dc-8efb-472430c307d0',
        name: 'Harry',
        familyName: 'k',
        userName: 'harry089@gmail.com',
        emailIdPrimary: 'harry089@gmail.com',
        contactNumberPrimary: '8879654314',
        reportingManager: null,
        teamName: null,
        teamCount: 0,
        createdBy: 10114,
        createdOn: '2021-04-01T06:24:21.8084744+00:00',
        parentId: 10114,
        isActive: 0,
        timeZoneId: 92,
        languageId: 1,
        dataAccessTypeId: 1,
        orgId: 3,
        currencyCode: null,
        currencyLocale: null,
        jobTitle: null,
        userHierarchy: null,
        teamUsers: null,
      },
      {
        userId: 10179,
        imsuserId: '26277dd5-44a2-4bd2-8b00-7a3050f9b3a5',
        name: 'ajay',
        familyName: 'k',
        userName: 'aj089@gmail.com',
        emailIdPrimary: 'aj089@gmail.com',
        contactNumberPrimary: '9879654314',
        reportingManager: null,
        teamName: null,
        teamCount: 0,
        createdBy: 10114,
        createdOn: '2021-04-01T06:10:02.2134603+00:00',
        parentId: 10114,
        isActive: 1,
        timeZoneId: 92,
        languageId: 1,
        dataAccessTypeId: 1,
        orgId: 3,
        currencyCode: null,
        currencyLocale: null,
        jobTitle: null,
        userHierarchy: null,
        teamUsers: null,
      },
      {
        userId: 10178,
        imsuserId: '46e9e39d-4a47-43a7-afc2-0f0a4cbee7b1',
        name: 'ajay',
        familyName: 'k',
        userName: 'aj09@gmail.com',
        emailIdPrimary: 'aj09@gmail.com',
        contactNumberPrimary: '9876543214',
        reportingManager: null,
        teamName: null,
        teamCount: 0,
        createdBy: 10114,
        createdOn: '2021-04-01T05:58:59.3036241+00:00',
        parentId: 10114,
        isActive: 1,
        timeZoneId: 92,
        languageId: 1,
        dataAccessTypeId: 1,
        orgId: 3,
        currencyCode: null,
        currencyLocale: null,
        jobTitle: null,
        userHierarchy: null,
        teamUsers: null,
      },
      {
        userId: 10170,
        imsuserId: '9d099ba4-226c-4936-b4b5-f0bedad35be6',
        name: 'aruns',
        familyName: 's',
        userName: 'arunjdsds@gmail.com',
        emailIdPrimary: 'arunjdsds@gmail.com',
        contactNumberPrimary: '9870543214',
        reportingManager: null,
        teamName: null,
        teamCount: 0,
        createdBy: 10114,
        createdOn: '2021-03-30T07:45:59.4136293+00:00',
        parentId: 10114,
        isActive: 1,
        timeZoneId: 92,
        languageId: 1,
        dataAccessTypeId: 1,
        orgId: 3,
        currencyCode: null,
        currencyLocale: null,
        jobTitle: null,
        userHierarchy: null,
        teamUsers: null,
      },
      {
        userId: 10166,
        imsuserId: '78b4fc38-8c65-40ea-b0c5-b772d0a7982d',
        name: 'aruns',
        familyName: 's',
        userName: 'arunj@gmail.com',
        emailIdPrimary: 'karunaj@gmail.com',
        contactNumberPrimary: '1234567899',
        reportingManager: null,
        teamName: null,
        teamCount: 0,
        createdBy: 10114,
        createdOn: '2021-03-29T03:52:38.0167715+00:00',
        parentId: 10114,
        isActive: 0,
        timeZoneId: 92,
        languageId: 1,
        dataAccessTypeId: 2,
        orgId: 3,
        currencyCode: null,
        currencyLocale: null,
        jobTitle: null,
        userHierarchy: null,
        teamUsers: null,
      },
      {
        userId: 10165,
        imsuserId: '0eaa81b9-c0c3-4c64-9bf2-57b95fe428de',
        name: 'aruns',
        familyName: 's',
        userName: 'arunk@gmail.com',
        emailIdPrimary: 'arunk@gmail.com',
        contactNumberPrimary: '9876543213',
        reportingManager: null,
        teamName: null,
        teamCount: 0,
        createdBy: 10114,
        createdOn: '2021-03-29T03:47:26.1894594+00:00',
        parentId: 10114,
        isActive: 0,
        timeZoneId: 92,
        languageId: 1,
        dataAccessTypeId: 1,
        orgId: 3,
        currencyCode: null,
        currencyLocale: null,
        jobTitle: null,
        userHierarchy: null,
        teamUsers: null,
      },
      {
        userId: 10164,
        imsuserId: '9a072d34-dd32-4c25-bafe-b70e56fbc3ac',
        name: 'aruns',
        familyName: 's',
        userName: 'arung@gmail.com',
        emailIdPrimary: 'arung@gmail.com',
        contactNumberPrimary: '9876543212',
        reportingManager: null,
        teamName: null,
        teamCount: 0,
        createdBy: 10114,
        createdOn: '2021-03-29T03:46:29.977116+00:00',
        parentId: 10114,
        isActive: 1,
        timeZoneId: 92,
        languageId: 1,
        dataAccessTypeId: 1,
        orgId: 3,
        currencyCode: null,
        currencyLocale: null,
        jobTitle: null,
        userHierarchy: null,
        teamUsers: null,
      },
      {
        userId: 10163,
        imsuserId: 'ea01edd7-3316-4497-9ec2-e5f3a9332705',
        name: 'aruns',
        familyName: 's',
        userName: 'aruns@gmail.com',
        emailIdPrimary: 'aruns@gmail.com',
        contactNumberPrimary: '9876543211',
        reportingManager: null,
        teamName: null,
        teamCount: 0,
        createdBy: 10114,
        createdOn: '2021-03-29T03:38:20.6032168+00:00',
        parentId: 10114,
        isActive: 1,
        timeZoneId: 92,
        languageId: 1,
        dataAccessTypeId: 1,
        orgId: 3,
        currencyCode: null,
        currencyLocale: null,
        jobTitle: null,
        userHierarchy: null,
        teamUsers: null,
      },
      {
        userId: 10114,
        imsuserId: '2bc75b45-c4a6-4b7d-8a2f-86468530a86d',
        name: 'User-1',
        familyName: 'last-name',
        userName: 'sumantabag19@gmail.com',
        emailIdPrimary: 'sumantabag19@gmail.com',
        contactNumberPrimary: '0159515963',
        reportingManager: null,
        teamName: null,
        teamCount: 0,
        createdBy: 0,
        createdOn: '2021-01-20T11:13:55.9629996+00:00',
        parentId: 0,
        isActive: 1,
        timeZoneId: 92,
        languageId: null,
        dataAccessTypeId: 2,
        orgId: 3,
        currencyCode: null,
        currencyLocale: null,
        jobTitle: null,
        userHierarchy: null,
        teamUsers: null,
      },
    ];
    
    let details = this.demoData;

    let Ids: any = [];
    let parentId: any = [];
    let parentData: any = [];
    let dataArr: any = [];
    let finalData: any = {};
    let vals: any = [];

    for (let i = 0; i < details.length; i++) {
      if (details[i]['parentId'] == 0) {
        parentId.push({
          userId: details[i]['userId'],
          parentId: details[i]['parentId'],
        });
        parentData.push(details[i]);
      } else {
        let valueExists = $.inArray(details[i]['parentId'], Ids);
        if (valueExists == -1) {
          Ids.push(details[i]['parentId']);
        }
      }
    }

    for (let j = 0; j < Ids.length; j++) {
      for (let i = 0; i < details.length; i++) {
        if (Ids[j] == details[i]['parentId']) {
          vals.push(details[i]);
          finalData[Ids[j]] = vals;
        }
      }
      let existing = parentData[0];
      let temp = {
        userId: Ids[j],
        childData: vals,
        imsuserId: existing['imsuserId'],
        name: existing['name'],
        familyName: existing['familyName'],
        userName: existing['userName'],
        emailIdPrimary: existing['emailIdPrimary'],
        contactNumberPrimary: existing['contactNumberPrimary'],
        reportingManager: existing['reportingManager'],
        teamName: existing['teamName'],
        teamCount: existing['teamCount'],
        createdBy: existing['createdBy'],
        createdOn: existing['createdOn'],
        parentId: finalData[Ids[j]]['parentId'],
        isActive: existing['isActive'],
        timeZoneId: existing['timeZoneId'],
        languageId: existing['languageId'],
        dataAccessTypeId: existing['dataAccessTypeId'],
        orgId: existing['orgId'],
        currencyCode: existing['currencyCode'],
        currencyLocale: existing['currencyLocale'],
        jobTitle: existing['jobTitle'],
        userHierarchy: existing['userHierarchy'],
        teamUsers: existing['teamUsers'],
      };
      dataArr.push(temp);
      vals = [];
    }

    for (let i = 0; i < dataArr.length; i++) {
      if (dataArr[i]['parentId'] == 0) {
        debugger
        let temp = dataArr[i];
        dataArr = [temp];
      }
    }

    $.each(finalData, function (i, item) {
      for (let i = 0; i < item.length; i++) {
        for (let j = 0; j < Ids.length; j++) {
          if (item[i]['userId'] == Ids[j]) {
            let existing = item[i];
            let tempKey = item[i]['userId'];
            item[i] = {
              childData: finalData[Ids[j]],
              [tempKey]: item[i],
              item: item[i],
              userId: existing['userId'],
              imsuserId: existing['imsuserId'],
              name: existing['name'],
              familyName: existing['familyName'],
              userName: existing['userName'],
              emailIdPrimary: existing['emailIdPrimary'],
              contactNumberPrimary: existing['contactNumberPrimary'],
              reportingManager: existing['reportingManager'],
              teamName: existing['teamName'],
              teamCount: existing['teamCount'],
              createdBy: existing['createdBy'],
              createdOn: existing['createdOn'],
              parentId: existing['parentId'],
              isActive: existing['isActive'],
              timeZoneId: existing['timeZoneId'],
              languageId: existing['languageId'],
              dataAccessTypeId: existing['dataAccessTypeId'],
              orgId: existing['orgId'],
              currencyCode: existing['currencyCode'],
              currencyLocale: existing['currencyLocale'],
              jobTitle: existing['jobTitle'],
              userHierarchy: existing['userHierarchy'],
              teamUsers: existing['teamUsers'],
            };
          }
        }
      }
    });

    this.mainData = dataArr;
    console.log(this.mainData);
    console.log(finalData)

    // $('#userData').fadeToggle();
    // $('.loader').fadeToggle();
  }

  openDialog(name, userId, username, fName, email, contact, created) {
    $('#userDetails').slideDown();
    $('.backdrop').fadeIn();

    let vals = {
      name: name,
      userId: userId,
      username: username,
      fName: fName,
      email: email,
      contact: contact,
      created: created,
    };

    Object.keys(this.keys).forEach(function (key) {
      $('[dataKey=' + key + ']').html(vals[key]);
    });
  }

  closeDialog() {
    $('#userDetails').slideUp();
    $('.backdrop').fadeOut();
  }

  ngOnInit(): void {
    // this.getAccessToken();
    this.displayData();
    $('#userDetails, .backdrop').hide();
  }
}
