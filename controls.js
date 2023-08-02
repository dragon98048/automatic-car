class Controls {
  constructor(type) {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;

    switch (type) {
      case "KEYS":
        this.#addKeyboardListeners();
        break;
      case "TOUCH":
        this.#addTouchListeners();
        break;
      case "DUMMY":
        this.forward = true;
        break;
    }
  }

  #addKeyboardListeners() {
    document.onkeydown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;

        case "ArrowUp":
          this.forward = true;
          break;

        case "ArrowDown":
          this.reverse = true;
          break;
      }
    };

    document.onkeyup = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;

        case "ArrowUp":
          this.forward = false;
          break;

        case "ArrowDown":
          this.reverse = false;
          break;
      }
    };
  }

  #addTouchListeners() {
    const touchStartHandler = (event) => {
      const touch = event.touches[0];
      const touchX = touch.clientX;
      const touchY = touch.clientY;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Determine touch area (left, right, top, or bottom)
      const touchArea = (touchX < screenWidth / 2)
        ? (touchY < screenHeight / 2 ? 'top-left' : 'bottom-left')
        : (touchY < screenHeight / 2 ? 'top-right' : 'bottom-right');

      // Map touch area to control direction
      switch (touchArea) {
        case "top-left":
          this.left = true;
          this.forward = true;
          break;
        case "top-right":
          this.right = true;
          this.forward = true;
          break;
        case "bottom-left":
          this.left = true;
          this.reverse = true;
          break;
        case "bottom-right":
          this.right = true;
          this.reverse = true;
          break;
      }
    };

    const touchEndHandler = () => {
      this.left = false;
      this.right = false;
      this.forward = false;
      this.reverse = false;
    };

    document.addEventListener("touchstart", touchStartHandler);
    document.addEventListener("touchend", touchEndHandler);
    document.addEventListener("touchcancel", touchEndHandler);
    document.addEventListener("touchmove", (event) => event.preventDefault(), {
      passive: false
    });
  }
}
