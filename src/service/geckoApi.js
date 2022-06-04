export const getPriceDated = async (currency, date) => {
  let currencyUrl = 'bitcoin';
    switch (currency) {
      case 'DACXI':
        currencyUrl = 'dacxi';
        break;
      case 'ETH':
        currencyUrl = 'ethereum';
        break;
      case 'ATOM':
        currencyUrl = 'cosmos';
        break;
      case 'LUNA':
        currencyUrl = 'terra-luna';
        break;
      default:
        currencyUrl = 'bitcoin';        
    }
  const dataPrice = await fetch(`https://api.coingecko.com/api/v3/coins/${currencyUrl}/market_chart/range?vs_currency=usd&from=${date}&to=${Number(date) + 3600}`);
  const response  = await dataPrice.json();
  return response;
}

export const getPrice = async (currency) => {
  let currencyUrl = 'bitcoin';
    switch (currency) {
      case 'DACXI':
        currencyUrl = 'dacxi';
        break;
      case 'ETH':
        currencyUrl = 'ethereum';
        break;
      case 'ATOM':
        currencyUrl = 'cosmos';
        break;
      case 'LUNA':
        currencyUrl = 'terra-luna';
        break;
      default:
        currencyUrl = 'bitcoin';        
    }
    const currencyApi = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currencyUrl}&vs_currencies=usd`);
    const response = await currencyApi.json();
    return { response, currencyUrl };
}