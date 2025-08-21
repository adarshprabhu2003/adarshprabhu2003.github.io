function smoothScrollTo(targetPosition, duration = 800) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function easeInOutQuad(time, from, distance, duration) {
    time /= duration / 2;
    if (time < 1) return distance / 2 * time * time + from;
    time--;
    return -distance / 2 * (time * (time - 2) - 1) + from;
  }

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetID = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetID);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 70; // adjust for fixed navbar height if any
      smoothScrollTo(offsetTop, 1000); // duration in ms (1000 = 1 second)
    }
  });
});
