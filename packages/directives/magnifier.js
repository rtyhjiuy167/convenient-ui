export default {
  bind(el) {
    const mag = el.querySelector('.convenient-magnifier__mag');
    const magWidth = parseInt(mag.style.width);
    const magHeight = parseInt(mag.style.height);
    const img = el.querySelector('.convenient-magnifier__mag__img');
    const imgWidth = parseInt(img.style.height);
    const imgHeight = parseInt(img.style.height);
    const init = () => {
      bindEvent();
    }
    function bindEvent() {
      el.addEventListener('mouseover', function (e) {
        mag.classList.add('show');
        showMag(getXY(e).x, getXY(e).y);
        document.addEventListener('mousemove', handleMouseMove);
      });

      el.addEventListener('mouseout', function () {
        mag.classList.remove('show');
      })
    }

    function handleMouseMove(e) {
      const { x, y, mouseX, mouseY } = getXY(e)
      showMag(x, y, mouseX, mouseY)
    }
    function showMag(x, y, mouseX, mouseY) {
      mag.style.left = x + 'px';
      mag.style.top = y + 'px';
      img.style.left = -x + 'px';
      img.style.top = -y + 'px';

      if (mouseX < 0 || mouseY < 0 || mouseX > imgWidth || mouseY > imgHeight) {
        mag.classList.remove('show');
        document.removeEventListener('mousemove', handleMouseMove)
      }
    }

    function getXY(elm) {
      const imgX = el.offsetLeft;
      const imgY = el.offsetTop;
      return {
        x: elm.pageX - imgX - magWidth / 2,
        y: elm.pageY - imgY - magHeight / 2,
        mouseX: elm.pageX - imgX,
        mouseY: elm.pageY - imgY,
      }
    }
    init()
  },


}