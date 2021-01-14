const animationTasks = {
    displayQueue: () => {},
    timer: null
};

const resolveQueue = () => {
    animationTasks.displayQueue();
    animationTasks.timer = null;
}

const addItemToQueue = (itemFunction) => {
    animationTasks.displayQueue = itemFunction;

    if (animationTasks.timer === null) animationTasks.timer = setTimeout(resolveQueue, 200);
}

export {addItemToQueue};