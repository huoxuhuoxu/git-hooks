/**
 *  @readme
 *      promiseAll: 运行N个Promise对象，不管成功失败，运行完成后，将所有失败的index记录，处理
 * 
 */

module.exports.promiseAll = (promise_array, handle, succ, err) => {

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

