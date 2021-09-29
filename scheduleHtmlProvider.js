function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
   //获取课表
   var Frame = document.querySelector('#Frame1').contentWindow
   var table = Frame.document.querySelector('#timetable')
   return table.outerHTML
}