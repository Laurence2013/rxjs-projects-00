const kfr = require('kefir');
const logger = {
 log: function(msg){
	 console.log(msg);
 }
};

const numbers = kfr.sequentially(100, [1,2,3,4,5])
	.map(x => x * 2)
	.filter(x => x != 4);

numbers.onValue(x => {
	logger.log(x)
});
