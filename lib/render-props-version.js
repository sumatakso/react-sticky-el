"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StickyStateContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _events = require("./helpers/events");

var _find = _interopRequireDefault(require("./helpers/find"));

var _getClosestTransformedParent = _interopRequireDefault(require("./helpers/getClosestTransformedParent"));

var _rect = require("./helpers/rect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var buildTopStyles = function buildTopStyles(container, props) {
  var bottomOffset = props.bottomOffset,
      hideOnBoundaryHit = props.hideOnBoundaryHit;
  var top = container.top,
      height = container.height,
      width = container.width,
      boundaryBottom = container.boundaryBottom;

  if (hideOnBoundaryHit || top + height + bottomOffset < boundaryBottom) {
    return {
      top: "".concat(top, "px"),
      width: "".concat(width, "px"),
      position: 'fixed'
    };
  }

  return {
    width: "".concat(width, "px"),
    bottom: "".concat(bottomOffset, "px"),
    position: 'absolute'
  };
};

var buildBottomStyles = function buildBottomStyles(container, props) {
  var bottomOffset = props.bottomOffset,
      hideOnBoundaryHit = props.hideOnBoundaryHit;
  var bottom = container.bottom,
      height = container.height,
      width = container.width,
      boundaryTop = container.boundaryTop;

  if (hideOnBoundaryHit || bottom - height - bottomOffset > boundaryTop) {
    return {
      width: "".concat(width, "px"),
      top: "".concat(bottom - height, "px"),
      position: 'fixed'
    };
  }

  return {
    width: "".concat(width, "px"),
    top: "".concat(bottomOffset, "px"),
    position: 'absolute'
  };
};

var buildStickyStyle = function buildStickyStyle(mode, props, container) {
  return (mode === 'top' ? buildTopStyles : buildBottomStyles)(container, props);
};

var isEqual = function isEqual(obj1, obj2) {
  var styles1 = obj1.wrapperStyles;
  var styles2 = obj2.wrapperStyles;

  if (obj1.isFixed !== obj2.isFixed || obj1.height !== obj2.height || !styles1 && styles2 || styles1 && !styles2) {
    return false;
  }

  if (!styles2) {
    // we need this condition to make Flow happy
    return true;
  }

  for (var field in styles1) {
    if (styles1.hasOwnProperty(field) && styles1[field] !== styles2[field]) {
      return false;
    }
  }

  return true;
};

var StickyStateContext = (0, _react.createContext)({
  isFixed: false
});
exports.StickyStateContext = StickyStateContext;

