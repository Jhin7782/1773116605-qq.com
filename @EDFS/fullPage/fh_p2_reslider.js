/*! angularjs-slider - v2.13.0 -  (c) Rafal Zajac <rzajac@gmail.com>, Valentin Hervieu <valentin@hervieu.me>, Jussi Saarivirta <jusasi@gmail.com>, Angelin Sirbu <angelin.sirbu@gmail.com> -  https://github.com/angular-slider/angularjs-slider -  2016-04-24 */ ! function(a, b) {
	"use strict";
	"function" == typeof define && define.amd ? define(["angular"], b) : "object" == typeof module && module.exports ? module.exports = b(require("angular")) : b(a.angular)
}(this, function(a) {
	"use strict";
	var b = a.module("rzModule", []).factory("RzSliderOptions", function() {
		var b = {
				floor: 0,
				ceil: null,
				step: 1,
				precision: 0,
				minRange: 0,
				id: null,
				translate: null,
				getLegend: null,
				stepsArray: null,
				draggableRange: !1,
				draggableRangeOnly: !1,
				showSelectionBar: !1,
				showSelectionBarEnd: !1,
				showSelectionBarFromValue: null,
				hidePointerLabels: !1,
				hideLimitLabels: !1,
				readOnly: !1,
				disabled: !1,
				interval: 350,
				showTicks: !1,
				showTicksValues: !1,
				ticksTooltip: null,
				ticksValuesTooltip: null,
				vertical: !1,
				getSelectionBarColor: null,
				getPointerColor: null,
				keyboardSupport: !0,
				scale: 1,
				enforceStep: !0,
				enforceRange: !1,
				noSwitching: !1,
				onlyBindHandles: !1,
				onStart: null,
				onChange: null,
				onEnd: null,
				rightToLeft: !1
			},
			c = {},
			d = {};
		return d.options = function(b) {
			a.extend(c, b)
		}, d.getOptions = function(d) {
			return a.extend({}, b, c, d)
		}, d
	}).factory("rzThrottle", ["$timeout", function(a) {
		return function(b, c, d) {
			var e, f, g, h = Date.now || function() {
					return (new Date).getTime()
				},
				i = null,
				j = 0;
			d = d || {};
			var k = function() {
				j = h(), i = null, g = b.apply(e, f), e = f = null
			};
			return function() {
				var l = h(),
					m = c - (l - j);
				return e = this, f = arguments, 0 >= m ? (a.cancel(i), i = null, j = l, g = b.apply(e, f), e = f = null) : i || d.trailing === !1 || (i = a(k, m)), g
			}
		}
	}]).factory("RzSlider", ["$timeout", "$document", "$window", "$compile", "RzSliderOptions", "rzThrottle", function(b, c, d, e, f, g) {
		var h = function(a, b) {
			this.scope = a, this.sliderElem = b, this.range = void 0 !== this.scope.rzSliderModel && void 0 !== this.scope.rzSliderHigh, this.dragging = {
				active: !1,
				value: 0,
				difference: 0,
				offset: 0,
				lowLimit: 0,
				highLimit: 0
			}, this.positionProperty = "left", this.dimensionProperty = "width", this.handleHalfDim = 0, this.maxPos = 0, this.precision = 0, this.step = 1, this.tracking = "", this.minValue = 0, this.maxValue = 0, this.valueRange = 0, this.intermediateTicks = !1, this.initHasRun = !1, this.internalChange = !1, this.fullBar = null, this.selBar = null, this.minH = null, this.maxH = null, this.flrLab = null, this.ceilLab = null, this.minLab = null, this.maxLab = null, this.cmbLab = null, this.ticks = null, this.init()
		};
		return h.prototype = {
			init: function() {
				var b, c, e = this,
					f = function() {
						e.calcViewDimensions()
					};
				this.applyOptions(), this.initElemHandles(), this.manageElementsStyle(), this.setDisabledState(), this.calcViewDimensions(), this.setMinAndMax(), this.addAccessibility(), this.updateCeilLab(), this.updateFloorLab(), this.initHandles(), this.manageEventsBindings(), this.scope.$on("reCalcViewDimensions", f), a.element(d).on("resize", f), this.initHasRun = !0, b = g(function() {
					e.onLowHandleChange()
				}, e.options.interval), c = g(function() {
					e.onHighHandleChange()
				}, e.options.interval), this.scope.$on("rzSliderForceRender", function() {
					e.resetLabelsValue(), b(), e.range && c(), e.resetSlider()
				}), this.scope.$watch("rzSliderOptions()", function(a, b) {
					a !== b && (e.applyOptions(), e.resetSlider())
				}, !0), this.scope.$watch("rzSliderModel", function(a, c) {
					e.internalChange || a !== c && b()
				}), this.scope.$watch("rzSliderHigh", function(a, b) {
					e.internalChange || a !== b && (null != a && c(), (e.range && null == a || !e.range && null != a) && (e.applyOptions(), e.resetSlider()))
				}), this.scope.$on("$destroy", function() {
					e.unbindEvents(), a.element(d).off("resize", f)
				})
			},
			onLowHandleChange: function() {
				this.setMinAndMax(), this.updateLowHandle(this.valueToOffset(this.scope.rzSliderModel)), this.updateSelectionBar(), this.updateTicksScale(), this.updateAriaAttributes(), this.range && this.updateCmbLabel()
			},
			onHighHandleChange: function() {
				this.setMinAndMax(), this.updateHighHandle(this.valueToOffset(this.scope.rzSliderHigh)), this.updateSelectionBar(), this.updateTicksScale(), this.updateCmbLabel(), this.updateAriaAttributes()
			},
			applyOptions: function() {
				var b;
				b = this.scope.rzSliderOptions ? this.scope.rzSliderOptions() : {}, this.options = f.getOptions(b), this.options.step <= 0 && (this.options.step = 1), this.range = void 0 !== this.scope.rzSliderModel && void 0 !== this.scope.rzSliderHigh, this.options.draggableRange = this.range && this.options.draggableRange, this.options.draggableRangeOnly = this.range && this.options.draggableRangeOnly, this.options.draggableRangeOnly && (this.options.draggableRange = !0), this.options.showTicks = this.options.showTicks || this.options.showTicksValues, this.scope.showTicks = this.options.showTicks, a.isNumber(this.options.showTicks) && (this.intermediateTicks = !0), this.options.showSelectionBar = this.options.showSelectionBar || this.options.showSelectionBarEnd || null !== this.options.showSelectionBarFromValue, this.options.stepsArray ? this.parseStepsArray() : (this.options.translate ? this.customTrFn = this.options.translate : this.customTrFn = function(a) {
					return String(a)
				}, this.options.getLegend && (this.getLegend = this.options.getLegend)), this.options.vertical && (this.positionProperty = "bottom", this.dimensionProperty = "height")
			},
			parseStepsArray: function() {
				this.options.floor = 0, this.options.ceil = this.options.stepsArray.length - 1, this.options.step = 1, this.options.translate ? this.customTrFn = this.options.translate : this.customTrFn = function(b) {
					var c = this.options.stepsArray[b];
					return a.isObject(c) ? c.value : c
				}, this.getLegend = function(b) {
					var c = this.options.stepsArray[b];
					return a.isObject(c) ? c.legend : null
				}
			},
			resetSlider: function() {
				this.manageElementsStyle(), this.addAccessibility(), this.setMinAndMax(), this.updateCeilLab(), this.updateFloorLab(), this.unbindEvents(), this.manageEventsBindings(), this.setDisabledState(), this.calcViewDimensions()
			},
			initElemHandles: function() {
				a.forEach(this.sliderElem.children(), function(b, c) {
					var d = a.element(b);
					switch (c) {
						case 0:
							this.fullBar = d;
							break;
						case 1:
							this.selBar = d;
							break;
						case 2:
							this.minH = d;
							break;
						case 3:
							this.maxH = d;
							break;
						case 4:
							this.flrLab = d;
							break;
						case 5:
							this.ceilLab = d;
							break;
						case 6:
							this.minLab = d;
							break;
						case 7:
							this.maxLab = d;
							break;
						case 8:
							this.cmbLab = d;
							break;
						case 9:
							this.ticks = d
					}
				}, this), this.selBar.rzsp = 0, this.minH.rzsp = 0, this.maxH.rzsp = 0, this.flrLab.rzsp = 0, this.ceilLab.rzsp = 0, this.minLab.rzsp = 0, this.maxLab.rzsp = 0, this.cmbLab.rzsp = 0
			},
			manageElementsStyle: function() {
				this.range ? this.maxH.css("display", "") : this.maxH.css("display", "none"), this.alwaysHide(this.flrLab, this.options.showTicksValues || this.options.hideLimitLabels), this.alwaysHide(this.ceilLab, this.options.showTicksValues || this.options.hideLimitLabels);
				var a = this.options.showTicksValues && !this.intermediateTicks;
				this.alwaysHide(this.minLab, a || this.options.hidePointerLabels), this.alwaysHide(this.maxLab, a || !this.range || this.options.hidePointerLabels), this.alwaysHide(this.cmbLab, a || !this.range || this.options.hidePointerLabels), this.alwaysHide(this.selBar, !this.range && !this.options.showSelectionBar), this.options.vertical && this.sliderElem.addClass("rz-vertical"), this.options.draggableRange ? this.selBar.addClass("rz-draggable") : this.selBar.removeClass("rz-draggable"), this.intermediateTicks && this.options.showTicksValues && this.ticks.addClass("rz-ticks-values-under")
			},
			alwaysHide: function(a, b) {
				a.rzAlwaysHide = b, b ? this.hideEl(a) : this.showEl(a)
			},
			manageEventsBindings: function() {
				this.options.disabled || this.options.readOnly ? this.unbindEvents() : this.bindEvents()
			},
			setDisabledState: function() {
				this.options.disabled ? this.sliderElem.attr("disabled", "disabled") : this.sliderElem.attr("disabled", null)
			},
			resetLabelsValue: function() {
				this.minLab.rzsv = void 0, this.maxLab.rzsv = void 0
			},
			initHandles: function() {
				this.updateLowHandle(this.valueToOffset(this.scope.rzSliderModel)), this.range && this.updateHighHandle(this.valueToOffset(this.scope.rzSliderHigh)), this.updateSelectionBar(), this.range && this.updateCmbLabel(), this.updateTicksScale()
			},
			translateFn: function(a, b, c, d) {
				d = void 0 === d ? !0 : d;
				var e = String(d ? this.customTrFn(a, this.options.id, c) : a),
					f = !1;
				(void 0 === b.rzsv || b.rzsv.length !== e.length || b.rzsv.length > 0 && 0 === b.rzsd) && (f = !0, b.rzsv = e), b.html(e), f && this.getDimension(b)
			},
			setMinAndMax: function() {
				this.step = +this.options.step, this.precision = +this.options.precision, this.minValue = this.options.floor, this.options.enforceStep && (this.scope.rzSliderModel = this.roundStep(this.scope.rzSliderModel), this.range && (this.scope.rzSliderHigh = this.roundStep(this.scope.rzSliderHigh))), null != this.options.ceil ? this.maxValue = this.options.ceil : this.maxValue = this.options.ceil = this.range ? this.scope.rzSliderHigh : this.scope.rzSliderModel, this.options.enforceRange && (this.scope.rzSliderModel = this.sanitizeValue(this.scope.rzSliderModel), this.range && (this.scope.rzSliderHigh = this.sanitizeValue(this.scope.rzSliderHigh))), this.valueRange = this.maxValue - this.minValue
			},
			addAccessibility: function() {
				this.minH.attr("role", "slider"), this.updateAriaAttributes(), !this.options.keyboardSupport || this.options.readOnly || this.options.disabled ? this.minH.attr("tabindex", "") : this.minH.attr("tabindex", "0"), this.options.vertical && this.minH.attr("aria-orientation", "vertical"), this.range && (this.maxH.attr("role", "slider"), !this.options.keyboardSupport || this.options.readOnly || this.options.disabled ? this.maxH.attr("tabindex", "") : this.maxH.attr("tabindex", "0"), this.options.vertical && this.maxH.attr("aria-orientation", "vertical"))
			},
			updateAriaAttributes: function() {
				this.minH.attr({
					"aria-valuenow": this.scope.rzSliderModel,
					"aria-valuetext": this.customTrFn(this.scope.rzSliderModel, this.options.id, "model"),
					"aria-valuemin": this.minValue,
					"aria-valuemax": this.maxValue
				}), this.range && this.maxH.attr({
					"aria-valuenow": this.scope.rzSliderHigh,
					"aria-valuetext": this.customTrFn(this.scope.rzSliderHigh, this.options.id, "high"),
					"aria-valuemin": this.minValue,
					"aria-valuemax": this.maxValue
				})
			},
			calcViewDimensions: function() {
				var a = this.getDimension(this.minH);
				this.handleHalfDim = a / 2, this.barDimension = this.getDimension(this.fullBar), this.maxPos = this.barDimension - a, this.getDimension(this.sliderElem), this.sliderElem.rzsp = this.sliderElem[0].getBoundingClientRect()[this.positionProperty], this.initHasRun && (this.updateFloorLab(), this.updateCeilLab(), this.initHandles())
			},
			updateTicksScale: function() {
				if (this.options.showTicks) {
					var a = this.step;
					this.intermediateTicks && (a = this.options.showTicks);
					var b = Math.round((this.maxValue - this.minValue) / a) + 1;
					this.scope.ticks = [];
					for (var c = 0; b > c; c++) {
						var d = this.roundStep(this.minValue + c * a),
							e = {
								selected: this.isTickSelected(d)
							};
						if (e.selected && this.options.getSelectionBarColor && (e.style = {
								"background-color": this.getSelectionBarColor()
							}), this.options.ticksTooltip && (e.tooltip = this.options.ticksTooltip(d), e.tooltipPlacement = this.options.vertical ? "right" : "top"), this.options.showTicksValues && (e.value = this.getDisplayValue(d, "tick-value"), this.options.ticksValuesTooltip && (e.valueTooltip = this.options.ticksValuesTooltip(d), e.valueTooltipPlacement = this.options.vertical ? "right" : "top")), this.getLegend) {
							var f = this.getLegend(d, this.options.id);
							f && (e.legend = f)
						}
						this.options.rightToLeft ? this.scope.ticks.unshift(e) : this.scope.ticks.push(e)
					}
				}
			},
			isTickSelected: function(a) {
				if (!this.range)
					if (null !== this.options.showSelectionBarFromValue) {
						var b = this.options.showSelectionBarFromValue;
						if (this.scope.rzSliderModel > b && a >= b && a <= this.scope.rzSliderModel) return !0;
						if (this.scope.rzSliderModel < b && b >= a && a >= this.scope.rzSliderModel) return !0
					} else if (this.options.showSelectionBarEnd) {
					if (a >= this.scope.rzSliderModel) return !0
				} else if (this.options.showSelectionBar && a <= this.scope.rzSliderModel) return !0;
				return this.range && a >= this.scope.rzSliderModel && a <= this.scope.rzSliderHigh ? !0 : !1
			},
			updateFloorLab: function() {
				this.translateFn(this.minValue, this.flrLab, "floor"), this.getDimension(this.flrLab);
				var a = this.options.rightToLeft ? this.barDimension - this.flrLab.rzsd : 0;
				this.setPosition(this.flrLab, a)
			},
			updateCeilLab: function() {
				this.translateFn(this.maxValue, this.ceilLab, "ceil"), this.getDimension(this.ceilLab);
				var a = this.options.rightToLeft ? 0 : this.barDimension - this.ceilLab.rzsd;
				this.setPosition(this.ceilLab, a)
			},
			updateHandles: function(a, b) {
				"rzSliderModel" === a ? this.updateLowHandle(b) : this.updateHighHandle(b), this.updateSelectionBar(), this.updateTicksScale(), this.range && this.updateCmbLabel()
			},
			getHandleLabelPos: function(a, b) {
				var c = this[a].rzsd,
					d = b - c / 2 + this.handleHalfDim,
					e = this.barDimension - c;
				return this.options.rightToLeft && "minLab" === a || !this.options.rightToLeft && "maxLab" === a ? Math.min(d, e) : Math.min(Math.max(d, 0), e)
			},
			updateLowHandle: function(a) {
				if (this.setPosition(this.minH, a), this.translateFn(this.scope.rzSliderModel, this.minLab, "model"), this.setPosition(this.minLab, this.getHandleLabelPos("minLab", a)), this.options.getPointerColor) {
					var b = this.getPointerColor("min");
					this.scope.minPointerStyle = {
						backgroundColor: b
					}
				}
				this.shFloorCeil()
			},
			updateHighHandle: function(a) {
				if (this.setPosition(this.maxH, a), this.translateFn(this.scope.rzSliderHigh, this.maxLab, "high"), this.setPosition(this.maxLab, this.getHandleLabelPos("maxLab", a)), this.options.getPointerColor) {
					var b = this.getPointerColor("max");
					this.scope.maxPointerStyle = {
						backgroundColor: b
					}
				}
				this.shFloorCeil()
			},
			shFloorCeil: function() {
				var a = !1,
					b = !1,
					c = this.options.rightToLeft,
					d = this.flrLab.rzsp,
					e = this.flrLab.rzsd,
					f = this.minLab.rzsp,
					g = this.minLab.rzsd,
					h = this.maxLab.rzsp,
					i = this.maxLab.rzsd,
					j = this.ceilLab.rzsp,
					k = this.handleHalfDim,
					l = c ? f + g >= d - e - 5 : d + e + 5 >= f,
					m = c ? j + k + 10 >= f - g : f + g >= j - k - 10,
					n = c ? h >= d - e - k : d + e + k >= h,
					o = c ? j + 10 >= h - i : h + i >= j - 10;
				l ? (a = !0, this.hideEl(this.flrLab)) : (a = !1, this.showEl(this.flrLab)), m ? (b = !0, this.hideEl(this.ceilLab)) : (b = !1, this.showEl(this.ceilLab)), this.range && (o ? this.hideEl(this.ceilLab) : b || this.showEl(this.ceilLab), n ? this.hideEl(this.flrLab) : a || this.showEl(this.flrLab))
			},
			updateSelectionBar: function() {
				var a = 0,
					b = 0,
					c = this.options.rightToLeft ? !this.options.showSelectionBarEnd : this.options.showSelectionBarEnd,
					d = this.options.rightToLeft ? this.maxH.rzsp + this.handleHalfDim : this.minH.rzsp + this.handleHalfDim;
				if (this.range) b = Math.abs(this.maxH.rzsp - this.minH.rzsp), a = d;
				else if (null !== this.options.showSelectionBarFromValue) {
					var e = this.options.showSelectionBarFromValue,
						f = this.valueToOffset(e),
						g = this.options.rightToLeft ? this.scope.rzSliderModel <= e : this.scope.rzSliderModel > e;
					g ? (b = this.minH.rzsp - f, a = f + this.handleHalfDim) : (b = f - this.minH.rzsp, a = this.minH.rzsp + this.handleHalfDim)
				} else c ? (b = Math.abs(this.maxPos - this.minH.rzsp) + this.handleHalfDim, a = this.minH.rzsp + this.handleHalfDim) : (b = Math.abs(this.maxH.rzsp - this.minH.rzsp) + this.handleHalfDim, a = 0);
				if (this.setDimension(this.selBar, b), this.setPosition(this.selBar, a), this.options.getSelectionBarColor) {
					var h = this.getSelectionBarColor();
					this.scope.barStyle = {
						backgroundColor: h
					}
				}
			},
			getSelectionBarColor: function() {
				return this.range ? this.options.getSelectionBarColor(this.scope.rzSliderModel, this.scope.rzSliderHigh) : this.options.getSelectionBarColor(this.scope.rzSliderModel)
			},
			getPointerColor: function(a) {
				return "max" === a ? this.options.getPointerColor(this.scope.rzSliderHigh, a) : this.options.getPointerColor(this.scope.rzSliderModel, a)
			},
			updateCmbLabel: function() {
				var a = null;
				if (a = this.options.rightToLeft ? this.minLab.rzsp - this.minLab.rzsd - 10 <= this.maxLab.rzsp : this.minLab.rzsp + this.minLab.rzsd + 10 >= this.maxLab.rzsp) {
					var b = this.getDisplayValue(this.scope.rzSliderModel, "model"),
						c = this.getDisplayValue(this.scope.rzSliderHigh, "high"),
						d = "";
					d = b === c ? b : this.options.rightToLeft ? c + " - " + b : b + " - " + c, this.translateFn(d, this.cmbLab, "cmb", !1);
					var e = Math.min(Math.max(this.selBar.rzsp + this.selBar.rzsd / 2 - this.cmbLab.rzsd / 2, 0), this.barDimension - this.cmbLab.rzsd);
					this.setPosition(this.cmbLab, e), this.hideEl(this.minLab), this.hideEl(this.maxLab), this.showEl(this.cmbLab)
				} else this.showEl(this.maxLab), this.showEl(this.minLab), this.hideEl(this.cmbLab)
			},
			getDisplayValue: function(a, b) {
				return this.customTrFn(a, this.options.id, b)
			},
			roundStep: function(a, b) {
				var c = b ? b : this.step,
					d = parseFloat((a - this.minValue) / c).toPrecision(12);
				d = Math.round(+d) * c;
				var e = (this.minValue + d).toFixed(this.precision);
				return +e
			},
			hideEl: function(a) {
				return a.css({
					opacity: 0
				})
			},
			showEl: function(a) {
				return a.rzAlwaysHide ? a : a.css({
					opacity: 1
				})
			},
			setPosition: function(a, b) {
				a.rzsp = b;
				var c = {};
				return c[this.positionProperty] = b + "px", a.css(c), b
			},
			getDimension: function(a) {
				var b = a[0].getBoundingClientRect();
				return this.options.vertical ? a.rzsd = (b.bottom - b.top) * this.options.scale : a.rzsd = (b.right - b.left) * this.options.scale, a.rzsd
			},
			setDimension: function(a, b) {
				a.rzsd = b;
				var c = {};
				return c[this.dimensionProperty] = b + "px", a.css(c), b
			},
			valueToOffset: function(a) {
				return this.options.rightToLeft ? (this.maxValue - this.sanitizeValue(a)) * this.maxPos / this.valueRange || 0 : (this.sanitizeValue(a) - this.minValue) * this.maxPos / this.valueRange || 0
			},
			sanitizeValue: function(a) {
				return Math.min(Math.max(a, this.minValue), this.maxValue)
			},
			offsetToValue: function(a) {
				return this.options.rightToLeft ? (1 - a / this.maxPos) * this.valueRange + this.minValue : a / this.maxPos * this.valueRange + this.minValue
			},
			getEventXY: function(a) {
				var b = this.options.vertical ? "clientY" : "clientX";
				return b in a ? a[b] : void 0 === a.originalEvent ? a.touches[0][b] : a.originalEvent.touches[0][b]
			},
			getEventPosition: function(a) {
				var b = this.sliderElem.rzsp,
					c = 0;
				return c = this.options.vertical ? -this.getEventXY(a) + b : this.getEventXY(a) - b, (c - this.handleHalfDim) * this.options.scale
			},
			getEventNames: function(a) {
				var b = {
					moveEvent: "",
					endEvent: ""
				};
				return a.touches || void 0 !== a.originalEvent && a.originalEvent.touches ? (b.moveEvent = "touchmove", b.endEvent = "touchend") : (b.moveEvent = "mousemove", b.endEvent = "mouseup"), b
			},
			getNearestHandle: function(a) {
				if (!this.range) return this.minH;
				var b = this.getEventPosition(a),
					c = Math.abs(b - this.minH.rzsp),
					d = Math.abs(b - this.maxH.rzsp);
				return d > c ? this.minH : c > d ? this.maxH : this.options.rightToLeft ? b > this.minH.rzsp ? this.minH : this.maxH : b < this.minH.rzsp ? this.minH : this.maxH
			},
			focusElement: function(a) {
				var b = 0;
				a[b].focus()
			},
			bindEvents: function() {
				var b, c, d;
				this.options.draggableRange ? (b = "rzSliderDrag", c = this.onDragStart, d = this.onDragMove) : (b = "rzSliderModel", c = this.onStart, d = this.onMove), this.options.onlyBindHandles || (this.selBar.on("mousedown", a.bind(this, c, null, b)), this.selBar.on("mousedown", a.bind(this, d, this.selBar))), this.options.draggableRangeOnly ? (this.minH.on("mousedown", a.bind(this, c, null, b)), this.maxH.on("mousedown", a.bind(this, c, null, b))) : (this.minH.on("mousedown", a.bind(this, this.onStart, this.minH, "rzSliderModel")), this.range && this.maxH.on("mousedown", a.bind(this, this.onStart, this.maxH, "rzSliderHigh")), this.options.onlyBindHandles || (this.fullBar.on("mousedown", a.bind(this, this.onStart, null, null)), this.fullBar.on("mousedown", a.bind(this, this.onMove, this.fullBar)), this.ticks.on("mousedown", a.bind(this, this.onStart, null, null)), this.ticks.on("mousedown", a.bind(this, this.onTickClick, this.ticks)))), this.options.onlyBindHandles || (this.selBar.on("touchstart", a.bind(this, c, null, b)), this.selBar.on("touchstart", a.bind(this, d, this.selBar))), this.options.draggableRangeOnly ? (this.minH.on("touchstart", a.bind(this, c, null, b)), this.maxH.on("touchstart", a.bind(this, c, null, b))) : (this.minH.on("touchstart", a.bind(this, this.onStart, this.minH, "rzSliderModel")), this.range && this.maxH.on("touchstart", a.bind(this, this.onStart, this.maxH, "rzSliderHigh")), this.options.onlyBindHandles || (this.fullBar.on("touchstart", a.bind(this, this.onStart, null, null)), this.fullBar.on("touchstart", a.bind(this, this.onMove, this.fullBar)), this.ticks.on("touchstart", a.bind(this, this.onStart, null, null)), this.ticks.on("touchstart", a.bind(this, this.onTickClick, this.ticks)))), this.options.keyboardSupport && (this.minH.on("focus", a.bind(this, this.onPointerFocus, this.minH, "rzSliderModel")), this.range && this.maxH.on("focus", a.bind(this, this.onPointerFocus, this.maxH, "rzSliderHigh")))
			},
			unbindEvents: function() {
				this.minH.off(), this.maxH.off(), this.fullBar.off(), this.selBar.off(), this.ticks.off()
			},
			onStart: function(b, d, e) {
				var f, g, h = this.getEventNames(e);
				e.stopPropagation(), e.preventDefault(), this.calcViewDimensions(), b ? this.tracking = d : (b = this.getNearestHandle(e), this.tracking = b === this.minH ? "rzSliderModel" : "rzSliderHigh"), b.addClass("rz-active"), this.options.keyboardSupport && this.focusElement(b), f = a.bind(this, this.dragging.active ? this.onDragMove : this.onMove, b), g = a.bind(this, this.onEnd, f), c.on(h.moveEvent, f), c.one(h.endEvent, g), this.callOnStart()
			},
			onMove: function(b, c, d) {
				var e, f = this.getEventPosition(c),
					g = this.options.rightToLeft ? this.minValue : this.maxValue,
					h = this.options.rightToLeft ? this.maxValue : this.minValue;
				0 >= f ? e = h : f >= this.maxPos ? e = g : (e = this.offsetToValue(f), e = d && a.isNumber(this.options.showTicks) ? this.roundStep(e, this.options.showTicks) : this.roundStep(e)), this.positionTrackingHandle(e)
			},
			onEnd: function(a, b) {
				var d = this.getEventNames(b).moveEvent;
				this.options.keyboardSupport || (this.minH.removeClass("rz-active"), this.maxH.removeClass("rz-active"), this.tracking = ""), this.dragging.active = !1, c.off(d, a), this.scope.$emit("slideEnded"), this.callOnEnd()
			},
			onTickClick: function(a, b) {
				this.onMove(a, b, !0)
			},
			onPointerFocus: function(b, c) {
				this.tracking = c, b.one("blur", a.bind(this, this.onPointerBlur, b)), b.on("keydown", a.bind(this, this.onKeyboardEvent)), b.addClass("rz-active")
			},
			onPointerBlur: function(a) {
				a.off("keydown"), this.tracking = "", a.removeClass("rz-active")
			},
			getKeyActions: function(a) {
				var b = a + this.step,
					c = a - this.step,
					d = a + this.valueRange / 10,
					e = a - this.valueRange / 10,
					f = {
						UP: b,
						DOWN: c,
						LEFT: c,
						RIGHT: b,
						PAGEUP: d,
						PAGEDOWN: e,
						HOME: this.minValue,
						END: this.maxValue
					};
				return this.options.rightToLeft && (f.LEFT = b, f.RIGHT = c, this.options.vertical && (f.UP = c, f.DOWN = b)), f
			},
			onKeyboardEvent: function(a) {
				var b = this.scope[this.tracking],
					c = a.keyCode || a.which,
					d = {
						38: "UP",
						40: "DOWN",
						37: "LEFT",
						39: "RIGHT",
						33: "PAGEUP",
						34: "PAGEDOWN",
						36: "HOME",
						35: "END"
					},
					e = this.getKeyActions(b),
					f = d[c],
					g = e[f];
				if (null != g && "" !== this.tracking) {
					a.preventDefault();
					var h = this.roundStep(this.sanitizeValue(g));
					if (this.options.draggableRangeOnly) {
						var i, j, k = this.scope.rzSliderHigh - this.scope.rzSliderModel;
						"rzSliderModel" === this.tracking ? (i = h, j = h + k, j > this.maxValue && (j = this.maxValue, i = j - k)) : (j = h, i = h - k, i < this.minValue && (i = this.minValue, j = i + k)), this.positionTrackingBar(i, j)
					} else this.positionTrackingHandle(h)
				}
			},
			onDragStart: function(a, b, c) {
				var d = this.getEventPosition(c);
				this.dragging = {
					active: !0,
					value: this.offsetToValue(d),
					difference: this.scope.rzSliderHigh - this.scope.rzSliderModel,
					lowLimit: this.options.rightToLeft ? this.minH.rzsp - d : d - this.minH.rzsp,
					highLimit: this.options.rightToLeft ? d - this.maxH.rzsp : this.maxH.rzsp - d
				}, this.onStart(a, b, c)
			},
			getValue: function(a, b, c, d) {
				var e = this.options.rightToLeft,
					f = null;
				return f = "min" === a ? c ? d ? e ? this.minValue : this.maxValue - this.dragging.difference : e ? this.maxValue - this.dragging.difference : this.minValue : e ? this.offsetToValue(b + this.dragging.lowLimit) : this.offsetToValue(b - this.dragging.lowLimit) : c ? d ? e ? this.minValue + this.dragging.difference : this.maxValue : e ? this.maxValue : this.minValue + this.dragging.difference : e ? this.offsetToValue(b + this.dragging.lowLimit) + this.dragging.difference : this.offsetToValue(b - this.dragging.lowLimit) + this.dragging.difference, this.roundStep(f)
			},
			onDragMove: function(a, b) {
				var c, d, e, f, g, h, i, j, k = this.getEventPosition(b);
				if (this.options.rightToLeft ? (e = this.dragging.lowLimit, f = this.dragging.highLimit, i = this.maxH, j = this.minH) : (e = this.dragging.highLimit, f = this.dragging.lowLimit, i = this.minH, j = this.maxH), g = f >= k, h = k >= this.maxPos - e, g) {
					if (0 === i.rzsp) return;
					c = this.getValue("min", k, !0, !1), d = this.getValue("max", k, !0, !1)
				} else if (h) {
					if (j.rzsp === this.maxPos) return;
					d = this.getValue("max", k, !0, !0), c = this.getValue("min", k, !0, !0)
				} else c = this.getValue("min", k, !1), d = this.getValue("max", k, !1);
				this.positionTrackingBar(c, d)
			},
			positionTrackingBar: function(a, b) {
				this.scope.rzSliderModel = a, this.scope.rzSliderHigh = b, this.updateHandles("rzSliderModel", this.valueToOffset(a)), this.updateHandles("rzSliderHigh", this.valueToOffset(b)), this.applyModel()
			},
			positionTrackingHandle: function(a) {
				var b = !1;
				this.range && (a = this.applyMinRange(a), "rzSliderModel" === this.tracking && a > this.scope.rzSliderHigh ? (this.options.noSwitching && this.scope.rzSliderHigh !== this.minValue ? a = this.applyMinRange(this.scope.rzSliderHigh) : (this.scope[this.tracking] = this.scope.rzSliderHigh, this.updateHandles(this.tracking, this.maxH.rzsp), this.updateAriaAttributes(), this.tracking = "rzSliderHigh", this.minH.removeClass("rz-active"), this.maxH.addClass("rz-active"), this.options.keyboardSupport && this.focusElement(this.maxH)), b = !0) : "rzSliderHigh" === this.tracking && a < this.scope.rzSliderModel && (this.options.noSwitching && this.scope.rzSliderModel !== this.maxValue ? a = this.applyMinRange(this.scope.rzSliderModel) : (this.scope[this.tracking] = this.scope.rzSliderModel, this.updateHandles(this.tracking, this.minH.rzsp), this.updateAriaAttributes(), this.tracking = "rzSliderModel", this.maxH.removeClass("rz-active"), this.minH.addClass("rz-active"), this.options.keyboardSupport && this.focusElement(this.minH)), b = !0)), this.scope[this.tracking] !== a && (this.scope[this.tracking] = a, this.updateHandles(this.tracking, this.valueToOffset(a)), this.updateAriaAttributes(), b = !0), b && this.applyModel()
			},
			applyMinRange: function(a) {
				if (0 !== this.options.minRange) {
					var b = "rzSliderModel" === this.tracking ? this.scope.rzSliderHigh : this.scope.rzSliderModel,
						c = Math.abs(a - b);
					if (c < this.options.minRange) return "rzSliderModel" === this.tracking ? this.scope.rzSliderHigh - this.options.minRange : this.scope.rzSliderModel + this.options.minRange
				}
				return a
			},
			applyModel: function() {
				this.internalChange = !0, this.scope.$apply(), this.callOnChange(), this.internalChange = !1
			},
			callOnStart: function() {
				if (this.options.onStart) {
					var a = this;
					this.scope.$evalAsync(function() {
						a.options.onStart(a.options.id, a.scope.rzSliderModel, a.scope.rzSliderHigh)
					})
				}
			},
			callOnChange: function() {
				if (this.options.onChange) {
					var a = this;
					this.scope.$evalAsync(function() {
						a.options.onChange(a.options.id, a.scope.rzSliderModel, a.scope.rzSliderHigh)
					})
				}
			},
			callOnEnd: function() {
				if (this.options.onEnd) {
					var a = this;
					this.scope.$evalAsync(function() {
						a.options.onEnd(a.options.id, a.scope.rzSliderModel, a.scope.rzSliderHigh)
					})
				}
			}
		}, h
	}]).directive("rzslider", ["RzSlider", function(a) {
		return {
			restrict: "E",
			scope: {
				rzSliderModel: "=?",
				rzSliderHigh: "=?",
				rzSliderOptions: "&?",
				rzSliderTplUrl: "@"
			},
			templateUrl: function(a, b) {
				return b.rzSliderTplUrl || "rzSliderTpl.html"
			},
			link: function(b, c) {
				b.slider = new a(b, c)
			}
		}
	}]);
	return b.run(["$templateCache", function(a) {
		a.put("rzSliderTpl.html", '<span class=rz-bar-wrapper><span class=rz-bar></span></span> <span class=rz-bar-wrapper><span class="rz-bar rz-selection" ng-style=barStyle></span></span> <span class="rz-pointer rz-pointer-min" ng-style=minPointerStyle></span> <span class="rz-pointer rz-pointer-max" ng-style=maxPointerStyle></span> <span class="rz-bubble rz-limit"></span> <span class="rz-bubble rz-limit"></span> <span class=rz-bubble></span> <span class=rz-bubble></span> <span class=rz-bubble></span><ul ng-show=showTicks class=rz-ticks><li ng-repeat="t in ticks track by $index" class=rz-tick ng-class="{\'rz-selected\': t.selected}" ng-style=t.style ng-attr-uib-tooltip="{{ t.tooltip }}" ng-attr-tooltip-placement={{t.tooltipPlacement}} ng-attr-tooltip-append-to-body="{{ t.tooltip ? true : undefined}}"><span ng-if="t.value != null" class=rz-tick-value ng-attr-uib-tooltip="{{ t.valueTooltip }}" ng-attr-tooltip-placement={{t.valueTooltipPlacement}}>{{ t.value }}</span> <span ng-if="t.legend != null" class=rz-tick-legend>{{ t.legend }}</span></li></ul>')
	}]), b
});