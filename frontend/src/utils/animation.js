const getCurrentTime = () => new Date().getTime();

const easeInOutCubic = x => {
  x /= 1 / 2;
  if (x < 1) {
    return 1 / 2 * x * x * x;
  }
  return 1 / 2 * ((x -= 2) * x * x + 2);
};

export const animate = ({
  start = 0,
  end = 1,
  duration = 1000,
  easing = easeInOutCubic,
  onUpdate = () => {},
  onComplete = () => {}
}) => {
  const startTime = getCurrentTime();
  let timePassed;
  let shouldStop = false;

  const animationLoop = () => {
    if (shouldStop) {
      return;
    }

    timePassed = getCurrentTime() - startTime;

    if (timePassed >= duration) {
      onUpdate(end);
      onComplete();
      return;
    }

    onUpdate((end - start) * easing(timePassed / duration) + start);

    window.requestAnimationFrame(animationLoop);
  };

  animationLoop();

  return {
    stop: () => {
      shouldStop = true;
    }
  };
};
