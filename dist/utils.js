"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcFocusDate = calcFocusDate;
exports.findNextRangeIndex = findNextRangeIndex;
exports.getMonthDisplayRange = getMonthDisplayRange;
exports.generateStyles = generateStyles;

var _classnames = _interopRequireDefault(require("classnames"));

var _date = require("./date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function calcFocusDate(currentFocusedDate, props) {
  var shownDate = props.shownDate,
      date = props.date,
      months = props.months,
      ranges = props.ranges,
      focusedRange = props.focusedRange,
      displayMode = props.displayMode; // find primary date according the props

  var targetInterval;

  if (displayMode === 'dateRange') {
    var range = ranges[focusedRange[0]] || {};
    targetInterval = {
      start: range.startDate,
      end: range.endDate
    };
  } else {
    targetInterval = {
      start: date,
      end: date
    };
  }

  targetInterval.start = (0, _date.startOfMonth)(targetInterval.start || new Date());
  targetInterval.end = (0, _date.endOfMonth)(targetInterval.end || targetInterval.start);
  var targetDate = targetInterval.start || targetInterval.end || shownDate || new Date(); // initial focus

  if (!currentFocusedDate) return shownDate || targetDate; // // just return targetDate for native scrolled calendars
  // if (props.scroll.enabled) return targetDate;

  var currentFocusInterval = {
    start: (0, _date.startOfMonth)(currentFocusedDate),
    end: (0, _date.endOfMonth)((0, _date.addMonths)(currentFocusedDate, months - 1))
  };

  if ((0, _date.areIntervalsOverlapping)(targetInterval, currentFocusInterval)) {
    // don't change focused if new selection in view area
    return currentFocusedDate;
  }

  return targetDate;
}

function findNextRangeIndex(ranges) {
  var currentRangeIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  var nextIndex = ranges.findIndex(function (range, i) {
    return i > currentRangeIndex && range.autoFocus !== false && !range.disabled;
  });
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex(function (range) {
    return range.autoFocus !== false && !range.disabled;
  });
}

function getMonthDisplayRange(date, dateOptions, fixedHeight) {
  var startDateOfMonth = (0, _date.startOfMonth)(date, dateOptions);
  var endDateOfMonth = (0, _date.endOfMonth)(date, dateOptions);
  var startDateOfCalendar = (0, _date.startOfWeek)(startDateOfMonth, dateOptions);
  var endDateOfCalendar = (0, _date.endOfWeek)(endDateOfMonth, dateOptions);

  if (fixedHeight && (0, _date.differenceInCalendarDays)(endDateOfCalendar, startDateOfCalendar) <= 34) {
    endDateOfCalendar = (0, _date.addDays)(endDateOfCalendar, 7);
  }

  return {
    start: startDateOfCalendar,
    end: endDateOfCalendar,
    startDateOfMonth: startDateOfMonth,
    endDateOfMonth: endDateOfMonth
  };
}

function generateStyles(sources) {
  if (!sources.length) return {};
  var generatedStyles = sources.filter(function (source) {
    return Boolean(source);
  }).reduce(function (styles, styleSource) {
    Object.keys(styleSource).forEach(function (key) {
      styles[key] = (0, _classnames["default"])(styles[key], styleSource[key]);
    });
    return styles;
  }, {});
  return generatedStyles;
}