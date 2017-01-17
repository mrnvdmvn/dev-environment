import './index.css';
import numeral from 'numeral';

const value = numeral(1000).format('$0,0.00');
console.log(`i would pay ${value}`);//eslint-disable-line no-console
