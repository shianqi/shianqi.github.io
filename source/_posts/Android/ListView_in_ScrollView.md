---
title: 解决 ScrollView 嵌套 ListView 问题
date: 2017-08-08 19:58:16
tags:
    - Android
---

## 解决 ListView 不能撑开问题

### 方法一

动态的计算 `ListView` 实际高度，使其可以撑开父元素
```
/**
 * 动态设置 ListView 高度，使其可以撑开父元素
 */
private void setListViewHeight(){
    if (listAdapter == null) {
        return;
    }

    int listViewHeight = 0;
    for(int i=0; i<listAdapter.getCount(); i++){
        View temp = listAdapter.getView(i,null, listView);
        temp.measure(0,0);
        listViewHeight += temp.getMeasuredHeight();
    }

    LayoutParams layoutParams = this.listView.getLayoutParams();
    layoutParams.height = listViewHeight + (listView.getDividerHeight() * (listAdapter.getCount() - 1));
    listView.setLayoutParams(layoutParams);
    listView.setFocusable(false);
}
```

### 方法二

继承 `ListView` 复写 `onMeasure` 方法，使其不能滚动。

```
import android.content.Context;
import android.util.AttributeSet;
import android.widget.ListView;

public class NoScrollListview extends ListView {

    public NoScrollListview(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    /**
     * 设置不滚动
     */
    public void onMeasure(int widthMeasureSpec, int heightMeasureSpec)
    {
        int expandSpec = MeasureSpec.makeMeasureSpec(Integer.MAX_VALUE >> 2,
                MeasureSpec.AT_MOST);
        super.onMeasure(widthMeasureSpec, expandSpec);

    }
}
```

## 解决撑开 `ListView` 后滚动位置不正常问题
重新计算元素大小后将滚动条移到最上面有些时候并不能成功，正确的做法是在 `ListView` 注册后将其焦点取消掉。

```
listView.setFocusable(false);
```
