const liftM = (f, ...args)=> {
  const [head, ...tail] = args;
  return tail.reduce((acc, curr)=> curr.ap(acc),head.map(f))
};

module.exports = {liftM}