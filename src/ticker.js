let interval;

self.addEventListener('message', (e) => {
  const { action, timerId, duration } = e.data;

  switch (action) {
    case 'start':
      let startTime = Date.now();
      interval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        self.postMessage({ timerId, elapsedTime });
      }, 1000);
      break;

    case 'stop':
      clearInterval(interval);
      break;
  }
}, false);