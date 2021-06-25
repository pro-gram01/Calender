'use strict';

console.clear();

{
  // 現在の年/月/日を取得
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth(); // 5月

  //先月分のカレンダー
  function getCalenderHand() {
    const dates = [];
    //先月末日を取得(4/30)
    const d = new Date(year,month,0).getDate();
    //今月の1日が週の何日目かを取得(0～6)
    const n = new Date(year,month,1).getDay();

    for (let i = 0; i < n; i++) {
      //30
      //29,30
      //28,29,30
      dates.unshift({
        // 先月末日の日付からiを引く
        date: d - i,
        // 先月のためfalse
        isToday:false,
        //薄くする
        isDisabled:true,
      });
    }
        //datesを表示
        console.log(dates);
        return dates;
  }

  //今月分のカレンダー
  function getCalenderBody() {
    const dates = []; // date: 日付, day: 曜日
    //翌月の0日目(翌月1日の1日前)を指定し今月末日の日付を取得
    const lastDate = new Date(year,month + 1, 0).getDate();
    //iを今月末日までループ
    for (let i = 1; i <= lastDate; i++) {
      // iをdatesに追加する
      dates.push({
        date: i,
        isToday:false,
        isDisabled:false,
      });
    }


    // yearとmonthが現在の年/月/日と一致の場合
    if (year === today.getFullYear() && month === today.getMonth()) {
      //今日の日付-1のdatesの要素のisTodayをtrueにする
      dates[today.getDate() - 1].isToday = true;
   }

    //datesを表示
    // console.log(dates);
    return dates;
  }

  //翌月分のカレンダー
  function getCalenderTail(){
    const dates = [];
    //今月末日が週の何日目かを取得(0～6)
    const lastDay = new Date(year,month + 1 , 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date:i,
        isToday:false,
        isDisabled:true,
      });
    }

    // console.log(dates);
    return dates;

  }
 
  //カレンダーを削除
  function clearCalender() {
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
      //tbodyの最初の子要素(td ★日付?)がある限りtbodyからその最初の子要素を削除する
      tbody.removeChild(tbody.firstChild);
    }
  }

  //年月を作成
  function renderTitle() {
    // 年/月(month + 1)を表示   ★monthを2桁で表示(満たない場合は0をつけて表示する)
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      ...getCalenderHand(),
      ...getCalenderBody(),
      ...getCalenderTail(),
    ];
    //配列を週ごとに分ける
    const weeks = [];
    //日数を7で割る
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      //datesの0番目の要素から取り除いてpushしていく
      weeks.push(dates.splice(0,7));
    }

    // console.log(dates);
  //   console.log(weeks);
    weeks.forEach(week => {
      //weekごとに行(tr要素)を作成
      const tr = document.createElement('tr');
      // foreachでweekから取り出した要素をdateとする
      week.forEach(date => {
        //dateごとに日(td要素)を作成
        const td = document.createElement('td');
      // 取り出した要素のdateプロパティのdateを取得しtdに代入
        td.textContent = date.date;

        // isTodayがtrueの場合
        if (date.isToday) {
          td.classList.add('today');
        }
        // isDisabledがtrueの場合
        if(date.isDisabled) {
          td.classList.add('disabled');
        } 

        // tr要素の子要素(td)の末尾に新しくtdを追加していく
        tr.appendChild(td);
      });
      //tbodyを取得後、trに追加
      document.querySelector('tbody').appendChild(tr);
    });
  }

  // カレンダーを新規作成
  function createCalender() { 
    clearCalender();
    renderTitle();
    renderWeeks();
  }

  // 前月ボタンが押されたとき
  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    createCalender();
  });

    createCalender();

  // 次月ボタンが押されたとき
  document.getElementById('next').addEventListener('click', () => {
      month++;
      if (month > 11) {
        year++;
        month = 0;
      } 
      createCalender();
  });

  // Todayボタンが押されたとき
  document.getElementById('today').addEventListener('click', () => {
    //現在の年月を取得し、そのカレンダーを表示する
    year = today.getFullYear();
    month = today.getMonth();

    createCalender();
});

  createCalender();

  // getCalenderHand();
  // getCalenderBody();
  // getCalenderTail();

}