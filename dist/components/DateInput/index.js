"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _date = require("../../date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DateInput = /*#__PURE__*/function (_PureComponent) {
  _inherits(DateInput, _PureComponent);

  var _super = _createSuper(DateInput);

  function DateInput(props, context) {
    var _this;

    _classCallCheck(this, DateInput);

    _this = _super.call(this, props, context);

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      var _this$state = _this.state,
          value = _this$state.value,
          time = _this$state.time;

      if (e.key === 'Enter') {
        _this.update(value, time);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeDate", function (e) {
      _this.setState({
        value: e.target.value,
        changed: true,
        invalid: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeTime", function (e) {
      _this.setState({
        time: e.target.value,
        changed: true,
        invalid: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      var _this$state2 = _this.state,
          value = _this$state2.value,
          time = _this$state2.time;

      _this.update(value, time);
    });

    _this.state = {
      invalid: false,
      changed: false,
      value: _this.formatDate(props),
      time: _this.formatTime(props)
    };
    return _this;
  }

  _createClass(DateInput, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var value = prevProps.value;

      if (!(0, _date.isEqual)(value, this.props.value)) {
        this.setState({
          value: this.formatDate(this.props),
          time: this.formatTime(this.props)
        });
      }
    }
  }, {
    key: "formatDate",
    value: function formatDate(_ref) {
      var value = _ref.value,
          dateDisplayFormat = _ref.dateDisplayFormat,
          dateOptions = _ref.dateOptions;

      if (value && (0, _date.isValid)(value)) {
        return (0, _date.format)(value, dateDisplayFormat, dateOptions);
      }

      return '';
    }
  }, {
    key: "formatTime",
    value: function formatTime(_ref2) {
      var value = _ref2.value,
          dateOptions = _ref2.dateOptions;

      if (value && (0, _date.isValid)(value)) {
        return (0, _date.format)(value, 'HH:mm:ss', dateOptions);
      }

      return '00:00:00';
    }
  }, {
    key: "update",
    value: function update(value, time) {
      var _this$state3 = this.state,
          invalid = _this$state3.invalid,
          changed = _this$state3.changed;

      if (invalid || !changed || !value) {
        return;
      }

      var _this$props = this.props,
          onChange = _this$props.onChange,
          dateDisplayFormat = _this$props.dateDisplayFormat,
          dateOptions = _this$props.dateOptions,
          useTime = _this$props.useTime;
      var parsed = (0, _date.parse)(value, dateDisplayFormat, new Date(), dateOptions);

      if (time && useTime) {
        var ref = (0, _date.set)(new Date(), {
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0
        });
        var parsedTime = (0, _date.parse)(time, 'HH:mm:ss', ref);

        if (!(0, _date.isValid)(parsedTime)) {
          parsedTime = (0, _date.parse)(time, 'HH:mm', ref);
        }

        if ((0, _date.isValid)(parsedTime)) {
          parsed = (0, _date.set)(parsed, {
            hours: (0, _date.getHours)(parsedTime),
            minutes: (0, _date.getMinutes)(parsedTime),
            seconds: (0, _date.getSeconds)(parsedTime),
            milliseconds: 0
          });
        }
      }

      if ((0, _date.isValid)(parsed)) {
        this.setState({
          changed: false
        }, function () {
          return onChange(parsed);
        });
      } else {
        this.setState({
          invalid: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          readOnly = _this$props2.readOnly,
          placeholder = _this$props2.placeholder,
          disabled = _this$props2.disabled,
          useTime = _this$props2.useTime,
          onFocus = _this$props2.onFocus;
      var _this$state4 = this.state,
          value = _this$state4.value,
          time = _this$state4.time,
          invalid = _this$state4.invalid;
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: (0, _classnames["default"])('rdrDateInput', className, {
          rdrWarning: invalid
        })
      }, /*#__PURE__*/_react["default"].createElement("input", {
        readOnly: readOnly,
        disabled: disabled,
        value: value,
        placeholder: placeholder,
        onKeyDown: this.onKeyDown,
        onChange: this.onChangeDate,
        onBlur: this.onBlur,
        onFocus: onFocus
      }), useTime ? /*#__PURE__*/_react["default"].createElement("input", {
        step: "1",
        type: "time",
        readOnly: readOnly,
        disabled: disabled,
        value: time,
        onKeyDown: this.onKeyDown,
        onChange: this.onChangeTime,
        onBlur: this.onBlur,
        onFocus: onFocus
      }) : null);
    }
  }]);

  return DateInput;
}(_react.PureComponent);

DateInput.propTypes = {
  value: _propTypes["default"].object,
  placeholder: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  readOnly: _propTypes["default"].bool,
  useTime: _propTypes["default"].bool,
  dateOptions: _propTypes["default"].object,
  dateDisplayFormat: _propTypes["default"].string,
  className: _propTypes["default"].string,
  onFocus: _propTypes["default"].func.isRequired,
  onChange: _propTypes["default"].func.isRequired
};
DateInput.defaultProps = {
  readOnly: true,
  disabled: false,
  useTime: true,
  dateDisplayFormat: 'MMM D, YYYY'
};
var _default = DateInput;
exports["default"] = _default;