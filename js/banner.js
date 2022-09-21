var imgArray = ['img/banner1.png', 'img/banner2.png', 'img/banner3.png']
var curIndex = 0
var imgDuration = 3000

function slideShow() {
  document.getElementById('banner').src = imgArray[curIndex]
  curIndex++
  if (curIndex == imgArray.length) {
    curIndex = 0
  }
  setTimeout('slideShow()', imgDuration)
}
slideShow()
