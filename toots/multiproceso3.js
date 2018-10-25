const threads = require('threads');
const spawn   = threads.spawn;
const thread  = spawn(function() {});

thread
  .run(function minmax(int, done) {
    if (typeof this.min === 'undefined') {
      this.min = int;
      this.max = int;
    } else {
      this.min = Math.min(this.min, int);
      this.max = Math.max(this.max, int);
    }
    done({ min : this.min, max : this.max });
  })
  .send(2)
  .send(3)
  .send(4)
  .send(1)
  .send(5)
  .on('message', function(minmax) {
    console.log('min:', minmax.min, ', max:', minmax.max);
  })
  .on('done', function() {
    thread.kill();
  });