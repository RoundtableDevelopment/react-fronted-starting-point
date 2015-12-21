'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _utilsStyles = require('./utils/styles');

var _utilsStyles2 = _interopRequireDefault(_utilsStyles);

var propTypes = {
  /**
   * CSS class that will be added to the divider's root element
   */
  className: _react2['default'].PropTypes.string,

  /**
   * If true, the divider will be indented 72px
   */
  inset: _react2['default'].PropTypes.bool,

  /**
   * Override the inline-styles of the list divider's root element
   */
  style: _react2['default'].PropTypes.object
};

var contextTypes = {
  muiTheme: _react2['default'].PropTypes.object
};

var childContextTypes = {
  muiTheme: _react2['default'].PropTypes.object
};

var defaultProps = {
  inset: false
};

var Divider = function Divider(_ref, _ref2) {
  var inset = _ref.inset;
  var style = _ref.style;

  var other = _objectWithoutProperties(_ref, ['inset', 'style']);

  var _ref2$muiTheme = _ref2.muiTheme;
  var muiTheme = _ref2$muiTheme === undefined ? _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default']) : _ref2$muiTheme;

  var styles = {
    root: {
      margin: 0,
      marginTop: -1,
      marginLeft: inset ? 72 : 0,
      height: 1,
      border: 'none',
      backgroundColor: muiTheme.rawTheme.palette.borderColor
    }
  };

  return _react2['default'].createElement('hr', _extends({}, other, { style: _utilsStyles2['default'].prepareStyles(muiTheme, styles.root, style) }));
};

Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;
Divider.contextTypes = contextTypes;
Divider.childContextTypes = childContextTypes;

exports['default'] = Divider;
module.exports = exports['default'];