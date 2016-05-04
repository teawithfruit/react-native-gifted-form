var React = require('react-native');
var {
  View,
  Text,
  TouchableOpacity,
  Image,
  PixelRatio,
  Dimensions
} = React;

var WidgetMixin = require('../mixins/WidgetMixin.js');
import CheckBox from 'react-native-checkbox';

module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'CheckboxWidget',
      value: false
    };
  },

  getInitialState() {
    return {
      item: this.props.title,
      value: this.props.value,
    };
  },

  setItem(value) {
    this.setState({value: value});
    this._onChange(this.state.value);
  },

  render() {
    return (
      <View>
        <View style={this.getStyle('rowContainer')}>
          <View style={this.getStyle('row')}>
            <CheckBox
              label={this.state.item}
              labelBefore={true}
              labelStyle={{width: 200}}
              checked={this.state.value}
              onChange={(checked) => this.setItem(checked)}
            />
          </View>
        </View>
      </View>
    );
  },

  defaultStyles: {
    rowContainer: {
      backgroundColor: '#FFF',
    },
    row: {
      flexDirection: 'row',
      height: 44,
      alignItems: 'center',
    },
  },
});
