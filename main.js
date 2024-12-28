
const elTimeList = document.querySelector(".namoz-vaqtlari-list");
const elTimeTemplate = document.querySelector(".day-template").content;
const elWeekTemplate = document.querySelector(".week-month-template").content;
const elWeekTimeList = document.querySelector(".week-month-list");
const elWeekForm = document.querySelector(".namoz-form");
const elRegionSelect = elWeekForm.querySelector(".region");
const elListRegionName = document.querySelector(".list-region-name");
const elDayBtn = document.querySelector(".day-btn");
const elWeekBtn = document.querySelector(".week-btn")
const elMonthBtn = document.querySelector(".month-btn");

const elTimeFragment = new DocumentFragment();

function dailyTime(day, node) {
  const cloneTimeTemplate = elTimeTemplate.cloneNode(true);
  const bomdodTime = cloneTimeTemplate.querySelector(".bomdod");
  bomdodTime.textContent = day.times.tong_saharlik;

  const quyosh = cloneTimeTemplate.querySelector(".quyosh");
  quyosh.textContent = day.times.quyosh;

  const peshinTime = cloneTimeTemplate.querySelector(".peshin");
  peshinTime.textContent = day.times.peshin;

  const asrTime = cloneTimeTemplate.querySelector(".asr");
  asrTime.textContent = day.times.asr;

  const shomTime = cloneTimeTemplate.querySelector(".shom");
  shomTime.textContent = day.times.shom_iftor;

  const xuftonTime = cloneTimeTemplate.querySelector(".xufton");
  xuftonTime.textContent = day.times.hufton;

  elTimeFragment.appendChild(cloneTimeTemplate);
  node.appendChild(elTimeFragment);
}

function weekTime(week, node) {
  elWeekTimeList.innerHTML = '';
  for (const item of week) {
    const elCloneWeekTemplate = elWeekTemplate.cloneNode(true);
    const timeListItem = elCloneWeekTemplate.querySelector(".week-item");
    const elWeekName = elCloneWeekTemplate.querySelector(".week-day");
    const elTimeBomdod = elCloneWeekTemplate.querySelector(".week-bomdod");
    const elSunTime = elCloneWeekTemplate.querySelector(".week-quyosh");
    const elPeshinTime = elCloneWeekTemplate.querySelector(".week-peshin");
    const elArsTime = elCloneWeekTemplate.querySelector(".week-asr");
    const elShomTime = elCloneWeekTemplate.querySelector(".week-shom");
    const elXuftonTime = elCloneWeekTemplate.querySelector(".week-xufton");


    elTimeBomdod.textContent = item.times.tong_saharlik;
    elSunTime.textContent = item.times.quyosh;
    elPeshinTime.textContent = item.times.peshin;
    elArsTime.textContent = item.times.asr;
    elShomTime.textContent = item.times.shom_iftor;
    elXuftonTime.textContent = item.times.hufton;
    elWeekName.textContent = item.weekday;
    elListRegionName.textContent = item.region;
    elTimeFragment.appendChild(elCloneWeekTemplate);

    if (elWeekName.textContent == 'Juma'){
      timeListItem.style.backgroundColor = 'green';
      timeListItem.style.color = 'white';
    }
  }
  node.appendChild(elTimeFragment);
}
//  https://islomapi.uz/api/present/week?region=Andijon

// One day Andijon region namaz time get data

async function dailyGetTime() {
  try {
    const request = await fetch('https://islomapi.uz/api/present/day?region=Andijon', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });
    const response = await request.json()
    console.log(response);
    dailyTime(response, elTimeList);

  } catch (error) {
    console.log(error);
  }
}
dailyGetTime()

async function getWeekData(time, select_value) {
  try {
    const req = await fetch(`https://islomapi.uz/api/present/${time}?region=${select_value}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    const res = await req.json();
    weekTime(res, elWeekTimeList);
  } catch (error) {
    console.log(error);
  }
}

elWeekForm.addEventListener("submit", evt => {
  evt.preventDefault();
  const selectValue = elRegionSelect.value;
  getWeekData('week', selectValue);

});
