const {Left, Right} = require('./either');
const Task = require('./task');

//- Convert a Task to a Promise
//+ taskToPromise :: Task e a
//+               -> Promise (Either e a)
const taskToPromise = task => Promise(
    res => task.fork(e => res(Left(e)),
                     x => res(Right(x))))
  
//+ promiseToTask :: Promise (Either e a)
//+               -> Task e a
const promiseToTask = promise =>
  new Task((rej, res) =>
    promise.fork(either =>
      either.cata({
        Left: rej,
        Right: res
      })
    )
  );
const t = Task.of(0).fork(console.log, console.log);