var Sticky = /*#__PURE__*/function (_Component) {
  _inherits(Sticky, _Component);

  var _super = _createSuper(Sticky);

  function Sticky() {
    var _this;

    _classCallCheck(this, Sticky);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "holderEl", null);

    _defineProperty(_assertThisInitialized(_this), "wrapperEl", null);

    _defineProperty(_assertThisInitialized(_this), "el", null);

    _defineProperty(_assertThisInitialized(_this), "scrollEl", null);

    _defineProperty(_assertThisInitialized(_this), "boundaryEl", null);

    _defineProperty(_assertThisInitialized(_this), "disabled", false);

    _defineProperty(_assertThisInitialized(_this), "checkPositionIntervalId", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isFixed: false,
      wrapperStyles: null,
      holderStyles: null,
      height: 0
    });

    _defineProperty(_assertThisInitialized(_this), "holderRef", function (holderEl) {
      if (holderEl === _this.holderEl) {
        return;
      }

      _this.holderEl = holderEl;
    });

    _defineProperty(_assertThisInitialized(_this), "wrapperRef", function (wrapperEl) {
      if (wrapperEl === _this.wrapperEl) {
        return;
      }

      _this.wrapperEl = wrapperEl;

      _this.updateScrollEl();

      _this.updateBoundaryEl();
    });

    _defineProperty(_assertThisInitialized(_this), "checkPosition", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          holderEl = _assertThisInitialize.holderEl,
          wrapperEl = _assertThisInitialize.wrapperEl,
          boundaryEl = _assertThisInitialize.boundaryEl,
          scrollEl = _assertThisInitialize.scrollEl,
          disabled = _assertThisInitialize.disabled;

      if (!scrollEl || !holderEl || !wrapperEl) {
        console.error("Missing required elements:", {
          scrollEl: scrollEl,
          holderEl: holderEl,
          wrapperEl: wrapperEl
        });
        return;
      }

      var _this$props = _this.props,
          mode = _this$props.mode,
          onFixedToggle = _this$props.onFixedToggle,
          offsetTransforms = _this$props.offsetTransforms,
          isIOSFixEnabled = _this$props.isIOSFixEnabled,
          dontUpdateHolderHeightWhenSticky = _this$props.dontUpdateHolderHeightWhenSticky;

      if (disabled) {
        if (_this.state.isFixed) {
          _this.setState({
            isFixed: false
          });
        }

        return;
      }

      if (!holderEl.getBoundingClientRect || !wrapperEl.getBoundingClientRect) {
        return;
      }

      var holderRect = holderEl.getBoundingClientRect();
      var wrapperRect = wrapperEl.getBoundingClientRect();
      var boundaryRect = boundaryEl ? (0, _rect.getRect)(boundaryEl) : _rect.infiniteRect;
      var scrollRect = (0, _rect.getRect)(scrollEl);

      var isFixed = _this.isFixed(holderRect, wrapperRect, boundaryRect, scrollRect);

      var offsets = null;

      if (offsetTransforms && isFixed) {
        var closestTransformedParent = (0, _getClosestTransformedParent.default)(scrollEl);

        if (closestTransformedParent) {
          offsets = (0, _rect.getRect)(closestTransformedParent);
        }
      } // const minHeight = this.state.isFixed && dontUpdateHolderHeightWhenSticky && this.lastMinHeight ? this.lastMinHeight : wrapperRect.height;
      // this.lastMinHeight = minHeight;
      // To ensure that this component becomes sticky immediately on mobile devices instead
      // of disappearing until the scroll event completes, we add `transform: translateZ(0)`
      // to 'kick' rendering of this element to the GPU
      // @see http://stackoverflow.com/questions/32875046


      var iosRenderingFixStyles = isIOSFixEnabled ? {
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      } : null;
      var newState = {
        isFixed: isFixed,
        height: wrapperRect.height,
        holderStyles: {
          minHeight: "".concat(wrapperRect.height, "px")
        },
        wrapperStyles: isFixed ? _objectSpread(_objectSpread({}, iosRenderingFixStyles), buildStickyStyle(mode, _this.props, {
          boundaryTop: mode === 'bottom' ? boundaryRect.top : 0,
          boundaryBottom: mode === 'top' ? boundaryRect.bottom : 0,
          top: mode === 'top' ? scrollRect.top - (offsets ? offsets.top : 0) : 0,
          bottom: mode === 'bottom' ? scrollRect.bottom - (offsets ? offsets.bottom : 0) : 0,
          width: holderRect.width,
          height: wrapperRect.height
        })) : iosRenderingFixStyles
      };

      if (isFixed !== _this.state.isFixed && onFixedToggle && typeof onFixedToggle === 'function') {
        onFixedToggle(isFixed);
      }

      if (!isEqual(_this.state, newState)) {
        _this.setState(newState);
      }
    });

    return _this;
  }

  _createClass(Sticky, [{
    key: "isFixed",
    value: function isFixed(holderRect, wrapperRect, boundaryRect, scrollRect) {
      var _this$props2 = this.props,
          hideOnBoundaryHit = _this$props2.hideOnBoundaryHit,
          bottomOffset = _this$props2.bottomOffset,
          topOffset = _this$props2.topOffset,
          mode = _this$props2.mode;

      if (this.disabled) {
        return false;
      }

      if (boundaryRect && !(0, _rect.isIntersecting)(boundaryRect, scrollRect, topOffset, bottomOffset)) {
        return false;
      }

      var hideOffset = hideOnBoundaryHit ? wrapperRect.height + bottomOffset : 0;

      if (mode === 'top') {
        return holderRect.top + topOffset < scrollRect.top && scrollRect.top + hideOffset <= boundaryRect.bottom;
      }

      return holderRect.bottom - topOffset > scrollRect.bottom && scrollRect.bottom - hideOffset >= boundaryRect.top;
    }
  }, {
    key: "updateScrollEl",
    value: function updateScrollEl() {
      if (!this.wrapperEl) {
        return;
      }

      if (this.scrollEl) {
        (0, _events.unlisten)(this.scrollEl, ['scroll'], this.checkPosition);
        this.scrollEl = null;
      }

      var scrollElement = this.props.scrollElement;

      if (typeof scrollElement === 'string') {
        this.scrollEl = (0, _find.default)(scrollElement, this.wrapperEl);
      } else {
        this.scrollEl = scrollElement;
      }

      if (this.scrollEl) {
        (0, _events.listen)(this.scrollEl, ['scroll'], this.checkPosition);
      } else {
        console.error('Cannot find scrollElement ' + (typeof scrollElement === 'string' ? scrollElement : 'unknown'));
      }
    }
  }, {
    key: "updateBoundaryEl",
    value: function updateBoundaryEl() {
      if (!this.wrapperEl) {
        return;
      }

      var boundaryElement = this.props.boundaryElement;
      this.boundaryEl = (0, _find.default)(boundaryElement, this.wrapperEl);

      if (this.boundaryEl === window || this.boundaryEl === document) {
        // such objects can't be used as boundary
        // and in fact there is no point in such a case
        this.boundaryEl = null;
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this$props3 = this.props,
          positionRecheckInterval = _this$props3.positionRecheckInterval,
          disabled = _this$props3.disabled;
      this.disabled = disabled; // we should always listen to window events because they will affect the layout of the whole page

      (0, _events.listen)(window, ['scroll', 'resize', 'pageshow', 'load'], this.checkPosition);
      this.checkPosition();

      if (positionRecheckInterval) {
        this.checkPositionIntervalId = setInterval(this.checkPosition, positionRecheckInterval);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref) {
      var scrollElement = _ref.scrollElement,
          boundaryElement = _ref.boundaryElement,
          disabled = _ref.disabled;

      if (scrollElement !== this.props.scrollElement) {
        this.updateScrollEl();
      }

      if (boundaryElement !== this.props.boundaryElement) {
        this.updateBoundaryEl();
      }

      if (disabled !== this.props.disabled) {
        this.disabled = this.props.disabled;
        this.checkPosition();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initialize();

      if (this.wrapperEl === null) {
        console.error("Wrapper element is missing, please make sure that you have assigned refs correctly");
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.scrollEl) {
        (0, _events.unlisten)(this.scrollEl, ['scroll'], this.checkPosition);
      }

      (0, _events.unlisten)(window, ['scroll', 'resize', 'pageshow', 'load'], this.checkPosition);
      this.boundaryEl = null;
      this.scrollEl = null;
      clearInterval(this.checkPositionIntervalId);
    }
  }, {
    key: "render",
    value: function render() {
      var holderRef = this.holderRef,
          wrapperRef = this.wrapperRef;
      var _this$state = this.state,
          isFixed = _this$state.isFixed,
          wrapperStyles = _this$state.wrapperStyles,
          holderStyles = _this$state.holderStyles;
      return /*#__PURE__*/_react.default.createElement(StickyStateContext.Provider, {
        value: {
          isFixed: isFixed
        }
      }, this.props.children({
        holderRef: holderRef,
        wrapperRef: wrapperRef,
        isFixed: isFixed,
        wrapperStyles: wrapperStyles,
        holderStyles: holderStyles
      }));
    }
  }]);

  return Sticky;
}(_react.Component);

_defineProperty(Sticky, "defaultProps", {
  mode: 'top',
  topOffset: 0,
  bottomOffset: 0,
  isIOSFixEnabled: true,
  disabled: false,
  onFixedToggle: null,
  boundaryElement: null,
  scrollElement: 'window',
  dontUpdateHolderHeightWhenSticky: false
});

var _default = Sticky;
exports.default = _default;