function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
   var Frame = document.querySelector('#Frame1').contentWindow
   var table = Frame.document.querySelector('#timetable')
   return table.outerHTML
}