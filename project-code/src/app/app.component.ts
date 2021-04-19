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
    let details = this.userDetails;

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
      dataArr.push(temp);
      vals = [];
    }

    for (let i = 0; i < dataArr.length; i++) {
      if (dataArr[i]['parentId'] == 0) {
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

    $('#userData').fadeToggle();
    $('.loader').fadeToggle();
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
    this.getAccessToken();
    $('#userDetails, .backdrop').hide();
  }
}
