import Axios from 'axios'
import React, { Component } from 'react'
import axios from 'axios'
import { render } from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      globalData: {},
      country: '',
      countries: [],
      countryData: {},
      filter: '',
    }
  }
  componentDidMount() {
    axios
      .get('https://disease.sh/v3/covid-19/all')
      .then((res) => {
        this.setState({
          globalData: res.data,
        })
      })
      .catch((err) => {
        console.log(err)
      })

    axios
      .get('https://disease.sh/v3/covid-19/countries')
      .then((res) => {
        this.setState({
          countries: res.data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  handleInput = (e) => {
    console.log(this.state.country)
    // let {}
    this.setState({ [e.target.name]: e.target.value })
    if (e.target.value === 'all') {
      axios
        .get(`https://disease.sh/v3/covid-19/all`)
        .then((res) => {
          this.setState({ countryData: res.data })
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios
        .get(`https://disease.sh/v3/covid-19/countries/${e.target.value}`)
        .then((res) => {
          this.setState({ countryData: res.data })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  render() {
    let { globalData, countries, country, countryData } = this.state

    console.log(countryData)
    let renderData

    if (country === '' || country === 'all') {
      renderData = globalData
    } else {
      renderData = countryData
    }

    // let renderCountryData = countryData.map(country=>
    //   {return ()}
    //   )

    return (
      <div className='row'>
        <div className='col-lg-6 col-12'>
          <div className='row'>
            <div className='col-12 col-md-6'>
              <h2>Covid Tracker</h2>
            </div>
            <div className='col-12 col-md-6 pt-2'>
              <div className='form-group'>
                <select
                  className='form-control'
                  name='country'
                  id=''
                  onChange={this.handleInput}
                  value={this.state.country}
                >
                  <option value='all'>Global</option>
                  {countries.map((country, index) => {
                    let { countryInfo } = country
                    return (
                      <option key={index} value={countryInfo._id}>
                        {country.country}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-4 col-md-4 col-12' onClick>
              <div className='card'>
                <div className='row'>
                  <div className='col-12'>
                    <h3>Active Cases</h3>
                    <p>+ {renderData.todayCases} today</p>
                    <p>{renderData.cases} Total</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-6 col-lg-4 col-md-4'>
              <div className='card'>
                <div className='row'>
                  <div className='col-12'>
                    <h3>Recovered</h3>
                    <p>+ {renderData.todayRecovered} today</p>
                    <p>{renderData.recovered} Total</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-6 col-lg-4 col-md-4'>
              <div className='card'>
                <div className='row'>
                  <div className='col-12'>
                    <h3>Deaths</h3>
                    <p>+ {renderData.todayDeaths} today</p>
                    <p>{renderData.deaths} Total</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='card'>
            <div className='row'>
              <div className='col-12'></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App
