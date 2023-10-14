const axios = require("axios");

let exchangeRatesData;

const fetchExchangeRates = async () => {
  if (exchangeRatesData) {
    return exchangeRatesData;
  }
  try {
    const baseCurrency = "EUR";
    const apiKey = "65a46a3c3c9c4a87ab07b6a72500b80d";
    const exchangeResponse = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${apiKey}&base=${baseCurrency}`
    );
    if (exchangeResponse.status === 200) {
      exchangeRatesData = exchangeResponse.data.rates;
    } else {
      console.error("Failed to fetch exchange rates.");
    }
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
  }
};

const getCountryInfo = async (req, res) => {
  try {
    const countryName = req.query.name;
    // Fetch exchange rates
    await fetchExchangeRates();
    const countryResponse = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`
    );

    const countryData = countryResponse.data[0];
    const keys = Object.keys(countryData?.currencies || {});
    const targetCurrency = keys[0];

    const requiredInfo = {
      conversionRate: exchangeRatesData
        ? exchangeRatesData[targetCurrency]
        : undefined,
      fullName: countryData.name.official,
      population: countryData.population,
    };

    const officialCurrencies = countryData.currencies;

    const currenciesWithExchangeRate = [];
    for (const currencyCode in officialCurrencies) {
      const currencyInfo = officialCurrencies[currencyCode];
      if (currencyInfo) {
        currenciesWithExchangeRate.push({
          currencyCode,
          name: currencyInfo.name,
          symbol: currencyInfo.symbol,
        });
      }
    }
    requiredInfo["currencies"] = currenciesWithExchangeRate;

    res.send(requiredInfo);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      e,
    });
  }
};

module.exports = getCountryInfo;
