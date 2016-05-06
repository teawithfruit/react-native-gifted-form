var React = require('react-native');
var {
  View,
  Text,
  TouchableOpacity,
  Image,
  PixelRatio,
  ListView,
  Dimensions
} = React;

var WidgetMixin = require('../mixins/WidgetMixin.js');
var TimerMixin = require('react-timer-mixin');
import Overlay from 'react-native-overlay';

module.exports = React.createClass({
  mixins: [TimerMixin, WidgetMixin],

  getDefaultProps() {
    return {
      type: 'PopoverWidget',
      onPress: () => {},
      rows: [],
      value: '',
      disclosure: true,
    };
  },

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var rows = this.props.rows;

    var value = this.props.value != '' ? this.props.value : this.props.placeholder;

    return {
      value: value,
      isVisible: false,
      dataSource: ds.cloneWithRows(rows),
    };
  },

  showPopover() {
    this.setState({isVisible: true});
  },

  closePopover() {
    this._onChange(this.state.value)
    this.setState({isVisible: false});
  },

  setItem(item) {
    this.setState({value: item});
  },

  _renderDisclosure() {
    if (this.props.disclosure === true) {
      return (
        <Image
          style={this.getStyle('disclosure')}
          resizeMode={Image.resizeMode.contain}
          source={require('../icons/disclosure.png')}
        />
      );
    }
    return null;
  },

  renderRow: function(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableOpacity onPress={() => { this.setItem(rowData); this.closePopover(); }}>
        <View style={{height: 50, borderBottomWidth: 1, borderBottomColor: '#eeeeee', padding: 5,}}>
          <Text>{rowData}</Text>
        </View>
      </TouchableOpacity>
   )
  },

  render() {
    return (
      <View>
        <View style={this.getStyle('rowContainer')}>
          <View style={this.getStyle('row')}>
            {this._renderImage()}
            <Text numberOfLines={1} style={this.getStyle('title')} onPress={this.showPopover}>{this.state.value || this.props.placeholder}</Text>
            {this._renderDisclosure()}
          </View>
        </View>

        <Overlay isVisible={this.state.isVisible} onClose={() => this.closePopover()}>
           <View style={this.getStyle('wrapper')}>
             <ListView
               style={this.getStyle('listView')}
               dataSource={this.state.dataSource}
               renderRow={this.renderRow} />
           </View>
         </Overlay>
      </View>
    );
  },

  defaultStyles: {
    rowImage: {
      height: 20,
      width: 20,
      marginLeft: 10,
    },
    rowContainer: {
      backgroundColor: '#FFF',
      borderBottomWidth: 1 / PixelRatio.get(),
      borderColor: '#c8c7cc',
    },
    row: {
      flexDirection: 'row',
      height: 44,
      alignItems: 'center',
    },
    underlayColor: '#c7c7cc',
    disclosure: {
      marginLeft: 10,
      marginRight: 10,
      width: 11,
    },
    title: {
      flex: 1,
      fontSize: 15,
      color: '#000',
      paddingLeft: 10,
      width: 280
    },

    listView: {
      flex: 1,
      marginLeft: 100,
      marginRight: 100,
      marginTop: (Dimensions.get('window').height / 2) / 1.5,
      marginBottom: (Dimensions.get('window').height / 2) / 1.5,
      backgroundColor: '#ffffff',
    },
    wrapper: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  },
});
