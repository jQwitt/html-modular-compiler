import gradient, { passion } from 'gradient-string';
import chalk from 'chalk';

const fancy = (str: string) => {
	console.log(passion(str));
};

const success = (str: string) => {
	console.log(gradient(['lime', 'lightgreen'])(str));
};

const fail = (str: string) => {
	console.log(chalk.red.bold(str));
};

const warn = (str: string) => {
	console.log(chalk.yellow(str));
};

const fileRemoved = (str: string) => {
	console.log(chalk.red('removed: '), str);
};

const standard = (str: string) => {
	console.log(chalk.gray(str));
};

export default { fancy, success, fail, warn, fileRemoved, standard };
