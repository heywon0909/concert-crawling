const axios = require('axios');
const cheerio = require('cheerio');


const cron = require('node-cron');


cron.schedule('* * * * *', async()=>{
  console.log('node-cron 실행됨');
  main();
});



async function main(keyword) {
  const resp = await axios.get(
    'https://www.livenation.kr/event/allevents'
  );
 
  let ticketList = [];
 const $ = cheerio.load(resp.data); 
  const elements = $('.result-card__wrapper.result-card__wrapper--list.result-card__wrapper--fluid ');    // ❸ CSS 셀렉터로 원하는 요소 찾기
  
  elements.each((idx, el) => {
    const obj ={
      title : $(el).find('span.result-info__localizedname').text(),
      singer : $(el).find('.result-info__headliners').text(),
      city : $(el).find('.result-info__city').text(),
      location : $(el).find('.result-info__venue').text(),
      date:[]
    }
    const title = $(el).find('span.result-info__localizedname').text();
    const singer = $(el).find('.result-info__headliners').text();
    const city = $(el).find('.result-info__city').text();
    const location = $(el).find('.result-info__venue').text();
    let date = [];
    $(el).find('div.event-date__date').each((idx, node) => {
      
      const year = $(node).find('.event-date__date__year').text();
      const month = $(node).find('.event-date__date__month').text();
      const day = $(node).find('.event-date__date__day').text();
      const weekday = $(node).find('.event-date__date__weekday').text();
      console.log('year', year, month, day, weekday);
      date.push(year + '-' + month + '-' + day+'일');
    })
    obj.date = date;
    console.log('title', obj);
   
  });
}




// axios를 활용해 AJAX로 HTML 문서를 가져오는 함수 구현
// async function getHTML() {
//   try {
//     return await axios.get("https://www.livenation.kr/event/allevents");
//   } catch (error) {
//     console.error(error);
//   }
// }

// getHTML 함수 실행 후 데이터에서
// body > main > div > section > ul > li > article > h2 > a
// 에 속하는 제목을 titleList에 저장
// getHTML()
//     .then(html => {
//         console.log('html', html);
//     let concertList = [];
//     const $ = cheerio.load(html.data);
//     // ul.list--posts를 찾고 그 children 노드를 bodyList에 저장
//     const bodyList = $("ul.allevents__eventlist").children("li.allevents__eventlistitem");

//     // bodyList를 순회하며 titleList에 h2 > a의 내용을 저장
//     bodyList.each(function(i, elem) {
//       concertList[i] = {
//         title: $(this)
//           .find(".result-info__localizedname")
//               .text(),
//           performer: $(this).find(".result-info__headliners").text(),
//           month: $(this).find(".event-date__date__month").text(),
//           year: $(this).find(".event-date__date__year").text(),
//           time: $(this).find(".event-date__date__time").text(),
//           day: $(this).find(".event-date__date__day").text(),
//           weekday:$(this).find(".event-date__date__weekday").text(),
//         };
       
//     });
    
//     return concertList;
//   })
//     .then(res => console.log(res)); // 저장된 결과를 출력
  

// // axios를 활용해 AJAX로 HTML 문서를 가져오는 함수 구현
// async function getSearchHTML() {
//   try {
//     return await axios.get("https://www.livenation.kr/search?keyword=justin");
//   } catch (error) {
//     console.error(error);
//   }
// }

// // getHTML 함수 실행 후 데이터에서
// // body > main > div > section > ul > li > article > h2 > a
// // 에 속하는 제목을 titleList에 저장
// getSearchHTML()
//     .then(html => {
        
//     let singerList = [];
//     const $ = cheerio.load(html.data);
//     // ul.list--posts를 찾고 그 children 노드를 bodyList에 저장
//         const bodyList = $("div.layout__container > section.advanced-search-results__wrapper>div").children('span');
//         console.log('타니', bodyList);
//     // bodyList를 순회하며 titleList에 h2 > a의 내용을 저장
//         bodyList.each(function (i, elem) {
          
//       singerList[i] = {
          
//           performer: $(this).find(".result-card__info__title").text(),
//         };
       
//     });
    
//     return singerList;
//   })
//   .then(res => console.log(res)); // 저장된 결과를 출력    