import React, { Component } from 'react'
import axios from 'axios'
import './app.css'
import 'leaflet/dist/leaflet.css'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      globalData: {},
      country: '',
      countries: [],
      countryData: {},
      filter: '',
      lat: 51.505,
      lng: -0.09,
      zoom: 2,
      showMapData: {},
      inputType: '',
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
  handleInputSelect = (inputType) => {
    this.setState({
      inputType,
    })
  }

  render() {
    let { globalData, countries, country, countryData, inputType } = this.state
    let renderData
    console.log(inputType)

    if (country === '' || country === 'all') {
      renderData = globalData
    } else {
      renderData = countryData
    }
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
            <div className='col-md-12'>
              <div className='row'>
                <div
                  className='col-lg-4 col-md-4 col-12'
                  onClick={() => this.handleInputSelect('cases')}
                >
                  <div className='card'>
                    <div className='row'>
                      <div className='col-12'>
                        <h3>Active Cases</h3>
                        <p>+ {renderData.todayCases} today</p>
                        <p>
                          {renderData.cases} <span>total</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className='col-6 col-lg-4 col-md-4 mt-1'
                  onClick={() => this.handleInputSelect('recovered')}
                >
                  <div className='card'>
                    <div className='row'>
                      <div className='col-12'>
                        <h3>Recovered</h3>
                        <p>+ {renderData.todayRecovered} today</p>
                        <p>
                          {renderData.recovered} <span>total</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className='col-6 col-lg-4 col-md-4 mt-1'
                  onClick={() => this.handleInputSelect('deaths')}
                >
                  <div className='card'>
                    <div className='row'>
                      <div className='col-12'>
                        <h3>Deaths</h3>
                        <p>+ {renderData.todayDeaths} today</p>
                        <p>
                          {renderData.deaths} <span>total</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <div className='map'>
                <Map
                  style={{ width: '100vh', height: 500 }}
                  center={[this.state.lat, this.state.lng]}
                  zoom={this.state.zoom}
                >
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  {/* <Marker position={[this.state.lat, this.state.lng]}></Marker> */}
                </Map>
                {/* <h1>jsdoijaoisjdoijasdiojoi</h1> */}
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-6 mt-1'>
          <div className='card'>
            <h2 className='text-center'>Live Cases by country</h2>
            <hr />
            <div className='card-body'>
              <div className='row  '>
                {countries.map((country, index) => {
                  let { countryInfo } = country
                  return (
                    <div key={index} className='col-12 data_row'>
                      <div className='row'>
                        <div className='col-6'>
                          <img
                            className='rounded'
                            alt='Img'
                            style={{ height: 50, width: 50 }}
                            src={countryInfo.flag}
                          />
                          <span>{country.country}</span>
                        </div>
                        <div className='col-6'>
                          <span>{country.cases}</span>
                        </div>
                      </div>
                      <hr />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App
