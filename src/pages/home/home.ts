import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BundlesPage } from '../bundles/bundles';
import { DataStore } from '../../providers/data-store';
import { ItemViewPage } from '../item-view/item-view';
import { ToastController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public bundle;

  constructor(public navCtrl: NavController, public dataServe: DataStore, public toastCtrl: ToastController) {
  	this.dataServe.getData().then((list) => {
  		if(list) {
  			this.bundle = JSON.parse(list);
        console.log(this.bundle);
  		}
  	});
  }

  ionViewDidLoad() {
  

  }

  getTime() {
    let now = moment().format('LLLL');
    console.log(now);
  }
  
  viewItem(item) {
  	this.navCtrl.push(ItemViewPage, {
  		item: item
  	}); 	

  }

  saveItem(item) {
  	this.bundle.push(item);
  	this.dataServe.save(this.bundle);
  }

  complete(item) {
    this.bundle.splice(this.bundle.indexOf(item), 1);
    this.dataServe.save(this.bundle);
    let toast = this.toastCtrl.create({
        message: 'Congratulations for completing a task!',
        duration: 1500,
        position: 'top'
      });
    toast.present();
  }

  refresh() {
    this.dataServe.getBasic().then((list) => {
      if(list) {
        this.bundle = JSON.parse(list);
      }
    });
  }

}
