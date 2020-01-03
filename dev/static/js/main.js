$(document).ready(function () {
    svg4everybody({});

    let catalogNavHover = function () {
        $('.catalog-nav__item').hover(
            function () {
                let parentList = $(this).closest('.catalog-nav__list');
                if ($(this).children('.catalog-nav__list').length) {
                    let catNavHeight = $(this).children('.catalog-nav__list').outHeight();
                    if (parentList.outHeight() < catNavHeight) {
                        parentList.css('height', catNavHeight); 
                    }
                    parentList.css('width', '720');
                }
            }, function () {
                let parentList = $(this).closest('.catalog-nav__list');
                parentList.css('height', 'auto');
                parentList.css('width', 'auto');
            }
        )
    };

    let openSearchForm = function () {
        $(document).on('click', '.search__icon', function () {
            $(this).parent().addClass('search--open');
        });
    };

    let clearSearchForm = function () {
        $(document).on('click', '.search__clear', function () {
            $('.search__input').val('');
        });
    };

    let bannerSlider = function () {
        $('.js-banner').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: ".banner__navigation--prev",
            nextArrow: '.banner__navigation--next',
            dots: true,
            customPaging : function(slider, i) {
                return '<div class="banner__dot"></div>';
            },
            appendDots: '.banner__dots'
        })
    };

    let tabs = function () {
        $('.tabs-navigation__item').click(function() {
            let tabName = $(this).attr('show-tab'),
                tabsBody = $(this).closest('.tabs').find('.tabs__body')[0],
                tab = $(tabsBody).find('.' + tabName);
            $(this).addClass('tabs-navigation__item--active').siblings().removeClass('tabs-navigation__item--active');
            $(tab).addClass('tab--active').siblings().removeClass('tab--active');
            if ($(tabsBody).find('.js-products-line-slider').length) {
                $('.js-products-line-slider').each(function () {
                    $(this).slick('refresh');
                });
                $('.js-product-prev__slider').each(function (){
                    $(this).slick('refresh');
                });
            }
        });
    };

    let productPrevSlider = function() {
        $('.js-product-prev__slider').each(function (idx) {
            let productPrevSliderClass = "product-prev-slider-" + idx;
            this.closest('.product-prev').classList.add(productPrevSliderClass);
            $(this).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
                appendDots: '.' + productPrevSliderClass + ' .product-prev__colors',
                swipe: false,
                infinite: false,
                customPaging: function(slider,i) {
                    let color = $(slider.$slides[i]).data('color');
                    return '<div class="product-prev__color" style="background-color:' + color + '"></div>'
                }
            });
        });
    };

    let productLineSlider = function () {
        $('.js-products-line-slider').each(function (idx){
            let productsLineSliderID = "products-line-slider-" + idx;
            this.closest('.products-line-slider').id = productsLineSliderID;
            $(this).slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                dots: true,
                appendDots: '#' + productsLineSliderID + ' .products-line-slider__dots',
                prevArrow: '#' + productsLineSliderID + ' .products-line-slider__btn--prev',
                nextArrow: '#' + productsLineSliderID + ' .products-line-slider__btn--next',
                responsive: [
                    {
                        breakpoint: 1139,
                        settings: {
                            slidesToShow: 3,
                            customPaging: function (slider, i) {
                                return '<div class="products-line-slider__dot"></div>';
                            },
                        }
                    }    
                ]
            });
        });    
    };

    catalogNavHover();
    openSearchForm();
    clearSearchForm();
    bannerSlider();
    tabs();
    productPrevSlider();
    productLineSlider();
});    


//Полифилы для IE11
(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function () {

    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();