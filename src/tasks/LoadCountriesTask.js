import papa from "papaparse";
import legendItems from "../entities/LegendItems";
import { features } from "../data/countries.json";
//    this.setState(features);

class LoadCountryTask {
  covidUrl =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv";

  setState = null;

  load = (setState) => {
    this.setState = setState;

    papa.parse(this.covidUrl, {
      download: true,
      header: true,
      complete: (result) => this.#processCovidData(result.data),
    });
  };

  #processCovidData = (covidCountries) => {
    for (let i = 0; i < features.length; i++) {
      const country = features[i];
      //console.log(country);
      const covidCountry = covidCountries.find(
        (covidCountry) => country.properties.ISO_A3 === covidCountry.ISO3
      );

      // console.log(covidCountry)
      country.properties.confirmed = 0;
      country.properties.confirmedText = 0;
      country.properties.recoveredText = 0;
      country.properties.deathsText = 0;

      if (covidCountry != null) {
        let confirmed = Number(covidCountry.Confirmed);
        let recovered = Number(covidCountry.Recovered);
        let deaths = Number(covidCountry.Deaths);
        country.properties.confirmed = confirmed;
        country.properties.recovered = recovered;
        country.properties.deaths = deaths;
        country.properties.confirmedText = this.#formatNumberWithCommas(
          confirmed
        );
        country.properties.recoveredText = this.#formatNumberWithCommas(
          recovered
        );
        country.properties.deathsText = this.#formatNumberWithCommas(
          deaths
        );
      }
      this.#setCountryColor(country);
    }

    this.setState(features);
  };

  #setCountryColor = (country) => {
    const legendItem = legendItems.find((item) =>
      item.isFor(country.properties.confirmed)
    );

    if (legendItem != null) country.properties.color = legendItem.color;
  };

  #formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
}

export default LoadCountryTask;
