"use strict"

const angular = require("angular");

const deps = [
    require("angular-material")
];

const template = `
<div layout="row" class="md-carousel-container" ng-style="$ctrl.Container">
  <div ng-repeat="item in $ctrl.mdItemData track by $index" ng-hide="$index !== $ctrl.currIndex">
    <div layout="row" layout-align="none center" class="md-carousel-content"
      ng-include="$ctrl.mdItemTemplateUrl">
    </div>
  </div>
  <div layout="row" layout-align="center center" class="md-carousel-content" ng-style="$ctrl.Nav">
    <md-button class="md-icon-button" ng-style="$ctrl.NavItem" ng-click="$ctrl.navLeft()">
      <md-icon ng-style="$ctrl.NavIcon">chevron_left</md-icon>
    </md-button>
    <span flex></span>
    <md-button class="md-icon-button" ng-style="$ctrl.NavItem" ng-click="$ctrl.navRight()">
      <md-icon ng-style="$ctrl.NavIcon">chevron_right</md-icon>
    </md-button>
  </div>
  <div layout="row" layout-align="center end" class="md-carousel-content">
    <div class="md-carousel-nav-indication"
      ng-class="{ 'md-carousel-nav-indication-active': $index === $ctrl.currIndex }"
      ng-repeat="item in $ctrl.mdItemData track by $index">
    </div>
  </div>
  <div class="md-carousel-content" ng-if="$ctrl.mdOverlayTemplateUrl"
    ng-style="$ctrl.Overlay"
    ng-include="$ctrl.mdOverlayTemplateUrl">
  </div>
</div>`;

angular.module("mdCarousel", deps).
    component("mdCarousel", {
        template: template,
        bindings: {
            mdItemAspectRatio: "<",
            mdItemBackgroundColor: "<",
            mdItemData: "<",
            mdItemTemplateUrl: "<",
            mdOverlayTemplateUrl: "<",
            mdOverlayData: "<"
        },
        controller: [ "$interval", mdCarousel ]
    });

function mdCarousel($interval) {
    const defaultAspectRatio = "67.71%";

    this.Container = {
        "padding-bottom": this.mdItemAspectRatio || defaultAspectRatio,
        "background-color": this.mdItemBackgroundColor
    };
    this.Nav = {
        "z-index": 1000
    };
    this.NavItem = {
        width: "48px",
        height: "48px",
        margin: 0,
        padding: 0,
    };
    this.NavIcon = {
        "font-size": "48px",
        width: "48px",
        height: "48px",
        color: "white"
    };
    this.Overlay = {
        "z-index": 1
    };

    // Set current slide index
    this.currIndex = 0;

    // Hook for rendering overlay view
    this.data = this.mdOverlayData;
}

mdCarousel.prototype.navLeft = function navLeft() {
    this.currIndex = (this.currIndex - 1);
    if (this.currIndex < 0) {
        this.currIndex = this.currIndex + this.mdItemData.length;
    }
}

mdCarousel.prototype.navRight = function navRight() {
    this.currIndex = (this.currIndex + 1) % this.mdItemData.length;
}

module.exports = "mdCarousel";
