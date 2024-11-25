import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Dimensions,
  Picker,
  ActivityIndicator,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Regexes from '../utils/regex';
import SplashScreen from 'react-native-splash-screen';
import CustomHeader from '../components/custom-header';
import CustomCheckbox from '../components/custom-checkbox';
import CustomPreFields from '../components/custom-prefields';
import SelectTypeComponent from '../components/select-type-component';
import CustomTextfield from '../components/custom-textfield';
import DropDown from '../components/dropdown';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';
import ApiService from '../services/api-service';
import {FontAwesome} from '@expo/vector-icons';
import TextEditor from '../components/text-editor/text-editor';

const isWeb = Platform.OS === 'web';

export default class CreateBubble extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  static path = 'createbubble';

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      toolTipVisible: false,
      state: '',
      isLandScape:
        Dimensions.get('window').width > Dimensions.get('window').height,
      stateError: '',
      country: '',
      countryError: '',
      city: '',
      cityError: '',
      fullName: '',
      fullNameError: '',
      Email: '',
      emailError: '',
      mobileNumber: '',
      mobileError: '',
      pinCode: '',
      pinCodeError: '',
      town: '',
      townError: '',
      street: '',
      streetError: '',
      buildingName: '',
      buildingNameError: '',
      whatsappUrl: '',
      whatsappUrlError: '',
      instagramUrl: '',
      instagramUrlError: '',
      facebookUrl: '',
      facebookUrlError: '',
      twitterUrl: '',
      twitterUrlError: '',
      youtubeUrl: '',
      youtubeUrlError: '',
      wikipediaUrl: '',
      wikipediaUrlError: '',
      linkedinUrl: '',
      linkedinUrlError: '',
      instantBubbleName: '',
      bubbleMerchantName: '',
      bubbleInfo: '',
      bubbleInfoError: '',
      displayBubbleKeyInBubble: false,
      cashOnDelivery: false,
      isBuisnessCardMandatory: false,
      isEmailMandatory: false,
      isLegalIdMandatory: false,
      isMobileMandatory: false,
      isPictureMandatory: false,
      isFullNameMandatory: false,
      isSlidesValid: false,
      latitude: '',
      latitudeError: '',
      longitude: '',
      longitudeError: '',
      distance: '',
      distanceError: '',
      bubbleTitleDesignerType: 'Text',
      merchantLogo: '',
      Countries: [],
      States: [],
      Cities: [],
      bubbleTitleDesigns: [
        {
          type: 'Text',
          value: '',
        },
      ],
    };

    this.apiService = new ApiService();
  }

  componentDidMount() {
    if (Platform.OS != 'web') {
      SplashScreen.hide();
    }
  }
  scrollToElement(portion) {
    this.scrollview_ref.scrollTo({
      x: 0,
      y: portion,
      animated: true,
    });
  }

  /**
   * Validation Checks before user presses create bubble
   */
  async validateFields() {
    const {
      fullName,
      Email,
      mobileNumber,
      town,
      street,
      buildingName,
      pinCode,
      longitude,
      latitude,
      distance,
      facebookUrl,
      twitterUrl,
      instagramUrl,
      youtubeUrl,
      wikipediaUrl,
      linkedinUrl,
      country,
      state,
      city,
      merchantLogo,
      bubbleInfo,
      bubbleMerchantName,
      bubbleTitleDesigns,
    } = this.state;

    this.resetErrors();

    let scrollToUpperPortion = false;
    let scrollToMiddlePortion = false;

    let emailRegex = Regexes.emailRegex;
    var nameRegex = Regexes.nameRegex;
    var mobileRegex = Regexes.mobileRegex;
    var longAndLatRegex = Regexes.longLatRegex;
    var townAndPinRegex = Regexes.townAndPinRegex;
    var youtubeRegex = Regexes.youtubeRegex;
    var urlRegex = Regexes.urlRegex;

    if (fullName == '') {
      this.setState({fullNameError: 'Please enter the full name.'});
      scrollToUpperPortion = true;
    }
    if (Email == '') {
      this.setState({emailError: 'Please enter the email.'});
      scrollToUpperPortion = true;
    }
    if (Email != '' && !emailRegex.test(Email)) {
      this.setState({emailError: 'Please enter a valid email address.'});
      scrollToUpperPortion = true;
    }
    if (mobileNumber == '') {
      this.setState({mobileError: 'Please enter the mobile number.'});
      scrollToUpperPortion = true;
    }
    if (mobileNumber != '' && mobileNumber.length < 9) {
      this.setState({
        mobileError:
          'Please enter a valid mobile number with minimum 9 digits.',
      });
      scrollToUpperPortion = true;
    }
    if (mobileNumber != '' && !mobileRegex.test(mobileNumber)) {
      this.setState({mobileError: 'Please enter a valid mobile number.'});
      scrollToUpperPortion = true;
    }
    if (country == '') {
      this.setState({countryError: 'Please select country.'});
      scrollToUpperPortion = true;
    }
    if (town == '') {
      this.setState({
        townError: 'Please enter the town.',
      });
      scrollToUpperPortion = true;
    }
    if (town != '' && town.length < 3) {
      this.setState({
        townError: 'Please enter a valid town with minimum 3 characters.',
      });
      scrollToUpperPortion = true;
    }
    if (town != '' && !townAndPinRegex.test(town)) {
      this.setState({townError: 'Please enter a valid town name.'});
      scrollToUpperPortion = true;
    }
    if (street == '') {
      this.setState({
        streetError: 'Please enter the street.',
      });
      scrollToUpperPortion = true;
    }
    if (buildingName == '') {
      this.setState({
        buildingNameError: 'Please enter the building name/number/floor.',
      });
      scrollToUpperPortion = true;
    }
    if (buildingName != '' && !townAndPinRegex.test(buildingName)) {
      this.setState({
        buildingNameError: 'Please enter a valid building name/number/floor.',
      });
      scrollToUpperPortion = true;
    }
    if (pinCode == '') {
      this.setState({pinCodeError: 'Please enter the post code/pin code.'});
      scrollToUpperPortion = true;
    }
    if (!townAndPinRegex.test(pinCode)) {
      this.setState({
        pinCodeError: 'Please enter a valid post code/pin code.',
      });
      scrollToUpperPortion = true;
    }
    if (merchantLogo == '') {
      this.setState({merchantLogoError: 'Please choose merchant logo.'});
      scrollToMiddlePortion = true;
    }
    if (bubbleInfo == '') {
      this.setState({bubbleInfoError: 'Please enter bubble information.'});
      scrollToMiddlePortion = true;
    }
    if (bubbleMerchantName == '') {
      this.setState({bubbleMerchantError: 'Please enter a merchant name.'});
      scrollToMiddlePortion = true;
    }
    if (facebookUrl != '' && !urlRegex.test(facebookUrl)) {
      this.setState({facebookUrlError: 'Please enter a valid facebook url.'});
      scrollToMiddlePortion = true;
    }
    if (twitterUrl != '' && !urlRegex.test(twitterUrl)) {
      this.setState({twitterUrlError: 'Please enter a valid twitter url.'});
      scrollToMiddlePortion = true;
    }
    if (instagramUrl != '' && !urlRegex.test(instagramUrl)) {
      this.setState({
        instagramUrlError: 'Please enter a valid instagram url.',
      });
      scrollToMiddlePortion = true;
    }
    if (youtubeUrl != '' && !youtubeRegex.test(youtubeUrl)) {
      this.setState({youtubeUrlError: 'Please enter a valid youtube url.'});
      scrollToMiddlePortion = true;
    }
    if (wikipediaUrl != '' && !urlRegex.test(wikipediaUrl)) {
      this.setState({
        wikipediaUrlError: 'Please enter a valid wikipedia url.',
      });
      scrollToMiddlePortion = true;
    }
    if (linkedinUrl != '' && !urlRegex.test(linkedinUrl)) {
      this.setState({linkedinUrlError: 'Please enter a valid linkedin url'});
      scrollToMiddlePortion = true;
    }
    if (latitude == '') {
      this.setState({latitudeError: 'Please enter the latitude.'});
    }
    if (latitude != '' && !longAndLatRegex.test(latitude)) {
      this.setState({latitudeError: 'Please enter a valid latitude.'});
    }
    if (longitude == '') {
      this.setState({longitudeError: 'Please enter the longitude.'});
    }
    if (longitude != '' && !longAndLatRegex.test(longitude)) {
      this.setState({longitudeError: 'Please enter a valid longitude.'});
    }
    if (distance == '') {
      this.setState({distanceError: 'Please enter a distance'});
    }
    if (distance != '' && !longAndLatRegex.test(distance)) {
      this.setState({distanceError: 'Please enter a valid distance.'});
    }
    this.checkSlidesValidation();

    if (scrollToUpperPortion) {
      this.scrollToElement(this.upperPortion);
    } else if (scrollToMiddlePortion) {
      this.scrollToElement(this.middlePortion);
    }
    if (this.isFormValid()) {
      this.checkBubbleTitleDesigns();
    }
  }

  /**
   * Checks Validation on slides
   */
  checkSlidesValidation() {
    let youtubeRegex = Regexes.youtubeRegex;
    let onlyAlphabets = Regexes.onlyAplhabets;
    let urlRegex = Regexes.urlRegex;
    let bubbleTitleDesigns = this.state.bubbleTitleDesigns;
    let slidesValid = true;
    bubbleTitleDesigns.forEach(item => {
      item.error = '';
      if (item.value != '') {
        if (item.type == 'Text') {
          let stripedText = item.value.replace(/<(.|\n)*?>/g, '');
          if (!onlyAlphabets.test(stripedText.slice(0, 3))) {
            item.error = 'Please enter first 3 letter only as alphabets.';
            slidesValid = false;
          }
        } else if (item.type == 'YouTube' && !youtubeRegex.test(item.value)) {
          item.error = 'Please enter valid youtube url.';
          slidesValid = false;
        } else if (item.type == 'Url' && !urlRegex.test(item.value)) {
          item.error = 'Please enter valid url.';
          slidesValid = false;
        }
      }
    });

    this.setState({bubbleTitleDesigns, isSlidesValid: slidesValid});
  }

  /**
   * Checks if there is any video or image in bubble title designs
   */
  checkBubbleTitleDesigns() {
    let bubbleTitleDesigns = this.state.bubbleTitleDesigns;
    let files = [];

    bubbleTitleDesigns.forEach((item, index) => {
      if (item.type == 'Image' || item.type == 'Video') {
        item.index = index;
        files.push(item);
      }
    });

    this.uploadBubbleDesignFile(files);
  }

  /**
   * Uploads the image and video on server.
   * after that calls create bubble method
   */
  uploadBubbleDesignFile(files) {
    this.setState({loading: true});
    if (files.length > 0) {
      this.apiService
        .uploadCreateBubbleFile(files[0].value, files[0].type)
        .then(response => {
          let bubbleTitleDesigns = this.state.bubbleTitleDesigns;

          bubbleTitleDesigns[files[0].index].value = response;
          this.setState({bubbleTitleDesigns});

          files.splice(0, 1);
          this.uploadBubbleDesignFile(files);
        })
        .catch(error => {
          this.setState({loading: false});
        });
    } else {
      this.apiService
        .uploadCreateBubbleFile(this.state.merchantLogo)
        .then(response => {
          console.log('merchant logo' + response);
          this.setState({merchantLogo: response}, () => this.createBubble());
        })
        .catch(error => {
          this.setState({loading: false});
        });
    }
  }

  /**
   * returns true there is no error in the form
   */
  isFormValid() {
    if (
      this.state.fullNameError == '' &&
      this.state.emailError == '' &&
      this.state.mobileError == '' &&
      this.state.countryError == '' &&
      this.state.townError == '' &&
      this.state.streetError == '' &&
      this.state.buildingNameError == '' &&
      this.state.pinCodeError == '' &&
      this.state.merchantLogoError == '' &&
      this.state.bubbleMerchantError == '' &&
      this.state.whatsappUrlError == '' &&
      this.state.facebookUrlError == '' &&
      this.state.twitterUrlError == '' &&
      this.state.instagramUrlError == '' &&
      this.state.youtubeUrlError == '' &&
      this.state.wikipediaUrlError == '' &&
      this.state.linkedinUrlError == '' &&
      this.state.latitudeError == '' &&
      this.state.longitudeError == '' &&
      this.state.distanceError == '' &&
      this.state.isSlidesValid
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Resets all the errors in the form.
   */
  resetErrors() {
    this.setState({
      fullNameError: '',
      emailError: '',
      mobileError: '',
      pinCodeError: '',
      townError: '',
      streetError: '',
      buildingNameError: '',
      countryError: '',
      stateError: '',
      cityError: '',
      youtubeUrlError: '',
      facebookUrlError: '',
      whatsappUrlError: '',
      instagramUrlError: '',
      twitterUrlError: '',
      wikipediaUrlError: '',
      linkedinUrlError: '',
      merchantLogoError: '',
      bubbleMerchantError: '',
    });
  }

  /**
   * Method for image picker;
   */
  _pickImage = async value => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (value == 'MerchantLogo')
        this.setState({merchantLogo: result.uri, merchantLogoError: ''});
    }
  };

  /**
   * Returns prelogin mandatory fields in comma seperated format.
   */
  getPreLoginFields() {
    let prelogin = [];

    if (this.state.isFullNameMandatory) {
      prelogin.push(1);
    }
    if (this.state.isEmailMandatory) {
      prelogin.push(2);
    }
    if (this.state.isMobileMandatory) {
      prelogin.push(3);
    }
    if (this.state.isPictureMandatory) {
      prelogin.push(4);
    }
    if (this.state.isBuisnessCardMandatory) {
      prelogin.push(5);
    }
    if (this.state.isLegalIdMandatory) {
      prelogin.push(6);
    }

    if (prelogin.length > 0) {
      return prelogin.join(',');
    } else {
      return '';
    }
  }

  /**
   * Method used to create new bubble on the server.
   */
  createBubble() {
    let bubbleTitleDesigns = this.state.bubbleTitleDesigns;
    let prelogin = this.getPreLoginFields();
    let shopact = this.state.cashOnDelivery ? 'on' : 'off';
    let disp_key = this.state.displayBubbleKeyInBubble ? 'on' : 'off';
    let stateId =
      this.state.state && this.state.state.id ? this.state.state.id : '';
    let cityId =
      this.state.city && this.state.city.id ? this.state.city.id : '';
    let slides = bubbleTitleDesigns.map(item => {
      let slide = {};

      slide.name = item.value;
      slide.type = item.type.toLowerCase();
      return slide;
    });

    this.apiService
      .createBubble(
        this.state.fullName,
        this.state.Email,
        this.state.mobileNumber,
        this.state.country.id,
        stateId,
        cityId,
        this.state.town,
        this.state.street,
        this.state.buildingName,
        this.state.pinCode,
        this.state.bubbleMerchantName,
        disp_key,
        this.state.latitude,
        this.state.longitude,
        this.state.distance,
        this.state.whatsappUrl,
        this.state.facebookUrl,
        this.state.twitterUrl,
        this.state.instagramUrl,
        this.state.youtubeUrl,
        this.state.wikipediaUrl,
        // this.state.linkedinUrl,
        this.state.bubbleInfo,
        shopact,
        prelogin,
        this.state.merchantLogo,
        slides,
      )
      .then(response => {
        this.setState({loading: false});
        console.log('Create bubble response' + JSON.stringify(response));
        this.props.navigation.navigate('BubbleKey', {key: response.ID});
      })
      .catch(error => {
        console.log('Create bubble response' + error);
        this.setState({loading: false});
      });
  }

  /**
   * Fetch countries from server on user selection.
   */
  fetchCountries() {
    if (this.state.Countries.length == 0) {
      this.apiService
        .getCountries()
        .then(countries => {
          let countriesData = countries.map(item => {
            return Object.assign(item, {
              value: item.CountryName,
            });
          });
          this.setState({Countries: countriesData, States: [], Cities: []});
        })
        .catch(error => {});
    }
  }

  /**
   * Fetch states for selected country.
   */
  fetchStates() {
    if (this.state.States.length == 0) {
      this.apiService
        .getStates(this.state.country.id)
        .then(states => {
          let statesData = states.map(item => {
            return Object.assign(item, {
              value: item.StateName,
            });
          });
          this.setState({States: statesData, Cities: []});
        })
        .catch(error => {});
    }
  }
  /**
   * Fetch cities for selected state.
   */
  fetchCities() {
    if (this.state.Cities.length == 0) {
      this.apiService
        .getCities(this.state.country.id, this.state.state.id)
        .then(cities => {
          let citiesData = cities.map(item => {
            return Object.assign(item, {
              value: item.CityName,
            });
          });
          this.setState({Cities: citiesData});
        })
        .catch(error => {});
    }
  }

  /**
   *  Returns slides design view.
   */
  getBubbleTitleDesignsView() {
    return this.state.bubbleTitleDesigns.map((item, index) => {
      return (
        <SelectTypeComponent
          key={index.toString()}
          editorId={'editor' + index.toString()}
          index={index}
          lastIndex={this.state.bubbleTitleDesigns.length - 1}
          value={item.value}
          type={item.type}
          error={item.error}
          designTypeChange={(value, index) => {
            this.onBubbleDesignTypeChange(value, index);
          }}
          onValueChange={(value, index) => {
            this.onBubbleDesignValueChange(value, index);
          }}
          onAddMorePress={() => this.addBubbleTitleDesign()}
          onDeletePress={index => this.deleteBubbleDesign(index)}
        />
      );
    });
  }

  /**
   * Method called when value of slide changes.
   * @param {*} value
   * @param {*} index
   */
  onBubbleDesignValueChange(value, index) {
    let bubbleTitleDesigns = this.state.bubbleTitleDesigns;
    bubbleTitleDesigns[index].value = value;
    bubbleTitleDesigns[index].error = '';
    this.setState({bubbleTitleDesigns});
    console.log(JSON.stringify(bubbleTitleDesigns));
  }

  /**
   * Method for changing bubble design type while user press on dropdown.
   * @param {*} type
   * @param {*} index
   */
  onBubbleDesignTypeChange(type, index) {
    let bubbleTitleDesigns = this.state.bubbleTitleDesigns;
    bubbleTitleDesigns[index].type = type;
    bubbleTitleDesigns[index].value = '';
    bubbleTitleDesigns[index].error = '';
    this.setState({bubbleTitleDesigns});
  }

  /**
   * Method for adding bubble design on pressing add button.
   */
  addBubbleTitleDesign() {
    let bubbleTitleDesigns = this.state.bubbleTitleDesigns;
    let bubbleTitleDesign = {
      type: 'Text',
      value: '',
    };
    bubbleTitleDesigns.push(bubbleTitleDesign);
    this.setState({bubbleTitleDesigns});
  }

  /**
   * Method for deleting bubble design on pressing delete button.
   * @param {*} index
   */
  deleteBubbleDesign(index) {
    let bubbleTitleDesigns = this.state.bubbleTitleDesigns;
    bubbleTitleDesigns.splice(index, 1);
    this.setState({bubbleTitleDesigns});
  }

  /**
   * get tooltip
   */
  getToolTipInfo() {
    return (
      <View style={{position: 'relative'}}>
        {this.state.toolTipVisible && (
          <View style={styles.tooltipStyle}>
            <Text style={[{fontSize: 12, color: Colors.white}]}>
              For Linking Normal Bubble With Instant Bubble, Please Enter a
              Valid Bubble Name.{' '}
            </Text>
            <View style={styles.talkBubbleTriangle} />
          </View>
        )}

        <FontAwesome
          style={{alignSelf: 'center', marginBottom: moderateScale(5)}}
          name={'info-circle'}
          color={Colors.strongBlue}
          size={30}
          onPress={() => this.setState({toolTipVisible: true})}
        />
      </View>
    );
  }

  render() {
    const {
      fullName,
      fullNameError,
      Email,
      emailError,
      mobileError,
      countryError,
      stateError,
      cityError,
      mobileNumber,
      town,
      townError,
      street,
      streetError,
      buildingName,
      buildingNameError,
      pinCode,
      pinCodeError,
      displayBubbleKeyInBubble,
      longitude,
      longitudeError,
      latitude,
      latitudeError,
      distance,
      distanceError,
      bubbleInfo,
      bubbleInfoError,
      bubbleMerchantName,
      bubbleMerchantError,
      youtubeUrlError,
      facebookUrlError,
      facebookUrl,
      whatsappUrl,
      whatsappUrlError,
      twitterUrl,
      twitterUrlError,
      instagramUrlError,
      wikipediaUrlError,
      instagramUrl,
      youtubeUrl,
      wikipediaUrl,
      linkedinUrl,
      linkedinUrlError,
      merchantLogoError,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.loading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator color={Colors.strongBlue} size={'large'} />
          </View>
        )}
        {this.state.toolTipVisible && (
          <Text
            style={styles.tooltipOverlay}
            onPress={() => this.setState({toolTipVisible: false})}
          />
        )}
        <View style={styles.shadow}>
          <CustomHeader
            name="arrow-left"
            size={moderateScale(40)}
            color={Colors.brightBlue}
            text="CREATE BUBBLE"
          />
        </View>
        <ScrollView
          contentContainerStyle={styles.scroll}
          ref={ref => {
            this.scrollview_ref = ref;
          }}>
          <View
            style={styles.imageContainer}
            onLayout={event => {
              const layout = event.nativeEvent.layout;
              this.upperPortion = layout.y;
            }}>
            <Image
              style={styles.logoImage}
              source={require('../assets/logo.png')}
            />
          </View>
          <Text style={styles.welcomeText}>
            Welcome ! , Register below to create your Bubble.
          </Text>
          <CustomTextfield
            ref={o => (this.fullNameTextInput = o)}
            value={fullName}
            label="Full Name"
            placeholder="Full Name"
            returnKeyType={'next'}
            onChangeText={fullName =>
              this.setState({
                fullName: fullName.replace(/[^a-zA-Z ]/g, ''),
                fullNameError: '',
              })
            }
            error={fullNameError}
            onSubmitEditing={() => this.emailTextInput.focus()}
          />
          <CustomTextfield
            ref={o => (this.emailTextInput = o)}
            value={Email}
            label="Email Address"
            placeholder="Email Address"
            returnKeyType={'next'}
            onChangeText={Email => this.setState({Email, emailError: ''})}
            error={emailError}
            onSubmitEditing={() => this.mobileTextInput.focus()}
          />

          <CustomTextfield
            ref={o => (this.mobileTextInput = o)}
            value={mobileNumber}
            label="Mobile Number"
            placeholder="Mobile Number"
            returnKeyType={'next'}
            keyboardType="numeric"
            maxLength={13}
            onChangeText={mobileNumber =>
              this.setState({mobileNumber, mobileError: ''})
            }
            error={mobileError}
            onSubmitEditing={() => this.townTextInput.focus()}
          />
          <DropDown
            label="Country"
            error={countryError}
            style={{width: '100%', marginTop: moderateScale(17)}}
            data={this.state.Countries}
            value={this.state.country}
            onValueChange={(value, index) => {
              this.setState({
                country: this.state.Countries[index],
                countryError: '',
                States: [],
                Cities: [],
                state: '',
                city: '',
              });
            }}
            onDropDownPress={() => this.fetchCountries()}
          />

          <DropDown
            style={{width: '100%', marginTop: moderateScale(17)}}
            label="State"
            error={stateError}
            data={this.state.States}
            value={this.state.state}
            onValueChange={(value, index) => {
              this.setState({
                state: this.state.States[index],
                Cities: [],
                city: '',
              });
            }}
            onDropDownPress={() => this.fetchStates()}
          />
          <DropDown
            style={{
              width: '100%',
              marginTop: moderateScale(17),
            }}
            label="City"
            data={this.state.Cities}
            value={this.state.city}
            error={cityError}
            onValueChange={(value, index) => {
              this.setState({city: this.state.Cities[index]});
            }}
            onDropDownPress={() => this.fetchCities()}
          />

          <CustomTextfield
            ref={o => (this.townTextInput = o)}
            value={town}
            label="Town"
            placeholder="Town"
            returnKeyType={'next'}
            maxLength={20}
            onChangeText={town => this.setState({town, townError: ''})}
            error={townError}
            onSubmitEditing={() => this.streetTextInput.focus()}
          />

          <CustomTextfield
            ref={o => (this.streetTextInput = o)}
            value={street}
            label="Street"
            placeholder="Street"
            returnKeyType={'next'}
            maxLength={35}
            onChangeText={street => this.setState({street, streetError: ''})}
            error={streetError}
            onSubmitEditing={() => this.buildingTextInput.focus()}
          />

          <CustomTextfield
            ref={o => (this.buildingTextInput = o)}
            value={buildingName}
            label="Building Name /Number /Floor"
            placeholder="Building Name /Number /Floor"
            returnKeyType={'next'}
            maxLength={50}
            onChangeText={buildingName =>
              this.setState({buildingName, buildingNameError: ''})
            }
            error={buildingNameError}
            onSubmitEditing={() => this.postCodeTextInput.focus()}
          />

          <CustomTextfield
            ref={o => (this.postCodeTextInput = o)}
            value={pinCode}
            label="Post Code/Pin Code"
            placeholder="Post Code/Pin Code"
            returnKeyType={'next'}
            maxLength={10}
            onChangeText={pinCode => this.setState({pinCode, pinCodeError: ''})}
            error={pinCodeError}
            onSubmitEditing={() => null}
          />

          <Text style={styles.questionText}>
            Display Bubble Key In Bubble ?
          </Text>
          <CustomCheckbox
            checked={displayBubbleKeyInBubble}
            onYesPress={() => {
              this.setState({displayBubbleKeyInBubble: true});
            }}
            onNoPress={() => {
              this.setState({displayBubbleKeyInBubble: false});
            }}
            checkedIcon={require('../assets/filledcircle.png')}
            uncheckedIcon={require('../assets/emptycircle.png')}
            yesText="Yes"
            noText="No"
          />
          <Text style={styles.merchantBox}>
            Merchant Logo <Text style={styles.star}>*</Text>
          </Text>
          <TouchableOpacity
            onLayout={event => {
              const layout = event.nativeEvent.layout;
              this.middlePortion = layout.y;
            }}
            onPress={() => this._pickImage('MerchantLogo')}
            style={styles.merchantBorder}>
            <TouchableOpacity
              onPress={() => this._pickImage('MerchantLogo')}
              style={styles.chooseFilesButton}>
              <Text
                style={{
                  color: Colors.darkGrayishBlue,
                  fontSize: moderateScale(7),
                  padding: moderateScale(2),
                }}>
                CHOOSE FILES
              </Text>
            </TouchableOpacity>
            {this.state.merchantLogo == '' ? (
              <Text style={{color: Colors.black, fontSize: moderateScale(8)}}>
                No files chosen
              </Text>
            ) : (
              <Text style={{color: Colors.black, fontSize: moderateScale(8)}}>
                1 Image Selected.
              </Text>
            )}
          </TouchableOpacity>

          {merchantLogoError != '' && (
            <Text style={styles.inputErrorLabelStyle}>{merchantLogoError}</Text>
          )}

          <Text style={[styles.merchantBox, {marginBottom: 0}]}>
            Bubble Title Designer
          </Text>
          {this.getBubbleTitleDesignsView()}

          <View>
            <Text style={styles.socialMediaText}>Social Media</Text>
            <CustomTextfield
              icon={require('../assets/whatsapp.png')}
              value={whatsappUrl}
              placeholder="WhatsApp Number"
              onChangeText={whatsappUrl =>
                this.setState({whatsappUrl, whatsappUrlError: ''})
              }
              error={whatsappUrlError}
            />
            <CustomTextfield
              icon={require('../assets/facebook.png')}
              value={facebookUrl}
              placeholder="Facebook"
              onChangeText={facebookUrl =>
                this.setState({facebookUrl, facebookUrlError: ''})
              }
              error={facebookUrlError}
            />
            <CustomTextfield
              icon={require('../assets/linkedin.png')}
              value={linkedinUrl}
              placeholder="linkedin"
              onChangeText={linkedinUrl =>
                this.setState({linkedinUrl, linkedinUrlError: ''})
              }
              error={linkedinUrlError}
            />
            <CustomTextfield
              icon={require('../assets/twitter.png')}
              value={twitterUrl}
              placeholder="Twitter"
              onChangeText={twitterUrl =>
                this.setState({twitterUrl, twitterUrlError: ''})
              }
              error={twitterUrlError}
            />
            <CustomTextfield
              icon={require('../assets/instagram.png')}
              value={instagramUrl}
              placeholder="Instagram"
              onChangeText={instagramUrl =>
                this.setState({instagramUrl, instagramUrlError: ''})
              }
              error={instagramUrlError}
            />
            <View
              onLayout={event => {
                const layout = event.nativeEvent.layout;
                this.lowerPortion = layout.y;
              }}></View>
            <CustomTextfield
              icon={require('../assets/youtube.png')}
              value={youtubeUrl}
              placeholder="Youtube"
              onChangeText={youtubeUrl =>
                this.setState({youtubeUrl, youtubeUrlError: ''})
              }
              error={youtubeUrlError}
            />
            <CustomTextfield
              icon={require('../assets/wikipedia.png')}
              value={wikipediaUrl}
              placeholder="Wikipedia"
              onChangeText={wikipediaUrl =>
                this.setState({wikipediaUrl, wikipediaUrlError: ''})
              }
              error={wikipediaUrlError}
            />
          </View>
          <Text style={styles.merchantBox}>
            Bubble /Merchant Name <Text style={styles.star}>*</Text>
          </Text>
          <View style={isWeb ? styles.textWebEditor : styles.textEditor}>
            <TextEditor
              editorId={'bubbleMerchantName'}
              value={bubbleMerchantName}
              onValueChange={bubbleMerchantName => {
                this.setState(
                  {bubbleMerchantName, bubbleMerchantError: ''},
                  () => {
                    console.log('bubbleMerchantName' + bubbleMerchantName);
                  },
                );
              }}
            />
          </View>
          {bubbleMerchantError != '' && (
            <Text style={styles.inputErrorLabelStyle}>
              {bubbleMerchantError}
            </Text>
          )}
          <Text style={styles.merchantBox}>
            Bubble Info <Text style={styles.star}>*</Text>
          </Text>

          <View style={isWeb ? styles.textWebEditor : styles.textEditor}>
            <TextEditor
              editorId={'bubbleInfo'}
              value={bubbleInfo}
              onValueChange={bubbleInfo => {
                this.setState({bubbleInfo, bubbleInfoError: ''}, () => {
                  console.log('bubbleInfo' + bubbleInfo);
                });
              }}
            />
          </View>
          {bubbleInfoError != '' && (
            <Text style={styles.inputErrorLabelStyle}>{bubbleInfoError}</Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              paddingRight: moderateScale(15),
              marginTop: moderateScale(15),
            }}>
            <Text style={styles.instantBubbleText}>
              Enter The Instant Bubble Name To Link This Bubble
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              position: 'relative',
              paddingRight: moderateScale(15),
            }}>
            <CustomTextfield
              style={{flexGrow: 1}}
              value={this.state.instantBubbleName}
              onChangeText={instantBubbleName =>
                this.setState({instantBubbleName})
              }
              iconName="info-circle"
              onSubmitEditing={() => null}
            />
            {this.getToolTipInfo()}
          </View>
          <Text style={styles.questionText}>
            Allow shop to offer cash on delivery ?
          </Text>
          <CustomCheckbox
            checked={this.state.cashOnDelivery}
            checkedIcon={require('../assets/filledcircle.png')}
            uncheckedIcon={require('../assets/emptycircle.png')}
            yesText="Yes"
            noText="No"
            onYesPress={() => {
              this.setState({cashOnDelivery: true});
            }}
            onNoPress={() => {
              this.setState({cashOnDelivery: false});
            }}
          />
          <Text style={styles.questionText}>Mandatory Pre-Login Fields</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              marginVertical: moderateScale(8),
            }}>
            <CustomPreFields
              onPress={() =>
                this.setState({
                  isFullNameMandatory: !this.state.isFullNameMandatory,
                })
              }
              checked={this.state.isFullNameMandatory}
              text="Fullname"
            />
            <CustomPreFields
              onPress={() =>
                this.setState({
                  isEmailMandatory: !this.state.isEmailMandatory,
                })
              }
              checked={this.state.isEmailMandatory}
              text="Email address"
            />
            <CustomPreFields
              onPress={() =>
                this.setState({
                  isMobileMandatory: !this.state.isMobileMandatory,
                })
              }
              checked={this.state.isMobileMandatory}
              text="Phone number"
            />
            <CustomPreFields
              onPress={() =>
                this.setState({
                  isPictureMandatory: !this.state.isPictureMandatory,
                })
              }
              checked={this.state.isPictureMandatory}
              text="Picture"
            />

            <CustomPreFields
              onPress={() =>
                this.setState({
                  isBuisnessCardMandatory: !this.state.isBuisnessCardMandatory,
                })
              }
              checked={this.state.isBuisnessCardMandatory}
              text="Business card"
            />
            <CustomPreFields
              onPress={() =>
                this.setState({
                  isLegalIdMandatory: !this.state.isLegalIdMandatory,
                })
              }
              checked={this.state.isLegalIdMandatory}
              text="Legal ID"
            />
          </View>
          <Text style={styles.merchantBox}>
            Location Fields <Text style={styles.star}>*</Text>
          </Text>
          <View
            style={{
              flexDirection: this.state.isLandScape ? 'row' : 'column',
              alignItems: 'flex-end',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <View style={{width: this.state.isLandScape ? '30%' : '100%'}}>
              <CustomTextfield
                ref={o => (this.latitudeTextInput = o)}
                value={latitude}
                label="Latitude"
                returnKeyType={'next'}
                placeholder="Latitude"
                onChangeText={latitude =>
                  this.setState({latitude, latitudeError: ''})
                }
                error={latitudeError}
                onSubmitEditing={() => this.longitudeTextInput.focus()}
              />
            </View>
            <View style={{width: this.state.isLandScape ? '30%' : '100%'}}>
              <CustomTextfield
                ref={o => (this.longitudeTextInput = o)}
                value={longitude}
                label="Longitude"
                returnKeyType={'next'}
                placeholder="Longitude"
                onChangeText={longitude =>
                  this.setState({
                    longitude: longitude,
                    longitudeError: '',
                  })
                }
                error={longitudeError}
                onSubmitEditing={() => this.distanceTextInput.focus()}
              />
            </View>
            <View style={{width: this.state.isLandScape ? '30%' : '100%'}}>
              <CustomTextfield
                ref={o => (this.distanceTextInput = o)}
                value={distance}
                label="Distance(Km)"
                returnKeyType={'done'}
                placeholder="Distance(Km)"
                onChangeText={distance =>
                  this.setState({distance, distanceError: ''})
                }
                error={distanceError}
                onSubmitEditing={() => this.validateFields()}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => this.validateFields()}
            style={styles.createBubbleButton}>
            <Image
              source={require('../assets/buttonLogo.png')}
              style={{
                height: moderateScale(25),
                width: moderateScale(25),
                resizeMode: 'contain',
                marginRight: moderateScale(5),
                marginLeft: moderateScale(5),
              }}
            />
            <Text style={styles.createBubbleText}>Create Bubble</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    position: 'relative',
  },
  tooltipOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  imageContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: moderateScale(100),
    height: moderateScale(80),
    resizeMode: 'contain',
  },
  scroll: {
    flexGrow: 1,
    padding: moderateScale(15),
  },
  welcomeText: {
    textAlign: 'center',
    marginBottom: moderateScale(16),
    fontSize: moderateScale(20),
    color: Colors.black,
    fontFamily: Fonts.ProductSans,
  },
  questionText: {
    fontSize: moderateScale(16),
    marginTop: moderateScale(15),
    textAlign: 'left',
    color: Colors.black,
    fontFamily: Fonts.ProductSansBold,
  },
  merchantBox: {
    fontSize: moderateScale(16),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(8),
    textAlign: 'left',
    color: Colors.black,
    fontFamily: Fonts.ProductSansBold,
  },
  star: {
    color: Colors.brightRed,
  },
  merchantBorder: {
    borderWidth: moderateScale(1),
    borderColor: Colors.grayishYellow,
    marginBottom: moderateScale(15),
    borderStyle: 'dashed',
    borderRadius: moderateScale(1),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  createBubbleButton: {
    shadowOffset: {width: 0.4, height: 0.4},
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    elevation: 5,
    margin: moderateScale(8),
    position: 'relative',
    flexDirection: 'row',
    borderRadius: moderateScale(5),
    backgroundColor: Colors.strongBlue,
    alignItems: 'center',
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
    marginBottom: moderateScale(15),
    marginTop: moderateScale(30),
    alignSelf: 'center',
  },
  createBubbleText: {
    color: Colors.white,
    fontFamily: Fonts.ProductSans,
    fontSize: moderateScale(15),
  },
  socialMediaText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.ProductSansBold,
    color: Colors.black,
    marginBottom: moderateScale(8),
  },
  chooseFilesButton: {
    backgroundColor: Colors.extraLightBlue,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    paddingVertical: moderateScale(0),
    marginRight: moderateScale(3),
  },

  instantBubbleText: {
    fontSize: moderateScale(16),
    flexWrap: 'wrap',
    color: Colors.black,
    fontFamily: Fonts.ProductSansBold,
  },
  shadow: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.28,
    shadowRadius: 1,
    elevation: 5,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  inputErrorLabelStyle: {
    backgroundColor: 'white',
    color: 'red',
    fontSize: moderateScale(11),
    textAlignVertical: 'bottom',
    paddingTop: 0,
    fontFamily: Fonts.ProductSans,
  },
  tooltipStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: moderateScale(100),
    borderRadius: moderateScale(8),
    right: moderateScale(10),
    bottom: moderateScale(35),
    padding: moderateScale(5),
    zIndex: 2,
  },
  talkBubbleTriangle: {
    position: 'absolute',
    bottom: -10,
    right: moderateScale(10),
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(0,0,0,0.5)',
    zIndex: 2,
  },
  textEditor: {
    height: moderateScale(200),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(5),
  },
  textWebEditor: {
    height: moderateScale(270),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(5),
  },
});
