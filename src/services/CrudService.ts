import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpEventType, } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { ToastController, Toast } from 'ionic-angular';
@Injectable()
export class CrudService {
  SERVICE_URL;
  REST_API_URL;
  URLL;
  naira = '&#8358;';
  emp_msg = {};
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  header = new HttpHeaders(
    {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  );

  headerAuth = new HttpHeaders(
    {
    
      'Authorization': localStorage.getItem('token')
    }
  );



  /**
   * 
   * @param username of the user
   * @param password of the user
   */
  login(username: string, password: string) {
    return this.http.post(this.REST_API_URL + 'login',
      'username=' + username + '&password=' + password, { headers: this.header })
      .pipe(map(res => res));
    // console.log()
    // return token;
  }

  /**
   * Return true if user is logged in
   */
  isLoggedIn() {
    const token = localStorage.getItem('token');
    const accessRight = localStorage.getItem('role');
    // console.log(token);
    return token != null;
  }

  constructor(private http: HttpClient,public toastController: ToastController) {
 
    this.REST_API_URL = 'http://40.86.95.117:8084/api/';
   // this.REST_API_URL = 'http://localhost:8084/api/';
    this.emp_msg = { message: 'No data available' };
  }

  async toast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

  /**
   * 
   * @param object the table to get all data
   */




  getAll(object) {
    const obj = new HttpHeaders();

    

    const auth = localStorage.getItem('token');


    // Basic header information
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': auth
    });

    console.log(header);
    return this.http.get(this.REST_API_URL + '' + object)
      .pipe(map(res => res));
  }

  /**
   * 
   * @param object table to get
   * @param id id of the table which is the object
   */
  getByID(object, id) {
    return this.http.get(this.REST_API_URL + '' + object + '/' + id)
      .pipe(map(res => res));
  }

  getImage(object, id) {
    return this.http.get(this.REST_API_URL + '' + object + '/' + id)
      .pipe(map(res => res));
  }

  getByTwoParam(object, id, id2) {
    return this.http.get(this.REST_API_URL + '' + object + '/' + id + '/' + id2)
      .pipe(map(res => res));
  }


  /**
   * 
   * 
   * @param object table to save data in
   * @param data json data to save
   */
  saveData(object, data, id) {
    if (id === 0) {
      return this.http.post(this.REST_API_URL + '' + object, data, { headers: this.headers })
        .pipe(map(res => res));
    } else {
      return this.http.put(this.REST_API_URL + '' + object + '', data)
        .pipe(map(res => res));
    }
  }



  /**
  * 
  * @param object table to save data in
  * @param data json data to save
  */
  updateData(object, data) {
    return this.http.put(this.REST_API_URL + object, data)
      .pipe(map(res => res));
  }

  /**
   * 
   * @param object table to delete from
   * @param id table id row to delete
   */
  deleteData(object, id) {
    return this.http.delete(this.REST_API_URL + object + '/' + id)
      .pipe(map(res => res));
  }
  /**
   * 
   * @param table database table to get
   * @param id primary key id of the table
   */
  getNameByID(table, id) {
    return this.http.get(this.REST_API_URL + table + '/' + id)
      .pipe(map(res => res));
  }

  // Provide notification after action
  /**
   * 
   * @param type type of notification 'info','success','warning','danger'
   * @param message message to display
   */
  

  

  /**
   * 
   * @param selectedFile File Stream object
   * @param datas Form parameter in array object format
   * @param restPath  path to the restful web service
   */
  fileUpload(selectedFile, datas, restPath) {
    const fd = new FormData();
    fd.append('upload', selectedFile);
    fd.append('data', JSON.stringify(datas));
    console.log(JSON.stringify(datas));
    return this.http.post(this.REST_API_URL + restPath, fd, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(map(res => res));
  }

  fileUpload2(selectedFile) {
    const fd = new FormData();
    const str = { id: 4, name: 'King', age: 35 };
    // var json = JSON.stringify(str);
    fd.append('emp', JSON.stringify(str));
    fd.append('upload', selectedFile);
    return this.http.post(this.REST_API_URL + 'savefile/upload', fd, {
      reportProgress: true,
      observe: 'events'
    }).
      pipe(map(data => data));
  }

  findPromise(object: string) {
    return new Promise((resolve, reject) => {
      this.getByID(object, localStorage.getItem('token'))
        .subscribe((e: any) => {
          resolve(e);
        }, error => {
          reject(error);
        });
    });
  }

  

}
