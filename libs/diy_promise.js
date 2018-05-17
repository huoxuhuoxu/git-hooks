/**
 *  @readme
 *      promiseAll: 接收N个处于pending的Promise对象，失败记录index，全部运行完成后，调用handle
 *          promise_array: promise对象数组
 *          handle: promise全部运行完成后，执行，且只执行一次
 *          succ: resolve的额外处理函数
 *          err: reject的额外处理函数
 * 
 */

module.exports.promise_all = (promise_array, handle, succ, err) => {

    let counts = 0;
    const bad = [];

    for (let i=0, l=promise_array.length; i<l; i++){

        const promise_item = promise_array[i];
        counts++;

        promise_item.then((...args) => {

            counts--;
            succ && succ(...args);
            if (!counts) handle(bad);

        }).catch((...args) => {

            counts--;
            bad.push(i);

            err && err(...args);
            if (!counts) handle(bad);

        });
    }

};

