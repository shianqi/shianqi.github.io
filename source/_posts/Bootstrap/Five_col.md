---
title: Bootstrap 五列布局
date: 2017-10-22 23:31:44
tags:
    - Bootstrap
---
# Bootstrap 五列布局

```css
.col-xs-1-5,.col-sm-1-5,.col-md-1-5,.col-lg-1-5 {
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  position: relative;
}

.col-xs-1-5 {
  width: 20%;
  float: left;
}

@media screen and (min-width: 768px) {
  .col-sm-1-5 {
    width: 20%;
    float: left;
  }
}

@media screen and (min-width: 992px) {
  .col-md-1-5 {
    width: 20%;
    float: left;
  }
}

@media screen and (min-width: 1200px) {
  .col-lg-1-5 {
    width: 20%;
    float: left;
  }
}
```