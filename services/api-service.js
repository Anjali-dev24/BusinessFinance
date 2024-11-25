import {Platform} from 'react-native';
const baseUrl = 'https://www.enterbubble.com/sdev/';

export default class ApiService {
  constructor() {}
  /**
   * Get countries from server
   */
  getCountries() {
    let requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    return fetch(baseUrl + `countries/get_countries`, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(response => {
        return response;
      });
  }

  /**
   * Get states from server
   */
  getStates(countryId) {
    console.log('countryId' + countryId);
    let formdata = new FormData();
    formdata.append('country_id', countryId);
    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    return fetch(baseUrl + `countries/get_states`, requestOptions)
      .then(response => response.json())
      .then(response => {
        return response;
      });
  }

  /**
   * Get cities from server
   */
  getCities(countryId, stateId) {
    let formdata = new FormData();
    formdata.append('country_id', countryId);
    formdata.append('state_id', stateId);
    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    return fetch(baseUrl + `countries/get_cities`, requestOptions)
      .then(response => response.json())
      .then(response => {
        return response;
      });
  }

  /**
   * Method to upload images of create bubble form on server.
   * @param {*} image
   */
  uploadCreateBubbleFile(file, type = 'Image') {
    let formdata = new FormData();
    if (type == 'Image') {
      formdata.append('image', {
        name: 'image.jpg',
        type: 'image/png',
        uri: file,
      });
    } else {
      formdata.append('image', {
        name: 'video.mp4',
        uri: file,
        type: file,
      });
    }

    let requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data;',
      },
      body: formdata,
      redirect: 'follow',
    };

    return fetch(baseUrl + `createbubble/save_image`, requestOptions)
      .then(response => response.text())
      .then(response => {
        return response;
      });
  }

  /**
   * Method to create new bubble on server with following params
   * @param {*} fullName
   * @param {*} emailAddress
   * @param {*} mobileNumber
   * @param {*} countryId
   * @param {*} stateId
   * @param {*} cityId
   * @param {*} buildingName
   * @param {*} postCode
   * @param {*} merchantname
   * @param {*} displaykey
   * @param {*} latitude
   * @param {*} longitude
   * @param {*} distance
   * @param {*} whatsapp
   * @param {*} facebook
   * @param {*} twitter
   * @param {*} instagram
   * @param {*} youtube
   * @param {*} wikipedia
   * @param {*} bubbleinfo
   * @param {*} shopact
   * @param {*} prelogin
   * @param {*} merchantLogo
   */
  createBubble(
    fullName,
    emailAddress,
    mobileNumber,
    countryId,
    stateId,
    cityId,
    town,
    street,
    buildingName,
    postCode,
    merchantname,
    displaykey,
    latitude,
    longitude,
    distance,
    whatsapp,
    facebook,
    twitter,
    instagram,
    youtube,
    wikipedia,
    bubbleinfo,
    shopact,
    prelogin,
    merchantLogo,
    slides,
  ) {
    let formdata = new FormData();
    formdata.append('full_name', fullName);
    formdata.append('email', emailAddress);
    formdata.append('phone', mobileNumber);
    formdata.append('country', countryId);
    formdata.append('state', stateId);
    formdata.append('city', cityId);
    formdata.append('town', town);
    formdata.append('street', street);
    formdata.append('building', buildingName);
    formdata.append('postcode', postCode);
    formdata.append('merchant', merchantname);
    formdata.append('disp_key', displaykey);
    formdata.append('latitude', latitude);
    formdata.append('longitude', longitude);
    formdata.append('distance', distance);
    formdata.append('whatup', whatsapp);
    formdata.append('facebook', facebook);
    formdata.append('twitter', twitter);
    formdata.append('instagram', instagram);
    formdata.append('youtube', youtube);
    formdata.append('wikipedia', wikipedia);
    formdata.append('bubble_info', bubbleinfo);
    formdata.append('shop_act', shopact);
    formdata.append('pre_login', prelogin);
    formdata.append('merchantlogo', merchantLogo);
    formdata.append('slides', JSON.stringify(slides));
    formdata.append('ssid', '');
    //formdata.append('linkedin', '');

    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    return fetch(baseUrl + `createbubble/create_bubble`, requestOptions)
      .then(response => response.json())
      .then(response => {
        return response;
      });
  }
}
